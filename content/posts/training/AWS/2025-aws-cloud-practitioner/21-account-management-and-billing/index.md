---
title: Account Management and Billing
date: 2025-08-21
description: Account Management and Billing
summary: Account Management and Billing...
draft: false
tags:
  - CLF-C02
categories: AWS
---
## AWS Organizations

![](./assets/AWS_Organizations_2.png)
_How AWS Organizations work_

![](./assets/AWS_Organizations_1.png)
_Diagram of basic Organization_

_More about Organizations terminology and structure:_ https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html_

_Best Practices for Organizational Units with AWS Organizations:_ https://aws.amazon.com/blogs/mt/best-practices-for-organizational-units-with-aws-organizations/
### Creating Organizations and Accounts
---

{{< youtube bQ2EtLnN6KQ >}}
*Accessing newly created accounts to manage organizations wasn't clear. This video explains it in great details. <font color=#f43f5e>Please note it doesn't cover permissions / restrictions for that account to have in the organization.</font>

---
### AWS Organization - Consolidated Billing

<font color=#f43f5e>Consolidated billing must first be enabled.</font>

- **Combined Usage** - combine the usage across all AWS accounts in the AWS Organization to **share the volume pricing, reserved instances and saving plans discounts**
- **One bill** - get one bill for all AWS Accounts in the AWS Organization
## AWS Control Tower

##### **AWS Control Tower** = easy way to set up and govern a secure and compliant <font color=#10b981>multi-account AWS environment</font> based on best practices.

- Automate the setup of your environment in a few clicks
- Automate ongoing policy management using guardrails
- Detect policy violations and remediate them
- Monitor compliance through an interactive dashboard
##### <font color=#f1ef63>AWS Control Tower runs on top of AWS Organizations.</font>

- It automatically set up AWS Organizations to organize accounts and implement **SCPs** (Service Control Policies)
## AWS Resource Access Manager (RAM)

- Share AWS resources that you own with other AWS accounts
- **Share with any account or withing your organization**
- **Avoid resource duplication**
- Supported resources include:
	- Aurora
	- VPC Subnets
	- Transit Gateway
	- Route53
	- EC2 Dedicated Hosts
	- License Manager Configurations

![](./assets/AWS_Organizations_ARM.png)
_AWS Resource Access Manager (RAM)_
## <font color=#f43f5e>AWS Service Catalog</font>

**AWS Service Catalog** is a **self-service portal** that allows users to launch a set of <font color=#10b981>authorized products</font> predefined by admins.
##### <font color=#f43f5e>Users that are new to the organization could create stacks that are not compliant / not in line with the rest of the organization.</font>

Includes: Virtual Machines, Databases, Storage options, etc.

![](./assets/AWS_Organizations_Service_Catalog.png)

_More about Service Catalog:_ https://docs.aws.amazon.com/servicecatalog/

Service offering with standards how the company is building their services.
## Pricing models in AWS
### 4 AWS pricing models

- <font color=#f1ef63>Pay as you go:</font> pay for what you use, remain agile, responsive, meet scale demands
- <font color=#f1ef63>Save when you reserve:</font> minimize risks, predictably manage budgets, comply with long-term requirements
	- Reservations are available for [EC2 Reserved Instances]({{< ref "4-ec2/#ec2-instances-purchasing-options" >}}), [DynamoDB]({{< ref "12-databases/#dynamodb" >}}) Reserved Capacity, [ElastiCache]({{< ref "12-databases/#amazon-elasticache" >}}) Reserved Nodes, [RDS]({{< ref "12-databases/#rds-and-aurora" >}}) Reserved Instance, [Redshift]({{< ref "12-databases/#redshift" >}}) Reserved Nodes
- <font color=#f1ef63>Pay less by using more:</font> volume-based discounts
- <font color=#f1ef63>Pay less as AWS grows</font>
### Free Services & Free Plan in AWS

- With a new AWS account, you get up to $200 in credits
- You choose between **Free Plan** or **Paid Plan**
	- **Free Plan** expires in 6 months or when credits are consumed
	- **Paid Plan** charged after you consume your credits
- Both plans have access to **Always Free** services (monthly free usage limits)
	- [Lambda]({{< ref "13-other-compute-services/#lambda" >}}) - 1,000,000 requests / month and 400,000 GB-seconds compute / month
	- [DynamoDB]({{< ref "12-databases/#dynamodb" >}}) - 25 GB of storage and 200M requests / month

_More about free services in AWS:_ https://aws.amazon.com/free/
### Compute pricing
#### EC2

