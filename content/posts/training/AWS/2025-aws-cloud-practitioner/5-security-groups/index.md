---
title: Security Groups
date: 2025-08-05
description: AWS Security Groups
summary: AWS Security Groups are the fundamental of network security in AWS. They control how traffic is allowed in or out of our EC2 instances...
draft: false
tags:
  - CLF-C02
categories: AWS
series: AWS Cloud Practitioner
---
## Amazon Security Groups

- Security Groups are the fundamental of network security in AWS
- They control how traffic is allowed in or out of our EC2 instances
- Security Groups **only contain allow rules** (as oppose to [NACL]({{< ref "18-vpc/#security-groups--network-acl" >}}) or [AWS Network Firewall]({{< ref "19-security-and-compliance/#aws-network-firewall" >}}))
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
## >> Disclaimer <<

{{< disclaimer_practitioner25 >}}
