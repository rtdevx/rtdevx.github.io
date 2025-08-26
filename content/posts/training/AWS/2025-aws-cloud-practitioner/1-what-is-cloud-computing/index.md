---
title: What is Cloud Computing
date: 2025-08-01
description: What is Cloud Computing
summary: What is Cloud Computing...
draft: false
tags:
  - CLF-C02
categories: AWS
---

| **Private Cloud**                                                       | **Public Cloud**                                                                                       | **Hybrid Cloud**                                                        |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| Cloud services used by a single organization, not exposed to the public | Cloud resources owned and operated by a third party cloud service provider delivered over the internet | Keep some servers on premises and extend some capabilities to the cloud |
| Complete control                                                        |                                                                                                        |                                                                         |
| Security for sensitive applications                                     |                                                                                                        |                                                                         |
| Meet specific business needs                                            |                                                                                                        |                                                                         |

---

{{< youtube mxT233EdY5c >}}

---
## Five characteristics of Cloud Computing

1. On-demand self service
	- Users can provision resources and use them without human interaction from the service provider
2. Broad network access
	- Resources available over the network can be accessed by diverse client platforms
3. Multi-tenancy and resource pooling
	- Multiple customers can share the same infrastructure and applications with security and privacy
	- Multiple customers are serviced from the same physical resources
4. Rapid elasticity and scalability
	- Automatically and quickly acquire and dispose resources when needed
	- Quickly and easily scale based on demand
5. Measured service
	- Usage is measured, users pay for what they used
## Six advantages of Cloud Computing

1. Trade capital expense (<font color=#f1ef63>CAPEX</font>) for operational expense (<font color=#f1ef63>OPEX</font>)
	- Pay On-Demand: don't own the hardware
	- Reduced Total Cost of Ownership (<font color=#f1ef63>TCO</font>) & Operational Expense (<font color=#f1ef63>OPEX</font>)
2. Benefit from massive economies of scale
	- Prices are reduced as AWS is more efficient due to a large scale
3. Stop guessing the capacity
	- Scale based on actual measured usage
4. Increase speed and agility
5. Stop spending money running and maintaining data centers
6. Go global in minutes: leverage the [AWS Global Infrastructure]({{< ref "15-aws-global-infrastructure" >}})
## Problems solved by the cloud

- <font color=#f1ef63>Flexibility:</font> change resources when needed
- <font color=#f1ef63>Cost-Effectiveness:</font> pay as you go and for what you use
- [Scalability:]({{< ref "8-scalability-high-availability/#scalability" >}}) accommodate larger loads by making hardware stronger or adding additional nodes
- [Elasticity:]({{< ref "8-scalability-high-availability/#two-kinds-of-scalability" >}}) ability to scale out and scale in when needed
- [High-Availability]({{< ref "8-scalability-high-availability/#high-availability" >}}) and Fault-Tolerance: build across data centers
- <font color=#f1ef63>Agility:</font> rapidly develop, test and launch software applications
## Types of Cloud Computing

- Infrastructure as a Service (IaaS)
	- Provides building blocks for cloud IT
	- Provides networking, compute, storage
	- Highest level of flexibility
	- Easy parallel with traditional on-premises IT
- Platform as a Service (PaaS)
	- Removes the need for your organization to manage the underlying infrastcucture
	- Focus on the deployment and management of your applications
- Software as a Service (SaaS)
	- Completed product that is run and managed by the service provider

![](./assets/AWS_Cloud_Computing_Types.png)

![](./assets/AWS_Cloud_Computing_Types_2.png)
## AWS Global Infrastructure

- AWS Regions
- AWS Availability Zones
- AWS Data Centers
- AWS Edge Locations / Points of Presence

_More about AWS Global Infrastructure:_ [AWS Global Infrastructure](https://infrastructure.aws)
## Shared Responsibility Model

![](./assets/AWS_Shared_Responsibility_Model.png)
_Shared Responsibility Model:_ [Shared Responsibility Model - Amazon Web Services (AWS)](https://aws.amazon.com/compliance/shared-responsibility-model/)

---
## >> Sources <<

- _AWS Global Infrastructure:_ [AWS Global Infrastructure](https://infrastructure.aws)
- _Shared Responsibility Model:_ [Shared Responsibility Model - Amazon Web Services (AWS)](https://aws.amazon.com/compliance/shared-responsibility-model/)

## >> Table of contents (CLF-C02) <<

|                                                                         |                                                                                     |                                                                                       |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [1. What is Cloud Computing]({{< ref "1-what-is-cloud-computing" >}})   | [2. IAM]({{< ref "2-iam" >}})                                                       | [3. Budget]({{< ref "3-budget" >}})                                                   |
| [4. Ec2]({{< ref "4-ec2" >}})                                           | [5. Security Groups]({{< ref "5-security-groups" >}})                               | [6. Storage]({{< ref "6-storage" >}})                                                 |
| [7. AMI]({{< ref "7-ami" >}})                                           | [8. Scalability & High Availability]({{< ref "8-scalability-high-availability" >}}) | [9. Elastic Load Balancing]({{< ref "9-elastic-load-balancing" >}})                   |
| [10. Auto Scaling Group]({{< ref "10-auto-scaling-groups" >}})          | [11. S3]({{< ref "11-s3" >}})                                                       | [12. Databases]({{< ref "12-databases" >}})                                           |
| [13. Other Compute Services]({{< ref "13-other-compute-services" >}})   | [14. Deployments]({{< ref "14-deployments" >}})                                     | [15. AWS Global Infrastructure]({{< ref "15-aws-global-infrastructure" >}})           |
| [16. Cloud Integrations]({{< ref "16-cloud-integrations" >}})           | [17. Cloud Monitoring]({{< ref "17-cloud-monitoring" >}})                           | [18. VPC]({{< ref "18-vpc" >}})                                                       |
| [19. Security and Compliance]({{< ref "19-security-and-compliance" >}}) | [20. Machine Learning]({{< ref "20-machine-learning" >}})                           | [21. Account Management and Billing]({{< ref "21-account-management-and-billing" >}}) |
| [22. Advanced Identity]({{< ref "22-advanced-identity" >}})             | [23. Other Services]({{< ref "23-other-services" >}})                               | [24. AWS Architecting & Ecosystem]({{< ref "24-aws-architecting-cosystem" >}})        |
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
