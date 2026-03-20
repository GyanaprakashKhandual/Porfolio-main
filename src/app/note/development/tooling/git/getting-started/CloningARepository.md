# Cloning a Repository

## Overview

Cloning creates a complete local copy of a remote Git repository. Unlike downloading a zip file, a clone includes the entire project history — every commit, every branch, every tag — not just the current state of files. Cloning is how you get a copy of any existing project: an open-source library on GitHub, a colleague's repository, your company's codebase, or your own repository on another machine.

---

## git clone — The Basics

```bash
git clone <url>
```

This single command does everything:

- Creates a new directory named after the repository
- Initializes a `.git/` directory inside it
- Downloads all objects (commits, trees, blobs, tags) from the remote
- Checks out the default branch (usually `main`) into the working directory
- Configures `origin` as the name of the remote pointing to the URL you cloned from
- Sets up tracking so local `main` tracks `origin/main`

### Example

```bash
git clone https://github.com/facebook/react.git
# Cloning into 'react'...
# remote: Enumerating objects: 367842, done.
# remote: Counting objects: 100% (367842/367842), done.
# remote: Compressing objects: 100% (89124/89124), done.
# Receiving objects: 100% (367842/367842), 176.48 MiB | 14.22 MiB/s, done.
# Resolving deltas: 100% (249801/249801), done.
```

After this completes, you have a `react/` directory containing the full React codebase and its complete history.

---

## Clone URL Formats

Git supports several URL formats for cloning. The right choice depends on whether you need read-only or read-write access and your authentication setup.

### HTTPS

```bash
git clone https://github.com/username/repository.git
```

HTTPS works everywhere without any SSH setup. For public repositories, no authentication is required to clone. For pushing, you authenticate with a username and personal access token (PAT). HTTPS is the easiest to get started with.

### SSH (Recommended for Regular Development)

```bash
git clone git@github.com:username/repository.git
```

SSH uses your SSH key pair for authentication — no passwords or tokens to type. You set up your SSH key once and all subsequent operations authenticate automatically. Requires SSH key setup (see SSHKeysAndAuthentication.md).

### GitHub CLI

```bash
gh repo clone username/repository
```

The GitHub CLI (`gh`) handles authentication automatically. Under the hood it uses your preferred protocol (HTTPS or SSH based on your `gh` configuration).

### Git Protocol

```bash
git clone git://github.com/username/repository.git
```

The bare `git://` protocol is unauthenticated and read-only. Mostly used for publicly accessible internal servers. Not supported by GitHub.

### Local Path

```bash
# Clone from a local directory
git clone /path/to/local/repository

# Clone from a bare repository on a file server
git clone /mnt/fileserver/project.git
```

### File Protocol

```bash
git clone file:///path/to/local/repository
```

Using `file://` forces Git to use network transfer mechanisms even locally. Slightly slower than a plain path clone but produces a cleaner result without hardlinks.

---

## Cloning into a Specific Directory

By default, `git clone <url>` creates a directory named after the repository. Specify a different name as the second argument:

```bash
# Clone into 'my-local-name' instead of 'repository'
git clone https://github.com/username/repository.git my-local-name

# Clone into the current directory (must be empty)
git clone https://github.com/username/repository.git .
```

---

## Cloning a Specific Branch

By default, Git clones the repository's default branch (usually `main`). To start on a different branch:

```bash
git clone --branch develop https://github.com/username/repository.git

# Short form
git clone -b develop https://github.com/username/repository.git
```

Note: This checks out the specified branch, but all other branches are still available as remote tracking branches and can be checked out locally at any time.

---

## Shallow Clone — Limiting History Depth

A shallow clone downloads only a limited number of recent commits rather than the full history. This is much faster and uses far less disk space for large repositories.

```bash
# Clone with only the last 1 commit (no history)
git clone --depth 1 https://github.com/username/repository.git

# Clone with the last 10 commits
git clone --depth 10 https://github.com/username/repository.git
```

### When to Use Shallow Clones

Shallow clones are ideal for:

- CI/CD pipelines where full history is not needed
- Quickly trying out a project
- Large repositories where download time matters

Shallow clones have limitations:

- `git log` shows limited history
- `git blame` is incomplete beyond the clone depth
- Some Git operations (bisect, merging old branches) may not work correctly
- You cannot push from a shallow clone to the original repository

### Converting a Shallow Clone to Full

```bash
git fetch --unshallow
```

---

## Sparse Checkout on Clone

If you only need a subdirectory of a large repository, use sparse checkout during clone to avoid downloading files you do not need:

```bash
git clone --filter=blob:none --sparse https://github.com/username/large-repo.git
cd large-repo
git sparse-checkout set src/module-i-need
```

This is called a **partial clone** and is discussed in full in PartialCloneAndShallowClone.md.

---

## What Happens During git clone

Understanding what `git clone` does step by step helps when things go wrong:

1. **Creates the target directory** with the repository name (or your specified name)

2. **Initializes a `.git/` directory** inside it (same as `git init`)

3. **Configures the remote** — writes an `[remote "origin"]` entry in `.git/config` pointing to the URL you cloned from

4. **Downloads all objects** from the remote — all commits, trees, blobs, and tags are transferred and stored in `.git/objects/`

