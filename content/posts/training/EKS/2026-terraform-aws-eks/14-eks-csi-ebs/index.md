---
title: EKS EBS CSI Driver
date: 2026-02-04
description: Introduction to EKS Storage.
summary: Introduction to EKS Storage.
draft: true
tags:
  - EKS
categories:
  - DevOps
  - AWS
  - Containers
series: AWS EKS
---
{{< lead >}}
AWS **EBS Container Storage Interface (CSI)** driver allows **EKS Clusters** to manage the **lifecycle** of [EBS]({{< ref "training/aws/2025-aws-cloud-practitioner/6-storage/#ebs-volume" >}}) volumes for persistent volumes in k8s (Create / Resize / Delete volumes).
{{< /lead >}}
## AWS Elastic Block Store - Introduction

- EBS provides <font color=#EBAC25>block level storage volumes</font> for use with EC2 & Container instances
- We can mount these volumes as devices on our EC2 & Container instances
- EBS volumes that are attached to an instance are <font color=#EBAC25>exposed as storage volumes that persist independently from the life of the EC2 or Container instance</font>
- We can dynamically change the configuration of a volume attached to an instance
- AWS recommends EBS for data that must be quickly accessible and requires long-term persistence
- EBS is well sited to both database-style applications that rely on random reads and writes, and to throughput-intensive applications that perform long, continuous reads and writes

---
## >> Sources <<


## >> Disclaimer <<

{{< disclaimer_terraform_on_AWS_EKS_26 >}}