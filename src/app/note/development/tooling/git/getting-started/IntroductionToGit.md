# Introduction to Git

## What is Git

Git is a distributed version control system designed to track changes in source code and any other set of files over time. It was created by Linus Torvalds in 2005 to manage the development of the Linux kernel, after the team's previous version control tool became unavailable. What started as a personal project for one of the largest open-source codebases in existence has since become the universal standard for version control in the software industry.

At its core, Git does three things. It records the history of every change ever made to a project. It allows multiple people to work on the same project simultaneously without overwriting each other's work. And it makes it possible to return to any previous state of a project at any point in time.

---

## Why Version Control Matters

Before version control systems existed, teams managed code changes manually. Developers would copy folders, append dates to filenames, email archives back and forth, and pray that nobody overwrote someone else's changes. This approach failed at any reasonable scale.

Version control solves the following problems permanently:

**History and accountability.** Every change is recorded with who made it, when, and why. You can see the exact line of code that introduced a bug and trace it back to the commit, the developer, and the explanation they wrote.

**Parallel development.** Multiple developers work on separate branches simultaneously. Their work stays isolated until it is deliberately merged, preventing one person's incomplete feature from breaking another person's completed work.

**Reversibility.** Any change can be undone. Whether it is a single line edited by mistake or an entire feature that turned out to be the wrong approach, Git makes reverting straightforward and safe.

**Collaboration at scale.** Thousands of contributors work on major open-source projects simultaneously. Git's distributed architecture makes this possible without a central bottleneck.

**Experimentation without risk.** Want to try a completely different approach to a problem? Create a branch, experiment freely, and either merge it if it works or delete it if it does not, with zero impact on the main codebase.

---

## A Brief History of Version Control

Understanding where Git came from helps understand why it is designed the way it is.

**Generation 1 — Local VCS.** The first version control tools (RCS, SCCS) worked on a single machine. They tracked file changes locally but offered no collaboration capabilities.

**Generation 2 — Centralized VCS.** Systems like CVS and Subversion (SVN) introduced a central server that stored the repository. All developers checked out files from and committed to this single server. This enabled collaboration but created a single point of failure — if the server went down, nobody could commit. If it was lost without a backup, the entire project history was gone.

**Generation 3 — Distributed VCS.** Git, Mercurial, and Bazaar gave every developer a complete copy of the entire repository, including its full history, on their local machine. There is no single point of failure. You can commit, branch, and view history entirely offline. Collaboration happens by synchronizing changes between repositories rather than through a central authority.

Git's distributed model is not just a technical detail. It fundamentally changes how development workflows are structured, how open-source contribution works, and how resilient a team's version control infrastructure is.

---

## Git vs Other Version Control Systems

### Git vs SVN

SVN is centralized — it requires a network connection to commit and every operation that touches history talks to the server. Git is distributed — commits happen locally and syncing with a remote is a separate explicit step.

SVN branches are expensive copies of the entire repository tree. Git branches are lightweight pointers to commits and are practically free to create and switch between.

SVN history is linear. Git history is a directed acyclic graph (DAG) that accurately represents the real flow of parallel development and merging.

### Git vs Mercurial

Mercurial and Git are both distributed and conceptually similar. Git has become the dominant choice in practice, primarily due to GitHub's growth and the breadth of tooling and integrations built around Git.

### Git vs Perforce

Perforce is widely used in game development and large enterprises for its handling of very large binary files and its fine-grained locking capabilities. Git is better suited to text-based source code. For very large repositories with massive binary assets, Git LFS or Perforce may be more appropriate than standard Git.

---

## What Git Is Not

Git is not a backup system. It tracks changes to files inside a repository but is not designed to replace a proper backup strategy.

Git is not a deployment tool. It can be part of a CI/CD pipeline, but deployment to servers involves more than pushing to a repository.

Git is not a project management tool. GitHub, GitLab, and Bitbucket provide issue tracking, project boards, and wikis on top of Git, but those features are additions, not part of Git itself.

