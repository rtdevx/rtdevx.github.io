---
title: EKS IAM Roles for Service Accounts (IRSA)
date: 2026-02-03
description: AWS EKS IAM Roles for Service Accounts (IRSA).
summary: AWS EKS IAM Roles for Service Accounts (IRSA).
draft: false
tags:
  - EKS
categories:
  - DevOps
  - AWS
  - Containers
series: AWS EKS
---
{{< alert "circle-info" >}}

**IRSA** is quite difficult but fundamental concept for EKS. I will keep updating this article with more information as I move along.

{{< /alert >}}
## Introduction to IRSA

{{< lead >}}

Applications in a Pod’s containers can use an AWS SDK or the AWS CLI to make API requests to AWS services using AWS Identity and Access Management (IAM) permissions. 

<font color=#EBAC25>Applications must sign their AWS API requests with AWS credentials. IAM roles for service accounts (IRSA) provide the ability to manage credentials for your applications, similar to the way that Amazon EC2 instance profiles provide credentials to Amazon EC2 instances.</font>

<font color=#EBAC25>Instead of creating and distributing your AWS credentials to the containers or using the Amazon EC2 instance’s role, you associate an IAM role with a Kubernetes service account and configure your Pods to use the service account.</font>

_Source:_ https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html

{{< /lead >}}

Many resources (LB, CSI Controllers, etc) depend on this concept.
## How o access AWS Services from Workloads running in EKS Cluster?

Jobs and PODS need to access services from AWS EKS Cluster.

![](./assets/AWS_EKS_IRSA_1.png "© Kalyan Reddy Daida, [StackSimplify](https://stacksimplify.com/)")
## Why do Kubernetes Workloads need to access AWS Services?

![](./assets/AWS_EKS_IRSA_2.png "© Kalyan Reddy Daida, [StackSimplify](https://stacksimplify.com/)")
## Key Items for IRSA Implementation

**AWS:**

- AWS IAM Identity Provider
- AWS *STS AssumeRoleWithWebIdentity* API operation
- AWS IAM Temporary Role Credentials

**Kubernetes:**

- EKS Cluster OpenID Connect Provider
- Kubernetes Service Accounts
- Kubernetes *ProjectedServiceAccountToken* feature (OIDC JSON Web Token)

Whenever EKS Cluster is created, OpenID Connect URL is also created (see below). This means that EKS Cluster can act as OpenID connect provider.

![](./assets/AWS_EKS_IRSA_3.png "© Kalyan Reddy Daida, [StackSimplify](https://stacksimplify.com/)")
### EKS Cluster OpenID Connect Configuration Endpoint

*https://< EKS Cluster OpenID Connect provider URL >/.well-known/openid-configuration*

![](./assets/AWS_EKS_IRSA_4_EndPoint.png "© Kalyan Reddy Daida, [StackSimplify](https://stacksimplify.com/)")
## AWS IAM Identity Provider

![](./assets/AWS_EKS_IRSA_5_IAM_Identity_Provider_1.png "© Kalyan Reddy Daida, [StackSimplify](https://stacksimplify.com/)")

![](./assets/AWS_EKS_IRSA_5_IAM_Identity_Provider_2.png "© Kalyan Reddy Daida, [StackSimplify](https://stacksimplify.com/)")

When **AWS IAM Identity Provider** is configured, identities from EKS Cluster will be able to consume AWS Services.
## AWS IAM Roles for Kubernetes Service Accounts

- K8s Service Account
- IAM Role with STS (Secure Token Services) IAM Policy attached to access the resources

![](./assets/AWS_EKS_IRSA_6.png "© Kalyan Reddy Daida, [StackSimplify](https://stacksimplify.com/)")

**K8s Service Account** will assume **IAM Role** to get **Temporary Credentials** when running a Job to list content of S3 bucket.
## IRSA - Functional flow

![](./assets/AWS_EKS_IRSA_flow.png "© Kalyan Reddy Daida, [StackSimplify](https://stacksimplify.com/)")

EKS Cluster is acting as an external Identity Provider to AWS IAM.

- K8s Service account is assuming an IAM role with policy attached via _AssumeRoleWithWebIdentity_ API
- K8s Service account runs a Job in a POD
- K8s Service account is sending JWT Token request
- JWT is sent to STS and allows to assume the role via _AssumeRoleWihWebIdentity_ API
- AWS STS generates temporary IAM credentials
- Access to S3 bucket is granted based on temporary credentials and according to IAM Role / policy permissions

---
## >> Sources <<

- Udemy: https://www.udemy.com/course/terraform-on-aws-eks-kubernetes-iac-sre-50-real-world-demos/learn/lecture/30316166#overview
- AWS: https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html
## >> Disclaimer <<

{{< disclaimer_terraform_on_AWS_EKS_26 >}}