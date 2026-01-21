---
title: "GitHub Actions: OpenID Connect"
date: 2025-11-20
description: OpenID Connect allows your workflows to exchange short-lived tokens directly from your cloud provider.
summary: OpenID Connect allows your workflows to exchange short-lived tokens directly from your cloud provider.
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
{{< lead >}}
**OpenID Connect** allows your workflows to **exchange short-lived tokens** directly from your **cloud provider**.
{{< /lead >}}

| <font color=#EB4925>External Resources</font> »                             |                                                                           |                                  |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------- |
| [GitHub Actions official Documentation](https://docs.github.com/en/actions) | [GitHub Actions Marketplace](https://github.com/marketplace?type=actions) | [GitHub.com](https://github.com) |
## Benefits of using OIDC

By updating your workflows to use OIDC tokens, you can adopt the following good security practices:

- **No cloud secrets:** You won't need to duplicate your cloud credentials as long-lived GitHub secrets. Instead, you can configure the OIDC trust on your cloud provider, and then update your workflows to request a short-lived access token from the cloud provider through OIDC.
- **Authentication and authorization management:** You have more granular control over how workflows can use credentials, using your cloud provider's authentication (authN) and authorization (authZ) tools to control access to cloud resources.
- **Rotating credentials:** With OIDC, your cloud provider issues a short-lived access token that is only valid for a single job, and then automatically expires.
## How OIDC integrates with GitHub Actions

The following diagram gives an overview of how GitHub's OIDC provider integrates with your workflows and cloud provider:

{{< mermaid >}}

sequenceDiagram
    participant GitHub Actions Workflow
    participant GitHub OIDC Provider
    participant Cloud Provider
    participant Cloud Resources

    GitHub Actions Workflow->>GitHub OIDC Provider: Request OIDC Token
    GitHub OIDC Provider-->>GitHub Actions Workflow: Return JWT (OIDC Token)

    GitHub Actions Workflow->>Cloud Provider: Send JWT + Cloud Role ID
    Cloud Provider->>Cloud Provider: Validate JWT via OIDC Trust
    Cloud Provider-->>GitHub Actions Workflow: Return Access Token

    GitHub Actions Workflow->>Cloud Resources: Use Access Token to access resources

{{< /mermaid >}}

1. You establish an OIDC trust relationship in the cloud provider, allowing specific GitHub workflows to request cloud access tokens on behalf of a defined cloud role.
2. Every time your job runs, GitHub's OIDC provider auto-generates an OIDC token. This token contains multiple claims to establish a security-hardened and verifiable identity about the specific workflow that is trying to authenticate.
3. A step or action in the workflow job can request a token from GitHub’s OIDC provider, which can then be presented to the cloud provider as proof of the workflow’s identity.
4. Once the cloud provider successfully validates the claims presented in the token, it then provides a short-lived cloud access token that is available only for the duration of the job.

<font color=#EBAC25><i>Source:</i></font> https://docs.github.com/en/actions/concepts/security/openid-connect

{{< alert "circle-info" >}}
Using **OpenID Connect** with **GitHub Actions** ensures that credentials are being **requested dynamically** by **GitHub Actions** and are not hardcoded. Those credentials are <font color=#EB4925>restricted to actions that are being executed</font> as oppose to storing cloud access credentials in GitHub actions.
{{< /alert >}}
## OIDC in AWS

{{< lead >}}
Use **OpenID Connect** within your workflows to **authenticate with Amazon Web Services**.
{{< /lead >}}

OpenID Connect (OIDC) allows your GitHub Actions workflows to access resources in Amazon Web Services (AWS), without needing to store the AWS credentials as long-lived GitHub secrets.

Example `Get AWS permissions` **GitHub Action** o assume an **IAM** role.

```YAML
      - name: Get AWS permissions
        uses: aws-actions/configure-aws-credentials@v1
        with:
          role-to-assume: arn:aws:iam::450226343468:role/GitHubDemo1 # Role ARN
          aws-region: us-east-1 # Location of the S3 Bucket
```

ℹ️ _Note:_ Refer to below documentation to set up OIDC in AWS:

<font color=#EBAC25><i>More Information:</i></font> 

- [Configuring OpenID Connect in Amazon Web Services](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws)
- [Create an OpenID Connect (OIDC) identity provider in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html)
## Example Code

- Deploy IAM Role and OIDC Provider

https://github.com/rtdevx/terraform-core/tree/main/aws-oidc

- GitHub Actions Workflow to generate OIDC (using above configured IAM Role and OIDC Provider)

```YAML
name: Terraform AWS GH1 Build - DEV

# NOTE: Fetch AWS Credentials

on:
  workflow_dispatch:
permissions:
  id-token: write
  contents: read

defaults:
  run:
    shell: bash
    working-directory: ./terraform-manifests

jobs:
  iac-aws-gh1-build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Configure AWS Credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::390157243794:role/tf-core-oidcRole
          aws-region: eu-west-2 # NOTE: STS API endpoint that GitHub Actions calls to assume the role is regional. Region must match where OIDC Provider have been deployed (terraform-core/aws-oidc/c5-oidc-provider.tf)
```

---
## >> Sources <<

- [OpenID Connect](https://docs.github.com/en/actions/concepts/security/openid-connect)
- [Configuring OpenID Connect in Amazon Web Services](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws)
- [Create an OpenID Connect (OIDC) identity provider in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html)

**More On GitHub Actions Security:**

- General overview & important concepts: [https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)    
- More on Secrets: [https://docs.github.com/en/actions/security-guides/encrypted-secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)    
- Using `GITHUB_TOKEN`: [https://docs.github.com/en/actions/security-guides/automatic-token-authentication](https://docs.github.com/en/actions/security-guides/automatic-token-authentication)    
- Advanced - Preventing Fork Pull Requests Attacks: [https://securitylab.github.com/research/github-actions-preventing-pwn-requests/](https://securitylab.github.com/research/github-actions-preventing-pwn-requests/)    
- Security Hardening with OpenID Connect: [https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
## >> Disclaimer <<

{{< disclaimer_gh_actions_schwarzmueller >}}