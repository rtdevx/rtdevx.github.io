---
title: Deployments
date: 2025-08-14
description: Deploying and Managing Infrastructure at scale in AWS
summary: Deploying and Managing Infrastructure at scale in AWS...
draft: false
tags:
  - CLF-C02
categories: AWS
---
# Deploying and Managing Infrastructure at scale

## CloudFormation

**CloudFormation** is a _declarative way of outlining an AWS infrastructure_.

<font color=#EBAC25>Example:</font>
- [Security Group]({{< ref "5-security-groups" >}})
- Two [EC2]({{< ref "4-ec2" >}}) instances using this Security Group
- [S3]({{< ref "11-s3" >}}) Bucket
- [Load Balancer]({{< ref "9-elastic-load-balancing" >}}) (ELB) in front

Then **CloudFormation** creates those resources <font color=#C7EB25>in the right order</font> and with the exact configuration that was specified (declared).

---

{{< youtube Omppm_YUG2g >}}
_Introduction to AWS CloudFormation_

---
### Benefits of CloudFormation

- **Infrastructure as Code**
	- No resources are manually created
	- Changes to the infrastructure are reviewed through code
- **Cost**
	- Each resource within the stack is tagged with an identifier so you can easily see how much a stack costs
	- <font color=#EBAC25>Cost can be estimated by using CloudFormation template</font>
	- <font color=#EBAC25>Cost savings strategy:</font> in Dev, automation can delete resources at 5pm and recreate at 8am automatically
- **Productivity**
	- Ability to destroy and re-create and infrastructure in the cloud on the fly
	- _Declarative programming_ (no need to figure out ordering and orchestration)
- **Don't re-invent the wheel**
	- Adopt existing templates on the web
	- Use extensive documentation
- **Supports (almost) all AWS resources**
	- "_Custom resources_" can be used for resources that are not supported
### CloudFormation + <font color=#EBAC25>Infrastructure Composer</font>

<font color=#EBAC25>Example:</font> Wordpress CloudFormation Stack

- We can see all the resources
- We can see the relations between components

_More:_ [Infrastructure Composer]({{< ref "23-other-services/#aws-infrastructure-composer" >}})

<video id="AWS_Infrastructure_Composer" autoplay loop>  
  <source src="./assets/AWS_Infrastructure_Composer.webm" type="video/webm">  
Your browser does not support the video tag.  
</video>

<!--
![](./assets/AWS_Infrastructure_Composer.webm)
-->

_More:_ https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/infrastructure-composer-for-cloudformation.html
## AWS Cloud Development Kit (CDK)

- Define your cloud infrastructure using a familiar language:
	- JavaScript/TypeScript, Python, Java, .NET
	- For that reason infrastructure and application can be deployed "together" - <font color=#C7EB25>they share the runtime</font>
- The infrastructure code is converted into a **CloudFormation template** (JSON / YAML)
## Beanstalk

<font color=#EBAC25>Elastic Beanstalk is a developer-centric view of deploying an application on AWS.</font>

It uses all the components mentioned earlier (EC2, ASG, ELB, RDS, etc...)
##### <font color=#EBAC25>Beanstalk = Platform as a Service (PaaS)</font>

![](./assets/AWS_3tier_Web_App1.png)

- Managed service
	- Instance configuration / OS is handled by  Beanstalk
	- Deployment strategy is configurable but performed by Elastic Beanstalk
	- Capacity provisioning
	- [Load Balancing]({{< ref "9-elastic-load-balancing" >}}) and [Auto Scaling]({{< ref "10-auto-scaling-groups" >}})
	- Application health-monitoring and responsiveness
- Just the application code is the responsibility of the developer
- Three architecture models:
	- Single instance deployment: for DEV environments
	- [LB]({{< ref "9-elastic-load-balancing" >}}) + [ASG]({{< ref "10-auto-scaling-groups" >}}): for prod or pre-prod web apps
	- [ASG]({{< ref "10-auto-scaling-groups" >}}) only: for non-web apps in production (workers, etc...)
