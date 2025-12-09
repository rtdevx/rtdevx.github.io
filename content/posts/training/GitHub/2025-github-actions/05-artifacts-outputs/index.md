---
title: "GitHub Actions: Job Artifacts & Outputs"
date: 2025-11-04
description: Job artifacts in GitHub Actions are files generated during a workflow run that can be stored and shared between jobs.
summary: Job artifacts in GitHub Actions are files generated during a workflow run that can be stored and shared between jobs.
draft: false
tags:
  - Git
  - GitHub
  - GitHubActions
categories:
  - DevOps
  - CI/CD
---
{{< lead >}}
**Job artifacts** in **GitHub Actions** are files generated during a workflow run that can be stored and shared between jobs. They are <font color=#EBAC25>useful for persisting data like test results or build outputs, allowing you to access them after the workflow has completed</font>.
{{< /lead >}}

| <font color=#EB4925>External Resources</font> »                             |                                                                           |                                  |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------- |
| [GitHub Actions official Documentation](https://docs.github.com/en/actions) | [GitHub Actions Marketplace](https://github.com/marketplace?type=actions) | [GitHub.com](https://github.com) |
<font color=#EBAC25><i>More info:</i></font> [Store and share data with workflow artifacts](https://docs.github.com/en/actions/tutorials/store-and-share-data) 

{{< mermaid >}}
flowchart TD
  A[Job] --> B[Example: Build app]
  A --> C[Output Asset(s)]
  C --> D[Example: App binary, website files, etc]
  C -->|Via GitHub UI or REST API| E[Download & Use Manually]
  C -->|Via Action| F[Download & Use in other Jobs]
{{< /mermaid >}}

---
## >> Sources <<

- [Store and share data with workflow artifacts](https://docs.github.com/en/actions/tutorials/store-and-share-data) - Use artifacts to share data between jobs in a workflow and store data once that workflow has completed.
## >> Disclaimer <<

{{< disclaimer_gh_actions_schwarzmueller >}}