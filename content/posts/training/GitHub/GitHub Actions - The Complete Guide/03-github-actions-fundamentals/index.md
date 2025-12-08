---
title: "GitHub Actions: Fundamentals"
date: 2025-12-03
description: Understanding the Key Elements, working with Workflows, Jobs & Steps, building an Example Workflow.
summary: Understanding the Key Elements, working with Workflows, Jobs & Steps, building an Example Workflow.
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
In **GitHub Actions**, [workflows]({{< ref "#-workflows" >}}) are automated processes that consist of [Jobs]({{< ref "#-jobs" >}}) and [Steps]({{< ref "#-steps" >}}). Jobs are collections of steps that run in a specific environment, while steps are individual tasks executed sequentially within a job, allowing for organized automation of tasks like building, testing, and deploying code.
{{< /lead >}}
## Workflows, Jobs & Steps

{{< mermaid >}}
flowchart TD
    subgraph Repo[Git Repository]
    %% Workflow 1
    A[Workflow 1] --> B[Job 1]
    B --> C[Step 1]
    B --> D[Step 2]

    %% Workflow 2
    E[Workflow 2] --> F[Job 1]
    E --> I[Job 2]

    %% Steps for Job 1
    F --> G[Step 1]
    F --> H[Step 2]

    %% Steps for Job 2
    I --> J[Step 1]
    end
{{< /mermaid >}}
### ⚙️ Workflows

- Attached to GitHub repository
- Contain one or more [Jobs]({{< ref "03-github-actions-fundamentals/#-jobs" >}})
- Triggered upon [Events]({{< ref "03-github-actions-fundamentals/#events-workflow-triggers" >}})
### 🔧 Jobs

- Define a **Runner** (execution environment - machine / operating system to execute the steps)
- Contain one or more [Steps]({{< ref "03-github-actions-fundamentals/#-steps" >}})
- Run in parallel (default) or sequential
- Can be conditional
### 👣 Steps

- Execute a **shell script** or an **Action**
- Can use custom or third-party actions
- Steps are executed in order
- Can be conditional
## Events (Workflow Triggers)

{{< lead >}}
You can configure your [workflows]({{< ref "#-workflows" >}}) to run when specific activity on GitHub happens, at a scheduled time, or when an event outside of GitHub occurs.
{{< /lead >}}



_More:_ [Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows)

---
## >> Sources <<

GitHub Event Triggers: https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows
## >> Disclaimer <<

{{< disclaimer_gh_actions_schwarzmueller >}}