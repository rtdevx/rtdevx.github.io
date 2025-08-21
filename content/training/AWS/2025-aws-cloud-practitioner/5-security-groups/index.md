---
title: 5 - Security Groups
date: 2025-08-05
description: AWS Security Groups
summary: AWS Security Groups are the fundamental of network security in AWS. They control how traffic is allowed in or out of our EC2 instances...
draft: false
tags:
  - AWS
  - Training
categories: AWS Cloud Practitioner
---
## Amazon Security Groups

- Security Groups are the fundamental of network security in AWS
- They control how traffic is allowed in or out of our EC2 instances
- Security Groups **only contain allow rules**
- Security Groups rules <font color=#10b981>can reference an IP or another Security Group</font>
- Security Groups are acting as a "_firewall_" for EC2 instances

---

{{< youtube CW_3D1tL3_I >}}

---
## Security Groups scope

- Access to Ports
- Authorized IP ranges - IPv4 and IPv6
- Control inbound network
- Control outbound network
## Security Groups principals

- <font color=#f4e40b>Can be attached to multiple instances</font>
- <font color=#f4e40b>Locked down to a region / VPC combination</font>
- Lives "outside" of an EC2 instance - if traffic is blocked, EC2 won't see it
- It's a good practice to maintain one separate SG for SSH access
- <font color=#f4e40b>If application is not accessible (time out) then it's a Security Group issue</font>
- <font color=#f4e40b>If application gives a "connection refused" error then it's an application error or it's not launched</font>
- All inbound traffic is <font color=#f43f5e>blocked</font> by default
- All outbound traffic is <font color=#10b981>allowed</font> by default

---
## Sources

{{< icon "youtube" >}} _Full YouTube Rahul's AWS Course:_ https://www.youtube.com/playlist?list=PL7iMyoQPMtAN4xl6oWzafqJebfay7K8KP

---
## Disclaimer

{{< alert >}}
_Disclaimer: Content for educational purposes only, no rights reserved._

Most of the content in this series is coming from **Stephane Maarek's** [Ultimate AWS Certified Cloud Practitioner CLF-C02 2025](https://www.udemy.com/course/aws-certified-cloud-practitioner-new/) course on Udemy.

I highly encourage you to take the [Stephane's courses](https://www.udemy.com/user/stephane-maarek/) as they are awesome and really help understanding the subject.

_More about Stephane Maarek:_

- https://www.linkedin.com/in/stephanemaarek
- https://x.com/stephanemaarek

**This article is just a summary and has been published to help me learning and passing the practitioner exam.**
{{< /alert >}}