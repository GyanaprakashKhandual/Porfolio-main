# How Git Works Internally

## Overview

Most developers use Git for years before understanding what it is actually doing under the hood. You do not need to understand Git's internals to use it effectively for everyday work. But when things go wrong — a merge conflict you cannot resolve, a commit you accidentally lost, a history you need to rewrite — the developers who understand Git's internal model are the ones who can recover gracefully. More importantly, understanding the internals makes the entire command set feel logical rather than arbitrary. Commands that seemed like black boxes become obvious once you understand what they operate on.

This document explains Git's internal data model: how data is stored, what commits actually are, and how branches, tags, and HEAD relate to that data.

---

## Git is a Content-Addressable Filesystem

The most important thing to understand about Git is that at its foundation, it is a **content-addressable key-value store**. You can insert any content into the Git database and get back a key that you can use to retrieve that content at any time.

The key Git uses is a **SHA-1 hash** of the content — a 40-character hexadecimal string computed from the data being stored. The same content always produces the same hash. Different content always produces a different hash. This means:

- If you store "Hello, World" in Git, it always gets the same hash.
- If you change even one character, the hash is completely different.
- If two files have identical content, Git stores them once and gives both the same hash.
- Git can always verify data integrity because re-hashing the stored content must produce the same key.

Everything Git stores — file contents, directory structures, commits, tags — is stored as one of four object types, each with a unique SHA-1 hash.

---

## The Four Object Types

### 1. Blob

A blob stores the raw content of a single file. It stores only the content — not the filename, not the permissions, not any metadata. Two files with identical content are stored as one blob regardless of their names.

```bash
# Store a string as a blob manually
echo "Hello, Git" | git hash-object --stdin -w
# e51ca0d0b8c5b6e25f4c3d0f8e0d1f8e25f4c3d0  (example hash)

# Retrieve it
git cat-file -p e51ca0d0b8c5b6e25f4c3d0f8e0d1f8e25f4c3d0
# Hello, Git
```

When you run `git add`, Git takes the file content, computes a SHA-1 hash, and stores it as a blob in `.git/objects/`.

### 2. Tree

A tree represents a directory. It stores a list of entries, where each entry is a mode (file permissions), a type (blob or tree), a SHA-1 hash, and a name.

```
100644 blob a8c3f9...   README.md
100644 blob 2f1b4e...   package.json
040000 tree d4c7a1...   src
```

A tree points to blobs (files) and other trees (subdirectories). Trees represent the directory structure at a point in time, but they do not store the content themselves — they reference blobs.

```bash
# Inspect a tree object
git cat-file -p HEAD^{tree}
# 100644 blob abc123...   README.md
# 040000 tree def456...   src
```

### 3. Commit

A commit is a snapshot of the entire project at a point in time. It contains:

- A pointer to a top-level **tree** object representing the project root at that moment
- A pointer to zero or more **parent commits** (zero for the first commit, one for a normal commit, two or more for a merge commit)
- The **author** — name, email, and timestamp of who made the change
- The **committer** — name, email, and timestamp of who created the commit (can differ from author when patches are applied)
- The **commit message**

```bash
# Inspect a commit object
git cat-file -p HEAD
# tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
# parent 3d2e1f...
# author Jane Smith <jane@example.com> 1710000000 +0000
# committer Jane Smith <jane@example.com> 1710000000 +0000
#
# Add login feature
```

Every commit points to exactly one tree — the snapshot of the entire project at that moment. It also points to its parent, which points to its parent, forming a chain back to the very first commit. This chain is Git's history.

### 4. Tag

An annotated tag is a Git object that points to another object (usually a commit) and contains a tagger name, date, message, and optionally a GPG signature.

```bash
# Inspect an annotated tag
git cat-file -p v1.0.0
# object 3d2e1f...
# type commit
# tag v1.0.0
# tagger Jane Smith <jane@example.com> 1710000000 +0000
#
# Release version 1.0.0
```

Lightweight tags (created with `git tag v1.0` without `-a`) are just references — they are not stored as tag objects.

---

## How Objects Are Stored on Disk

All four object types are stored in `.git/objects/`. Each object is compressed with zlib and stored in a file whose path is derived from its SHA-1 hash.

A hash like `a8c3f9d2b1e4c7f0a2d9e5b8c4f1e7d3a6b2c9e5` is stored as:

```
.git/objects/a8/c3f9d2b1e4c7f0a2d9e5b8c4f1e7d3a6b2c9e5
```

The first two characters become the directory name. The remaining 38 characters become the filename. This two-level structure prevents any single directory from containing millions of files.

```
.git/
  objects/
    a8/
      c3f9d2b1e4c7f0a2d9e5b8c4f1e7d3a6b2c9e5
    2f/
      1b4e7d3a6c9b2e5f8a0c4d7e1b3f6a9c2d5e8f
    4b/
      825dc642cb6eb9a060e54bf8d69288fbee4904
    info/
    pack/
```

Over time, as a repository grows, Git compresses loose objects into **packfiles** for efficiency. Packfiles store delta-compressed objects — instead of storing the full content of each version of a file, Git stores the first version and then diffs against it. This is how a repository with thousands of commits can still be a manageable size on disk.

---

## Snapshots, Not Diffs

This is the single most important conceptual distinction between Git and most other version control systems.

