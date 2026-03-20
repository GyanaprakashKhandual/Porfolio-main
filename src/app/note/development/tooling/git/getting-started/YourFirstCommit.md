# Your First Commit

## Overview

A commit is the fundamental unit of Git history. It is a snapshot of your project at a specific moment in time, permanently recorded in the repository with a unique identifier, an author, a timestamp, and a message explaining what changed and why. Every Git workflow, every collaboration pattern, and every advanced feature ultimately builds on top of commits.

Making your first commit is the moment a project moves from being a directory of files to being a version-controlled history. This document walks through the complete first commit workflow and explains every decision along the way.

---

## The Complete First Commit Workflow

### Step 1 — Initialize or Clone

If you are starting a new project:

```bash
mkdir my-project
cd my-project
git init
```

If you cloned an existing repository, skip this — the first commit already exists.

### Step 2 — Create Your .gitignore

Before staging any files, create a `.gitignore` so generated files, dependencies, and secrets are excluded from version control from the beginning.

```bash
# For a Node.js project
cat > .gitignore << 'EOF'
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
EOF
```

Once files are committed to Git, removing them from history is painful. Getting `.gitignore` right before the first commit is far easier than fixing it afterward.

### Step 3 — Create Your Initial Files

```bash
# Create a README
cat > README.md << 'EOF'
# My Project

A brief description of what this project does.

## Getting Started

Instructions for setting up the project locally.
EOF
```

### Step 4 — Check the Current Status

```bash
git status
```

```
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        .gitignore
        README.md

nothing added to commit but untracked files present (use "git add" to track)
```

All files are untracked — Git sees them but has not been told to track them yet.

### Step 5 — Stage Your Files

```bash
# Stage all files
git add .

# Or stage specific files
git add README.md .gitignore
```

Check the status again:

```bash
git status
```

```
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   .gitignore
        new file:   README.md
```

Files have moved from "Untracked files" to "Changes to be committed" — they are now in the staging area.

### Step 6 — Review What You Are About to Commit

Before committing, review exactly what is staged:

```bash
# See the staged diff (what is in staging area vs last commit)
git diff --staged
```

```diff
diff --git a/.gitignore b/.gitignore
new file mode 100644
index 0000000..6f30e78
--- /dev/null
+++ b/.gitignore
@@ -0,0 +1,5 @@
+node_modules/
+dist/
+.env
+*.log
+.DS_Store

diff --git a/README.md b/README.md
new file mode 100644
index 0000000..3a8f9c1
--- /dev/null
+++ b/README.md
@@ -0,0 +1,9 @@
+# My Project
+
+A brief description of what this project does.
...
```

This habit — reviewing the diff before committing — prevents accidentally committing debug code, API keys, or incomplete changes.

### Step 7 — Create the Commit

```bash
git commit -m "Initial commit"
```

```
[main (root-commit) 7f3a2c1] Initial commit
 2 files changed, 14 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
```

Your first commit is recorded. The output shows:

- `main` — the branch the commit was made on
- `root-commit` — indicates this is the first commit (has no parent)
- `7f3a2c1` — the abbreviated SHA-1 hash of the commit (the full hash is 40 characters)
- `Initial commit` — your commit message
- A summary of files changed and lines added

---

## Writing Good Commit Messages

The commit message is as important as the code change itself. A well-written message explains what changed and why — information that is invaluable six months later when someone (including you) is trying to understand why a particular change was made.

### The Structure

A good commit message has two parts:

```
Short summary (50 characters or less)

Longer body explaining what changed and why (wrap at 72 characters).
The body is optional for simple changes but valuable for anything
non-obvious.

- Use bullet points for multiple distinct changes
- Reference issue numbers: Fixes #123, Closes #456
- Note breaking changes or migration steps
```

### The Subject Line Rules

**Limit to 50 characters.** Git truncates longer subjects in many display contexts. Keep it tight and descriptive.

**Capitalize the first word.** It reads like an email subject.

**Use the imperative mood.** "Add feature" not "Added feature" or "Adding feature." Git itself uses imperative mood for automatic messages: "Merge branch 'develop'", "Revert 'Add feature'".

**No period at the end.** The subject line is a title, not a sentence.

### Examples of Good vs Bad Messages

```bash
# Bad — what, not why; too vague
git commit -m "fix bug"
git commit -m "changes"
git commit -m "update"
git commit -m "WIP"

# Bad — too long for a subject line
git commit -m "Fix the authentication issue where users with special characters in their username could not log in to the system"

# Good — clear, imperative, fits in 50 chars
git commit -m "Fix login failure for usernames with special characters"

# Good — describes the change accurately
git commit -m "Add rate limiting to the authentication endpoint"

# Good — references context
git commit -m "Remove deprecated getUserById method"

# Good — initial commit
git commit -m "Initial commit"
```

