# Installing Git

## Overview

Git is available on every major operating system. The installation method varies by platform, but the resulting tool and its behavior are essentially identical across Windows, macOS, and Linux. This document covers every installation method for each platform, how to verify the installation, and how to keep Git updated.

---

## Installing Git on Windows

### Method 1 — Official Git for Windows Installer (Recommended)

Git for Windows is the official distribution. It includes Git, Git Bash (a Unix-style terminal emulator), and Git GUI.

1. Download the installer from [https://git-scm.com/download/win](https://git-scm.com/download/win). The download starts automatically for the correct Windows version.

2. Run the installer. The setup wizard presents several configuration choices. The recommended selections for most developers are:

**Choosing the default editor:** Select Visual Studio Code, Notepad++, or whichever editor you use daily. The default (Vim) is powerful but has a steep learning curve for those unfamiliar with it.

**Adjusting your PATH environment:** Select "Git from the command line and also from 3rd-party software". This adds Git to the system PATH so it works in Command Prompt, PowerShell, and any terminal — not only Git Bash.

**Choosing HTTPS transport backend:** Select "Use the OpenSSL library" unless your organization specifically requires the native Windows Secure Channel library.

**Configuring line ending conversions:** Select "Checkout Windows-style, commit Unix-style line endings" (`core.autocrlf=true`). This ensures files on your machine use Windows line endings but commits use Unix line endings, which is the most compatible choice for cross-platform collaboration.

**Configuring the terminal emulator:** Select "Use MinTTY" for a modern terminal. The Windows default console has limitations with color output and Unicode.

**Configuring the default behavior of git pull:** Select "Default (fast-forward or merge)" for most cases.

3. Complete the installation. Open Git Bash and verify:

```bash
git --version
# git version 2.44.0.windows.1
```

### Method 2 — Winget (Windows Package Manager)

```powershell
winget install --id Git.Git -e --source winget
```

### Method 3 — Chocolatey

```powershell
choco install git
```

### Method 4 — Scoop

```powershell
scoop install git
```

---

## Installing Git on macOS

### Method 1 — Xcode Command Line Tools (Simplest)

macOS ships with a stub `git` command. Running it triggers a prompt to install the Xcode Command Line Tools, which include Git.

```bash
git --version
```

If Git is not installed, macOS displays a dialog offering to install the Command Line Tools. Click Install. This installs Apple's version of Git, which is typically slightly behind the latest release.

### Method 2 — Homebrew (Recommended for Developers)

Homebrew installs the latest version of Git from the official source and makes updates easy.

1. Install Homebrew if not already installed:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Install Git:

```bash
brew install git
```

3. Verify the installation:

```bash
git --version
# git version 2.44.0
```

4. Ensure Homebrew's Git takes precedence over the system Git by checking your PATH. Homebrew installs to `/opt/homebrew/bin` on Apple Silicon or `/usr/local/bin` on Intel. These should appear before `/usr/bin` in your PATH.

```bash
which git
# /opt/homebrew/bin/git   ← correct (Homebrew)
# /usr/bin/git            ← this is Apple's older version
```

### Method 3 — MacPorts

```bash
sudo port install git
```

### Method 4 — Official macOS Installer

Download the installer package from [https://git-scm.com/download/mac](https://git-scm.com/download/mac).

### Updating Git on macOS

```bash
brew upgrade git
```

---

## Installing Git on Linux

### Debian and Ubuntu

```bash
sudo apt update
sudo apt install git
```

For the latest version from the Git maintainers' PPA:

```bash
sudo add-apt-repository ppa:git-core/ppa
sudo apt update
sudo apt install git
```

### Fedora

```bash
sudo dnf install git
```

### CentOS / RHEL 8+

```bash
sudo dnf install git
```

### CentOS / RHEL 7 (older)

```bash
sudo yum install git
```

For a newer version on RHEL 7, use the IUS repository:

```bash
sudo yum install https://repo.ius.io/ius-release-el7.rpm
sudo yum install git236
```

### Arch Linux

```bash
sudo pacman -S git
```

### openSUSE

```bash
sudo zypper install git
```

### Alpine Linux

```bash
apk add git
```

### Building from Source (Any Linux)

Building from source gives you the absolute latest version:

```bash
# Install build dependencies (Debian/Ubuntu)
sudo apt install make libssl-dev libghc-zlib-dev libcurl4-gnutls-dev \
  libexpat1-dev gettext unzip

# Download and build
wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.44.0.tar.gz
tar -xzf git-2.44.0.tar.gz
cd git-2.44.0
make configure
./configure --prefix=/usr
make all
sudo make install
```

---

## Verifying the Installation

After installing Git on any platform, confirm it is working:

```bash
# Check the version
git --version

# Check the installation path
which git          # macOS / Linux
where git          # Windows Command Prompt
Get-Command git    # Windows PowerShell
```

A correct output looks like:

```
git version 2.44.0
```

---

## Installing Git in CI/CD Environments

### GitHub Actions

GitHub-hosted runners (ubuntu-latest, macos-latest, windows-latest) include Git pre-installed. No installation step is needed.

```yaml
- name: Check Git version
  run: git --version
```

If you need a specific version:

```yaml
- name: Install latest Git
  run: |
    sudo add-apt-repository ppa:git-core/ppa -y
    sudo apt update
    sudo apt install git -y
```

### Docker

```dockerfile
# Debian/Ubuntu base
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y git

# Alpine base (minimal)
FROM alpine:3.19
RUN apk add --no-cache git

# Verify
RUN git --version
```

---

## GUI Git Clients

If you prefer a graphical interface alongside or instead of the command line, these are the most widely used Git GUI clients:

| Client              | Platform        | Free     | Notes                      |
| ------------------- | --------------- | -------- | -------------------------- |
| GitHub Desktop      | Windows, macOS  | Yes      | Simplest, GitHub-focused   |
| GitKraken           | All             | Freemium | Most feature-rich GUI      |
| SourceTree          | Windows, macOS  | Yes      | Atlassian product          |
| Fork                | Windows, macOS  | Paid     | Fast and well-designed     |
| Tower               | Windows, macOS  | Paid     | Professional-grade         |
| GitLens (VS Code)   | All (extension) | Freemium | Best IDE integration       |
| Git Graph (VS Code) | All (extension) | Yes      | Commit graph visualization |

---

## IDE Git Integration

Every major IDE has built-in Git support that works with your installed Git:

**VS Code** — Built-in Source Control panel. Accepts the Git installed in your system PATH. Extensions like GitLens add advanced capabilities.

**IntelliJ IDEA / WebStorm / PyCharm** — Built-in VCS integration under `File → Settings → Version Control → Git`. Specify the Git executable path if needed.

**Eclipse** — EGit plugin provides Git integration.

**Xcode** — Source Control menu for macOS development.

---

## Checking Your Git Version and Updating

```bash
# Check current version
git --version

# Update on macOS (Homebrew)
brew upgrade git

# Update on Ubuntu/Debian (after adding PPA)
sudo apt update && sudo apt upgrade git

# Update on Windows (winget)
winget upgrade Git.Git

# Update on Windows (Git for Windows — run from Git Bash)
git update-git-for-windows
```

### Why Version Matters

Git adds new features and commands with each release. Features covered in this documentation such as `git restore`, `git switch`, `git worktree`, and Partial Clone require Git 2.23 or later. Some features like `git sparse-checkout` in its mature form require Git 2.37+. Running an old version may mean certain commands do not exist or behave differently.

Check the [Git release notes](https://raw.githubusercontent.com/git/git/master/Documentation/RelNotes/) for a history of what changed in each version.

---

## Summary

Git installs in minutes on any platform. Use the official installer on Windows, Homebrew on macOS, and the system package manager on Linux. After installation, verify with `git --version` and proceed to `InitialConfiguration.md` to set your identity before making your first commit.

---

## Related Topics

- InitialConfiguration.md — Setting your name, email, editor, and other preferences
- SSHKeysAndAuthentication.md — Setting up SSH keys for GitHub and other remotes
- GitConfigDeepDive.md — Full reference for git config options
