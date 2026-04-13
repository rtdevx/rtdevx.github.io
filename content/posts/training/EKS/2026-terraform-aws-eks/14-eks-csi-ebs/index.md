---
title: EKS EBS CSI Driver
date: 2026-02-04
description: Introduction to EKS Storage.
summary: Introduction to EKS Storage.
draft: true
tags:
  - EKS
  - Storage
categories:
  - DevOps
  - AWS
  - Containers
series: AWS EKS
---
{{< lead >}}
AWS **EBS Container Storage Interface (CSI)** driver allows **EKS Clusters** to manage the **lifecycle** of EBS volumes for persistent volumes in k8s (Create / Resize / Delete volumes).
{{< /lead >}}
## AWS Elastic Block Store - Introduction

- [EBS]({{< ref "6-storage/#ebs-volume" >}}) provides <font color=#EBAC25>block level storage volumes</font> for use with [EC2]({{< ref "4-ec2" >}}) & Container instances
- We can mount these volumes as devices on our [EC2]({{< ref "4-ec2" >}}) & Container instances
- [EBS]({{< ref "6-storage/#ebs-volume" >}}) volumes that are attached to an instance are <font color=#EBAC25>exposed as storage volumes that persist independently from the life of the EC2 or Container instance</font>
- We can dynamically change the configuration of a volume attached to an instance
- AWS recommends [EBS]({{< ref "6-storage/#ebs-volume" >}}) for data that must be quickly accessible and requires long-term persistence
- [EBS]({{< ref "6-storage/#ebs-volume" >}}) is well sited to both database-style applications that rely on random reads and writes, and to throughput-intensive applications that perform long, continuous reads and writes

![](./assets/AWS_EKS_CSI_Driver.png "© Kalyan Reddy Daida, [StackSimplify](https://stacksimplify.com/)")



---
## >> Sources <<


## >> Disclaimer <<

{{< disclaimer_terraform_on_AWS_EKS_26 >}}