- <font color=#f1ef63>On-demand instances</font>
	- Minimum of 60 seconds
	- Pay per second (Linux / Windows) or per hour (Other)
- <font color=#f1ef63>Reserved instances</font>
	- Up to <font color=#f43f5e>75%</font> discount compared to On-demand on hourly rate
	- 1 or 3 years commitment
	- All upfront, partial upfront, no upfront
- <font color=#f1ef63>Spot instances</font>
	- Up to <font color=#f43f5e>90%</font> discount compared to On-demand on hourly rate
	- Bid for unused capacity
- <font color=#f1ef63>Dedicated host</font>
	- On-demand
	- Reservation for 1 or 3 years commitment
- <font color=#f43f5e>Saving plans as an alternative to save on sustained usage</font>
#### Lambda & ECS

- [Lambda]({{< ref "13-other-compute-services/#lambda" >}})
	- Pay per call
	- Pay per duration
- [ECS]({{< ref "13-other-compute-services/#ecs-elastic-container-service" >}})
	- EC2 Launch Type Model: No additional fees, you pay for AWS resources stored and created in the application
- [Fargate]({{< ref "13-other-compute-services/#fargate" >}})
	- Pay for vCPU and memory resources allocated to the applications running in your containers
### Storage Pricing
#### [S3]({{< ref "11-s3" >}})

- [Storage class]({{< ref "11-s3/#s3-storage-classes" >}}) (S3 Standard, S3 Infrequent Access, S3 One-Zone IA, S3 Intelligent Tiering, S3 Glacier and S3 Glacier Deep Archive)
- Number and size of objects: Price can be tiered (based on volume)
- Number and type of requests
- Data transfer OUT of S3 region
- [S3 Transfer Acceleration]({{< ref "15-aws-global-infrastructure/#s3-transfer-acceleration" >}})
- Lifecycle transitions

Similar service: [EFS]({{< ref "6-storage/#efs---elastic-file-system" >}}) (pay per use, has infrequent access and lifecycle rules).
#### [EBS]({{< ref "6-storage/#ebs-volume" >}})

- Volume type (based on performance)
- Storage volume in GB per month (**provisioned!**)
- IOPS
	- General Purpose SSD: included
	- Provisioned IOPS SSM: provisioned amount of IOPS
	- Magnetic: number of requests
- Snapshots
	- Added data cost per GB per month
- Data transfer
	- Outbound data transfer are tiered for volume discounts
	- Inbound is free
### Database Pricing
#### [RDS]({{< ref "12-databases/#rds-and-aurora" >}})

- Per hour billing
- Database characteristics:
	- Engine
	- Size
	- Memory class
- Purchase type:
	- On-demand
	- Reserved instances (1 or 3 years) with optional up-front
- Backup Storage: there is no additional charge for backup storage up to 100% of your total database storage for a region
- Additional storage (per GB per month)
- Number of input and output requests per month
- Deployment type (storage and I/O are variable)
	- Single AZ
	- Multiple AZ
- Data transfer
	- Outbound data transfer are tiered for volume discounts
	- Inbound is free
### Content Delivery
#### [CloudFront]({{< ref "15-aws-global-infrastructure/#amazon-cloudfront" >}})

- Pricing is different across different geographic regions
- Aggregated for each edge location, then applied to the bill
- Data Transfer Out (volume discount)
- Number of HTTP(s) requests
### Networking costs in AWS per GB - Simplified

- Use Private IP instead of Public IP for good savings and better network performance
- Use same AZ for maximum savings (at the cost of High Availability)

![](./assets/AWS_Organizations_Billing_Networking.png)
## Savings Plan

- Commit a certain $ amount per hours for 1 or 3 years
- Easiest way to setup long-term commitment on AWS
- **EC2 Savings plan**
	- Up to <font color=#f43f5e>72%</font> discount compared to On-demand
	- **Commit to usage of individual instance families** (e.g. C5 or M5)
	- Regardless of AZ, size, OS or tenancy
	- All upfront, partial upfront, no upfront
- **Compute Savings plan**
	- Up to <font color=#f43f5e>66%</font> discount compared to On-demand
	- **Regardless of Family, Region, size, OS, tenancy, compute options**
	- Compute Options: [EC2]({{< ref "4-ec2" >}}), [Fargate]({{< ref "13-other-compute-services/#fargate" >}}), [Lambda]({{< ref "13-other-compute-services/#lambda" >}})
