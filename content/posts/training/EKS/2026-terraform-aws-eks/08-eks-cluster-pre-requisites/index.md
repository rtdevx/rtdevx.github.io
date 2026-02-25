---
title: Pre-requisites for building EKS Cluster in AWS
date: 2026-02-01
description: Pre-requisites, requirements and best practices for building EKS Cluster.
summary: Pre-requisites, requirements and best practices for building EKS Cluster.
draft: false
tags:
  - EKS
  - Terraform
categories:
  - DevOps
  - IaC
  - AWS
series: Terraform on AWS EKS
---
## EKS Cluster creation Options using Terraform

![](./assets/AWS_EKS_Cluster_Options.png "© Kalyan Reddy Daida, [StackSimplify](https://stacksimplify.com/)")

{{< lead >}}

EKS Cluster can be created using both, **Terraform Resources** or **Terraform Module** from Terraform Public Registry.

{{< /lead >}}
### Pre-requisites for building EKS Cluster

![](./assets/AWS_EKS_Cluster_Prereq.png "© Kalyan Reddy Daida, [StackSimplify](https://stacksimplify.com/)")
#### Pre-requisite Resources

- Subnets - Public and Private
- Route Tables
- NAT Gateway + Elastic IP
- Internet Gateway
#### EKS Resources

- EKS Cluster
	- EKS Cluster IAM Role
	- EKS Cluster Security Group (Attached to ENI)
	- EKS Cluster Network Interfaces (ENI)
	- EKS Cluster
- EKS Node Group
	- EKS Node Group IAM Role
	- EKS Node Group Security Group (Attached to ENI)
	- EKS Node Group Network Interfaces (ENI)
	- EKS Worker Nodes EC2 Instances

![](./assets/AWS_EKS_Cluster_Architecture.png "© Kalyan Reddy Daida, [StackSimplify](https://stacksimplify.com/)")

{{< alert "circle-info" >}}

_Note:_ 

- EKS Control Plane is managed by Amazon and is being built in separate VPC and under separate (Amazon's) account.
- Communication between the Control Plane is via EKS ENI (Elastic Network Interfaces) and controlled via Security Groups.

_Note:_

- Bastion Host is optional and will not be build in my example. Access to EC2 instances will be granted via **SSM Session Manager** and restricted to admins (or any other user group, as appropriate) and specific tags only.

_Note:_

- Both, Public and Private Worker Nodes are communicating with the Control Plane via the Internet (inside of AWS Cloud).

 {{< /alert >}}
## Elastic Network Interface (ENI)

When EKS Cluster is created, AWS creates ENI's that have EKS Cluster name in their description. 

Those Network Interfaces are created in our VPC, under our AWS account and they allow AWS Fargate and EC2 instances communicating with EKS Control Plane that lives in a separate VPC, in Amazon's Account.

The Amazon EKS also creates cluster Security Group attached to ENI's.

---
## >> Disclaimer <<

{{< disclaimer_terraform_on_AWS_EKS_26 >}}