### Commit Message with Body

For significant changes, open your editor to write a full message:

```bash
git commit
```

This opens your configured editor. Write:

```
Add password strength validation on registration

Previously, users could register with any password length, including
empty passwords. This caused security vulnerabilities that allowed
brute-force attacks against weak accounts.

Changes:
- Add PasswordValidator class with configurable rules
- Minimum 8 characters, at least one number and one special character
- Add unit tests covering all validation rules
- Update registration form to show strength indicator

Closes #234
```

---

## Anatomy of a Commit

After your first commit, you can inspect what Git actually created:

```bash
# Show the commit
git show HEAD
```

```
commit 7f3a2c1d8e9b3f5a6c4d2e1b0a9f8e7d6c5b4a3
Author: Jane Smith <jane@example.com>
Date:   Mon Mar 20 14:30:00 2026 +0000

    Initial commit

diff --git a/.gitignore b/.gitignore
new file mode 100644
...
```

Every commit contains:

| Field      | Description                                              |
| ---------- | -------------------------------------------------------- |
| SHA-1 hash | Unique identifier (40 hex chars)                         |
| Author     | Name and email of who wrote the change                   |
| Date       | When the commit was created                              |
| Message    | Explanation of what changed and why                      |
| Parent(s)  | The commit(s) this builds on (none for the first commit) |
| Tree       | A pointer to the snapshot of all files at this moment    |

```bash
# See the commit object directly
git cat-file -p HEAD
# tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
# author Jane Smith <jane@example.com> 1710000000 +0000
# committer Jane Smith <jane@example.com> 1710000000 +0000
#
# Initial commit
```

---

## Common Variations

### Commit with a Multi-Line Message Inline

```bash
git commit -m "Add user authentication

Implements JWT-based authentication with refresh tokens.
Tokens expire after 1 hour. Refresh tokens valid for 7 days."
```

### Stage All Tracked Files and Commit in One Command

```bash
git commit -a -m "Fix typo in README"
```

`-a` automatically stages all modifications to tracked files. It does not stage untracked (new) files. Use `git add` for new files.

### Amend the Most Recent Commit

If you made a typo in the message or forgot to include a file:

```bash
# Fix the message
git commit --amend -m "Corrected commit message"

# Add a forgotten file to the last commit
git add forgotten-file.js
git commit --amend --no-edit

# Fix both message and content
git add forgotten-file.js
git commit --amend -m "Add login feature with tests"
```

`--amend` rewrites the last commit. Only amend commits that have not been pushed to a shared remote — amending pushed commits rewrites history and causes problems for collaborators.

---

## Verifying Your Commit

After committing, confirm everything looks correct:

```bash
# See the most recent commit
git log -1

# See commit with diff
git show

# See all commits (short form)
git log --oneline

# See the working tree is clean
git status
# On branch main
# nothing to commit, working tree clean
```

"Nothing to commit, working tree clean" confirms that the working directory matches the last commit exactly. There are no staged changes and no unstaged modifications.

---

## The First Commit in an Existing Repository

When you clone an existing repository, the first commit already exists — it is the project's origin point. But as you make your first contribution, the same principles apply. The only difference is that your commits will have a parent (the commit you cloned from).

```bash
# After cloning and making changes
git add src/new-feature.js
git commit -m "Add user search feature"

# Your commit now appears at the top of the log
git log --oneline
# a1b2c3d Add user search feature
# 3d2e1f2 Previous commit from the team
# 7f3a2c1 Initial commit
```

---

## Pushing Your First Commit

After committing locally, push to the remote:

```bash
# If you initialized locally and added a remote
git push -u origin main

# If you cloned (remote is already configured)
git push
```

The `-u` flag on the first push sets up tracking so future `git push` commands do not require specifying the remote and branch.

---

## Summary

A commit is a permanent, immutable snapshot of your project recorded in Git's database with a unique SHA-1 hash, an author, a timestamp, and a message. The workflow is always: make changes in the working directory, stage them with `git add`, review with `git diff --staged`, and commit with `git commit -m`. Good commit messages use the imperative mood, keep subjects under 50 characters, and explain why changes were made. Every subsequent Git operation — branching, merging, rebasing, reverting — operates on commits as its fundamental unit.

---

## Related Topics

- TheThreeStates.md — Working directory, staging area, repository
- GitAddAndStaging.md — All options for staging files and hunks
- GitStatusAndGitDiff.md — Reviewing changes before committing
- GitLogAndHistory.md — Browsing commit history
- AmendingCommits.md — Fixing the most recent commit
- WritingGoodCommitMessages.md — Commit message conventions in depth
- ConventionalCommits.md — The Conventional Commits specification
