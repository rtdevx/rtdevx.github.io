---
title: "GitHub Actions: Controlling Workflow and Job Execution"
date: 2025-11-11
description: Controlling Workflow & Job Execution in GitHub Actions.
summary: Controlling Workflow & Job Execution in GitHub Actions.
draft: false
tags:
  - Git
  - GitHub
  - GitHubActions
categories:
  - DevOps
  - CI/CD
  - IaC
series: GitHub Actions The Complete Guide
---

| <font color=#EB4925>External Resources</font> »                             |                                                                           |                                  |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------- |
| [GitHub Actions official Documentation](https://docs.github.com/en/actions) | [GitHub Actions Marketplace](https://github.com/marketplace?type=actions) | [GitHub.com](https://github.com) |
## Controlling Execution Flow

## Using conditions to control job execution

{{< lead >}}

You can use the `jobs.<job_id>.if` conditional to prevent a job from running unless a condition is met. You can use any supported context and expression to create a conditional. For more information on which contexts are supported in this key, see [Contexts reference](https://docs.github.com/en/actions/learn-github-actions/contexts#context-availability).

{{< /lead >}}

{{< alert "circle-info" >}}

<font color=#EB4925>The default action of GitHub Actions is when the step fails, the whole job the step belongs to also fails</font>. For that reason we may want to have some form of control during our job execution.

{{< /alert >}}
### Step execution

<ins><i>Example:</i></ins>

📄 _File:_ .github/workflows/06-01-execution-flow.yml

{{< highlight YAML "linenos=table,hl_lines=16 20 " >}}

  test:
    runs-on: ubuntu-latest
    steps:
      - name: Get code
        uses: actions/checkout@v3
      - name: Cache dependencies
        id: cache
        uses: actions/cache@v3
        with:
          path: ~/06-react-exercise/.npm
          key: deps-node-modules-${{ hashFiles('**/package-lock.json') }}
      - name: Install dependencies
        run: npm ci
        working-directory: 06-react-exercise
      - name: Test code
        id: run-tests
        run: npm run test
        working-directory: 06-react-exercise
      - name: Upload test report
        if: ${{ failure() && steps.run-tests.outcome == 'failure' }}
        uses: actions/upload-artifact@v6
        with:
          name: test-report
          path: 06-react-exercise/test.json

{{< /highlight >}}

{{< alert "circle-info" >}}
Note: `id:` can be injected to any step to be later called by any [context object](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts).<br/>
Note:  **failure function** (`failure() &&`) <font color=#EB4925>must be present in order to force GitHub Actions no to follow it's default behaviour</font> (to stop executions if step fails).

**Special Conditional Functions:**
- `failure()` - Returns `true` when **any** previous Step or Job failed.
- `success()`- Returns `true` when **none** of the previous Step or Job failed.
- `always()` - Causing the step to always execute, even when cancelled.
- `cancelled()` - Returns `true` if the workflow has been cancelled.
{{< /alert >}}
### Job execution

<ins><i>Example:</i></ins>

📄 _File:_ .github/workflows/06-01-execution-flow.yml

{{< highlight YAML "linenos=table,hl_lines=4 " >}}

  build:
    needs: test
    # run this job even if the test job fails
    if: ${{ always() }}
    runs-on: ubuntu-latest
    steps:
      - name: Get code
        uses: actions/checkout@v3

{{< /highlight >}}

<ins><i>Example:</i></ins> `report` job depends on `lint` and `deploy` jobs (`needs: [lint, deploy]`). It will still run if any of the jobs fails.

![](./assets/job-execution-flow.png)

{{< alert "triangle-exclamation" >}}
`continue-on-error: true` changes the behaviour and sets the failed job to successful, even if it failed. Can be used for jobs that are allowed to fail.

Check [contexts](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts) for more information.

{{< /alert >}}

<font color=#EBAC25><i>Hint:</i></font>

|   |   |   |
|---|---|---|
|`steps.<step_id>.conclusion`|`string`|The result of a completed step after [`continue-on-error`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepscontinue-on-error) is applied. Possible values are `success`, `failure`, `cancelled`, or `skipped`. When a `continue-on-error` step fails, the `outcome` is `failure`, but the final `conclusion` is `success`.|
|`steps.<step_id>.outcome`|`string`|The result of a completed step before [`continue-on-error`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepscontinue-on-error) is applied. Possible values are `success`, `failure`, `cancelled`, or `skipped`. When a `continue-on-error` step fails, the `outcome` is `failure`, but the final `conclusion` is `success`.|


<font color=#EBAC25><i>More info:</i></font>
- Using conditions to control job execution: https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-jobs-with-conditions
- Contexts: https://docs.github.com/en/actions/reference/workflows-and-actions/contexts
- Operators: https://docs.github.com/en/actions/reference/workflows-and-actions/expressions#operators
## Matrix Strategies

{{< lead >}}

The **GitHub Actions matrix strategy** is a powerful feature that <font color=#EBAC25>allows you to run the same job multiple times across various combinations of variables (like different operating systems or language versions) without duplicating code</font>. It maximizes parallelism and testing coverage within a single, maintainable workflow definition.

{{< /lead >}}
### How it Works

Within a workflow file, you define a `strategy` block within a job, which contains a `matrix` key. Inside the `matrix`, you specify variables as keys and a list of values for each variable. GitHub Actions then automatically generates a separate, parallel job run for every possible combination of these values. 

<ins><i>Example:</i></ins>

This example tests a Node.js application on two different operating systems and two different Node.js versions:

```YAML
jobs:
  build-and-test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
        node_version: [14, 16]
    steps:
      - uses: [actions/checkout@v4](github.com)
      - name: Use Node.js ${{ matrix.node_version }}
        uses: [actions/setup-node@v4](github.com)
        with:
          node-version: ${{ matrix.node_version }}
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
```

This configuration creates four jobs:

- `os: ubuntu-latest`, `node_version: 14`
- `os: ubuntu-latest`, `node_version: 16`
- `os: windows-latest`, `node_version: 14`
- `os: windows-latest`, `node_version: 16`
### Inclusions and Exclusions in Matrix strategies

{{< lead >}}

In **GitHub Actions matrix strategies**, the `include` keyword adds specific configurations or properties, while the `exclude` keyword removes unwanted combinations from the default matrix permutations. This provides fine-grained control over which jobs run in the workflow.

{{< /lead >}}

<ins><i>Example:</i></ins>

```YAML
strategy:
  matrix:
    os: [ubuntu-latest, macos-latest]
    node: [14, 16]
    include:
      # Add a specific job for Node 18 on Ubuntu
      - os: ubuntu-latest
        node: 18
      # Add an extra property (e.g., 'test-suite') to the macos-latest/Node 16 job
      - os: macos-latest
        node: 16
        test-suite: "extended"
```

<font color=#EBAC25><i>More info:</i></font> [Running variations of jobs in a workflow](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations)
## 🔥Re-Using Workflows 

{{< lead >}}

Learn how to avoid duplication when creating a workflow by reusing existing workflows.

{{< /lead >}}

{{< mermaid >}}

flowchart TD

%% Comments
COMMENT1@{ shape: braces, label: "<i>Example:</i> Upload website code to hosting server." }

%% Class Definitions
classDef redclass fill:#EB4925
classDef redclasss stroke:#EB4925
classDef yellowclass stroke:#EBAC25
classDef greenclass stroke:#C7EB25

%% Workflows
WF1@{ shape: doc, label: "**Workflow 1**" }
WF2@{ shape: doc, label: "**Workflow 2**" }

%% Jobs
Job1WF1@{ shape: processes, label: "**Job 1**" }
Job1WF2@{ shape: processes, label: "**Job 1**" }
Job2WF2@{ shape: processes, label: "**Job 2**" }

    WF1:::redclass --> Job1WF1:::yellowclass
    WF2:::redclasss --> Job1WF2:::yellowclass
    
    Job1WF1 --> Steps1WF1[Steps]:::greenclass
    Job1WF2 --> Steps2WF2[Steps]:::greenclass

    Steps2WF2 --> Job2WF2:::redclass

    WF1 WF1-Job2WF2@----> Job2WF2
    WF1-Job2WF2@{ animate: true }

Steps1WF1 -.- COMMENT1

{{< /mermaid >}}

Reusable workflows are YAML-formatted files, very similar to any other workflow file. As with other workflow files, you locate reusable workflows in the `.github/workflows` directory of a repository. Subdirectories of the `workflows` directory are not supported.

{{< alert "triangle-exclamation" >}}
<b><font color=#EB4925>IMPORTANT</font></b>: 
For a workflow to be reusable, the values for `on` must include `workflow_call` (See below example).
{{< /alert >}}

📄 _File:_ cicd-gh-actions-course/.github/workflows/06-04-reusable-workflow.yml

{{< highlight YAML "linenos=table,hl_lines=2-3" >}}

name: 06-04 Reusable Workflow
on:
  workflow_call:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Output information
        run: |
          echo "This is a reusable workflow example."
          echo "You can add deployment steps here."

{{< /highlight >}}
### Using inputs and secrets in a reusable workflow

You can define inputs and secrets, which can be passed from the caller workflow and then used within the called workflow. There are three stages to using an input or a secret in a reusable workflow.

1. In the reusable workflow, use the `inputs` and `secrets` keywords to define inputs or secrets that will be passed from a caller workflow.
    
    ```yaml
    on:
      workflow_call:
        inputs:
          config-path:
            required: true
            type: string
        secrets:
          personal_access_token:
            required: true
    ```
    
    For details of the syntax for defining inputs and secrets, see [`on.workflow_call.inputs`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onworkflow_callinputs) and [`on.workflow_call.secrets`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onworkflow_callsecrets).
    
2. In the reusable workflow, reference the input or secret that you defined in the `on` key in the previous step.
    
    Note
    
    If the secrets are inherited by using `secrets: inherit` in the calling workflow, you can reference them even if they are not explicitly defined in the `on` key. For more information, see [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idsecretsinherit).
    
    ```yaml
    jobs:
      reusable_workflow_job:
        runs-on: ubuntu-latest
        steps:
        - uses: actions/labeler@v6
          with:
            repo-token: ${{ secrets.personal_access_token }}
            configuration-path: ${{ inputs.config-path }}
    ```
    
    In the example above, `personal_access_token` is a secret that's defined at the repository or organization level.
    
    Warning
    
    Environment secrets cannot be passed from the caller workflow as `on.workflow_call` does not support the `environment` keyword. If you include `environment` in the reusable workflow at the job level, the environment secret will be used, and not the secret passed from the caller workflow. For more information, see [Managing environments for deployment](https://docs.github.com/en/actions/deployment/targeting-different-environments/managing-environments-for-deployment#environment-secrets) and [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions#onworkflow_call).
    
3. Pass the input or secret from the caller workflow.
    
    To pass named inputs to a called workflow, use the `with` keyword in a job. Use the `secrets` keyword to pass named secrets. For inputs, the data type of the input value must match the type specified in the called workflow (either boolean, number, or string).
    
{{< highlight YAML "linenos=table,hl_lines=2-3" >}}

    jobs:
      call-workflow-passing-data:
        uses: octo-org/example-repo/.github/workflows/reusable-workflow.yml@main
        with:
          config-path: .github/labeler.yml
        secrets:
          personal_access_token: ${{ secrets.token }}

{{< /highlight >}}

   Workflows that call reusable workflows in the same organization or enterprise can use the `inherit` keyword to implicitly pass the secrets.

{{< highlight YAML "linenos=table,hl_lines=2-3" >}}

	    jobs:
	      call-workflow-passing-data:
	        uses: octo-org/example-repo/.github/workflows/reusable-workflow.yml@main
	        with:
	          config-path: .github/labeler.yml
	        secrets: inherit

{{< /highlight >}}

<font color=#EBAC25><i>More info:</i></font> [Reuse workflows](https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows)


---
## >> Sources <<

- Using conditions to control job execution: https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-jobs-with-conditions
- Contexts: https://docs.github.com/en/actions/reference/workflows-and-actions/contexts
- Operators: https://docs.github.com/en/actions/reference/workflows-and-actions/expressions#operators

**Matrix strategies:**

- [Running variations of jobs in a workflow](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations)
- [Reuse workflows](https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows)
## >> Disclaimer <<

{{< disclaimer_gh_actions_schwarzmueller >}}