- Machine learning Savings plan: [SageMaker]({{< ref "20-machine-learning/#sagemaker" >}})...
##### <font color=#f1ef63>Savings plans can be set up from AWS Cost Explorer console.</font>
## <font color=#f43f5e>Compute Optimizer</font>

**Reduce costs** and **improve performance** by recommending optimal AWS resources for your workloads.

Helps you choose optimal configurations and right-size your workloads (over / under provisioned).

Uses Machine Learning to analyze your resources configurations and their utilization ([CloudWatch]({{< ref "17-cloud-monitoring/#cloudwatch-metrics" >}}) metrics).

Supported resources:

- EC2 Instances
- EC2 Auto Scaling Groups
- EBS Volumes
- Lambda functions
##### <font color=#10b981>Compute Optimized can lower costs by up to 25%.</font>

Recommendations can be exported to S3.
## Billing and Costing Tools
### <font color=#f1ef63>Estimating costs in the cloud</font>

- Pricing Calculator
	- Available at: https://calculator.aws
	- Estimate the cost of your solution architecture
### <font color=#f1ef63>Tracking costs in the cloud</font>

- Billing Dashboard (`AWSConsole > Billing`)
	- Cost
	- Forecast
	- Month to date
- Cost Allocation Tags (`AWSConsole > Resource Groups & Tag Editor`)
	- Allows tracking your AWS costs at a detailed level
	- AWS generated tags (automatically applied to resources that are created, start with prefix <font color=#10b981>aws:</font>)
	- User generated tags (defined by user, start with prefix <font color=#10b981>user:</font>)	
	![](./assets/AWS_Organizations_Cost_Allocation_Tags.png)
	- Tags can be used for organizing resources:
		- EC2: instances, images, load balancers, security groups...
		- RDS, VPC resources, Route53, IAM users...
#### <font color=#f43f5e>Most granular AWS cost report:</font>

- Cost and Usage Reports (`AWSConsole > Billing`)
	- <font color=#f43f5e>The most comprehensive set on AWS cost and usage data available</font>, including additional metadate about AWS services, pricing and reservations (e.g. EC2 Reserved Instances)
	- Lists AWS usage for each service category used by an account and it's IAM users in hourly or daily line items as well as any tags associated / created for cost allocation purposes
	- Can be integrated with [Athena]({{< ref "12-databases/#athena" >}}), [Redshift]({{< ref "12-databases/#redshift" >}}) or [QuickSight]({{< ref "12-databases/#quicksight" >}})

- Cost Explorer (`AWSConsole > Billing > Cost Explorer`)
	- Visualize, understand and manage your AWS costs and usage over time
	- Create custom reports that analyze cost and usage data
	- Analyze your data at higher level: total costs and usage across all accounts
	- Monthly, hourly, resource-level granularity
	- Choose optimal Savings Plan (to lover the prices)
	- <font color=#10b981>Forecast usage up to 12 months based on previous usage</font>
	- Monthly cost by AWS service
	![](./assets/AWS_Organizations_Cost_Explorer.png)

#### <font color=#f1ef63>Monitoring against cost plans:</font>

- Billing Alarms
	- Billing data metric is stored in CloudWatch us-east-1
	- Billing data are for overall worldwide AWS costs
	- <font color=#10b981>It's for actual cost, not for projected costs</font>
	- Intended a simple alarm (not as powerful as Budgets)
- Budgets (`AWSConsole > Billing > Budgets and Planning`)
	- Create budget and send alarms when cost (or forecast) exceeds the budget
	- 4 types of budgets: Usage, Cost, Reservation, Savings Plans
	- Up to 5 SNS notifications per budget
## AWS Cost Anomaly Detection

AWS Cost Anomaly Detection is continuously monitoring your cost and usage using Machine Learning to detect unusual activities.

<font color=#f1ef63>It is learning your unique, historic spending patterns to detect on-time cost spike OR continuous cost increases.</font>

It will send the anomaly detection report with root-cause analysis.

`AWSConsole > Billing > Cost and Usage Analysis > Cost Anomaly Detection`
## AWS Service Quotas

Notify when you're close to a service quota (e.g. Lambda concurrent connections).

Create [CloudWatch]({{< ref "17-cloud-monitoring/#cloudwatch-metrics" >}}) Alarms on the Service Quotas console.

`AWSConsole > Service Quotas`
## AWS Trusted Advisor

Built in, no need to install anything. <font color=#f43f5e>High level AWS account assessment.</font>

Analyzes AWS accounts and provides recommendation in 6 categories:

- Cost optimization
- Performance
- Security
- Fault tolerance
- Service limits
- Operational Excellence

Business or Enterprise support plan for full set of checks.
## Support Plans for AWS

### <font color=#f1ef63>Basic</font>

- **Customer Service & Communities** - 24/7 access to customer service, documentation, whitepapers, support forums
- **AWS Trusted Advisor** - Access to the 7 core Trusted Advisor checks and guidance to provision your resources following best practices to increase performance and improve security
- **AWS Personal Health Dashboard** - A personalized view of the health of AWS services and alerts when your resources are impacted
### <font color=#f1ef63>Developer</font>

- **All Basic**
- **Business hours email access to Cloud Support Associates**
- Unlimited cases / unlimited contacts

Response times:

- General guidance: < 24 business hours
- System impaired: <12 business hours
### <font color=#f1ef63>Business</font>

- **All Developer**
- Intended for **production workloads**
- **Trusted Advisor** - full set of checks + API access
- **24/7 phone, email and chat access** to Cloud Support Engineers

Response times:

- General guidance: < 24 business hours
- System impaired: <12 business hours
- Production system impaired: < 4 hours
- Production system down: < 1 hour
### <font color=#f1ef63>Enterprise (On-Ramp)</font>

- **All business**
- Access to a pool of **Technical Account Managers (TAM)**
- **Concierge Support Team** (for billing and account best practices)
- **Infrastructure Event Management, Well-Architected & Operations Reviews**

Response times:

- Production system impaired: < 4 hours
- Production system down: < 1 hour
- **Business-critical system down:** < 30 minutes
### <font color=#f1ef63>Enterprise</font>

- **All Enterprise (On-Ramp)**
- Access to a <font color=#f43f5e>designated</font> **Technical Account Manager (TAM)**
- Access to **AWS Incident Detection and Response** (for an additional fee)

Response times:

- **Business-critical system down:** < 15 minutes
## Account Best Practices

- Operate multiple accounts using **Organizations**
- Use **SCP** (Service Control Policies) to restrict the account privileges
- Easily setup multiple accounts with best-practices with **AWS Control Tower**
- **Use Tags & Cost Allocation Tags** for easy management and billing
- **IAM guidelines:** MFA, least-privilege, password policy, password rotation
- **Config** to record all resources configurations and compliance over time
- **CloudFormation** to deploy stacks across accounts and regions
- **Trusted Advisor** to get insights, Support Plan adapted to your needs
- Send Service Logs and Access Logs to [S3]({{< ref "11-s3" >}}) or [CloudWatch]({{< ref "17-cloud-monitoring/#cloudwatch-metrics" >}})
 Logs
- **CloudTrail** to record API calls made within your account
- Use **AWS Service Catalog** to define pre-defined stacks that are used by your organization
## Summary

- <font color=#f1ef63>Compute Optimizer:</font> recommends resources configurations to reduce cost
- <font color=#f1ef63>Pricing Calculator:</font> cost of services on AWS (estimate the cost of your solution)
- <font color=#f1ef63>Billing Dashboard:</font> high-level overview (cost, forecast, month to date)
- <font color=#f1ef63>Cost Allocation Tags:</font> tag resources to create detailed reports
- <font color=#f1ef63>Cost and Usage Reports:</font> <font color=#f43f5e>most comprehensive billing dataset</font>
- <font color=#f1ef63>Cost Explorer:</font> View current usage (detailed) and <font color=#10b981>forecast usage</font>
- <font color=#f1ef63>Billing Alarms:</font> in us-east-1 - track overall and per-service billing
- <font color=#f1ef63>Budgets:</font> more advanced - track usage, costs and get alerts
- <font color=#f1ef63>Savings Plans:</font> easy way to save based on long-term usage of AWS
- <font color=#f1ef63>Cost Anomaly Detection:</font> detect unusual spends using Machine Learning
- <font color=#f1ef63>Service Quotas:</font> notify you when you're close to service quota threshold

---
## >> Sources <<

- AWS Organizations: https://docs.aws.amazon.com/organizations
- Best Practices for Organizational Units with AWS Organizations: https://aws.amazon.com/blogs/mt/best-practices-for-organizational-units-with-aws-organizations/
- Free Services in AWS: https://aws.amazon.com/free/

- AWS Pricing Calculator: https://calculator.aws

{{< icon "youtube" >}} _Full YouTube Rahul's AWS Course:_ https://www.youtube.com/playlist?list=PL7iMyoQPMtAN4xl6oWzafqJebfay7K8KP
## >> References <<

- [Identity and Access management (IAM)]({{< ref "2-iam" >}})
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