Git is not a cloud service. Git is software that runs locally. GitHub, GitLab, Bitbucket, and Azure DevOps are cloud services that host Git repositories. They are distinct from Git itself.

---

## How Git Differs from What You Might Expect

If you have used other version control systems or file-sharing tools, Git may behave differently than you expect in a few important ways.

**Git stores snapshots, not diffs.** Most VCS tools store a base version and then a series of changes (diffs) on top of it. Git stores a snapshot of the entire project at each commit. If a file has not changed between two commits, Git stores a link to the previously stored snapshot of that file rather than storing it again. This makes branching, switching, and history traversal extremely fast.

**Nearly every operation is local.** Viewing history, comparing versions, creating branches, committing — none of these require a network connection. You do your work locally and synchronize with remote repositories when you choose to.

**Git has integrity built in.** Everything in Git is checksummed using a SHA-1 hash before it is stored, and is then referred to by that hash. It is impossible to change a file, commit, or any stored data without Git knowing about it. This makes corruption detectable and tampering with history transparent.

**The staging area is a first-class concept.** Unlike many VCS tools where you commit all changed files at once, Git has an intermediate staging area (the index) where you explicitly select which changes to include in the next commit. This gives you precise control over what each commit contains.

---

## The Git Ecosystem

Git itself is a command-line tool. Around it has grown a rich ecosystem:

**Hosting platforms.** GitHub, GitLab, Bitbucket, and Azure DevOps provide remote repository hosting, pull request workflows, CI/CD integration, issue tracking, and team collaboration features.

**GUI clients.** GitKraken, SourceTree, GitHub Desktop, Fork, and Tower provide visual interfaces for developers who prefer not to use the command line.

**IDE integration.** VS Code, IntelliJ IDEA, Eclipse, and virtually every modern IDE have built-in Git support.

**CI/CD systems.** Jenkins, GitHub Actions, GitLab CI, CircleCI, and Travis CI integrate tightly with Git to trigger automated builds and deployments on commit.

**Code review tools.** Pull requests on GitHub/GitLab, Gerrit, and Crucible enable structured peer review before code is merged.

---

## Key Terminology

These terms appear throughout Git documentation and the rest of this guide. Having clear definitions from the start avoids confusion.

**Repository (repo).** The directory where Git stores all versions of your project and its complete history. It contains a hidden `.git` folder with all of Git's internal data.

**Commit.** A snapshot of the project at a specific point in time. Each commit has a unique SHA-1 hash, a message describing the change, a reference to its parent commit(s), and the author and timestamp.

**Branch.** A lightweight movable pointer to a specific commit. The default branch is usually called `main` or `master`. Branches allow parallel lines of development.

**Merge.** The operation of combining changes from one branch into another.

**Remote.** A version of the repository hosted on another machine or server. The most common remote is named `origin`.

**Clone.** A local copy of a remote repository, including its full history.

**Push.** Sending local commits to a remote repository.

**Pull.** Fetching changes from a remote repository and merging them into the current branch.

**HEAD.** A pointer to the current commit you are working from. It usually points to the tip of the current branch.

**Working directory.** The files you see and edit in your project folder.

**Staging area (index).** The intermediate area where you place changes before committing them.

---

## Summary

Git is the distributed version control system that powers modern software development. Its design — distributed architecture, snapshot-based storage, local-first operations, and cryptographic integrity — makes it fast, reliable, and flexible enough to handle projects from a single developer's personal scripts to the Linux kernel with thousands of contributors. Every concept introduced in this guide builds on these foundations.

---

## Related Topics

- InstallingGit.md — Installing Git on Windows, macOS, and Linux
- InitialConfiguration.md — Configuring your name, email, and preferences
- HowGitWorksInternally.md — Snapshots, the object database, and how Git stores data
- TheThreeStates.md — Working directory, staging area, and repository
