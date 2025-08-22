---
title: 8 - Scalability & High Availability
date: 2025-08-08
description: Scalability & High Availability in AWS Cloud
summary: Scalability means that an application / infrastructure can handle greater loads by adapting...
draft: false
tags:
  - AWS
  - Training
categories: AWS Cloud Practitioner
---
## Scalability

**Scalability** means that an application / infrastructure can handle greater loads by adapting.
### Two kinds of scalability

- **Vertical Scalability**
	- <font color=#f1ef63>Increasing the size of an instance</font>
	- Very common for non-distributed systems, i.e. Databases
	- Hardware limits apply
- **Horizontal Scalability (Elasticity)**
	- Increasing the number of instances
	- Implies Distributed Systems
	- Very common for web applications or modern applications
	- <font color=#27D3F5>Auto Scaling Groups</font>
	- For Horizontal Scaling (increasing the number of instances) we use <font color=#27D3F5>Auto Scaling Group</font> and a <font color=#27D3F5>Load Balancer</font>
## High Availability

- High Availability usually goes hand in hand with <font color=#f1ef63>horizontal scaling</font>
- <font color=#f1ef63>High Availability means running application / infrastructure in at least 2 Availability Zones</font>
- Goal of High Availability is to survive a data center loss / disaster
##### <font color=#10b981>High Availability is achieved by running Auto Scaling Groups (ASG) as well as Load Balancer in multi-AZ mode.</font>

---
## References

- <font color=#27D3F5>Elastic Load Balancing</font>
- <font color=#27D3F5>Auto Scaling Groups</font>

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
