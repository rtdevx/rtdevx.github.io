---
title: "EKS: Kubernetes PODs"
date: 2026-02-03
description: A Kubernetes Pod is the smallest deployable unit in Kubernetes, consisting of one or more containers that share storage and network resources.
summary: A Kubernetes Pod is the smallest deployable unit in Kubernetes, consisting of one or more containers that share storage and network resources.
draft: true
tags:
  - Terraform
  - EKS
categories:
  - DevOps
  - IaC
  - AWS
  - Containers
series: Terraform on AWS EKS
---
{{< lead >}}

**PODs** are the smallest deployable units of computing that you can create and manage in Kubernetes.

A **POD** (as in a pod of whales or pea pod) is a group of one or more containers, with shared storage and network resources, and a specification for how to run the containers. 

A **POD**'s contents are always co-located and co-scheduled, and run in a shared context. A **POD** models an application-specific "logical host": it contains one or more application containers which are relatively tightly coupled. 

{{< /lead >}}

{{< alert "circle-info" >}}

**Kubernetes** does not deploy containers directly on the worker nodes. Container is encapsulated into a Kubernetes Object, named **POD**. A **POD** is a single instance of an application.

{{< /alert >}}



---
## >> Sources <<


## >> Disclaimer <<

{{< disclaimer_terraform_on_AWS_EKS_26 >}}