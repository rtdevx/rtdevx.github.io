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

<font color=#EBAC25><i>More info:</i></font>
- Using conditions to control job execution: https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-jobs-with-conditions
- Contexts: https://docs.github.com/en/actions/reference/workflows-and-actions/contexts
- Operators: https://docs.github.com/en/actions/reference/workflows-and-actions/expressions#operators

- Running Jobs with a Matrix
- Re-Using Workflows

---
## >> Sources <<

- Using conditions to control job execution: https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-jobs-with-conditions
- Contexts: https://docs.github.com/en/actions/reference/workflows-and-actions/contexts
- Operators: https://docs.github.com/en/actions/reference/workflows-and-actions/expressions#operators
## >> Disclaimer <<

{{< disclaimer_gh_actions_schwarzmueller >}}