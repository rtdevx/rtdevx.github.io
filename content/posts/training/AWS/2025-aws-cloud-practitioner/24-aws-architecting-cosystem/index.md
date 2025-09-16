---
title: AWS Architecting & Ecosystem
date: 2025-08-24
description: AWS Architecting & Ecosystem
summary: AWS Architecting & Ecosystem, Well-Architected Framework, Cloud Adoption Framework...
draft: false
tags:
  - CLF-C02
categories: AWS
---
## Well-Architected Framework

- Stop guessing capacity (use [Auto Scaling]({{< ref "10-auto-scaling-groups" >}}))
- Test systems at production scale
- Automate!
- Allow for evolutionary architectures

<font color=#EBAC25>Scalability:</font> vertical & horizontal<br />
<font color=#EBAC25>Disposable Resources:</font> servers should be disposable & easily configured<br />
<font color=#EBAC25>Automation:</font> serverless, Infrastructure as a Service, Auto Scaling...<br />

<font color=#EBAC25>Loose coupling:</font>
- _Monolith applications_ that do more and more over time become bigger
- Break it down into smaller, "_loosely coupled_" components
- <font color=#EB4925>A change or failure in one component should not cascade to other components</font>

<font color=#EBAC25>Services, not Servers:</font>
- Don't just use EC2
- Use managed services, databases, serverless, etc...

_AWS Well-Architected:_ https://aws.amazon.com/architecture/well-architected/
### 1. Operational Excellence

##### **Operational excellence** includes the ability to run and monitor systems to deliver business value and continually improve supporting processes and procedures.

<font color=#EBAC25>Design Principles:</font>

- Perform Operations as Code - IaS
- Frequent, small, reversible changes - reverse in case of failure
- Refine operations procedures frequently - ensure team members are familiar with it
- Anticipate failure
- Learn from the failures
- Use managed services - to reduce operational burden
- Implement observability for actionable insights - performance, reliability, cost, ...
### 2. Security
##### **Security** includes an ability to protect information, systems and assets while delivering business value through risk assessments and mitigation strategies.

<font color=#EBAC25>Design Principles:</font>

- Implement a strong identity foundation - centralize privilege management and reduce (or eliminate) reliance on long-term credentials - _Principle of least privilege_ - [IAM]({{< ref "2-iam" >}})
- Enable traceability - integrate logs and metrics with systems to automatically respond and take action - [Cloud Monitoring]({{< ref "17-cloud-monitoring" >}})
- <font color=#EB4925>Apply security at all layers</font> - edge network, VPC, subnet, load balancer, (every) EC2 instance, operating system, application
- Automate security best practices
- Protect data in transit and at rest - [encryption]({{< ref "19-security-and-compliance/#aws-kms-key-management-service" >}}), [tokenization]({{< ref "22-advanced-identity/#aws-sts-security-token-service" >}}) and [access control]({{< ref "22-advanced-identity" >}})
- Keep people away from data - reduce or eliminate the need for direct access or manual processing of data
- Prepare for security events - run incident response simulations and use tools with automation to increase your speed of detection, investigation and recovery
### 3. Reliability

##### **Reliability** is an **ability of a system to recover from infrastructure or service disruptions**, dynamically acquire computing resources to meet demand and mitigate disruptions such as misconfigurations or transient network issues.

<font color=#EBAC25>Design Principles:</font>

- Test recovery procedures - use automation to simulate different failures or to recreate scenarios that led to failures before
- Automatically recover from failure - anticipate and remediate failures before they occur
- Scale horizontally to increase aggregate system availability - distribute requests across multiple, smaller resources to ensure that they don't share a common point of failure
- Stop guessing capacity - maintain the optimal level to satisfy demand without over or under provisioning
- Manage change in automation - use automation to make changes to infrastructure
### 4. Performance Efficiency
##### **Performance Efficiency** includes **ability to use computing resources efficiently** to meet system requirements and to maintain that efficiency as demand changes and technologies evolve.

<font color=#EBAC25>Design Principles:</font>

- Democratize advanced technologies - advance technologies become services and hence you can focus more on product development
- <font color=#C7EB25>Go Global in minutes</font> - easy deployment in multiple regions
- Use <font color=#C7EB25>serverless</font> architecture - avoid the burden of managing servers
- Experiment more often - easy to carry out comparative testing
- Mechanical sympathy - be aware of all AWS services
### 5. Cost Optimization

##### **Cost Optimization** includes ability to run systems to deliver business value at the lowest price point.

<font color=#EBAC25>Design Principles:</font>

- Adopt a consumption mode - pay only for what you use
- Measure overall efficiency - use [CloudWatch]({{< ref "17-cloud-monitoring/#cloudwatch-metrics" >}})
- Stop spending money on data center operations - AWS does the infrastructure part and enables customer to focus on organization projects
- Analyze and attribute expenditure - accurate identification of system usage and costs helps to measure <font color=#C7EB25>Return on Investment (ROI)</font> - <font color=#EB4925>make sure to use tags!</font>
- Use managed and application level services to reduce cost of ownership - as managed services operate at cloud scale then can offer a lower cost per transaction or service
### 6. Sustainability
##### **Sustainability** focuses on minimizing the environmental impact of running cloud workloads.

<font color=#EBAC25>Design Principles:</font>

