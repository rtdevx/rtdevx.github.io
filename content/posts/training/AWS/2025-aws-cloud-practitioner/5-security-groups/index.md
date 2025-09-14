---
title: Security Groups
date: 2025-08-05
description: AWS Security Groups
summary: AWS Security Groups are the fundamental of network security in AWS. They control how traffic is allowed in or out of our EC2 instances...
draft: false
tags:
  - CLF-C02
categories: AWS
---
## Amazon Security Groups

- Security Groups are the fundamental of network security in AWS
- They control how traffic is allowed in or out of our EC2 instances
- Security Groups **only contain allow rules**
- Security Groups rules <font color=#C7EB25>can reference an IP or another Security Group</font>
- Security Groups are acting as a "_firewall_" for [EC2]({{< ref "4-ec2" >}}) instances

---

{{< youtube CW_3D1tL3_I >}}

---
## Security Groups scope

- Access to Ports
- Authorized IP ranges - IPv4 and IPv6
- Control inbound network
- Control outbound network
## Security Groups principals

- <font color=#EBAC25>Can be attached to multiple instances</font>
- <font color=#EBAC25>Locked down to a region / VPC combination</font>
- Lives "outside" of an EC2 instance - if traffic is blocked, EC2 won't see it
- <font color=#C7EB25>It's a good practice to maintain one separate SG for SSH access</font>
- <font color=#EBAC25>If application is not accessible (time out) then it's a Security Group issue</font>
- <font color=#EBAC25>If application gives a "connection refused" error then it's an application error or it's not launched</font>
- All inbound traffic is <font color=#EB4925>blocked</font> by default
- All outbound traffic is <font color=#C7EB25>allowed</font> by default

---
## >> Sources <<

{{< icon "youtube" >}} _Full YouTube Rahul's AWS Course:_ https://www.youtube.com/playlist?list=PL7iMyoQPMtAN4xl6oWzafqJebfay7K8KP

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

{{< disclaimer_practitioner25 >}}
