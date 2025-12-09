---
title: "GitHub Actions: Fundamentals 🔥"
date: 2025-11-03
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

| <font color=#EB4925>External Resources</font> »                             |                                                                           |                                  |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------- |
| [GitHub Actions official Documentation](https://docs.github.com/en/actions) | [GitHub Actions Marketplace](https://github.com/marketplace?type=actions) | [GitHub.com](https://github.com) |
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
**GitHub Actions: <font color=#EBAC25>Availability & Pricing</font>**

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

<ins><i>Example:</i></ins>

📄 _File:_ .github/workflows/04-01-exercise.yml
```YAML
name: 04-01 - Exercise - Events
on:
  pull_request:
    types:
      - opened
    branches:
      - main # main
      - 'dev-*' # dev-new dev-this-is-new
      - 'feat/**' # feat/new feat/new/button
  workflow_dispatch:
  push:
    branches:
      - main # main
      - 'dev-*' # dev-new dev-this-is-new
      - 'feat/**' # feat/new feat/new/button
      # developer-1
    paths-ignore:
      - '.github/workflows/*' # If files in .github/workflows change, workflow will not run
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Output event data
        run: echo "${{ toJSON(github.event) }}"
      - name: Get code
        uses: actions/checkout@v3
      - name: Install dependencies
        run: |
          cd 04-react-exercise
          npm ci
      - name: Test code
        run: |
          cd 04-react-exercise
          npm run test
      - name: Build code
        run: |
          cd 04-react-exercise
          npm run build
      - name: Deploy project
        run: echo "Deploying..."
```

{{< alert "triangle-exclamation" >}}
By default, **Pull Requests based on Forks do NOT trigger a workflow**.

**Reason:** Everyone can fork & open pull requests. Malicious workflow runs & excess cost could be caused.

<font color=#EB4925>First-time contributors must be approved manually.</font>
{{< /alert >}}

<font color=#EBAC25><i>More info:</i></font> 
- [Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows)
- [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)
## Job Runners

{{< lead >}}
[Runners](https://docs.github.com/en/actions/concepts/runners) are the <font color=#EBAC25>machines that execute jobs in a GitHub Actions workflow</font>. For example, a **runner** can clone your repository locally, install testing software, and then run commands that evaluate your code.

ℹ️ GitHub provides runners that you can use to run your jobs, or you can [host your own runners](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners).
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
<b><font color=#EB4925>IMPORTANT</font></b>: Every job gets its own runner - it's own Virtual Machine that's totally isolated from other machines and jobs! For that reason, `runs-on:` must be defined for each job.
{{< /alert >}}

<font color=#EBAC25><i>More:</i></font> [GitHub Actions Runners](https://docs.github.com/en/actions/concepts/runners)
## Contexts reference
{{< lead >}}
Find information about **contexts** (metadata) available in GitHub Actions workflows, including available properties, access methods, and usage examples.
{{< /lead >}}
### [Available contexts](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#available-contexts)

|Context name|Type|Description|
|---|---|---|
|`github`|`object`|Information about the workflow run. For more information, see [`github` context](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#github-context).|
|`env`|`object`|Contains variables set in a workflow, job, or step. For more information, see [`env` context](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#env-context).|
|`vars`|`object`|Contains variables set at the repository, organization, or environment levels. For more information, see [`vars` context](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#vars-context).|
|`job`|`object`|Information about the currently running job. For more information, see [`job` context](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#job-context).|
|`jobs`|`object`|For reusable workflows only, contains outputs of jobs from the reusable workflow. For more information, see [`jobs` context](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#jobs-context).|
|`steps`|`object`|Information about the steps that have been run in the current job. For more information, see [`steps` context](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#steps-context).|
|`runner`|`object`|Information about the runner that is running the current job. For more information, see [`runner` context](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#runner-context).|
|`secrets`|`object`|Contains the names and values of secrets that are available to a workflow run. For more information, see [`secrets` context](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#secrets-context).|
|`strategy`|`object`|Information about the matrix execution strategy for the current job. For more information, see [`strategy` context](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#strategy-context).|
|`matrix`|`object`|Contains the matrix properties defined in the workflow that apply to the current job. For more information, see [`matrix` context](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#matrix-context).|
|`needs`|`object`|Contains the outputs of all jobs that are defined as a dependency of the current job. For more information, see [`needs` context](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#needs-context).|
|`inputs`|`object`|Contains the inputs of a reusable or manually triggered workflow. For more information, see [`inputs` context](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts#inputs-context).|

The following example demonstrates how these different types of variables can be used together in a job:

```YAML
name: CI
on: push
jobs:
  prod-check:
    if: ${{ github.ref == 'refs/heads/main' }}
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying to production server on branch $GITHUB_REF"
```

Another example demonstrates how to output a GitHub context in JSON format:

📄 _File:_ .github/workflows/03-output.yml
```YAML
name: 03 - Output information
on: workflow_dispatch
jobs:
  info:
    runs-on: ubuntu-latest
    steps:
      - name: Output GitHub context
        run: echo "${{ toJSON(github) }}"
```

{{< alert "circle-info" >}}
**GitHub Actions contexts** are useful for **accessing information about the workflow run**, such as the event that triggered it, repository details, and environment variables. 

Common use cases include <font color=#C7EB25>conditionally executing steps based on event types</font>, <font color=#C7EB25>managing secrets securely</font>, and <font color=#C7EB25>customizing workflows based on the context of the job</font> or steps.
{{< /alert >}}

<font color=#EBAC25><i>More:</i></font> [GitHub Actions Contexts](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts)
## Skipping workflow runs
{{< lead >}}
You can skip workflow runs triggered by the `push` and `pull_request` events by including a command in your commit message.
{{< /lead >}}

Workflows that would otherwise be triggered using `on: push` or `on: pull_request` won't be triggered if you add any of the following strings to the commit message in a push, or the HEAD commit of a pull request:

- `[skip ci]`
- `[ci skip]`
- `[no ci]`
- `[skip actions]`
- `[actions skip]`

Alternatively, you can add a `skip-checks` trailer to your commit message. The trailers section should be included at the end of your commit message and be preceded by two empty lines. If you already have other trailers in your commit message, `skip-checks` should be last. You can use either of the following:

- `skip-checks:true`
- `skip-checks: true`

{{< alert "circle-info" >}}
This can be useful for minor code changes (updating comments, etc.). When making minor changes, Workflows may be skipped if necessary.
{{< /alert >}}

<font color=#EBAC25><i>More:</i></font> [Skipping workflow runs](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/skip-workflow-runs)

---
## >> Sources <<

- [GitHub Event Triggers](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) - to indicate when to run (`on:`).
- [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax) - Workflow syntax. 
- [GitHub Actions Runners](https://docs.github.com/en/actions/concepts/runners) - execution environment / operating system to execute the steps.
- [GitHub Actions billing](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions) - GitHub Actions billing information.
- [Managing GitHub Actions settings for a repository](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository)
- [GitHub Actions Contexts](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts) - get metadata from GitHub about the job and environment where actions run. Useful for outputs and investigating issues.
- [Skipping workflow runs](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/skip-workflow-runs) - skipping workflow runs with appropriate commit message. Useful for minor code changes (updating comments, etc.)
## >> Disclaimer <<

{{< disclaimer_gh_actions_schwarzmueller >}}