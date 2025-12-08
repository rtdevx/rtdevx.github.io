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

- Define a [Runner](https://docs.github.com/en/actions/concepts/runners) (execution environment / operating system to execute the steps)
- Contain one or more [Steps]({{< ref "03-github-actions-fundamentals/#-steps" >}})
- Run in parallel (default) or sequential
- Can be conditional
### 👣 Steps

- Execute a **shell script**, **command** or an **Action**
- Can use custom or third-party actions
- Steps are executed in order
- Can be conditional

{{< alert "circle-info" >}}
**GitHub Actions: Availability & Pricing**

In **public repositories**, you can use GitHub Actions for **free**. For **private repositories**, **only a certain amount of monthly usage is available for free** - extra usage on top must be paid.

The exact quotas and payment details depend on your GitHub plan, a detailed summary can be found here: [GitHub Actions billing](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions)

If you can't find an "Actions" tab in your GitHub repository, you can should enable them as described here: [Managing GitHub Actions settings for a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository)
{{< /alert >}}

📄 _File:_ .github/workflows/01-first-action.yml
```YAML
name: First Workflow
on: workflow_dispatch
jobs:
  first-job:
    runs-on: ubuntu-latest
    steps:
      - name: Print greeting
        run: echo "Hello World!"
      - name: Print goodbye
        run: echo "Done - bye!"
```

ℹ️ If you need to run multiple shell commands, you can easily do so by adding the pipe symbol (`|`) as a value after the `run:` key:

```YAML
    steps:
      - name: Print greeting
        run: | 
	        echo "Hello World!"
	        echo "Hello Solar System!"
```

This will run both commands in one step.
## Events (Workflow Triggers)

{{< lead >}}
You can configure your [workflows]({{< ref "#-workflows" >}}) to run when *specific activity* on GitHub happens, *at a scheduled time*, or when an *event outside of GitHub* occurs.
{{< /lead >}}

| Repository related        | Comment                                   |
| ------------------------- | ----------------------------------------- |
| `on: push`                | Pushing a commit                          |
| `on: pull_request`        | Pull request action (opened, closed, ...) |
| `on: create`              | A branch or tag was created               |
| `on: fork`                | Repository was forked                     |
| `on: issues`              | An issues was opened, deleted, ...        |
| `on: issue_comment`       | Issue or pull request comment action      |
| `on: watch`               | Repository was starred                    |
| **Other**                 |                                           |
| `on: workflow_dispatch`   | Manually trigger workflow                 |
| `on: repository_dispatch` | REST API request triggers workflow        |
| `on: schedule`            | Workflow is scheduled                     |
<font color=#EBAC25><i>And many more:</i></font> [Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows)
## Job Runners

{{< lead >}}
[Runners](https://docs.github.com/en/actions/concepts/runners) are the <font color=#EBAC25>machines that execute jobs in a GitHub Actions workflow</font>. For example, a runner can clone your repository locally, install testing software, and then run commands that evaluate your code.

GitHub provides runners that you can use to run your jobs, or you can [host your own runners](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners).
{{< /lead >}}

{{< mermaid >}}
flowchart TD
  A[Workflow] --> B[Job]
  B --> C[Steps]
  C -->|Steps execute on the Runner| D[
  Runner 
  \- Server that runs the job
  \- GitHub provides Ubuntu Linux, Windows & macOS Runners
  \- You can also host and use your own runner
  ]
  D -->|Every job has a Runner| B[Job]
{{< /mermaid >}}

{{< alert "triangle-exclamation" >}}
<b><font color=#EB4925>IMPORTANT</font></b>: Every job gets its own runner - it's own Virtual Machine that's totally isolated from other machines and jobs!
{{< /alert >}}

<font color=#EBAC25><i>More:</i></font> [GitHub Actions Runners](https://docs.github.com/en/actions/concepts/runners)

---
## >> Sources <<

- [GitHub Event Triggers](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows)
- [GitHub Actions Runners](https://docs.github.com/en/actions/concepts/runners)
- [GitHub Actions billing](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions)
- [Managing GitHub Actions settings for a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository)
## >> Disclaimer <<

{{< disclaimer_gh_actions_schwarzmueller >}}