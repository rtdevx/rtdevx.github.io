---
title: "Solutions Architect: Containers on AWS"
date: 2026-04-09
description: Associate-level extension of the `Other Compute Services` Section from AWS Cloud Practitioner Series.
summary: Associate-level extension of the `Other Compute Services` Section from AWS Cloud Practitioner Series.
draft: false
tags:
  - SAA-C03
  - Docker
  - ECS
  - ECR
  - EKS
  - Fargate
  - kubernetes
  - Serverless
  - ASG
  - Scalability
  - HighAvailability
  - LoadBalancing
categories:
  - AWS
  - Containers
series: AWS Solution Architect
---
---
ℹ️ **Associate‑level extension** of the [Other Compute Services]({{< ref "13-other-compute-services" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series.

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |

## Introduction

**Introduction to Containers** was covered in [Other Compute Services (ECS, EKS, Lambda)]({{< ref "13-other-compute-services" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series:

|                                                            |                                                                               |                                                             |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Docker]({{< ref "13-other-compute-services/#docker" >}})  | [ECS]({{< ref "13-other-compute-services/#ecs-elastic-container-service" >}}) | [Fargate]({{< ref "13-other-compute-services/#fargate" >}}) |
| [EKS]({{< ref "13-other-compute-services/#amazon-eks" >}}) | [ECR]({{< ref "13-other-compute-services/#ecr" >}})                           | [Lambda]({{< ref "13-other-compute-services/#lambda" >}})   |

### Docker Containers Management on AWS

- **Amazon ECS:** AWS’s native container orchestration platform    
- **Amazon EKS:** Managed Kubernetes service based on open‑source Kubernetes    
- **AWS Fargate:** Serverless compute engine for running containers with ECS or EKS    
- **Amazon ECR:** Managed registry for storing container images
## ECS

{{< lead >}}

**Amazon ECS is AWS’s native container orchestration service** that lets you run, scale, and **manage Docker containers** across a cluster of EC2 instances or using serverless Fargate.

{{< /lead >}}
### ECS - EC2 Launch Type

- ECS (Elastic Container Service) runs your Docker containers as **ECS tasks** on an ECS cluster    
- With the **EC2 launch type**, you provision and manage the underlying EC2 instances yourself    
- Each EC2 instance must run the **ECS agent** so it can register with the cluster    
- ECS handles starting and stopping containers on those instances

![](./assets/AWS_ECS_Launch_Type_EC2.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### ECS - Fargate Launch Type

- Run Docker containers on AWS without managing any EC2 instances    
- Fully **serverless** — no infrastructure to provision or maintain    
- You define task definitions, and AWS runs the tasks with the CPU/RAM you specify    
- Scaling is simple: just increase the number of tasks, with no EC2 capacity to worry about

![](./assets/AWS_ECS_Launch_Type_Fargate.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### ECS - IAM Roles for ECS

- **EC2 Instance Profile** (EC2 launch type only):    
    - Used by the ECS agent        
    - Allows the agent to call ECS APIs        
    - Sends container logs to CloudWatch Logs        
    - Pulls container images from ECR        
    - Accesses secrets from Secrets Manager or SSM Parameter Store
        
- **ECS Task Role:**    
    - Assigns a specific IAM role to each task        
    - Lets different ECS services use different permissions        
    - Defined directly in the task definition

![](./assets/AWS_ECS_Launch_Type_IAM.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### ECS - Load Balancer Integrations

- **Application Load Balancer** supported and works for most use cases
- **Network Load Balancer** recommended only for high throughput / high performance use cases, or to pair it with AWS Private Link
- **Classic Load Balancer** <font color=#EB4925>supported but not recommended</font> (no advanced features – no Fargate)
### ECS - Data Volumes (EFS)

- Mount EFS file systems onto ECS tasks
- <font color=#C7EB25>Works for both EC2 and Fargate</font> launch types
- Tasks running in any AZ will share the same data in the EFS file system

- <font color=#C7EB25>Fargate</font> + <font color=#C7EB25>EFS</font> = <font color=#C7EB25>Serverless</font>
 
- Use cases: persistent multi-AZ shared storage for your containers

- ‼️ _Note:_
	- <font color=#EB4925>Amazon S3 cannot be mounted as a file system</font>
### ECS - Auto Scaling

#### Fargate Auto Scaling

- Automatically adjusts the number of running ECS tasks    
- Uses **Application Auto Scaling**    
- Can scale on:    
    - **CPU utilization**        
    - **Memory utilization**        
    - **ALB request count per target**
        
- Supports:    
    - **Target Tracking** (scale to a metric target)        
    - **Step Scaling** (based on CloudWatch alarms)        
    - **Scheduled Scaling** (time‑based, predictable changes)
        
- Much simpler to configure because there are **no EC2 instances** to manage
#### EC2 Auto Scaling

- Scaling ECS tasks may require adding more **EC2 instances** underneath    
- Uses an **Auto Scaling Group (ASG)** to grow or shrink EC2 capacity    
- ASG can scale on metrics like **CPU utilization**    
- **ECS Capacity Providers** integrate the ASG with ECS    
    - Automatically provisions EC2 instances when tasks need more CPU/RAM        
    - Ensures the cluster has enough capacity for scheduled or scaled‑out tasks

<font color=#EBAC25><i>More info:</i></font> 
- [Amazon Elastic Container Service](https://aws.amazon.com/ecs/)
- [Amazon Elastic Container Service Documentation](https://docs.aws.amazon.com/ecs/)

---
## >> Sources <<

**ECS:**
- [Amazon Elastic Container Service](https://aws.amazon.com/ecs/)
- [Amazon Elastic Container Service Documentation](https://docs.aws.amazon.com/ecs/)
## >> References <<

**Cloud Practitioner:** 
- [Other Compute Services]({{< ref "13-other-compute-services" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}