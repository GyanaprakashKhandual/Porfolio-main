const gitFileMap: Record<string, { fileName: string; filePath: string }> = {
  // =========================================================================
  // GETTING STARTED
  // =========================================================================

  "introduction-to-git": {
    fileName: "IntroductionToGit.md",
    filePath: "note/development/tooling/git/getting-started/IntroductionToGit.md",
  },
  "installing-git": {
    fileName: "InstallingGit.md",
    filePath: "note/development/tooling/git/getting-started/InstallingGit.md",
  },
  "initial-configuration": {
    fileName: "InitialConfiguration.md",
    filePath: "note/development/tooling/git/getting-started/InitialConfiguration.md",
  },
  "how-git-works-internally": {
    fileName: "HowGitWorksInternally.md",
    filePath: "note/development/tooling/git/getting-started/HowGitWorksInternally.md",
  },
  "the-three-states": {
    fileName: "TheThreeStates.md",
    filePath: "note/development/tooling/git/getting-started/TheThreeStates.md",
  },
  "initializing-a-repository": {
    fileName: "InitializingARepository.md",
    filePath: "note/development/tooling/git/getting-started/InitializingARepository.md",
  },
  "cloning-a-repository": {
    fileName: "CloningARepository.md",
    filePath: "note/development/tooling/git/getting-started/CloningARepository.md",
  },
  "your-first-commit": {
    fileName: "YourFirstCommit.md",
    filePath: "note/development/tooling/git/getting-started/YourFirstCommit.md",
  },

  // =========================================================================
  // CORE GIT CONCEPTS
  // =========================================================================

  "working-directory-and-staging-area": {
    fileName: "WorkingDirectoryAndStagingArea.md",
    filePath:
      "note/development/tooling/git/core-concepts/WorkingDirectoryAndStagingArea.md",
  },
  "git-objects-blob-tree-commit": {
    fileName: "GitObjectsBlobTreeCommit.md",
    filePath: "note/development/tooling/git/core-concepts/GitObjectsBlobTreeCommit.md",
  },
  "the-head-pointer": {
    fileName: "TheHEADPointer.md",
    filePath: "note/development/tooling/git/core-concepts/TheHEADPointer.md",
  },
  "commits-in-depth": {
    fileName: "CommitsInDepth.md",
    filePath: "note/development/tooling/git/core-concepts/CommitsInDepth.md",
  },
  "the-git-object-database": {
    fileName: "TheGitObjectDatabase.md",
    filePath: "note/development/tooling/git/core-concepts/TheGitObjectDatabase.md",
  },
  "references-and-ref-logs": {
    fileName: "ReferencesAndRefLogs.md",
    filePath: "note/development/tooling/git/core-concepts/ReferencesAndRefLogs.md",
  },
  "the-index-file": {
    fileName: "TheIndexFile.md",
    filePath: "note/development/tooling/git/core-concepts/TheIndexFile.md",
  },
  "packfiles-and-garbage-collection": {
    fileName: "PackfilesAndGarbageCollection.md",
    filePath:
      "note/development/tooling/git/core-concepts/PackfilesAndGarbageCollection.md",
  },

  // =========================================================================
  // BASIC GIT COMMANDS
  // =========================================================================

  "git-init-and-git-clone": {
    fileName: "GitInitAndGitClone.md",
    filePath: "note/development/tooling/git/basic-commands/GitInitAndGitClone.md",
  },
  "git-add-and-staging": {
    fileName: "GitAddAndStaging.md",
    filePath: "note/development/tooling/git/basic-commands/GitAddAndStaging.md",
  },
  "git-commit": {
    fileName: "GitCommit.md",
    filePath: "note/development/tooling/git/basic-commands/GitCommit.md",
  },
  "git-status-and-git-diff": {
    fileName: "GitStatusAndGitDiff.md",
    filePath: "note/development/tooling/git/basic-commands/GitStatusAndGitDiff.md",
  },
  "git-log-and-history": {
    fileName: "GitLogAndHistory.md",
    filePath: "note/development/tooling/git/basic-commands/GitLogAndHistory.md",
  },
  "git-show": {
    fileName: "GitShow.md",
    filePath: "note/development/tooling/git/basic-commands/GitShow.md",
  },
  "git-rm-and-git-mv": {
    fileName: "GitRmAndGitMv.md",
    filePath: "note/development/tooling/git/basic-commands/GitRmAndGitMv.md",
  },
  gitignore: {
    fileName: "Gitignore.md",
    filePath: "note/development/tooling/git/basic-commands/Gitignore.md",
  },
  "git-stash": {
    fileName: "GitStash.md",
    filePath: "note/development/tooling/git/basic-commands/GitStash.md",
  },
  "git-tag": {
    fileName: "GitTag.md",
    filePath: "note/development/tooling/git/basic-commands/GitTag.md",
  },

  // =========================================================================
  // BRANCHING AND MERGING
  // =========================================================================

  "understanding-branches": {
    fileName: "UnderstandingBranches.md",
    filePath: "note/development/tooling/git/branching-merging/UnderstandingBranches.md",
  },
  "creating-and-switching-branches": {
    fileName: "CreatingAndSwitchingBranches.md",
    filePath:
      "note/development/tooling/git/branching-merging/CreatingAndSwitchingBranches.md",
  },
  "merging-branches": {
    fileName: "MergingBranches.md",
    filePath: "note/development/tooling/git/branching-merging/MergingBranches.md",
  },
  "fast-forward-vs-three-way-merge": {
    fileName: "FastForwardVsThreeWayMerge.md",
    filePath:
      "note/development/tooling/git/branching-merging/FastForwardVsThreeWayMerge.md",
  },
  "resolving-merge-conflicts": {
    fileName: "ResolvingMergeConflicts.md",
    filePath:
      "note/development/tooling/git/branching-merging/ResolvingMergeConflicts.md",
  },
  "deleting-branches": {
    fileName: "DeletingBranches.md",
    filePath: "note/development/tooling/git/branching-merging/DeletingBranches.md",
  },
  "remote-tracking-branches": {
    fileName: "RemoteTrackingBranches.md",
    filePath:
      "note/development/tooling/git/branching-merging/RemoteTrackingBranches.md",
  },
  "branch-management-strategies": {
    fileName: "BranchManagementStrategies.md",
    filePath:
      "note/development/tooling/git/branching-merging/BranchManagementStrategies.md",
  },

  // =========================================================================
  // REBASING
  // =========================================================================

  "what-is-rebasing": {
    fileName: "WhatIsRebasing.md",
    filePath: "note/development/tooling/git/rebasing/WhatIsRebasing.md",
  },
  "basic-rebase": {
    fileName: "BasicRebase.md",
    filePath: "note/development/tooling/git/rebasing/BasicRebase.md",
  },
  "interactive-rebase": {
    fileName: "InteractiveRebase.md",
    filePath: "note/development/tooling/git/rebasing/InteractiveRebase.md",
  },
  "squashing-commits": {
    fileName: "SquashingCommits.md",
    filePath: "note/development/tooling/git/rebasing/SquashingCommits.md",
  },
  "reordering-and-editing-commits": {
    fileName: "ReorderingAndEditingCommits.md",
    filePath: "note/development/tooling/git/rebasing/ReorderingAndEditingCommits.md",
  },
  "rebase-vs-merge": {
    fileName: "RebaseVsMerge.md",
    filePath: "note/development/tooling/git/rebasing/RebaseVsMerge.md",
  },
  "rebase-onto": {
    fileName: "RebaseOnto.md",
    filePath: "note/development/tooling/git/rebasing/RebaseOnto.md",
  },
  "the-golden-rule-of-rebasing": {
    fileName: "TheGoldenRuleOfRebasing.md",
    filePath: "note/development/tooling/git/rebasing/TheGoldenRuleOfRebasing.md",
  },

  // =========================================================================
  // UNDOING CHANGES
  // =========================================================================

  "git-checkout-and-git-restore": {
    fileName: "GitCheckoutAndGitRestore.md",
    filePath:
      "note/development/tooling/git/undoing-changes/GitCheckoutAndGitRestore.md",
  },
  "git-reset-soft-mixed-hard": {
    fileName: "GitResetSoftMixedHard.md",
    filePath: "note/development/tooling/git/undoing-changes/GitResetSoftMixedHard.md",
  },
  "git-revert": {
    fileName: "GitRevert.md",
    filePath: "note/development/tooling/git/undoing-changes/GitRevert.md",
  },
  "git-clean": {
    fileName: "GitClean.md",
    filePath: "note/development/tooling/git/undoing-changes/GitClean.md",
  },
  "amending-commits": {
    fileName: "AmendingCommits.md",
    filePath: "note/development/tooling/git/undoing-changes/AmendingCommits.md",
  },
  "recovering-lost-commits-with-reflog": {
    fileName: "RecoveringLostCommitsWithReflog.md",
    filePath:
      "note/development/tooling/git/undoing-changes/RecoveringLostCommitsWithReflog.md",
  },
  "git-bisect": {
    fileName: "GitBisect.md",
    filePath: "note/development/tooling/git/undoing-changes/GitBisect.md",
  },
  "git-cherry-pick": {
    fileName: "GitCherryPick.md",
    filePath: "note/development/tooling/git/undoing-changes/GitCherryPick.md",
  },

  // =========================================================================
  // REMOTE REPOSITORIES
  // =========================================================================

  "understanding-remotes": {
    fileName: "UnderstandingRemotes.md",
    filePath:
      "note/development/tooling/git/remote-repositories/UnderstandingRemotes.md",
  },
  "git-remote": {
    fileName: "GitRemote.md",
    filePath: "note/development/tooling/git/remote-repositories/GitRemote.md",
  },
  "git-fetch": {
    fileName: "GitFetch.md",
    filePath: "note/development/tooling/git/remote-repositories/GitFetch.md",
  },
  "git-pull": {
    fileName: "GitPull.md",
    filePath: "note/development/tooling/git/remote-repositories/GitPull.md",
  },
  "git-push": {
    fileName: "GitPush.md",
    filePath: "note/development/tooling/git/remote-repositories/GitPush.md",
  },
  "tracking-branches": {
    fileName: "TrackingBranches.md",
    filePath: "note/development/tooling/git/remote-repositories/TrackingBranches.md",
  },
  "pushing-tags-to-remote": {
    fileName: "PushingTagsToRemote.md",
    filePath: "note/development/tooling/git/remote-repositories/PushingTagsToRemote.md",
  },
  "deleting-remote-branches": {
    fileName: "DeletingRemoteBranches.md",
    filePath:
      "note/development/tooling/git/remote-repositories/DeletingRemoteBranches.md",
  },
  "working-with-multiple-remotes": {
    fileName: "WorkingWithMultipleRemotes.md",
    filePath:
      "note/development/tooling/git/remote-repositories/WorkingWithMultipleRemotes.md",
  },

  // =========================================================================
  // GIT WORKFLOWS
  // =========================================================================

  "centralized-workflow": {
    fileName: "CentralizedWorkflow.md",
    filePath: "note/development/tooling/git/workflows/CentralizedWorkflow.md",
  },
  "feature-branch-workflow": {
    fileName: "FeatureBranchWorkflow.md",
    filePath: "note/development/tooling/git/workflows/FeatureBranchWorkflow.md",
  },
  "gitflow-workflow": {
    fileName: "GitflowWorkflow.md",
    filePath: "note/development/tooling/git/workflows/GitflowWorkflow.md",
  },
  "forking-workflow": {
    fileName: "ForkingWorkflow.md",
    filePath: "note/development/tooling/git/workflows/ForkingWorkflow.md",
  },
  "trunk-based-development": {
    fileName: "TrunkBasedDevelopment.md",
    filePath: "note/development/tooling/git/workflows/TrunkBasedDevelopment.md",
  },
  "github-flow": {
    fileName: "GitHubFlow.md",
    filePath: "note/development/tooling/git/workflows/GitHubFlow.md",
  },
  "gitlab-flow": {
    fileName: "GitLabFlow.md",
    filePath: "note/development/tooling/git/workflows/GitLabFlow.md",
  },
  "release-branching-strategy": {
    fileName: "ReleaseBranchingStrategy.md",
    filePath: "note/development/tooling/git/workflows/ReleaseBranchingStrategy.md",
  },

  // =========================================================================
  // ADVANCED GIT
  // =========================================================================

  "git-hooks": {
    fileName: "GitHooks.md",
    filePath: "note/development/tooling/git/advanced/GitHooks.md",
  },
  "git-attributes": {
    fileName: "GitAttributes.md",
    filePath: "note/development/tooling/git/advanced/GitAttributes.md",
  },
  submodules: {
    fileName: "Submodules.md",
    filePath: "note/development/tooling/git/advanced/Submodules.md",
  },
  "git-subtree": {
    fileName: "GitSubtree.md",
    filePath: "note/development/tooling/git/advanced/GitSubtree.md",
  },
  "git-worktree": {
    fileName: "GitWorktree.md",
    filePath: "note/development/tooling/git/advanced/GitWorktree.md",
  },
  "sparse-checkout": {
    fileName: "SparseCheckout.md",
    filePath: "note/development/tooling/git/advanced/SparseCheckout.md",
  },
  "partial-clone-and-shallow-clone": {
    fileName: "PartialCloneAndShallowClone.md",
    filePath: "note/development/tooling/git/advanced/PartialCloneAndShallowClone.md",
  },
  "git-filter-repo-and-rewriting-history": {
    fileName: "GitFilterRepoAndRewritingHistory.md",
    filePath:
      "note/development/tooling/git/advanced/GitFilterRepoAndRewritingHistory.md",
  },
  "git-bundle": {
    fileName: "GitBundle.md",
    filePath: "note/development/tooling/git/advanced/GitBundle.md",
  },
  "git-notes": {
    fileName: "GitNotes.md",
    filePath: "note/development/tooling/git/advanced/GitNotes.md",
  },

  // =========================================================================
  // GIT INTERNALS
  // =========================================================================

  "plumbing-vs-porcelain-commands": {
    fileName: "PlumbingVsPorcelainCommands.md",
    filePath: "note/development/tooling/git/internals/PlumbingVsPorcelainCommands.md",
  },
  "how-git-hash-object-works": {
    fileName: "HowGitHashObjectWorks.md",
    filePath: "note/development/tooling/git/internals/HowGitHashObjectWorks.md",
  },
  "tree-objects-and-commits-internals": {
    fileName: "TreeObjectsAndCommitsInternals.md",
    filePath:
      "note/development/tooling/git/internals/TreeObjectsAndCommitsInternals.md",
  },
  "git-references-heads-tags-remotes": {
    fileName: "GitReferencesHeadsTagsRemotes.md",
    filePath: "note/development/tooling/git/internals/GitReferencesHeadsTagsRemotes.md",
  },
  "merge-head-and-cherry-pick-head": {
    fileName: "MergeHeadAndCherryPickHead.md",
    filePath: "note/development/tooling/git/internals/MergeHeadAndCherryPickHead.md",
  },
  "transfer-protocols-http-and-ssh": {
    fileName: "TransferProtocolsHttpAndSsh.md",
    filePath: "note/development/tooling/git/internals/TransferProtocolsHttpAndSsh.md",
  },
  "the-refspec": {
    fileName: "TheRefspec.md",
    filePath: "note/development/tooling/git/internals/TheRefspec.md",
  },
  "maintenance-and-data-recovery": {
    fileName: "MaintenanceAndDataRecovery.md",
    filePath: "note/development/tooling/git/internals/MaintenanceAndDataRecovery.md",
  },

  // =========================================================================
  // GITHUB FUNDAMENTALS
  // =========================================================================

  "introduction-to-github": {
    fileName: "IntroductionToGitHub.md",
    filePath:
      "note/development/tooling/git/github-fundamentals/IntroductionToGitHub.md",
  },
  "creating-and-managing-repositories": {
    fileName: "CreatingAndManagingRepositories.md",
    filePath:
      "note/development/tooling/git/github-fundamentals/CreatingAndManagingRepositories.md",
  },
  "github-profile-and-readme": {
    fileName: "GitHubProfileAndREADME.md",
    filePath:
      "note/development/tooling/git/github-fundamentals/GitHubProfileAndREADME.md",
  },
  "stars-watching-and-forking": {
    fileName: "StarsWatchingAndForking.md",
    filePath:
      "note/development/tooling/git/github-fundamentals/StarsWatchingAndForking.md",
  },
  "github-issues": {
    fileName: "GitHubIssues.md",
    filePath: "note/development/tooling/git/github-fundamentals/GitHubIssues.md",
  },
  "github-discussions": {
    fileName: "GitHubDiscussions.md",
    filePath: "note/development/tooling/git/github-fundamentals/GitHubDiscussions.md",
  },
  "github-wiki": {
    fileName: "GitHubWiki.md",
    filePath: "note/development/tooling/git/github-fundamentals/GitHubWiki.md",
  },
  "github-gist": {
    fileName: "GitHubGist.md",
    filePath: "note/development/tooling/git/github-fundamentals/GitHubGist.md",
  },
  "github-notifications-and-subscriptions": {
    fileName: "GitHubNotificationsAndSubscriptions.md",
    filePath:
      "note/development/tooling/git/github-fundamentals/GitHubNotificationsAndSubscriptions.md",
  },

  // =========================================================================
  // PULL REQUESTS
  // =========================================================================

  "understanding-pull-requests": {
    fileName: "UnderstandingPullRequests.md",
    filePath: "note/development/tooling/git/pull-requests/UnderstandingPullRequests.md",
  },
  "creating-a-pull-request": {
    fileName: "CreatingAPullRequest.md",
    filePath: "note/development/tooling/git/pull-requests/CreatingAPullRequest.md",
  },
  "pr-reviews-and-approvals": {
    fileName: "PRReviewsAndApprovals.md",
    filePath: "note/development/tooling/git/pull-requests/PRReviewsAndApprovals.md",
  },
  "draft-pull-requests": {
    fileName: "DraftPullRequests.md",
    filePath: "note/development/tooling/git/pull-requests/DraftPullRequests.md",
  },
  "pr-templates": {
    fileName: "PRTemplates.md",
    filePath: "note/development/tooling/git/pull-requests/PRTemplates.md",
  },
  "linking-issues-to-prs": {
    fileName: "LinkingIssuesToPRs.md",
    filePath: "note/development/tooling/git/pull-requests/LinkingIssuesToPRs.md",
  },
  "merge-strategies-merge-squash-rebase": {
    fileName: "MergeStrategiesMergeSquashRebase.md",
    filePath:
      "note/development/tooling/git/pull-requests/MergeStrategiesMergeSquashRebase.md",
  },
  "auto-merge": {
    fileName: "AutoMerge.md",
    filePath: "note/development/tooling/git/pull-requests/AutoMerge.md",
  },
  "pr-best-practices": {
    fileName: "PRBestPractices.md",
    filePath: "note/development/tooling/git/pull-requests/PRBestPractices.md",
  },

  // =========================================================================
  // GITHUB ACTIONS
  // =========================================================================

  "introduction-to-github-actions": {
    fileName: "IntroductionToGitHubActions.md",
    filePath:
      "note/development/tooling/git/github-actions/IntroductionToGitHubActions.md",
  },
  "workflow-syntax-and-structure": {
    fileName: "WorkflowSyntaxAndStructure.md",
    filePath:
      "note/development/tooling/git/github-actions/WorkflowSyntaxAndStructure.md",
  },
  "events-and-triggers": {
    fileName: "EventsAndTriggers.md",
    filePath: "note/development/tooling/git/github-actions/EventsAndTriggers.md",
  },
  "jobs-and-steps": {
    fileName: "JobsAndSteps.md",
    filePath: "note/development/tooling/git/github-actions/JobsAndSteps.md",
  },
  "runners-github-hosted-and-self-hosted": {
    fileName: "RunnersGitHubHostedAndSelfHosted.md",
    filePath:
      "note/development/tooling/git/github-actions/RunnersGitHubHostedAndSelfHosted.md",
  },
  "using-actions-from-marketplace": {
    fileName: "UsingActionsFromMarketplace.md",
    filePath:
      "note/development/tooling/git/github-actions/UsingActionsFromMarketplace.md",
  },
  "environment-variables-and-secrets": {
    fileName: "EnvironmentVariablesAndSecrets.md",
    filePath:
      "note/development/tooling/git/github-actions/EnvironmentVariablesAndSecrets.md",
  },
  "artifacts-and-caching": {
    fileName: "ArtifactsAndCaching.md",
    filePath: "note/development/tooling/git/github-actions/ArtifactsAndCaching.md",
  },
  "matrix-builds": {
    fileName: "MatrixBuilds.md",
    filePath: "note/development/tooling/git/github-actions/MatrixBuilds.md",
  },
  "reusable-workflows": {
    fileName: "ReusableWorkflows.md",
    filePath: "note/development/tooling/git/github-actions/ReusableWorkflows.md",
  },
  "composite-actions": {
    fileName: "CompositeActions.md",
    filePath: "note/development/tooling/git/github-actions/CompositeActions.md",
  },
  "deployment-environments": {
    fileName: "DeploymentEnvironments.md",
    filePath: "note/development/tooling/git/github-actions/DeploymentEnvironments.md",
  },
  "oidc-and-keyless-authentication": {
    fileName: "OIDCAndKeylessAuthentication.md",
    filePath:
      "note/development/tooling/git/github-actions/OIDCAndKeylessAuthentication.md",
  },
  "workflow-security-and-permissions": {
    fileName: "WorkflowSecurityAndPermissions.md",
    filePath:
      "note/development/tooling/git/github-actions/WorkflowSecurityAndPermissions.md",
  },

  // GitHub Actions Advanced
  "dynamic-matrix-with-fromjson": {
    fileName: "DynamicMatrixWithFromJSON.md",
    filePath:
      "note/development/tooling/git/github-actions/advanced/DynamicMatrixWithFromJSON.md",
  },
  "workflow-dispatch-with-inputs": {
    fileName: "WorkflowDispatchWithInputs.md",
    filePath:
      "note/development/tooling/git/github-actions/advanced/WorkflowDispatchWithInputs.md",
  },
  "concurrency-and-cancellation": {
    fileName: "ConcurrencyAndCancellation.md",
    filePath:
      "note/development/tooling/git/github-actions/advanced/ConcurrencyAndCancellation.md",
  },
  "writing-custom-javascript-actions": {
    fileName: "WritingCustomJavaScriptActions.md",
    filePath:
      "note/development/tooling/git/github-actions/advanced/WritingCustomJavaScriptActions.md",
  },
  "writing-custom-docker-actions": {
    fileName: "WritingCustomDockerActions.md",
    filePath:
      "note/development/tooling/git/github-actions/advanced/WritingCustomDockerActions.md",
  },
  "calling-workflows-from-workflows": {
    fileName: "CallingWorkflowsFromWorkflows.md",
    filePath:
      "note/development/tooling/git/github-actions/advanced/CallingWorkflowsFromWorkflows.md",
  },

  // =========================================================================
  // GITHUB SECURITY
  // =========================================================================

  "branch-protection-rules": {
    fileName: "BranchProtectionRules.md",
    filePath: "note/development/tooling/git/github-security/BranchProtectionRules.md",
  },
  rulesets: {
    fileName: "Rulesets.md",
    filePath: "note/development/tooling/git/github-security/Rulesets.md",
  },
  codeowners: {
    fileName: "CODEOWNERS.md",
    filePath: "note/development/tooling/git/github-security/CODEOWNERS.md",
  },
  "dependabot-alerts-and-updates": {
    fileName: "DependabotAlertsAndUpdates.md",
    filePath:
      "note/development/tooling/git/github-security/DependabotAlertsAndUpdates.md",
  },
  "secret-scanning": {
    fileName: "SecretScanning.md",
    filePath: "note/development/tooling/git/github-security/SecretScanning.md",
  },
  "code-scanning-and-codeql": {
    fileName: "CodeScanningAndCodeQL.md",
    filePath: "note/development/tooling/git/github-security/CodeScanningAndCodeQL.md",
  },
  "security-advisories": {
    fileName: "SecurityAdvisories.md",
    filePath: "note/development/tooling/git/github-security/SecurityAdvisories.md",
  },
  "supply-chain-security": {
    fileName: "SupplyChainSecurity.md",
    filePath: "note/development/tooling/git/github-security/SupplyChainSecurity.md",
  },
  "sigstore-and-artifact-attestation": {
    fileName: "SigstoreAndArtifactAttestation.md",
    filePath:
      "note/development/tooling/git/github-security/SigstoreAndArtifactAttestation.md",
  },

  // =========================================================================
  // GITHUB COLLABORATION
  // =========================================================================

  "organizations-and-teams": {
    fileName: "OrganizationsAndTeams.md",
    filePath:
      "note/development/tooling/git/github-collaboration/OrganizationsAndTeams.md",
  },
  "repository-permissions-and-roles": {
    fileName: "RepositoryPermissionsAndRoles.md",
    filePath:
      "note/development/tooling/git/github-collaboration/RepositoryPermissionsAndRoles.md",
  },
  "github-projects-boards-and-roadmaps": {
    fileName: "GitHubProjectsBoardsAndRoadmaps.md",
    filePath:
      "note/development/tooling/git/github-collaboration/GitHubProjectsBoardsAndRoadmaps.md",
  },
  "issue-labels-and-milestones": {
    fileName: "IssueLabelsAndMilestones.md",
    filePath:
      "note/development/tooling/git/github-collaboration/IssueLabelsAndMilestones.md",
  },
  "code-review-best-practices": {
    fileName: "CodeReviewBestPractices.md",
    filePath:
      "note/development/tooling/git/github-collaboration/CodeReviewBestPractices.md",
  },
  "github-sponsors": {
    fileName: "GitHubSponsors.md",
    filePath: "note/development/tooling/git/github-collaboration/GitHubSponsors.md",
  },
  "contributing-to-open-source": {
    fileName: "ContributingToOpenSource.md",
    filePath:
      "note/development/tooling/git/github-collaboration/ContributingToOpenSource.md",
  },
  "contributing-and-code-of-conduct-files": {
    fileName: "ContributingAndCodeOfConductFiles.md",
    filePath:
      "note/development/tooling/git/github-collaboration/ContributingAndCodeOfConductFiles.md",
  },

  // =========================================================================
  // GITHUB PACKAGES AND RELEASES
  // =========================================================================

  "github-packages-overview": {
    fileName: "GitHubPackagesOverview.md",
    filePath: "note/development/tooling/git/github-packages/GitHubPackagesOverview.md",
  },
  "publishing-npm-packages": {
    fileName: "PublishingNpmPackages.md",
    filePath: "note/development/tooling/git/github-packages/PublishingNpmPackages.md",
  },
  "publishing-docker-images": {
    fileName: "PublishingDockerImages.md",
    filePath: "note/development/tooling/git/github-packages/PublishingDockerImages.md",
  },
  "github-container-registry": {
    fileName: "GitHubContainerRegistry.md",
    filePath: "note/development/tooling/git/github-packages/GitHubContainerRegistry.md",
  },
  "creating-releases": {
    fileName: "CreatingReleases.md",
    filePath: "note/development/tooling/git/github-packages/CreatingReleases.md",
  },
  "automated-releases-with-actions": {
    fileName: "AutomatedReleasesWithActions.md",
    filePath:
      "note/development/tooling/git/github-packages/AutomatedReleasesWithActions.md",
  },
  "semantic-versioning-and-changelogs": {
    fileName: "SemanticVersioningAndChangelogs.md",
    filePath:
      "note/development/tooling/git/github-packages/SemanticVersioningAndChangelogs.md",
  },
  "release-drafter": {
    fileName: "ReleaseDrafter.md",
    filePath: "note/development/tooling/git/github-packages/ReleaseDrafter.md",
  },

  // =========================================================================
  // GITHUB PAGES AND CODESPACES
  // =========================================================================

  "github-pages-overview": {
    fileName: "GitHubPagesOverview.md",
    filePath:
      "note/development/tooling/git/github-pages-codespaces/GitHubPagesOverview.md",
  },
  "deploying-a-static-site": {
    fileName: "DeployingAStaticSite.md",
    filePath:
      "note/development/tooling/git/github-pages-codespaces/DeployingAStaticSite.md",
  },
  "custom-domains-and-https": {
    fileName: "CustomDomainsAndHTTPS.md",
    filePath:
      "note/development/tooling/git/github-pages-codespaces/CustomDomainsAndHTTPS.md",
  },
  "github-codespaces-overview": {
    fileName: "GitHubCodespacesOverview.md",
    filePath:
      "note/development/tooling/git/github-pages-codespaces/GitHubCodespacesOverview.md",
  },
  "dev-containers-and-devcontainer-json": {
    fileName: "DevContainersAndDevcontainerJson.md",
    filePath:
      "note/development/tooling/git/github-pages-codespaces/DevContainersAndDevcontainerJson.md",
  },
  "prebuilds-and-dotfiles": {
    fileName: "PrebuildAndDotfiles.md",
    filePath:
      "note/development/tooling/git/github-pages-codespaces/PrebuildAndDotfiles.md",
  },
  "codespaces-secrets-and-settings": {
    fileName: "CodespacesSecretsAndSettings.md",
    filePath:
      "note/development/tooling/git/github-pages-codespaces/CodespacesSecretsAndSettings.md",
  },

  // =========================================================================
  // GITHUB CLI AND API
  // =========================================================================

  "github-cli-installation-and-setup": {
    fileName: "GitHubCLIInstallationAndSetup.md",
    filePath:
      "note/development/tooling/git/github-cli-api/GitHubCLIInstallationAndSetup.md",
  },
  "managing-repos-with-gh": {
    fileName: "ManagingReposWithGh.md",
    filePath: "note/development/tooling/git/github-cli-api/ManagingReposWithGh.md",
  },
  "managing-prs-and-issues-with-gh": {
    fileName: "ManagingPRsAndIssuesWithGh.md",
    filePath:
      "note/development/tooling/git/github-cli-api/ManagingPRsAndIssuesWithGh.md",
  },
  "github-rest-api": {
    fileName: "GitHubRESTAPI.md",
    filePath: "note/development/tooling/git/github-cli-api/GitHubRESTAPI.md",
  },
  "github-graphql-api": {
    fileName: "GitHubGraphQLAPI.md",
    filePath: "note/development/tooling/git/github-cli-api/GitHubGraphQLAPI.md",
  },
  "authentication-pat-and-github-apps": {
    fileName: "AuthenticationPATAndGitHubApps.md",
    filePath:
      "note/development/tooling/git/github-cli-api/AuthenticationPATAndGitHubApps.md",
  },
  "github-apps-vs-oauth-apps": {
    fileName: "GitHubAppsVsOAuthApps.md",
    filePath: "note/development/tooling/git/github-cli-api/GitHubAppsVsOAuthApps.md",
  },
  webhooks: {
    fileName: "Webhooks.md",
    filePath: "note/development/tooling/git/github-cli-api/Webhooks.md",
  },
  "octokit-sdk": {
    fileName: "OctokitSDK.md",
    filePath: "note/development/tooling/git/github-cli-api/OctokitSDK.md",
  },

  // =========================================================================
  // GIT CONFIGURATION AND CUSTOMIZATION
  // =========================================================================

  "global-vs-local-vs-system-config": {
    fileName: "GlobalVsLocalVsSystemConfig.md",
    filePath:
      "note/development/tooling/git/configuration/GlobalVsLocalVsSystemConfig.md",
  },
  "useful-git-aliases": {
    fileName: "UsefulGitAliases.md",
    filePath: "note/development/tooling/git/configuration/UsefulGitAliases.md",
  },
  "git-config-deep-dive": {
    fileName: "GitConfigDeepDive.md",
    filePath: "note/development/tooling/git/configuration/GitConfigDeepDive.md",
  },
  "signing-commits-with-gpg": {
    fileName: "SigningCommitsWithGPG.md",
    filePath: "note/development/tooling/git/configuration/SigningCommitsWithGPG.md",
  },
  "ssh-keys-and-authentication": {
    fileName: "SSHKeysAndAuthentication.md",
    filePath: "note/development/tooling/git/configuration/SSHKeysAndAuthentication.md",
  },
  "multiple-git-identities": {
    fileName: "MultipleGitIdentities.md",
    filePath: "note/development/tooling/git/configuration/MultipleGitIdentities.md",
  },
  "credential-helpers": {
    fileName: "CredentialHelpers.md",
    filePath: "note/development/tooling/git/configuration/CredentialHelpers.md",
  },
  "git-difftool-and-mergetool": {
    fileName: "GitDifftoolAndMergetool.md",
    filePath: "note/development/tooling/git/configuration/GitDifftoolAndMergetool.md",
  },

  // =========================================================================
  // BEST PRACTICES
  // =========================================================================

  "writing-good-commit-messages": {
    fileName: "WritingGoodCommitMessages.md",
    filePath:
      "note/development/tooling/git/best-practices/WritingGoodCommitMessages.md",
  },
  "conventional-commits": {
    fileName: "ConventionalCommits.md",
    filePath: "note/development/tooling/git/best-practices/ConventionalCommits.md",
  },
  "atomic-commits": {
    fileName: "AtomicCommits.md",
    filePath: "note/development/tooling/git/best-practices/AtomicCommits.md",
  },
  "keeping-a-clean-git-history": {
    fileName: "KeepingACleanGitHistory.md",
    filePath: "note/development/tooling/git/best-practices/KeepingACleanGitHistory.md",
  },
  "monorepo-vs-polyrepo": {
    fileName: "MonorepoVsPolyrepo.md",
    filePath: "note/development/tooling/git/best-practices/MonorepoVsPolyrepo.md",
  },
  "large-file-storage-with-git-lfs": {
    fileName: "LargeFileStorageWithGitLFS.md",
    filePath:
      "note/development/tooling/git/best-practices/LargeFileStorageWithGitLFS.md",
  },
  "git-in-ci-cd-pipelines": {
    fileName: "GitInCICDPipelines.md",
    filePath: "note/development/tooling/git/best-practices/GitInCICDPipelines.md",
  },
  "disaster-recovery-and-backup": {
    fileName: "DisasterRecoveryAndBackup.md",
    filePath:
      "note/development/tooling/git/best-practices/DisasterRecoveryAndBackup.md",
  },
};

export default gitFileMap;
