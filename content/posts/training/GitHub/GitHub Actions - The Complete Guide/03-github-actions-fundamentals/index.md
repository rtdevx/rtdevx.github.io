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
## Key Elements

{{< lead >}}
Understanding the Key Elements of **GitHub Actions**, working with *Workflows*, *Jobs* & *Steps*.
{{< /lead >}}

### Workflows

- Attached to GitHub repository
- Contain one or more **Jobs**
- Triggered upon **Events**
### Jobs

- Define a **Runner** (execution environment)
- Contain one or more **Steps**
- Run in parallel (default) or sequential
- Can be conditional
### Steps

- Execute a **shell script** or an **Action**
- Can use custom or third-party actions
- Steps are executed in order
- Can be conditional
## Workflows, Jobs & Steps

{{< mermaid >}}
flowchart TD
    subgraph Repo[Git Repository]
        %% Event triggers
        T1[Event: push] --> A[Workflow 1]
        T2[Event: workflow_run (after Workflow 1)] --> E[Workflow 2]

        %% Workflow 1
        A --> B[Job 1]
        B --> C[Step 1]
        B --> D[Step 2]

        %% Workflow 2
        E --> F[Job 1]
        E --> I[Job 2]

        %% Steps for Job 1
        F --> G[Step 1]
        F --> H[Step 2]

        %% Steps for Job 2
        I --> J[Step 1]
        I --> K[Step 2]

        %% Dependency between workflows
        A --> E
    end
{{< /mermaid >}}

# <!-- TO DELETE -->

{{< lead >}}
<font color=#C7EB25>Lead Content</font> to <font color=#EBAC25>emphasize</font> or <font color=#EB4925>highlight</font>.
{{< /lead >}}

{{< alert "circle-info" >}}
- Post Template: https://robk.uk/posts/cheatsheets/blogging/post-template/
- Icons: https://jpanther.github.io/congo/samples/icons/
- Shortcodes: https://jpanther.github.io/congo/docs/shortcodes/#icon
- Markdown: https://robk.uk/posts/cheatsheets/blogging/markdown/
- Installing Hugo: https://robk.uk/posts/blogging/installing-congo-hugo/
- ASCII CheatSheet: https://cheatsheets.zip/ascii-code
{{< /alert >}}

<font color=#C7EB25>Hugo Link:</font>
`[EC2]({{< ref "4-ec2" >}})`

📄 _File:_ c1-versions.tf
```shell
# INFO: Terraform Block
```

ℹ️ _Note:_ `region = var.aws_region` is now referring to a variable declared in `c1-variables.tf` file.

<font color=#EBAC25><i>More info:</i></font>
<ins><i>Example:</i></ins>

{{< youtube bO25vbkoJlA >}}
# <!-- /TO DELETE -->

---
## >> Sources <<


## >> Disclaimer <<

{{< disclaimer_gh_actions_schwarzmueller >}}