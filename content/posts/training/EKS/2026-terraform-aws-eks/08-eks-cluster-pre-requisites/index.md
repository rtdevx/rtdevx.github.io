---
title: "EKS: Pre-requisites for building Cluster in AWS"
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

<font color=#EBAC25><i>Note:</i></font>

- EKS Control Plane is managed by Amazon and is being built in separate VPC and under separate (Amazon's) account.
- Communication between the Control Plane is via EKS ENI (Elastic Network Interfaces) and controlled via Security Groups.

<font color=#EBAC25><i>Note:</i></font>

- Bastion Host is optional and will not be build in my example. Access to EC2 instances will be granted via **SSM Session Manager** and restricted to admins (or any other user group, as appropriate) and specific tags only.

<font color=#EBAC25><i>Note:</i></font>

- Both, Public and Private Worker Nodes are communicating with the Control Plane via the Internet (inside of AWS Cloud).

 {{< /alert >}}
 
![](./assets/AWS_EKS_Core_Objects.png "© Kalyan Reddy Daida, [StackSimplify](https://stacksimplify.com/)")
## Elastic Network Interface (ENI)

When EKS Cluster is created, AWS creates ENI's that have EKS Cluster name in their description. 

Those Network Interfaces are created in our VPC, under our AWS account and they allow AWS Fargate and EC2 instances communicating with EKS Control Plane that lives in a separate VPC, in Amazon's Account.

The Amazon EKS also creates cluster Security Group attached to ENI's.
## kubectl

### Installation

{{< alert "circle-info" >}}

<font color=#EB4925>You must</font> use a **kubectl** version that is within one minor version difference of your Amazon EKS cluster control plane. For example, a _1.34_ kubectl client works with Kubernetes _1.33_, _1.34_, and _1.35_ clusters.

{{< /alert >}}

Windows (curl):

```shell
curl.exe -LO "https://dl.k8s.io/release/v1.35.0/bin/windows/amd64/kubectl.exe"

kubectl version --client
```

Detailed installation steps for Windows, Linux and MacOs here: 

- https://kubernetes.io/docs/tasks/tools/#kubectl
- https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html
### Configuration

```shell
# Configure kubeconfig for kubectl
aws eks --region <region-code> update-kubeconfig --name <cluster_name>
aws eks --region eu-central-1 update-kubeconfig --name ops-dev-eks-ekscluster

# List Worker Nodes
kubectl get nodes
kubectl get nodes -o wide

# Verify Services
kubectl get svc
```
### Verify Namespaces and Resources in Namespaces

```shell
# Verify Namespaces
kubectl get namespaces
kubectl get ns
 
Observation: namespaces will be listed by default
1. kube-node-lease
2. kube-public
3. default
4. kube-system

# Verify Resources in kube-node-lease namespace
kubectl get all -n kube-node-lease

# Verify Resources in kube-public namespace
kubectl get all -n kube-public

# Verify Resources in default namespace
kubectl get all -n default

Observation: 
1. Kubernetes Service: Cluster IP Service for Kubernetes Endpoint

# Verify Resources in kube-system namespace
kubectl get all -n kube-system

Observation: 
1. Kubernetes Deployment: coredns
2. Kubernetes DaemonSet: aws-node, kube-proxy
3. Kubernetes Service: kube-dns
4. Kubernetes Pods: coredns, aws-node, kube-proxy
```
### Verify pods in kube-system namespace

```shell
# Verify System pods in kube-system namespace
kubectl get pods # Nothing in default namespace
kubectl get pods -n kube-system
kubectl get pods -n kube-system -o wide

# Verify Daemon Sets in kube-system namespace
kubectl get ds -n kube-system

Observation: The below two daemonsets will be running
1. aws-node
2. kube-proxy

# Describe aws-node Daemon Set
kubectl describe ds aws-node -n kube-system

Observation: 
1. Reference "Image" value it will be the ECR Registry URL 

# Describe kube-proxy Daemon Set
kubectl describe ds kube-proxy -n kube-system

Observation:
1. Reference "Image" value it will be the ECR Registry URL 

# Describe coredns Deployment
kubectl describe deploy coredns -n kube-system
```

---
## >> Sources <<

Provision an EKS cluster (AWS) using Terraform: https://developer.hashicorp.com/terraform/tutorials/kubernetes/eks
## >> Disclaimer <<

{{< disclaimer_terraform_on_AWS_EKS_26 >}}