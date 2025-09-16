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
- Private: Amazon ECR (<font color=#EB4925>E</font>lastic <font color=#EB4925>C</font>ontainer <font color=#EB4925>R</font>egistry)
## ECS (Elastic Container Service)

**Amazon ECS** = <font color=#EB4925>E</font>lastic <font color=#EB4925>C</font>ontainer <font color=#EB4925>S</font>ervice.

ECS allows launching Docker containers on AWS. It is an orchestrator.

- You must provision and maintain the infrastructure ([EC2]({{< ref "4-ec2" >}}) instances)
- AWS takes care of starting / stopping containers
- Has integrations with the [Application Load Balancer]({{< ref "9-elastic-load-balancing/#3-kinds-of-load-balancers-offered-by-aws" >}})

![](./assets/AWS_ECS_Solution.png)
## Fargate

- Launch Docker containers on AWS
- <font color=#C7EB25>Serverless</font>. No need to provision the infrastructure (no EC2 instances to manage)
- AWS runs the containers based on CPU / RAM needed
## ECR

- <font color=#EB4925>E</font>lastic <font color=#EB4925>C</font>ontainer <font color=#EB4925>R</font>egistry
- Private Docker Registry on AWS
## Amazon EKS

Amazon EKS = <font color=#EB4925>E</font>lastic <font color=#EB4925>K</font>ubernetes <font color=#EB4925>S</font>ervice.

Allows launching and managing Kubernetes clusters on AWS.

Kubernetes is an open-source system for management, deployment and scaling of containerized apps (Docker, Containerd).

**Containers can be hosted on:**

- EC2 instances
- Fargate
## Lambda

- <font color=#C7EB25>Virtual functions</font> - no servers to manage
- Limited by time - <font color=#C7EB25>short executions</font>
- Run <font color=#C7EB25>on-demand</font>
- <font color=#C7EB25>Scaling is automated</font>
### Benefits of Lambda

- Easy pricing:
	- Pay per request and compute time
- Integrated with the whole AWS suite of services
- <font color=#C7EB25>Event-Driven:</font> functions get invoked by AWS when needed
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

<font color=#C7EB25>Lambda pricing</font> is based on <font color=#EB4925>calls</font> and <font color=#EB4925>duration</font>.
## Amazon API Gateway

- Fully managed service for developers to easily create, publish, maintain, monitor and secure APIs
- <font color=#C7EB25>Serverless</font> and scalable
- Supports RESTful APIs and WebSocket APIs
- Support for security, user authentication, API throttling, API keys, monitoring
##### <font color=#EB4925>Creating Serverless API</font> = API Gateway + Lambda. <font color=#EB4925>Expose Lambda functions as HTTP API</font>.
## AWS Batch

- Fully managed batch processing at any scale
- Efficiently run 100,000s of computing batch jobs on AWS
- A "_batch_" job is a job with start and and end (opposed to continuous)
- <font color=#EBAC25>Batch will dynamically launch EC2 instances or Spot instances</font>
- AWS batch provisions the right amount of compute / memory
- You submit or schedule batch jobs and AWS Batch does the rest
- <font color=#EBAC25>Batch jobs are defined as Docker images and run on ECS</font>
- <font color=#EB4925>Helpful for cost optimizations and focusing less on the infrastructure</font>
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
- Great for people with <font color=#C7EB25>little cloud experience</font>
- Can setup notifications and monitoring of your Lightsail resources
- <font color=#EBAC25>Use cases:</font>
	- Simple web applications
	- Websites
	- Dev / Test environment
- Has High Availability but no auto scaling, limited AWS integrations
## Summary

- <font color=#EBAC25>Docker:</font> container technology to run applications
- <font color=#EBAC25>ECS:</font> run Docker container on EC2 instances
- <font color=#EBAC25>Fargate:</font>
	- Run Docker containers without provisioning the infrastructure
	- Serverless offering (no EC2 instances)
- <font color=#EBAC25>ECR:</font> Private Docker Images Repository
- <font color=#EBAC25>EKS:</font> Allows launching and managing Kubernetes clusters on AWS (hosted on: EC2 instances OR Fargate)
- <font color=#EBAC25>Batch:</font> run batch jobs on AWS across managed EC2 instances
- <font color=#EBAC25>Lightsail:</font> predictable & low pricing for simple application & DB stacks
- <font color=#EBAC25>Lambda:</font>
	- Serverless, Function as a Service, seamless scaling, reactive
	- Lambda Billing:
		- By the time run x by the RAM provisioned
		- By the number of invocations
	- Language support: many programming languages except (arbitrary) Docker
	- Invocation time: up to 15 minutes
- <font color=#EBAC25>API Gateway:</font> expose Lambda functions as HTTP API

---
## >> Sources <<

- ECS Documentation: https://docs.aws.amazon.com/ecs/
## >> References <<

- [EC2]({{< ref "4-ec2" >}})
## >> Table of contents (CLF-C02) <<

{{< toc_cf-c02 >}}
## >> Disclaimer <<

{{< disclaimer_practitioner25 >}}