##### <font color=#EBAC25>Beanstalk supports many platforms:</font>

- Go
- Java SE
- Java with Tomcat
- .NET on Windows Server with IIS
- Node.js
- PHP
- Python
- Ruby
- Packer Builder
- Single-Container Docker
- Multi-Container Docker
- Preconfigured Docker

<font color=#EBAC25>Beanstalk Health Agent pushes metrics to</font> [CloudWatch]({{< ref "17-cloud-monitoring/#cloudwatch-metrics" >}}), <font color=#EBAC25>checks for app health and publishes health events.</font>
## AWS CodeDeploy

AWS CodeDeploy is a deployment service that automates application deployments to:

- <font color=#C7EB25>EC2 instances</font> as well as <font color=#C7EB25>on-premise</font> instances - it is a <font color=#EB4925>Hybrid</font> service
- serverless [Lambda]({{< ref "13-other-compute-services/#lambda" >}}) functions
- Amazon [ECS]({{< ref "13-other-compute-services/#ecs-elastic-container-service" >}}) (<font color=#EB4925>E</font>lastic <font color=#EB4925>C</font>ontainer <font color=#EB4925>S</font>ervices)

Servers / Instances must be provisioned and configured ahead of time with the CodeDeploy Agent.
## AWS CodeBuild

Code building service in the cloud.

CodeBuild compiles source code, run tests, produces packages that are ready to be deployed.
## AWS CodePipeline

CodePipeline orchestrates the different steps to have the code automatically pushed to production.

```Code
Code > Build > Test > Provision > Deploy
```
## AWS CodeArtifact

Software packages depends on each other to be built (also called _code dependencies_).
Storing and retrieving those dependencies is called artifact management.
Traditionally you need to setup your own artifact management system.

**CodeArtifact** works with common dependency management tools such as:

Maven, Gradle, npm, yarn, twine, pip, NuGet.

**Developers and CodeBuild can retrieve dependencies straight from CodeArtifact.**
## <font color=#EBAC25>Systems Manager (SSM)</font>

SSM helps managing EC2 and On-Premises systems at scale.

![](./assets/AWS_SSM2.png)

- Another <font color=#C7EB25>Hybrid</font> AWS service
- Get operational insights about the state of the infrastructure
- Suite of 10+ products
- <font color=#EBAC25>Features:</font>
	- <font color=#EB4925>Patching automation</font> for enhanced compliance
	- <font color=#EB4925>Run commands across entire fleet of servers</font>
	- <font color=#EB4925>Store parameter configuration</font> with the SSM Parameter Store
- Works with Linux, Windows, MacOS and Raspberry Pi OS (Raspbian)
	- Allows starting SSH session on [EC2]({{< ref "4-ec2" >}}) and On-Premise servers
	- No SSH access, bastion hosts or SSH keys needed
	- No port 22 needed
	- Send session log data to [S3]({{< ref "11-s3" >}}) or [CloudWatch]({{< ref "17-cloud-monitoring/#cloudwatch-metrics" >}})

![](./assets/AWS_SSM1.png)
### Systems Manager Parameter Store

- <font color=#C7EB25>Secure storage for configuration and secrets</font>
- API Keys, passwords, configurations
- Serverless, scalable, durable, easy SDK
- Control access permissions with IAM policies
- Version tracking and encryption (optional)

_More:_ https://docs.aws.amazon.com/systems-manager/

---
## >> Sources <<

- Infrastructure Composer: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/infrastructure-composer-for-cloudformation.html
- AWS Systems Manager (SSM): https://docs.aws.amazon.com/systems-manager/
## >> Highlights <<

- <font color=#EBAC25>Infrastructure Composer</font>
- <font color=#EBAC25>Systems Manager (SSM)</font>
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
