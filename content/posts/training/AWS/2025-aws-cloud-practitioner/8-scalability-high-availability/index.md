---
title: Scalability & High Availability
date: 2025-08-08
description: Scalability & High Availability in AWS Cloud
summary: Scalability means that an application / infrastructure can handle greater loads by adapting...
draft: false
tags:
  - CLF-C02
categories: AWS
---
## Scalability

**Scalability** means that an application / infrastructure can handle greater loads by adapting.
### Two kinds of scalability

- **Vertical Scalability**
	- <font color=#f1ef63>Increasing the size of an instance</font>
	- Very common for non-distributed systems, i.e. Databases
	- Hardware limits apply
- **Horizontal Scalability (Elasticity)**
	- <font color=#f1ef63>Increasing the number of instances</font>
	- Implies Distributed Systems
	- Very common for web applications or modern applications
	- [Auto Scaling Groups]({{< ref "10-auto-scaling-groups" >}})
	- For Horizontal Scaling (increasing the number of instances) we use [Auto Scaling Groups]({{< ref "10-auto-scaling-groups" >}}) and a [Load Balancer]({{< ref "9-elastic-load-balancing" >}})
## High Availability

- **High Availability** usually goes hand in hand with <font color=#f1ef63>horizontal scaling</font>
- <font color=#f1ef63>High Availability means running application / infrastructure in at least 2 Availability Zones</font>
- Goal of **High Availability** is to survive a data center loss / disaster
##### <font color=#10b981>High Availability is achieved by running Auto Scaling Groups (ASG) as well as Load Balancer in multi-AZ mode.</font>

---
## >> References <<

- [Elastic Load Balancing]({{< ref "9-elastic-load-balancing" >}})
- [Auto Scaling Groups]({{< ref "10-auto-scaling-groups" >}})
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