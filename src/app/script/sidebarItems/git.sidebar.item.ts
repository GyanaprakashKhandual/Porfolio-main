export interface SidebarChild {
  id: string;
  label: string;
  children?: SidebarChild[];
}

export interface SidebarSection {
  id: string;
  label: string;
  children: SidebarChild[];
}

const gitSidebarItems: SidebarSection[] = [
  // -------------------------------------------------------------------------
  // SECTION 1 — Getting Started
  // -------------------------------------------------------------------------
  {
    id: "gt-1",
    label: "Getting Started",
    children: [
      { id: "gt-1-1", label: "Introduction to Git" },
      { id: "gt-1-2", label: "Installing Git" },
      { id: "gt-1-3", label: "Initial Configuration" },
      { id: "gt-1-4", label: "How Git Works Internally" },
      { id: "gt-1-5", label: "The Three States" },
      { id: "gt-1-6", label: "Initializing a Repository" },
      { id: "gt-1-7", label: "Cloning a Repository" },
      { id: "gt-1-8", label: "Your First Commit" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 2 — Core Git Concepts
  // -------------------------------------------------------------------------
  {
    id: "gt-2",
    label: "Core Git Concepts",
    children: [
      { id: "gt-2-1", label: "Working Directory and Staging Area" },
      { id: "gt-2-2", label: "Git Objects Blob Tree Commit" },
      { id: "gt-2-3", label: "The HEAD Pointer" },
      { id: "gt-2-4", label: "Commits in Depth" },
      { id: "gt-2-5", label: "The Git Object Database" },
      { id: "gt-2-6", label: "References and Ref Logs" },
      { id: "gt-2-7", label: "The Index File" },
      { id: "gt-2-8", label: "Packfiles and Garbage Collection" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 3 — Basic Git Commands
  // -------------------------------------------------------------------------
  {
    id: "gt-3",
    label: "Basic Git Commands",
    children: [
      { id: "gt-3-1", label: "git init and git clone" },
      { id: "gt-3-2", label: "git add and Staging" },
      { id: "gt-3-3", label: "git commit" },
      { id: "gt-3-4", label: "git status and git diff" },
      { id: "gt-3-5", label: "git log and History" },
      { id: "gt-3-6", label: "git show" },
      { id: "gt-3-7", label: "git rm and git mv" },
      { id: "gt-3-8", label: "gitignore" },
      { id: "gt-3-9", label: "git stash" },
      { id: "gt-3-10", label: "git tag" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 4 — Branching and Merging
  // -------------------------------------------------------------------------
  {
    id: "gt-4",
    label: "Branching and Merging",
    children: [
      { id: "gt-4-1", label: "Understanding Branches" },
      { id: "gt-4-2", label: "Creating and Switching Branches" },
      { id: "gt-4-3", label: "Merging Branches" },
      { id: "gt-4-4", label: "Fast Forward vs Three Way Merge" },
      { id: "gt-4-5", label: "Resolving Merge Conflicts" },
      { id: "gt-4-6", label: "Deleting Branches" },
      { id: "gt-4-7", label: "Remote Tracking Branches" },
      { id: "gt-4-8", label: "Branch Management Strategies" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 5 — Rebasing
  // -------------------------------------------------------------------------
  {
    id: "gt-5",
    label: "Rebasing",
    children: [
      { id: "gt-5-1", label: "What is Rebasing" },
      { id: "gt-5-2", label: "Basic Rebase" },
      { id: "gt-5-3", label: "Interactive Rebase" },
      { id: "gt-5-4", label: "Squashing Commits" },
      { id: "gt-5-5", label: "Reordering and Editing Commits" },
      { id: "gt-5-6", label: "Rebase vs Merge" },
      { id: "gt-5-7", label: "Rebase onto" },
      { id: "gt-5-8", label: "The Golden Rule of Rebasing" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 6 — Undoing Changes
  // -------------------------------------------------------------------------
  {
    id: "gt-6",
    label: "Undoing Changes",
    children: [
      { id: "gt-6-1", label: "git checkout and git restore" },
      { id: "gt-6-2", label: "git reset Soft Mixed Hard" },
      { id: "gt-6-3", label: "git revert" },
      { id: "gt-6-4", label: "git clean" },
      { id: "gt-6-5", label: "Amending Commits" },
      { id: "gt-6-6", label: "Recovering Lost Commits with Reflog" },
      { id: "gt-6-7", label: "git bisect" },
      { id: "gt-6-8", label: "git cherry-pick" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 7 — Remote Repositories
  // -------------------------------------------------------------------------
  {
    id: "gt-7",
    label: "Remote Repositories",
    children: [
      { id: "gt-7-1", label: "Understanding Remotes" },
      { id: "gt-7-2", label: "git remote" },
      { id: "gt-7-3", label: "git fetch" },
      { id: "gt-7-4", label: "git pull" },
      { id: "gt-7-5", label: "git push" },
      { id: "gt-7-6", label: "Tracking Branches" },
      { id: "gt-7-7", label: "Pushing Tags to Remote" },
      { id: "gt-7-8", label: "Deleting Remote Branches" },
      { id: "gt-7-9", label: "Working with Multiple Remotes" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 8 — Git Workflows
  // -------------------------------------------------------------------------
  {
    id: "gt-8",
    label: "Git Workflows",
    children: [
      { id: "gt-8-1", label: "Centralized Workflow" },
      { id: "gt-8-2", label: "Feature Branch Workflow" },
      { id: "gt-8-3", label: "Gitflow Workflow" },
      { id: "gt-8-4", label: "Forking Workflow" },
      { id: "gt-8-5", label: "Trunk Based Development" },
      { id: "gt-8-6", label: "GitHub Flow" },
      { id: "gt-8-7", label: "GitLab Flow" },
      { id: "gt-8-8", label: "Release Branching Strategy" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 9 — Advanced Git
  // -------------------------------------------------------------------------
  {
    id: "gt-9",
    label: "Advanced Git",
    children: [
      { id: "gt-9-1", label: "Git Hooks" },
      { id: "gt-9-2", label: "Git Attributes" },
      { id: "gt-9-3", label: "Submodules" },
      { id: "gt-9-4", label: "Git Subtree" },
      { id: "gt-9-5", label: "git worktree" },
      { id: "gt-9-6", label: "Sparse Checkout" },
      { id: "gt-9-7", label: "Partial Clone and Shallow Clone" },
      { id: "gt-9-8", label: "git filter-repo and Rewriting History" },
      { id: "gt-9-9", label: "Git Bundle" },
      { id: "gt-9-10", label: "Git Notes" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 10 — Git Internals
  // -------------------------------------------------------------------------
  {
    id: "gt-10",
    label: "Git Internals",
    children: [
      { id: "gt-10-1", label: "Plumbing vs Porcelain Commands" },
      { id: "gt-10-2", label: "How git hash-object Works" },
      { id: "gt-10-3", label: "Tree Objects and Commits Internals" },
      { id: "gt-10-4", label: "Git References heads tags remotes" },
      { id: "gt-10-5", label: "MERGE HEAD and CHERRY PICK HEAD" },
      { id: "gt-10-6", label: "Transfer Protocols HTTP and SSH" },
      { id: "gt-10-7", label: "The Refspec" },
      { id: "gt-10-8", label: "Maintenance and Data Recovery" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 11 — GitHub Fundamentals
  // -------------------------------------------------------------------------
  {
    id: "gt-11",
    label: "GitHub Fundamentals",
    children: [
      { id: "gt-11-1", label: "Introduction to GitHub" },
      { id: "gt-11-2", label: "Creating and Managing Repositories" },
      { id: "gt-11-3", label: "GitHub Profile and README" },
      { id: "gt-11-4", label: "Stars Watching and Forking" },
      { id: "gt-11-5", label: "GitHub Issues" },
      { id: "gt-11-6", label: "GitHub Discussions" },
      { id: "gt-11-7", label: "GitHub Wiki" },
      { id: "gt-11-8", label: "GitHub Gist" },
      { id: "gt-11-9", label: "GitHub Notifications and Subscriptions" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 12 — Pull Requests
  // -------------------------------------------------------------------------
  {
    id: "gt-12",
    label: "Pull Requests",
    children: [
      { id: "gt-12-1", label: "Understanding Pull Requests" },
      { id: "gt-12-2", label: "Creating a Pull Request" },
      { id: "gt-12-3", label: "PR Reviews and Approvals" },
      { id: "gt-12-4", label: "Draft Pull Requests" },
      { id: "gt-12-5", label: "PR Templates" },
      { id: "gt-12-6", label: "Linking Issues to PRs" },
      { id: "gt-12-7", label: "Merge Strategies Merge Squash Rebase" },
      { id: "gt-12-8", label: "Auto Merge" },
      { id: "gt-12-9", label: "PR Best Practices" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 13 — GitHub Actions
  // -------------------------------------------------------------------------
  {
    id: "gt-13",
    label: "GitHub Actions",
    children: [
      { id: "gt-13-1", label: "Introduction to GitHub Actions" },
      { id: "gt-13-2", label: "Workflow Syntax and Structure" },
      { id: "gt-13-3", label: "Events and Triggers" },
      { id: "gt-13-4", label: "Jobs and Steps" },
      { id: "gt-13-5", label: "Runners GitHub Hosted and Self Hosted" },
      { id: "gt-13-6", label: "Using Actions from Marketplace" },
      { id: "gt-13-7", label: "Environment Variables and Secrets" },
      { id: "gt-13-8", label: "Artifacts and Caching" },
      { id: "gt-13-9", label: "Matrix Builds" },
      { id: "gt-13-10", label: "Reusable Workflows" },
      { id: "gt-13-11", label: "Composite Actions" },
      { id: "gt-13-12", label: "Deployment Environments" },
      { id: "gt-13-13", label: "OIDC and Keyless Authentication" },
      { id: "gt-13-14", label: "Workflow Security and Permissions" },
      {
        id: "gt-13-15",
        label: "Advanced Actions Patterns",
        children: [
          { id: "gt-13-15-1", label: "Dynamic Matrix with fromJSON" },
          { id: "gt-13-15-2", label: "Workflow Dispatch with Inputs" },
          { id: "gt-13-15-3", label: "Concurrency and Cancellation" },
          { id: "gt-13-15-4", label: "Writing Custom JavaScript Actions" },
          { id: "gt-13-15-5", label: "Writing Custom Docker Actions" },
          { id: "gt-13-15-6", label: "Calling Workflows from Workflows" },
        ],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 14 — GitHub Security
  // -------------------------------------------------------------------------
  {
    id: "gt-14",
    label: "GitHub Security",
    children: [
      { id: "gt-14-1", label: "Branch Protection Rules" },
      { id: "gt-14-2", label: "Rulesets" },
      { id: "gt-14-3", label: "CODEOWNERS" },
      { id: "gt-14-4", label: "Dependabot Alerts and Updates" },
      { id: "gt-14-5", label: "Secret Scanning" },
      { id: "gt-14-6", label: "Code Scanning and CodeQL" },
      { id: "gt-14-7", label: "Security Advisories" },
      { id: "gt-14-8", label: "Supply Chain Security" },
      { id: "gt-14-9", label: "Sigstore and Artifact Attestation" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 15 — GitHub Collaboration
  // -------------------------------------------------------------------------
  {
    id: "gt-15",
    label: "GitHub Collaboration",
    children: [
      { id: "gt-15-1", label: "Organizations and Teams" },
      { id: "gt-15-2", label: "Repository Permissions and Roles" },
      { id: "gt-15-3", label: "GitHub Projects Boards and Roadmaps" },
      { id: "gt-15-4", label: "Issue Labels and Milestones" },
      { id: "gt-15-5", label: "Code Review Best Practices" },
      { id: "gt-15-6", label: "GitHub Sponsors" },
      { id: "gt-15-7", label: "Contributing to Open Source" },
      { id: "gt-15-8", label: "CONTRIBUTING and CODE OF CONDUCT Files" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 16 — GitHub Packages and Releases
  // -------------------------------------------------------------------------
  {
    id: "gt-16",
    label: "GitHub Packages and Releases",
    children: [
      { id: "gt-16-1", label: "GitHub Packages Overview" },
      { id: "gt-16-2", label: "Publishing npm Packages" },
      { id: "gt-16-3", label: "Publishing Docker Images" },
      { id: "gt-16-4", label: "GitHub Container Registry" },
      { id: "gt-16-5", label: "Creating Releases" },
      { id: "gt-16-6", label: "Automated Releases with Actions" },
      { id: "gt-16-7", label: "Semantic Versioning and Changelogs" },
      { id: "gt-16-8", label: "Release Drafter" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 17 — GitHub Pages and Codespaces
  // -------------------------------------------------------------------------
  {
    id: "gt-17",
    label: "GitHub Pages and Codespaces",
    children: [
      { id: "gt-17-1", label: "GitHub Pages Overview" },
      { id: "gt-17-2", label: "Deploying a Static Site" },
      { id: "gt-17-3", label: "Custom Domains and HTTPS" },
      { id: "gt-17-4", label: "GitHub Codespaces Overview" },
      { id: "gt-17-5", label: "Dev Containers and devcontainer json" },
      { id: "gt-17-6", label: "Prebuilds and Dotfiles" },
      { id: "gt-17-7", label: "Codespaces Secrets and Settings" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 18 — GitHub CLI and API
  // -------------------------------------------------------------------------
  {
    id: "gt-18",
    label: "GitHub CLI and API",
    children: [
      { id: "gt-18-1", label: "GitHub CLI Installation and Setup" },
      { id: "gt-18-2", label: "Managing Repos with gh" },
      { id: "gt-18-3", label: "Managing PRs and Issues with gh" },
      { id: "gt-18-4", label: "GitHub REST API" },
      { id: "gt-18-5", label: "GitHub GraphQL API" },
      { id: "gt-18-6", label: "Authentication PAT and GitHub Apps" },
      { id: "gt-18-7", label: "GitHub Apps vs OAuth Apps" },
      { id: "gt-18-8", label: "Webhooks" },
      { id: "gt-18-9", label: "Octokit SDK" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 19 — Git Configuration and Customization
  // -------------------------------------------------------------------------
  {
    id: "gt-19",
    label: "Git Configuration and Customization",
    children: [
      { id: "gt-19-1", label: "Global vs Local vs System Config" },
      { id: "gt-19-2", label: "Useful Git Aliases" },
      { id: "gt-19-3", label: "git config Deep Dive" },
      { id: "gt-19-4", label: "Signing Commits with GPG" },
      { id: "gt-19-5", label: "SSH Keys and Authentication" },
      { id: "gt-19-6", label: "Multiple Git Identities" },
      { id: "gt-19-7", label: "Credential Helpers" },
      { id: "gt-19-8", label: "Git Difftool and Mergetool" },
    ],
  },

  // -------------------------------------------------------------------------
  // SECTION 20 — Best Practices
  // -------------------------------------------------------------------------
  {
    id: "gt-20",
    label: "Best Practices",
    children: [
      { id: "gt-20-1", label: "Writing Good Commit Messages" },
      { id: "gt-20-2", label: "Conventional Commits" },
      { id: "gt-20-3", label: "Atomic Commits" },
      { id: "gt-20-4", label: "Keeping a Clean Git History" },
      { id: "gt-20-5", label: "Monorepo vs Polyrepo" },
      { id: "gt-20-6", label: "Large File Storage with Git LFS" },
      { id: "gt-20-7", label: "Git in CI CD Pipelines" },
      { id: "gt-20-8", label: "Disaster Recovery and Backup" },
    ],
  },
];

export default gitSidebarItems;
