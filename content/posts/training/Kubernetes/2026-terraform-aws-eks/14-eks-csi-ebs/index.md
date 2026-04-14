---
title: EKS EBS CSI Driver
date: 2026-02-04
description: Introduction to EKS Storage.
summary: Introduction to EKS Storage.
draft: false
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
Kubernetes **PODS** are **ephemeral** by nature. This means they do not store any information inside of the POD by default. Storage solution is required for the infrastructure to work.

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
## Kubernetes Storage Classes

A **Storage Class** provides a way for administrators to describe the _classes_ of storage they offer. Familiarity with [volumes](https://kubernetes.io/docs/concepts/storage/volumes/) and [persistent volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) is suggested.

{{< alert "circle-info" >}}

The Kubernetes concept of a storage class is similar to “**profiles**” in some other storage system designs.

{{< /alert >}}

<font color=#EBAC25><i>More info:</i></font> https://kubernetes.io/docs/concepts/storage/storage-classes/
## Persistent Volume Claims

<font color=#EB4925><b>Persistent Volume Claims</b> (PVC) must exist in the same namespace as the <b>POD</b> using the claim.</font> The cluster finds the claim in the Pod's namespace and uses it to get the Persistent Volume backing the claim.

{{< mermaid >}}

flowchart TD


    subgraph NS[Namespace]

        Pod[Pod]

        PVC[PersistentVolumeClaim]

    end
  
    subgraph CS[Cluster Scope]

        PV[PersistentVolume]

    end
 
    Storage[(Storage Backend)]
  
    Pod -->|Requests storage via PVC| PVC

    PVC -->|Binds to matching PV| PV

    PV -->|Provides physical storage| Storage

    Pod -->|Read/Write via mounted volume| PV

{{< /mermaid >}}
## Persistent Volumes

<font color=#EBAC25>A <b>Persistent Volume</b> (PV) is a piece of storage in the cluster that has been provisioned by an administrator or dynamically provisioned using <b>Storage Classes</b>.</font> It is a resource in the cluster just like a node is a cluster resource.

{{< mermaid >}}

sequenceDiagram

    participant Pod

    participant PVC as PersistentVolumeClaim

    participant PV as PersistentVolume

    participant Storage as Storage Backend

    Pod->>PVC: Request storage (claim)

    PVC->>PV: Bind to matching PersistentVolume

    PV->>Storage: Provide physical storage
 
    Pod->>PV: Read/Write data through mounted volume

{{< /mermaid >}}

Because **Persistent Volume** is a cluster resource, it belongs outside of any Namespace in the Kubernetes cluster - as opposite to **Persistent Volume Claims**.

<font color=#EBAC25><i>More info:</i></font> https://kubernetes.io/docs/concepts/storage/persistent-volumes/

---
## >> Sources <<

- Kubernetes Storage Documentation: https://kubernetes.io/docs/concepts/storage/
- Storage Classes: https://kubernetes.io/docs/concepts/storage/storage-classes/
- Persistent Volumes: https://kubernetes.io/docs/concepts/storage/persistent-volumes/
## >> Disclaimer <<

{{< disclaimer_terraform_on_AWS_EKS_26 >}}