---
title: Other Services
date: 2025-08-23
description: Other AWS Services
summary: Other AWS Services...
draft: false
tags:
  - CLF-C02
categories: AWS
---
# Other AWS Services that don't fit in other categories.

## Workspaces

Managed **Desktop as a Service (DaaS)** solution to easily provision Windows or Linux desktops.

- Great to eliminate management of on-premise VDI infrastructure
- Fast and quickly scalable to thousands of users
- Secured data - integrates with KMS
- Pay-as-you-go service with monthly or hourly rates
## AppStream

- Desktop Application Streaming Service
- Deliver to any computer without provisioning infrastructure
- **The application is delivered within a web browser**
## IoT Core

IoT Core allows easily connecting IoT devices to the AWS Cloud.
## AppSync

Store and sync data across mobile and web apps in real-time using **GraphQL (mobile technology from Facebook).**
## Amplify

A set of tools and services that helps you to develop and deploy scalable full stack web mobile applications.

- Authentication, Storage, API (REST, GraphQL), CI/CD, Analytics, Monitoring, ...
## AWS Infrastructure Composer

Visually design and build serverless applications quickly on AWS.

Deploy AWS infrastructure code without needing to be an expert in AWS.

**Generates Infrastructure as Code (IaC) using** [CloudFormation]({{< ref "14-deployments/#cloudformation--infrastructure-composer" >}})

```AWSConsole
CLI > Infrastructure Composer
```
## Device Farm Overview

Fully-managed service that can test your web and mobile app against desktop browsers, real mobile devices and tablets.

![](./assets/AWS_Device_Farm.png)
## AWS Backup

Fully-managed service to centrally manage and automate backups across AWS services.

- On-demand and scheduled backups.
- Cross-region and cross-account (AWS Organizations) backups

![](./assets/AWS_Backup.png)
## <font color=#EB4925>Disaster Recovery Strategies</font>

- <font color=#EBAC25>Backup and Restore</font> - cheapest method
- <font color=#EBAC25>Pilot Light</font> - core functions are there (e.g. database) but it's not scaled up
- <font color=#EBAC25>Warm Standby</font> - full version of the app but at minimum size (databases, webs, api, ...)
- <font color=#EBAC25>Multi-Site / Hot-Site</font> - full version, full size active-active DR
### AWS Elastic Disaster Recovery (DRS)

Quickly and easily recover physical, virtual and cloud-based servers into AWS.

- Continuous **block-level replication** of servers to the cloud

![](./assets/AWS_DRS.png)
## AWS DataSync

Move large amount of data from on-premises to AWS.

- Can synchronize to: 
	- Amazon S3 (any storage classes - including Glacier)
	- Amazon EFS
	- Amazon FSx for Windows
- Replication tasks can be scheduled hourly, daily, weekly
- The replication tasks are <font color=#EB4925>incremental</font> after the first full load
## Cloud Migration Strategies - the 7Rs

![](./assets/AWS_Cloud_Migration_Strategy.png)

_More info about Cloud Migration Strategy:_ https://aws.amazon.com/blogs/enterprise-strategy/new-possibilities-seven-strategies-to-accelerate-your-application-migration-to-aws/
### Application Discovery Service & Application Migration Service

- Plan migration projects by gathering information about on-premises data centers
- Server utilization data and dependency mapping are important for migrations

- Agentless Discovery
- Agent-based Discovery
### AWS Migration Evaluator

Helps to build a data-driven business case for migration to AWS.
### AWS Migration Hub

Central location to collect servers and applications inventory data for the assessment, planning and tracking of migrations to AWS.
## AWS Fault Injection Service (FIS)

A fully-managed service for running fault injection experiments on AWS workloads. Based on <font color=#EB4925>Chaos Enginneering</font>.

Supports the following services: [EC2]({{< ref "4-ec2" >}}), [ECS]({{< ref "13-other-compute-services/#ecs-elastic-container-service" >}}), [EKS]({{< ref "13-other-compute-services/#amazon-eks" >}}), [RDS]({{< ref "12-databases/#rds-and-aurora" >}}), ...
## Step Functions

Build serverless visual workflow to orchestrate your [Lambda]({{< ref "13-other-compute-services/#lambda" >}}) functions.

![](./assets/AWS_Step_Functions.png)
## Ground Station

Fully managed service to **control satellite communications**, process data and scale your satellite operations.

Provides a global network of satellite ground stations near AWS regions.

Send satellite data to [S3]({{< ref "11-s3" >}}) or [EC2]({{< ref "4-ec2" >}}) instance.

<font color=#EBAC25>Use Cases:</font>
- Weather forecasting
- Surface imaging
- Communications
- Video broadcasts
## AWS Pinpoint

Scalable 2-way (outbound / inbound) marketing communication service.

Supports email, SMS, push, voice and in-app messaging.

Used for running marketing campaigns.

---
## >> Sources <<

- More info about Cloud Migration Strategy: https://aws.amazon.com/blogs/enterprise-strategy/new-possibilities-seven-strategies-to-accelerate-your-application-migration-to-aws/

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
