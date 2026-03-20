# The Three States

## Overview

One of the most important concepts to internalize when learning Git is that every file in a Git repository exists in one of three states. Understanding these three states — and the three areas of a Git project that correspond to them — is the mental model that makes sense of almost every Git command and workflow.

Git beginners often struggle with why certain commands do not behave as expected. The answer is almost always a misunderstanding of which state a file is in and which area it lives in. Get this model right, and everything else becomes much clearer.

---

## The Three States

### Modified

A file is **modified** when you have changed it in your working directory but have not yet told Git about those changes. Git knows the file exists (it was in the last commit) and can see that its current content differs from what was last committed, but the changes are not recorded anywhere. If you were to commit right now, this file's changes would not be included.

### Staged

A file is **staged** (also called **indexed**) when you have marked a modified file to go into your next commit. Staging is the act of saying "yes, I want these specific changes to be part of my next commit." The staged state lives in an intermediate area called the staging area or index. A file can be partially staged — for example, if you changed 10 lines and staged only 5 of them, Git tracks both the staged version and the modified-but-unstaged version simultaneously.

### Committed

A file is **committed** when its current version has been safely recorded in the local Git database. The data is stored as a snapshot in the object database inside the `.git` directory. A committed file is clean — there is nothing staged or modified about it relative to the last commit.

---

## The Three Areas

Each state corresponds to an area of a Git project.

```
Working Directory          Staging Area              .git Directory
(Working Tree)             (Index)                   (Repository)
──────────────             ────────────              ──────────────
Your actual files          Changes prepared           Committed snapshots
as you see and            for the next commit        (permanent history)
edit them

[modified files]  →  git add  →  [staged files]  →  git commit  →  [committed]
                                                                         ↓
                  ←  git checkout / git restore  ←  git restore --staged
```

### Area 1 — The Working Directory (Working Tree)

The working directory is the single checked-out version of the project that you see and edit in your filesystem. It is simply the directory on your disk where your project files live.

When you open a file in your editor and change it, you are working in the working directory. Git knows these files exist and watches them, but it has not done anything with the changes yet.

The working directory is not inside `.git/` — it is the parent directory around `.git/`.

```
my-project/
├── .git/           ← Git's internal database (the repository)
├── README.md       ← working directory file
├── package.json    ← working directory file
└── src/
    └── app.js      ← working directory file
```

### Area 2 — The Staging Area (Index)

The staging area is an intermediate area between the working directory and the repository. It holds a snapshot of what will go into your next commit. Technically it is a single file at `.git/index` that stores a list of file paths along with metadata and SHA-1 hashes pointing to blob objects.

The staging area is what makes Git different from most other version control systems. Instead of committing all modified files at once, Git lets you precisely select which changes go into each commit. You can stage one file, stage specific lines within a file, or stage multiple files — whatever constitutes a single logical unit of work.

This power is why experienced Git users produce clean, focused commit histories while beginners tend to make "big bang" commits with many unrelated changes bundled together.

### Area 3 — The Git Repository (.git Directory)

The repository is where Git permanently stores its object database — all the blobs, trees, commits, and tags that make up the project's history. It is the `.git/` directory inside your project.

When you run `git commit`, Git takes everything from the staging area, creates the corresponding objects in the repository, and records the commit. The repository is the permanent record. Once committed, data is safe as long as the `.git/` directory exists.

---

## Visualizing the Flow

```
                    Working           Staging            Repository
                    Directory         Area               (.git/)
                    ─────────         ──────────         ──────────────
Initial state:      README.md
                    (untracked or
                    unchanged)

After editing:      README.md ★       (empty)
                    (modified)

After git add:      README.md         README.md          (unchanged)
                    (clean)           (staged)

After git commit:   README.md         (empty)            Commit with
                    (clean)                              README.md snapshot
```

---

## What git status Shows

`git status` is the command that reports which state each file is in. Reading its output through the lens of the three states makes it immediately interpretable.

```bash
git status
```

```
On branch main
Changes to be committed:        ← STAGED — will go into next commit
  (use "git restore --staged <file>..." to unstage)
        modified:   src/app.js
        new file:   src/utils.js

Changes not staged for commit:  ← MODIFIED — in working directory, not staged
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

Untracked files:                ← UNTRACKED — Git does not know about these yet
  (use "git add <file>..." to include in what will be committed)
        notes.txt
```

**Changes to be committed** — files in the staging area. They will go into the next `git commit`.

**Changes not staged for commit** — files that are tracked by Git and have been modified in the working directory but have not been staged with `git add`.

