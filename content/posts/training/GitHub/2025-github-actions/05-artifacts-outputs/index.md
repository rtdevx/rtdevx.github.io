---
title: "GitHub Actions: Job Artifacts & Outputs"
date: 2025-11-04
description: Job artifacts in GitHub Actions are files generated during a workflow run that can be stored and shared between jobs.
summary: Job artifacts in GitHub Actions are files generated during a workflow run that can be stored and shared between jobs.
draft: true
tags:
  - Git
  - GitHub
  - GitHubActions
categories:
  - DevOps
  - CI/CD
  - IaC
---
{{< lead >}}
**Job artifacts** in **GitHub Actions** are files generated during a workflow run that can be stored and shared between jobs. They are <font color=#EBAC25>useful for persisting data like test results or build outputs, allowing you to access them after the workflow has completed</font>.
{{< /lead >}}

| <font color=#EB4925>External Resources</font> »                             |                                                                           |                                  |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------- |
| [GitHub Actions official Documentation](https://docs.github.com/en/actions) | [GitHub Actions Marketplace](https://github.com/marketplace?type=actions) | [GitHub.com](https://github.com) |

## Job Arrifacts



{{< mermaid >}}
flowchart LR
B@{ shape: braces, label: "Example: Build app" }
D@{ shape: braces, label: "Example: App binary, website files, etc" }

classDef redclass fill:#EB4925
classDef yellowclass stroke:#EBAC25
classDef greenclass stroke:#C7EB25

  A("fa:fa-cog Job"):::redclass --> B
  A a1@--> C(Output Assets):::yellowclass
  a1@{ animate: true }
  C --> D
  C -->|Via GitHub UI or REST API| E(Download & Use Manually):::greenclass
  C -->|Via Action| F(Download & Use in other Jobs):::greenclass
{{< /mermaid >}}

<font color=#EBAC25><i>More info:</i></font> [Store and share data with workflow artifacts](https://docs.github.com/en/actions/tutorials/store-and-share-data) 

---
## >> Sources <<

- [Store and share data with workflow artifacts](https://docs.github.com/en/actions/tutorials/store-and-share-data) - Use artifacts to share data between jobs in a workflow and store data once that workflow has completed.
## >> Disclaimer <<

{{< disclaimer_gh_actions_schwarzmueller >}}