- Understand your impact - establish performance indicators, evaluate improvements
- Establish sustainability goals - set long-term goals for each workload, model Return on Investment (ROI)
- Maximize utilization = right size each workload to maximize the energy efficiency of the underlying hardware and minimize idle resources
- Anticipate and adopt new, more efficient hardware and software offerings - and design for flexibility to adopt new technologies over time
- Use managed services - shared services reduce the amount of infrastructure
## AWS Well-Architected Tool

Free tool to review your architecture against the 6 pillars of Well-Architected Framework and adopt architectural best practices.
## AWS Customer Carbon Footprint Tool

Tool to track, measure, review and forecast the <font color=#C7EB25>carbon emissions</font> generated from your AWS usage.
## <font color=#EB4925>AWS Cloud Adoption Framework</font> (CAF)

Helps you build and then execute a comprehensive plan for your digital transformation through innovative use of AWS.

Created by AWS Professionals by taking advantage of AWS Best Practices and lessons learned from 1000s of customers.
##### **AWS CAF** groups it's capabilities in six perspectives:

- <font color=#C7EB25>Business</font>
	- Business perspective helps to ensure that your cloud investments accelerate your digital transformation ambitions and business outcomes
- <font color=#C7EB25>People</font>
	- Serves a **bridge between technology and business**, accelerating the cloud journey to help organizations more rapidly evolve to a culture of continuous growth, learning and where change becomes BAU
- <font color=#C7EB25>Governance</font>
	- Helps orchestrating cloud initiatives while maximizing organizational benefits and minimizing transformation related risks
- <font color=#C7EB25>Platform</font>
	- Helps building an enterprise-grade, scalable, hybrid cloud platform and modernize existing workloads
- <font color=#C7EB25>Security</font>
	- Helps achieving the confidentiality, integrity and availability of the data and cloud workflows
- <font color=#C7EB25>Operations</font>
	- Helps ensuring that your cloud services are delivered at a level that meets the needs of your business

	![](./assets/AWS_CAF.png)
	_AWS Cloud Adoption Framework (CAF)_
### AWS CAF - Transformation Domains

- <font color=#C7EB25>Technology</font> - using the cloud to migrate and modernize legacy infrastructure, applications, data and analytics platforms
- <font color=#C7EB25>Process</font> - digitizing, automating and optimizing your business operations
- <font color=#C7EB25>Organization</font> - reimagining your operating model
### AWS CAF - Transformation Phases

- <font color=#C7EB25>Envision</font> - demonstrate how the Cloud will accelerate business outcomes
- <font color=#C7EB25>Align</font> - identify capability gaps across the 6 AWS CAF Perspectives which results in an Action Plan
- <font color=#C7EB25>Launch</font> - build and deliver pilot initiatives in production and demonstrate incremental business value
- <font color=#C7EB25>Scale</font> - expand pilot initiatives to the desired scale while realizing the desired business benefits

_More:_ [AWS Cloud Adoption Framework (AWS CAF)](https://aws.amazon.com/cloud-adoption-framework/)
## AWS Right Sizing

[EC2]({{< ref "4-ec2" >}}) has many [instance types]({{< ref "4-ec2/#amazon-ec2-instance-types" >}}). Right sizing is the process of matching instance types and sizes to your workload.

**Scaling up is easy so always start small...**
## AWS Ecosystem - Free resources

- AWS Blogs: https://aws.amazon.com/blogs/aws/ 
- AWS Forums (community): https://forums.aws.amazon.com/index.jspa
- AWS Whitepapers & Guides: https://aws.amazon.com/whitepapers
- AWS Solutions Library (formerly Quick Starts): https://aws.amazon.com/solutions/
	- Vetted Technology Solutions for the AWS Cloud
	- Example: live streaming on AWS https://aws.amazon.com/solutions/implementations/live-streaming-on-aw
## AWS Professional Services and Partner Network

##### **APN:** AWS Partner Network.

- <font color=#EBAC25>APN Technology Partners:</font> providing hardware, connectivity, software
- <font color=#EBAC25>APN Consulting Partners:</font> professional services firm to help build on AWS
- <font color=#EBAC25>APN Training Partners:</font> learning AWS
## AWS IQ

Engage and pay AWS Certified 3rd party experts for on-demand project work.
## AWS re:Post

AWS Forums.

AWS re:Post is not intended to be used for questions that are time-sensitive.

[Discover AWS Official Knowledge Center Articles | AWS re:Post](https://repost.aws/knowledge-center)

---
## >> Sources <<

- AWS Well-Architected: https://aws.amazon.com/architecture/well-architected/
- AWS Cloud Adoption Framework (CAF): https://aws.amazon.com/cloud-adoption-framework
- AWS re:Post forums: https://repost.aws/knowledge-center

- AWS Blogs: https://aws.amazon.com/blogs/aws/ 
- AWS Forums (community): https://forums.aws.amazon.com/index.jspa
- AWS Whitepapers & Guides: https://aws.amazon.com/whitepapers
- AWS Solutions Library (formerly Quick Starts): https://aws.amazon.com/solutions/
	- Vetted Technology Solutions for the AWS Cloud
	- Example: live streaming on AWS https://aws.amazon.com/solutions/implementations/live-streaming-on-aw

## >> Table of contents (CLF-C02) <<

{{< toc_cf-c02 >}}
## >> Disclaimer <<

{{< disclaimer_practitioner25 >}}
