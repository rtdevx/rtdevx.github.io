---
title: Other Compute Services
date: 2025-08-13
description: Other Compute Services in AWS
summary: Other Compute Services in AWS cloud...
draft: false
tags:
  - CLF-C02
categories: AWS
---
## Docker

**Docker** is a software development platform to deploy apps.

Apps are packaged in containers that can be run on any OS.

- Applications function in the same way, no matter where they're run
	- Any machine
	- No compatibility issues
	- Predictable behavior
	- Less work
	- Easier to maintain and deploy
- Scale containers up and down quickly (seconds)

Docker images are stored in Docker Repositories.

- Public: Docker Hub (https://hubl.docker.com)
- Private: Amazon ECR (<font color=#f43f5e>E</font>lastic <font color=#f43f5e>C</font>ontainer <font color=#f43f5e>R</font>egistry)
## ECS (Elastic Container Service)

**Amazon ECS** = <font color=#f43f5e>E</font>lastic <font color=#f43f5e>C</font>ontainer <font color=#f43f5e>S</font>ervice.

ECS allows launching Docker containers on AWS. It is an orchestrator.

- You must provision and maintain the infrastructure ([EC2]({{< ref "4-ec2" >}}) instances)
- AWS takes care of starting / stopping containers
- Has integrations with the [Application Load Balancer]({{< ref "9-elastic-load-balancing/#3-kinds-of-load-balancers-offered-by-aws" >}})

![](./assets/AWS_ECS_Solution.png)
## Fargate

- Launch Docker containers on AWS
- <font color=#10b981>Serverless</font>. No need to provision the infrastructure (no EC2 instances to manage)
- AWS runs the containers based on CPU / RAM needed
## ECR

- <font color=#f43f5e>E</font>lastic <font color=#f43f5e>C</font>ontainer <font color=#f43f5e>R</font>egistry
- Private Docker Registry on AWS
## Amazon EKS

Amazon EKS = <font color=#f43f5e>E</font>lastic <font color=#f43f5e>K</font>ubernetes <font color=#f43f5e>S</font>ervice.

Allows launching and managing Kubernetes clusters on AWS.

Kubernetes is an open-source system for management, deployment and scaling of containerized apps (Docker, Containerd).

**Containers can be hosted on:**

- EC2 instances
- Fargate
## Lambda

- <font color=#10b981>Virtual functions</font> - no servers to manage
- Limited by time - <font color=#10b981>short executions</font>
- Run <font color=#10b981>on-demand</font>
- <font color=#10b981>Scaling is automated</font>
### Benefits of Lambda

- Easy pricing:
	- Pay per request and compute time
- Integrated with the whole AWS suite of services
- <font color=#10b981>Event-Driven:</font> functions get invoked by AWS when needed
- Integrated with many programming languages
	- Node.js (JavaScript)
	- Python
	- Java
	- C# (.NET Core) / PowerShell
	- Ruby
	- Custom Runtime API (community supported, example Rust or Golang)
- Easy monitoring through [AWS CloudWatch]({{< ref "17-cloud-monitoring/#cloudwatch-metrics" >}})
- Easy to get more resources per functions (up to 10 GB of RAM)
- Increasing RAM will also improve CPU and Network

Lambda Container Image - although ECS / Fargate is preferred for running Docker images.

<font color=#10b981>Lambda pricing</font> is based on <font color=#f43f5e>calls</font> and <font color=#f43f5e>duration</font>.
## Amazon API Gateway

- Fully managed service for developers to easily create, publish, maintain, monitor and secure APIs
- <font color=#10b981>Serverless</font> and scalable
- Supports RESTful APIs and WebSocket APIs
- Support for security, user authentication, API throttling, API keys, monitoring
##### <font color=#f43f5e>Creating Serverless API</font> = API Gateway + Lambda. <font color=#f43f5e>Expose Lambda functions as HTTP API</font>.
## AWS Batch

- Fully managed batch processing at any scale
- Efficiently run 100,000s of computing batch jobs on AWS
- A "_batch_" job is a job with start and and end (opposed to continuous)
- <font color=#f1ef63>Batch will dynamically launch EC2 instances or Spot instances</font>
- AWS batch provisions the right amount of compute / memory
- You submit or schedule batch jobs and AWS Batch does the rest
- <font color=#f1ef63>Batch jobs are defined as Docker images and run on ECS</font>
- <font color=#f43f5e>Helpful for cost optimizations and focusing less on the infrastructure</font>
### Batch vs Lambda

- **Lambda**
	- Time limit
	- Limited runtimes
	- Limited temporary disk space
	- Serverless
- **Batch**
	- No time limit
	- Any runtime as long as it's packaged as a Docker image (no programming language dependency)
	- Rely on [EBS]({{< ref "6-storage/#ebs-volume" >}}) / [Instance Store]({{< ref "6-storage/#ec2-instance-store" >}}) for disk space
	- Relies on [EC2]({{< ref "4-ec2" >}}) (can be managed by AWS)
## Lightsail

- Virtual servers, [storage]({{< ref "6-storage" >}}), [databases]({{< ref "12-databases" >}}) and networking
- Low & predictable pricing
- Simpler alternative to using [EC2]({{< ref "4-ec2" >}}), [RDS]({{< ref "12-databases/#rds-and-aurora" >}}), [ELB]({{< ref "9-elastic-load-balancing" >}}), [EBS]({{< ref "6-storage/#ebs-volume" >}}), [Route53]({{< ref "15-aws-global-infrastructure/#route53" >}})
- Great for people with <font color=#10b981>little cloud experience</font>
- Can setup notifications and monitoring of your Lightsail resources
- <font color=#f1ef63>Use cases:</font>
	- Simple web applications
	- Websites
	- Dev / Test environment
- Has High Availability but no auto scaling, limited AWS integrations
## Summary

- <font color=#f1ef63>Docker:</font> container technology to run applications
- <font color=#f1ef63>ECS:</font> run Docker container on EC2 instances
- <font color=#f1ef63>Fargate:</font>
	- Run Docker containers without provisioning the infrastructure
	- Serverless offering (no EC2 instances)
- <font color=#f1ef63>ECR:</font> Private Docker Images Repository
- <font color=#f1ef63>EKS:</font> Allows launching and managing Kubernetes clusters on AWS (hosted on: EC2 instances OR Fargate)
- <font color=#f1ef63>Batch:</font> run batch jobs on AWS across managed EC2 instances
- <font color=#f1ef63>Lightsail:</font> predictable & low pricing for simple application & DB stacks
- <font color=#f1ef63>Lambda:</font>
	- Serverless, Function as a Service, seamless scaling, reactive
	- Lambda Billing:
		- By the time run x by the RAM provisioned
		- By the number of invocations
	- Language support: many programming languages except (arbitrary) Docker
	- Invocation time: up to 15 minutes
- <font color=#f1ef63>API Gateway:</font> expose Lambda functions as HTTP API

---
## >> Sources <<

- ECS Documentation: https://docs.aws.amazon.com/ecs/
## >> References <<

- [EC2]({{< ref "4-ec2" >}})
## >> Table of contents (CLF-C02) <<

|                                                                         |                                                                                     |                                                                                       |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [1. What is Cloud Computing]({{< ref "1-what-is-cloud-computing" >}})   | [2. IAM]({{< ref "2-iam" >}})                                                       | [3. Budget]({{< ref "3-budget" >}})                                                   |
| [4. EC2]({{< ref "4-ec2" >}})                                           | [5. Security Groups]({{< ref "5-security-groups" >}})                               | [6. Storage]({{< ref "6-storage" >}})                                                 |
| [7. AMI]({{< ref "7-ami" >}})                                           | [8. Scalability & High Availability]({{< ref "8-scalability-high-availability" >}}) | [9. Elastic Load Balancing]({{< ref "9-elastic-load-balancing" >}})                   |
| [10. Auto Scaling Group]({{< ref "10-auto-scaling-groups" >}})          | [11. S3]({{< ref "11-s3" >}})                                                       | [12. Databases]({{< ref "12-databases" >}})                                           |
| [13. Other Compute Services]({{< ref "13-other-compute-services" >}})   | [14. Deployments]({{< ref "14-deployments" >}})                                     | [15. AWS Global Infrastructure]({{< ref "15-aws-global-infrastructure" >}})           |
| [16. Cloud Integrations]({{< ref "16-cloud-integrations" >}})           | [17. Cloud Monitoring]({{< ref "17-cloud-monitoring" >}})                           | [18. VPC]({{< ref "18-vpc" >}})                                                       |
| [19. Security and Compliance]({{< ref "19-security-and-compliance" >}}) | [20. Machine Learning]({{< ref "20-machine-learning" >}})                           | [21. Account Management and Billing]({{< ref "21-account-management-and-billing" >}}) |
| [22. Advanced Identity]({{< ref "22-advanced-identity" >}})             | [23. Other Services]({{< ref "23-other-services" >}})                               | [24. AWS Architecting & Ecosystem]({{< ref "24-aws-architecting-cosystem" >}})        |
|                                                                         | [25. Preparing for AWS Practitioner exam]({{< ref "25-preparing-for-the-exam" >}})  |                                                                                       |
## >> Disclaimer <<

{{< alert >}}
_Disclaimer: Content for educational purposes only, no rights reserved._

Most of the content in this series is coming from **Stephane Maarek's** [Ultimate AWS Certified Cloud Practitioner CLF-C02 2025](https://www.udemy.com/course/aws-certified-cloud-practitioner-new/) course on Udemy.

I highly encourage you to take the [Stephane's courses](https://www.udemy.com/user/stephane-maarek/) as they are awesome and really help understanding the subject.

_More about Stephane Maarek:_

- https://www.linkedin.com/in/stephanemaarek
- https://x.com/stephanemaarek

**This article is just a summary and has been published to help me learning and passing the practitioner exam.**
{{< /alert >}}
