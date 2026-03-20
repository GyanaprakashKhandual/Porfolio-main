# Initial Configuration

## Overview

Before you make your first commit, Git needs to know who you are. Every commit you create records your name and email address as part of the commit metadata. This information becomes permanent history — it appears in `git log`, in GitHub's contributor graphs, in code review tools, and in every repository you push to. Setting it correctly from the start matters.

Beyond identity, Git's initial configuration controls your default editor, default branch name, line ending behavior, credential storage, and dozens of other behaviors. This document covers the essential configuration you need before starting work and the most useful optional settings.

---

## The git config Command

Git configuration is managed entirely through the `git config` command. Settings are stored in plain text files and can be read and written at three levels of scope.

```bash
git config [--global | --local | --system] <key> <value>
```

### Configuration Levels

**System level** (`--system`) — Applies to every user on the machine. Stored in `/etc/gitconfig` on Linux/macOS or `C:\Program Files\Git\etc\gitconfig` on Windows. Requires administrator privileges to write. Rarely used directly.

**Global level** (`--global`) — Applies to all repositories for the current user. Stored in `~/.gitconfig` (or `~/.config/git/config`). This is where you set your identity and personal preferences.

**Local level** (`--local`) — Applies only to the specific repository you are in. Stored in `.git/config` inside that repository. Overrides global and system settings for that repository.

**Priority order:** Local overrides Global, which overrides System. If the same key is set at multiple levels, the most specific (local) wins.

```bash
# Read a specific config value
git config user.name

# Read a value at a specific level
git config --global user.name

# List all configuration values and where they come from
git config --list --show-origin
```

---

## Setting Your Identity

This is the minimum required configuration before making any commit.

```bash
# Set your full name
git config --global user.name "Your Full Name"

# Set your email address
git config --global user.email "you@example.com"
```

**Use the same email address you use on GitHub (or your Git hosting platform of choice).** GitHub links commits to your profile by matching the commit email against your verified email addresses. If they do not match, your commits will appear as unlinked contributions with a generic avatar.

### Verifying Your Identity

```bash
git config --global user.name
# Your Full Name

git config --global user.email
# you@example.com
```

### Multiple Identities

If you work on both personal and work projects, you can set different identities per repository by overriding the global settings locally:

```bash
# Inside a work repository
git config --local user.name "Your Name"
git config --local user.email "you@company.com"
```

For a more automated approach using conditional configuration includes, see MultipleGitIdentities.md.

---

## Setting the Default Editor

Git opens a text editor when you run commands that require a message — most commonly `git commit` (without `-m`), `git rebase -i`, and `git merge --edit`. By default this is Vim, which surprises developers unfamiliar with it.

```bash
# Visual Studio Code
git config --global core.editor "code --wait"

# Neovim
git config --global core.editor "nvim"

# Vim
git config --global core.editor "vim"

# Nano (simplest terminal editor)
git config --global core.editor "nano"

# Notepad++ (Windows)
git config --global core.editor "'C:/Program Files/Notepad++/notepad++.exe' -multiInst -notabbar -nosession -noPlugin"

# Sublime Text
git config --global core.editor "subl -n -w"

# Emacs
git config --global core.editor "emacs"
```

The `--wait` flag for VS Code is critical. Without it, Git thinks the editor has closed as soon as VS Code opens, and it proceeds without waiting for you to type a message.

---

## Setting the Default Branch Name

Historically, Git's default branch was named `master`. The current convention, adopted by GitHub, GitLab, and most teams, is `main`. Configure Git to use `main` for all new repositories:

```bash
git config --global init.defaultBranch main
```

This setting affects `git init`. Existing repositories are not changed. To rename the branch in an existing repository:

```bash
git branch -m master main
```

---

## Line Ending Configuration

Windows uses CRLF (`\r\n`) line endings. Linux and macOS use LF (`\n`). When developers on different platforms collaborate without line ending normalization, diffs become cluttered with irrelevant whitespace changes and merge conflicts become harder to read.

### Recommended Settings

**On Windows:**

```bash
git config --global core.autocrlf true
```

This automatically converts LF to CRLF when checking out files (so Windows tools work correctly) and converts CRLF back to LF when committing (so the repository stays consistent).

**On macOS and Linux:**

```bash
git config --global core.autocrlf input
```

This converts CRLF to LF on commit if any CRLF endings sneak in, but does not convert on checkout.

### Using .gitattributes (Better for Teams)

For team projects, commit a `.gitattributes` file to the repository instead of relying on each developer's local setting. This makes line ending behavior explicit and enforced for everyone:

```
# .gitattributes
* text=auto

# Explicitly declare text files
*.js   text eol=lf
*.ts   text eol=lf
*.jsx  text eol=lf
*.tsx  text eol=lf
*.css  text eol=lf
*.html text eol=lf
*.json text eol=lf
*.md   text eol=lf
*.yml  text eol=lf
*.yaml text eol=lf
*.sh   text eol=lf

# Declare binary files — never convert
*.png  binary
*.jpg  binary
*.gif  binary
*.ico  binary
*.pdf  binary
*.zip  binary
*.woff binary
*.woff2 binary
```

