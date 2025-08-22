---
title: 13 - Other Compute Services
date: 2025-08-13
description: Other Compute Services in AWS
summary: Other Compute Services in AWS cloud...
draft: false
tags:
  - AWS
  - Training
categories: AWS Cloud Practitioner
---
## Docker

Docker is a software development platform to deploy apps.

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

##### Amazon ECS = <font color=#f43f5e>E</font>lastic <font color=#f43f5e>C</font>ontainer <font color=#f43f5e>S</font>ervice.

ECS allows launching Docker containers on AWS. It is an orchestrator.

- You must provision and maintain the infrastructure (EC2 instances)
- AWS takes care of starting / stopping containers
- Has integrations with the <font color=#27D3F5>Application Load Balancer</font>

![](assets/AWS_ECS_Solution.png)
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
- Easy monitoring through <font color=#27D3F5>AWS CloudWatch</font>
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
- <font color=#f4e40b>Batch will dynamically launch EC2 instances or Spot instances</font>
- AWS batch provisions the right amount of compute / memory
- You submit or schedule batch jobs and AWS Batch does the rest
- <font color=#f4e40b>Batch jobs are defined as Docker images and run on ECS</font>
- <font color=#f43f5e>Helpful for cost optimizations and focusing less on the infrastructure</font>
### Batch vs Lambda

- Lambda
	- Time limit
	- Limited runtimes
	- Limited temporary disk space
	- Serverless
- Batch
	- No time limit
	- Any runtime as long as it's packaged as a Docker image (no programming language dependency)
	- Rely on EBS / instance store for disk space
	- Relies on EC2 (can be managed by AWS)
## Lightsail

- Virtual servers, storage, databases and networking
- Low & predictable pricing
- Simpler alternative to using EC2, RDS, ELB, EBS, Route53
- Great for people with <font color=#10b981>little cloud experience</font>
- Can setup notifications and monitoring of your Lightsail resources
- <font color=#f4e40b>Use cases:</font>
	- Simple web applications
	- Websites
	- Dev / Test environment
- Has High Availability but no auto scaling, limited AWS integrations
## Summary

- <font color=#f4e40b>Docker:</font> container technology to run applications
- <font color=#f4e40b>ECS:</font> run Docker container on EC2 instances
- <font color=#f4e40b>Fargate:</font>
	- Run Docker containers without provisioning the infrastructure
	- Serverless offering (no EC2 instances)
- <font color=#f4e40b>ECR:</font> Private Docker Images Repository
- <font color=#f4e40b>Batch:</font> run batch jobs on AWS across managed EC2 instances
- <font color=#f4e40b>Lightsail:</font> predictable & low pricing for simple application & DB stacks
- <font color=#f4e40b>Lambda:</font>
	- Serverless, Function as a Service, seamless scaling, reactive
	- Lambda Billing:
		- By the time run x by the RAM provisioned
		- By the number of invocations
	- Language support: many programming languages except (arbitrary) Docker
	- Invocation time: up to 15 minutes
- <font color=#f4e40b>API Gateway:</font> expose Lambda functions as HTTP API

---
## Sources

- ECS Documentation: https://docs.aws.amazon.com/ecs/
## References

- <font color=#27D3F5>EC2</font>
---
### Disclaimer

{{< alert >}}
_Disclaimer: Content for educational purposes only, no rights reserved._

Most of the content in this series is coming from **Stephane Maarek's** [Ultimate AWS Certified Cloud Practitioner CLF-C02 2025](https://www.udemy.com/course/aws-certified-cloud-practitioner-new/) course on Udemy.

I highly encourage you to take the [Stephane's courses](https://www.udemy.com/user/stephane-maarek/) as they are awesome and really help understanding the subject.

_More about Stephane Maarek:_

- https://www.linkedin.com/in/stephanemaarek
- https://x.com/stephanemaarek

**This article is just a summary and has been published to help me learning and passing the practitioner exam.**
{{< /alert >}}