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
**Auto Scaling Group** contains a collection of EC2 instances that are treated as a logical grouping for the purposes of automatic scaling and management.

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
		- When a CloudWatch alarm is triggered (i.e. CPU > 70%) then add 2 instances
		- When a Cloud Watch alarm is triggered (i.e. CPU < 30%) then remove 1 instance
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