---

## Setting Up a Global .gitignore

Some files should never be committed in any repository — editor-specific files, OS-generated files, and personal tool configurations. Define a global gitignore file so you never accidentally commit them:

```bash
# Tell Git about your global gitignore file
git config --global core.excludesFile ~/.gitignore_global
```

Create `~/.gitignore_global`:

```
# macOS
.DS_Store
.AppleDouble
.LSOverride
._*

# Windows
Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/

# Linux
*~

# VS Code
.vscode/
*.code-workspace
.history/

# JetBrains IDEs
.idea/
*.iml
*.iws

# Vim
*.swp
*.swo
*.un~

# Emacs
*~
\#*\#

# Node.js
node_modules/
npm-debug.log
yarn-error.log

# Python
__pycache__/
*.py[cod]
*.pyo
.env
.venv/

# Logs
*.log
logs/
```

---

## Configuring Colors

Git's output is color-coded by default when a terminal supports it. Ensure color is enabled:

```bash
git config --global color.ui auto
```

Customize specific colors if desired:

```bash
git config --global color.branch.current "yellow reverse"
git config --global color.branch.local "yellow"
git config --global color.branch.remote "green"
git config --global color.status.added "green"
git config --global color.status.changed "yellow"
git config --global color.status.untracked "red"
```

---

## Configuring git pull Behavior

Since Git 2.27, running `git pull` in a repository where the local and remote histories have diverged warns about ambiguous behavior unless you specify a strategy. Set the default explicitly:

```bash
# Merge strategy (traditional behavior — creates a merge commit)
git config --global pull.rebase false

# Rebase strategy (cleaner history — replays your commits on top)
git config --global pull.rebase true

# Fast-forward only (fails if a merge or rebase would be needed)
git config --global pull.ff only
```

Most modern teams prefer `pull.rebase true` for a cleaner linear history. If you are new to Git, start with `pull.rebase false` (merge) to avoid surprises, and switch to rebase once you are comfortable.

---

## Setting Up Aliases

Aliases create shortcuts for commands you run frequently. Add them globally so they work in every repository:

```bash
# Short status
git config --global alias.st status

# Short log with graph
git config --global alias.lg "log --oneline --graph --decorate --all"

# Amend last commit without changing message
git config --global alias.amend "commit --amend --no-edit"

# List all aliases
git config --global alias.aliases "config --get-regexp alias"

# Undo last commit keeping changes staged
git config --global alias.undo "reset --soft HEAD~1"

# Show files changed in last commit
git config --global alias.last "log -1 HEAD --stat"

# List branches sorted by last commit date
git config --global alias.recent "branch --sort=-committerdate"
```

These aliases are covered in full in UsefulGitAliases.md.

---

## Viewing the Complete Configuration

```bash
# Show all active configuration
git config --list

# Show all configuration with the file it came from
git config --list --show-origin

# Show a specific value
git config user.email

# Open the global config file in your editor
git config --global --edit
```

The global config file (`~/.gitconfig`) is a plain text file that you can also edit directly. After running the commands above, it looks something like this:

```ini
[user]
    name = Jane Smith
    email = jane@example.com

[core]
    editor = code --wait
    autocrlf = input
    excludesFile = /Users/jane/.gitignore_global

[init]
    defaultBranch = main

[pull]
    rebase = true

[color]
    ui = auto

[alias]
    st = status
    lg = log --oneline --graph --decorate --all
    amend = commit --amend --no-edit
    undo = reset --soft HEAD~1
```

---

## Essential First-Time Setup Checklist

Run these commands on any new machine before starting work:

```bash
# 1. Identity
git config --global user.name "Your Full Name"
git config --global user.email "you@example.com"

# 2. Default editor
git config --global core.editor "code --wait"

# 3. Default branch name
git config --global init.defaultBranch main

# 4. Line endings (macOS/Linux)
git config --global core.autocrlf input

# 4. Line endings (Windows)
git config --global core.autocrlf true

# 5. Pull behavior
git config --global pull.rebase true

# 6. Global gitignore
git config --global core.excludesFile ~/.gitignore_global

# 7. Verify everything
git config --list --show-origin
```

---

## Summary

Initial configuration is a one-time setup that applies to all repositories on your machine. Setting your name, email, default editor, default branch name, and line ending behavior before your first commit ensures clean history, correct attribution on GitHub, and a comfortable editing experience. Store these in the global config file at `~/.gitconfig` and override per repository only when you genuinely need different settings.

---

## Related Topics

- InstallingGit.md — Installing Git before configuring it
- SSHKeysAndAuthentication.md — Setting up SSH keys for authentication
- MultipleGitIdentities.md — Managing different identities for work and personal repos
- UsefulGitAliases.md — Productivity-enhancing Git aliases
- GitConfigDeepDive.md — Complete reference for all git config options
- SigningCommitsWithGPG.md — Cryptographically signing commits