**Untracked files** — files that exist in the working directory but have never been added to Git. They are invisible to Git until you `git add` them.

---

## A Fourth State — Untracked

There is technically a fourth state that sits outside the three-state model: **untracked**. An untracked file is one that Git has never seen before — it exists in the working directory but is not in the staging area or the repository. Git notices it but ignores it until you explicitly add it.

```
Untracked    →  git add    →  Staged   →  git commit  →  Committed
(new file)                  (new file)                   (tracked)
```

Once a file has been committed at least once, it transitions from "untracked" to "tracked" and enters the three-state model permanently. A tracked file is either unmodified, modified, or staged.

---

## Moving Files Between States

### Moving from Working Directory to Staging Area

```bash
# Stage a specific file
git add README.md

# Stage specific lines within a file (interactive patch)
git add -p README.md

# Stage all modified and new files
git add .

# Stage all tracked modified files (does not add new untracked files)
git add -u
```

### Moving from Staging Area to Repository

```bash
# Commit with an inline message
git commit -m "Update README with installation instructions"

# Open editor for a longer commit message
git commit

# Stage all tracked modified files and commit in one step
git commit -a -m "Fix login validation"
# Note: -a does not add untracked files
```

### Moving Backwards — Unstaging

```bash
# Remove a file from the staging area (keep working directory changes)
git restore --staged README.md

# Old syntax (still works)
git reset HEAD README.md
```

### Moving Backwards — Discarding Working Directory Changes

```bash
# Discard working directory changes (revert to staged version, or last commit if not staged)
git restore README.md

# Old syntax (still works)
git checkout -- README.md
```

**Warning:** `git restore <file>` (without `--staged`) permanently discards your working directory changes. There is no undo. Only use it when you are certain you want to throw away the modifications.

---

## Staging Part of a File

One of Git's most powerful features is the ability to stage individual hunks (chunks) of a modified file, allowing you to make multiple logical commits from a single editing session.

```bash
# Enter interactive patch mode
git add -p README.md
```

Git shows each changed section and asks what to do:

```
@@ -1,4 +1,6 @@
 # My Project
+
+This project does X and Y.

 ## Installation
 Run npm install.
+Run npm start.

Stage this hunk [y,n,q,a,d,s,?]?
```

**y** — stage this hunk
**n** — do not stage this hunk
**s** — split into smaller hunks
**e** — manually edit the hunk
**q** — quit (stop staging)

This lets you commit "Add project description to README" as one commit and "Add npm start to installation steps" as a separate commit, even though both changes are in the same file.

---

## Checking File States Efficiently

```bash
# Full status (verbose)
git status

# Short format (compact)
git status -s
# ?? notes.txt        ← untracked
# M  README.md        ← modified, not staged (right column = working dir)
# M  src/app.js       ← staged (left column = staging area)
# MM src/utils.js     ← staged AND has additional unstaged modifications

# Staged diff — what is in staging area vs last commit
git diff --staged

# Working directory diff — what is modified but not staged
git diff
```

---

## Common Mistakes and How the Three States Explain Them

**"I committed but my changes are not there."**
You edited files but forgot to `git add` them. They were modified in the working directory but never reached the staging area. The commit only included what was staged.

**"git commit -a didn't include my new file."**
`git commit -a` only stages tracked files (files Git already knows about). Untracked files (brand new files that have never been `git add`ed before) are ignored by `-a`.

**"I ran git add but now I want to change something before committing."**
Just edit the file. The staged version and the working directory version are tracked separately. After editing, run `git add` again to update the staging area with the new version, or use `git add -p` to stage only specific parts.

**"git status shows nothing but git diff shows changes."**
This usually means you staged the changes and then made additional modifications. The staged version differs from the last commit, and the working directory version differs from the staged version. `git diff` shows working-directory-vs-staged. `git diff --staged` shows staged-vs-last-commit.

---

## Summary

Git's three states — modified, staged, and committed — correspond to three areas: the working directory, the staging area, and the repository. Files flow from working directory to staging area via `git add`, and from staging area to repository via `git commit`. They flow backward via `git restore --staged` (unstage) and `git restore` (discard working directory changes). The staging area is Git's defining feature — it is what allows you to build precise, focused commits rather than committing everything at once.

---

## Related Topics

- HowGitWorksInternally.md — How Git stores data as objects
- TheIndexFile.md — Internal mechanics of the staging area
- GitAddAndStaging.md — All options for staging changes
- GitCommit.md — Creating commits from staged changes
- GitStatusAndGitDiff.md — Inspecting file states in detail