5. **Downloads all references** — all remote branches and tags are downloaded as remote tracking references in `refs/remotes/origin/` and `refs/tags/`

6. **Checks out the default branch** — creates `refs/heads/main` pointing to the same commit as `origin/main`, and populates the working directory

7. **Sets up tracking** — configures the local `main` branch to track `origin/main`, so `git pull` and `git push` know where to go

After cloning, `git remote -v` always shows `origin` pointing to the URL you cloned from.

---

## What You Get After Cloning

```bash
git clone https://github.com/username/repository.git
cd repository

# See what branch you are on
git branch
# * main

# See all branches (local and remote tracking)
git branch -a
# * main
#   remotes/origin/HEAD -> origin/main
#   remotes/origin/main
#   remotes/origin/develop
#   remotes/origin/feature/login

# See the configured remote
git remote -v
# origin  https://github.com/username/repository.git (fetch)
# origin  https://github.com/username/repository.git (push)

# See tracking configuration
git branch -vv
# * main  3d2e1f [origin/main] Latest commit message
```

Remote tracking branches (`remotes/origin/develop`, etc.) are read-only snapshots of the remote branches at the time you last synchronized. To work on one of them locally:

```bash
git checkout develop
# Switched to a new branch 'develop'
# Branch 'develop' set up to track remote branch 'develop' from 'origin'.
```

Git creates a local `develop` branch that tracks `origin/develop` automatically.

---

## Cloning a Private Repository

### Via HTTPS with PAT

```bash
git clone https://github.com/username/private-repo.git
# Username: your-github-username
# Password: ghp_xxxxxxxxxxxxxxxxxxxx  ← your Personal Access Token, not your GitHub password
```

GitHub removed password authentication for Git operations in 2021. Use a PAT instead. Generate one at GitHub → Settings → Developer settings → Personal access tokens.

### Via SSH

```bash
git clone git@github.com:username/private-repo.git
```

SSH authentication uses your key pair. No prompts after setup. See SSHKeysAndAuthentication.md.

### Embedding Credentials in URL (Not Recommended)

```bash
# Avoid this — credentials are visible in shell history and config files
git clone https://username:token@github.com/username/private-repo.git
```

Use a credential helper instead. See CredentialHelpers.md.

---

## Cloning from Common Platforms

### GitHub

```bash
# HTTPS
git clone https://github.com/username/repo.git

# SSH
git clone git@github.com:username/repo.git

# GitHub CLI
gh repo clone username/repo
```

### GitLab

```bash
# HTTPS
git clone https://gitlab.com/username/repo.git

# SSH
git clone git@gitlab.com:username/repo.git
```

### Bitbucket

```bash
# HTTPS
git clone https://bitbucket.org/username/repo.git

# SSH
git clone git@bitbucket.org:username/repo.git
```

### Azure DevOps

```bash
git clone https://organization@dev.azure.com/organization/project/_git/repository
```

---

## Mirror Clone

A mirror clone downloads everything — all branches, all tags, all refs — and is used for creating a full backup or for migrating a repository between hosting services.

```bash
git clone --mirror https://github.com/username/repository.git
```

A mirrored clone is a bare repository (no working directory). It is not for regular development — it is for backup and migration.

### Migrating a Repository Using Mirror Clone

```bash
# 1. Mirror clone the source
git clone --mirror https://github.com/old-host/repository.git

# 2. Push everything to the new host
cd repository.git
git remote set-url origin https://github.com/new-host/repository.git
git push --mirror
```

---

## Troubleshooting Common Clone Issues

### SSL Certificate Errors

```bash
# Temporarily skip SSL verification (use cautiously)
git clone -c http.sslVerify=false https://github.com/username/repo.git

# Better: update your CA certificates
sudo apt update && sudo apt install ca-certificates
```

### Clone Hangs or Times Out

For very large repositories, increase buffer sizes:

```bash
git clone --config http.postBuffer=524288000 https://github.com/username/large-repo.git
```

Or use a shallow clone to speed it up:

```bash
git clone --depth 1 https://github.com/username/large-repo.git
```

### Repository Not Found

Verify you have access to the repository. For private repositories, check that your SSH key is added to your account or your PAT has the correct scopes.

```bash
# Test SSH access to GitHub
ssh -T git@github.com
# Hi username! You've successfully authenticated...
```

### Permission Denied (publickey)

Your SSH key is not configured. See SSHKeysAndAuthentication.md to set up SSH authentication.

---

## Summary

`git clone` creates a complete local copy of any Git repository — all history, all branches, all tags — and configures `origin` as a remote pointing back to the source. Use HTTPS for simplicity or SSH for day-to-day development convenience. Shallow clones (`--depth 1`) are ideal for CI/CD pipelines. Sparse checkout and partial clones handle large monorepos efficiently. After cloning, all remote branches are available as remote tracking references and can be checked out locally at any time.

---

## Related Topics

- InitializingARepository.md — Starting a repository from scratch
- YourFirstCommit.md — Making your first changes after cloning
- GitRemote.md — Managing remote connections
- SSHKeysAndAuthentication.md — SSH key setup for authentication
- PartialCloneAndShallowClone.md — Efficient cloning for large repositories
- GitPush.md — Pushing local commits back to the remote
