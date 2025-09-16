---
title: Auto Scaling Group
date: 2025-08-10
description: Auto Scaling Group
summary: Auto Scaling Group contains a collection of EC2 instances that are treated as a logical grouping for the purposes of automatic scaling and management...
draft: false
tags:
  - CLF-C02
categories: AWS
---
**Auto Scaling Group** contains a collection of [EC2 instances]({{< ref "4-ec2" >}}) that are treated as a logical grouping for the purposes of automatic scaling and management.

**Auto Scaling Group** uses **Auto Scaling** features such as **health check replacements** and **scaling policies**.

---

{{< youtube fwfkSxb1T-s >}}
_AWS EC2 Auto Scaling : Step By Step Tutorial_

---
## The purpose of Auto Scaling Group

- Scale out (add EC2 instances) to match an increased load
- Scale in (remove EC2 instances) to match a decreased load
- Ensure we have a minimum and maximum number of instances running
- Automatically register new instances to the [Load Balancer]({{< ref "9-elastic-load-balancing" >}})
- Replace unhealthy instances
- Cost Saving (only run at optimal capacity)

![](./assets/AWS_ASG1.png)
## Creating an Auto Scaling Group

- Create Launch Template
- Create Auto Scaling Group
	- Select Availability Zones
	- Select Availability Zone distribution
	- Attach to an existing Load Balancer
	- Turn on Elastic Load Balancing health checks
	- Define the desired capacity
	- Set up Automatic Scaling (optional)
	- Select Instance maintenance policy
	- Additional capacity settings
	- Additional settings
## Auto Scaling Groups - Strategies

- **Manual Scaling** - update the size of an ASG manually
- **Dynamic Scaling** - respond to changing demand
	- **Simple / Step Scaling**
		- When a [CloudWatch]({{< ref "17-cloud-monitoring/#cloudwatch-metrics" >}}) alarm is triggered (i.e. CPU > 70%) then add 2 instances
		- When a [CloudWatch]({{< ref "17-cloud-monitoring/#cloudwatch-metrics" >}}) alarm is triggered (i.e. CPU < 30%) then remove 1 instance
	- **Target Tracking Scaling**
		- Example: Average ASG CPU to stay around 40%
	- **Scheduled Scaling**
		- Anticipate a scaling based on known usage patterns
			- Example: increase the min. capacity to 10 at 5pm on Fridays
	- **Predictive Scaling**
		- Uses Machine Learning to predict the load

---
## >> Sources <<

- https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html

{{< icon "youtube" >}} _Full YouTube Rahul's AWS Course:_ https://www.youtube.com/playlist?list=PL7iMyoQPMtAN4xl6oWzafqJebfay7K8KP
## >> References <<

- [Scalability & High Availability]({{< ref "8-scalability-high-availability" >}})
- [Elastic Load Balancing]({{< ref "9-elastic-load-balancing" >}})
## >> Table of contents (CLF-C02) <<

{{< toc_cf-c02 >}}
## >> Disclaimer <<

{{< disclaimer_practitioner25 >}}