**Subversion, CVS, Perforce** store the original version of a file and then a series of diffs (changes) on top of it. To reconstruct version 50 of a file, they must apply 49 diffs sequentially.

**Git stores a snapshot at each commit.** A snapshot is a complete picture of every file in the project at that moment, represented as a tree of blob and tree objects. If a file did not change between two commits, Git does not store it again — it just points the new tree at the same blob from the previous commit.

```
Commit A  →  Tree  →  blob:README.md (hash: abc)
                   →  blob:src/app.js (hash: def)

Commit B  →  Tree  →  blob:README.md (hash: abc)   ← same blob, file unchanged
                   →  blob:src/app.js (hash: ghi)   ← new blob, file changed
```

This makes operations like checking out a branch, comparing any two commits, or reverting to a previous state extremely fast — Git just looks up the tree for the target commit and copies out the files.

---

## References — Branches, Tags, and HEAD

SHA-1 hashes are the addresses of objects in Git's database. But working with 40-character hex strings directly would be unusable. Git solves this with **references** (refs) — named pointers to SHA-1 hashes.

References are stored as text files in `.git/refs/`:

```
.git/
  refs/
    heads/        ← branch pointers
      main
      feature/login
    tags/         ← tag pointers
      v1.0.0
    remotes/      ← remote tracking branch pointers
      origin/
        main
        develop
  HEAD            ← pointer to the current branch or commit
```

### Branches

A branch is nothing more than a file in `.git/refs/heads/` containing a 40-character SHA-1 hash — the commit that the branch currently points to.

```bash
cat .git/refs/heads/main
# 3d2e1fa8c7b6e5d4c3b2a1f0e9d8c7b6a5f4e3d2
```

When you commit on a branch, Git creates a new commit object, then updates this file to point to the new commit. That is the entirety of what "advancing a branch" means. Branches are essentially free to create because they are just a 41-byte file.

### HEAD

HEAD is a special reference stored in `.git/HEAD`. It tells Git which branch (or commit) you are currently working on.

In the normal case (you are on a branch), HEAD contains a reference to a branch:

```
ref: refs/heads/main
```

In the detached HEAD state (you have checked out a specific commit rather than a branch), HEAD contains the SHA-1 directly:

```
3d2e1fa8c7b6e5d4c3b2a1f0e9d8c7b6a5f4e3d2
```

When you run `git commit`, Git:

1. Computes SHA-1 hashes and creates blob objects for any staged files
2. Creates a tree object representing the directory structure
3. Creates a commit object pointing to that tree and to the current HEAD as its parent
4. Updates the branch HEAD is pointing to, so it now points to the new commit

---

## The Full Picture — What Happens on git commit

Walking through what happens when you run `git commit` makes the entire model concrete:

```bash
# You have edited README.md and src/app.js
git add README.md src/app.js
git commit -m "Update documentation and fix login bug"
```

**Step 1 — git add:**

- Git computes the SHA-1 of README.md's content and stores it as a blob object
- Git computes the SHA-1 of src/app.js's content and stores it as a blob object
- Git writes these blob hashes into the index (staging area)

**Step 2 — git commit:**

- Git reads the index and creates a tree object representing the current directory structure (a tree pointing to blobs for every file in the project)
- Git creates a commit object containing: the tree hash, the parent commit hash (the previous HEAD), your name/email/timestamp, and your message
- Git updates `.git/refs/heads/main` to point to the new commit's hash

The result is:

```
New commit (SHA: 7f3a...)
  ↓ points to
Tree (SHA: 4c9b...)
  ↓ points to
  blob: README.md (SHA: a1b2...)    ← new blob
  blob: src/app.js (SHA: d3e4...)   ← new blob
  blob: package.json (SHA: 2f1b...) ← same blob as before, file unchanged

  ↑ parent
Previous commit (SHA: 3d2e...)
```

And `.git/refs/heads/main` now contains `7f3a...`.

---

## Why the Immutability Matters

Every commit, tree, and blob in Git is **immutable**. Once created, an object never changes. Its hash is computed from its content — if the content changed, it would be a different object with a different hash.

This is why Git history is tamper-evident. If someone modifies a commit, the commit's hash changes. Because the next commit contains the previous commit's hash, that changes too. And so on up the chain. There is no way to modify history silently.

This is also why operations like `git rebase` and `git commit --amend` do not modify existing commits — they create new commits and update branch pointers to refer to the new commits. The old commits still exist in the object database until garbage collection removes them (if nothing points to them anymore).

---

## Summary

Git's internal model is a content-addressable object database storing four types of objects: blobs (file content), trees (directory structure), commits (snapshots with history), and tags (named pointers). Objects are addressed by SHA-1 hashes of their content. Branches are simply files containing a SHA-1 hash. HEAD points to the current branch or commit. Every commit creates new objects and advances a pointer — nothing is ever modified in place. Understanding this model transforms Git from a set of memorized commands into a coherent, logical system.

---

## Related Topics

- TheThreeStates.md — Working directory, staging area, and repository
- TheIndexFile.md — How the staging area works internally
- PlumbingVsPorcelainCommands.md — Low-level Git commands for inspecting objects
- HowGitHashObjectWorks.md — SHA-1 hashing and the object store
- GitObjectsBlobTreeCommit.md — Deep dive into each object type
