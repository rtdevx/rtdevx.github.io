---
title: Scalability & High Availability
date: 2025-08-08
description: Scalability & High Availability in AWS Cloud
summary: Scalability means that an application / infrastructure can handle greater loads by adapting...
draft: false
tags:
  - CLF-C02
categories: AWS
series: AWS Cloud Practitioner
---
## Scalability

**Scalability** means that an application / infrastructure can handle greater loads by adapting.
### Two kinds of scalability

- **Vertical Scalability**
	- <font color=#EBAC25>Increasing the size of an instance</font>
	- Very common for non-distributed systems, i.e. Databases
	- Hardware limits apply
- **Horizontal Scalability (Elasticity)**
	- <font color=#EBAC25>Increasing the number of instances</font>
	- Implies Distributed Systems
	- Very common for web applications or modern applications
	- [Auto Scaling Groups]({{< ref "10-auto-scaling-groups" >}})
	- For Horizontal Scaling (increasing the number of instances) we use [Auto Scaling Groups]({{< ref "10-auto-scaling-groups" >}}) and a [Load Balancer]({{< ref "9-elastic-load-balancing" >}})
## High Availability

- **High Availability** usually goes hand in hand with <font color=#EBAC25>horizontal scaling</font>
- <font color=#EBAC25>High Availability means running application / infrastructure in at least 2 Availability Zones</font>
- Goal of **High Availability** is to survive a data center loss / disaster
##### <font color=#C7EB25>High Availability is achieved by running Auto Scaling Groups (ASG) as well as Load Balancer in multi-AZ mode.</font>

---
## >> References <<

- [Elastic Load Balancing]({{< ref "9-elastic-load-balancing" >}})
- [Auto Scaling Groups]({{< ref "10-auto-scaling-groups" >}})
## >> Disclaimer <<

{{< disclaimer_practitioner25 >}}
