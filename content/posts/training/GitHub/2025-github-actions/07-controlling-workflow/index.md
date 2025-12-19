---
title: "GitHub Actions: Controlling Workflow and Job Execution"
date: 2025-11-11
description: Controlling Workflow & Job Execution in GitHub Actions.
summary: Controlling Workflow & Job Execution in GitHub Actions.
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

{{< highlight html "linenos=table,hl_lines=17 21 " >}}

```YAML
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
```

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
{{< highlight html "linenos=table,hl_lines=5 " >}}

```YAML
  build:
    needs: test
    # run this job even if the test job fails
    if: ${{ always() }}
    runs-on: ubuntu-latest
    steps:
      - name: Get code
        uses: actions/checkout@v3
```

{{< /highlight >}}

<ins><i>Example:</i></ins> report job depends on lint and deploy jobs (`needs: [lint, deploy]`). It will still run if any of the jobs fails.

![](./assets/job-execution-flow.png)

{{< alert "triangle-exclamation" >}}
`continue-on-error: true` changes the behaviour and sets the failed job to successful, even if it failed. Can be used for jobs that are allowed to fail.

Check [contexts](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts) for more information.

<font color=#EBAC25><i>Hint:</i></font>

|   |   |   |
|---|---|---|
|`steps.<step_id>.conclusion`|`string`|The result of a completed step after [`continue-on-error`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepscontinue-on-error) is applied. Possible values are `success`, `failure`, `cancelled`, or `skipped`. When a `continue-on-error` step fails, the `outcome` is `failure`, but the final `conclusion` is `success`.|
|`steps.<step_id>.outcome`|`string`|The result of a completed step before [`continue-on-error`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepscontinue-on-error) is applied. Possible values are `success`, `failure`, `cancelled`, or `skipped`. When a `continue-on-error` step fails, the `outcome` is `failure`, but the final `conclusion` is `success`.|

{{< /alert >}}

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

<font color=#EBAC25><i>More info:</i></font> [Running variations of jobs in a workflow](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations)

- Re-Using Workflows

---
## >> Sources <<

- Using conditions to control job execution: https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-jobs-with-conditions
- Contexts: https://docs.github.com/en/actions/reference/workflows-and-actions/contexts
- Operators: https://docs.github.com/en/actions/reference/workflows-and-actions/expressions#operators

Matrix strategies:

- [Running variations of jobs in a workflow](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/run-job-variations)
## >> Disclaimer <<

{{< disclaimer_gh_actions_schwarzmueller >}}