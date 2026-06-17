---
title: "Solutions Architect: VPC"
date: 2026-04-16
description: Associate-level extension of the `VPC` Section from AWS Cloud Practitioner Series.
summary: Associate-level extension of the `VPC` Section from AWS Cloud Practitioner Series.
draft: false
tags:
  - SAA-C03
  - VPC
categories:
  - AWS
  - Networking
series: AWS Solution Architect
---
---
ℹ️ **Associate‑level extension** of the [VPC]({{< ref "18-vpc" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series.

<center>📡 <font color=#EBAC25><b>Useful TAG:</b></font><a href="{{< ref "tags/vpc" >}}" target="_self">VPC</a></center>

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |

![](./assets/AWS_VPC_DIagram.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
## CIDR

A **CIDR** consists of two components:

- **Base IP**
	- Represents an IP contained in the range (XX.XX.XX.XX)
	- Example: 10.0.0.0, 192.168.0.0, …

- **Subnet Mask**
	- Defines how many bits can change in the IP
	- Example: /0, /24, /32
	- Can take two forms:
		- /8 => 255.0.0.0
		- /16 => 255.255.0.0
		- /24 => 255.255.255.0
		- /32 => 255.255.255.255

![](./assets/AWS_VPC_CIDR.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

<font color=#EBAC25><i>More info:</i></font> [IPAddressGuide](https://www.ipaddressguide.com/cidr)
### Public vs. Private IP (IPv4)

{{< lead >}}

The Internet Assigned Numbers Authority (IANA) established certain blocks of IPv4 addresses for the use of private (LAN) and public (Internet) addresses.

{{< /lead >}}

<font color=#EBAC25>Private IP</font> addresses must fall within one of these ranges:

- **10.0.0.0 - 10.255.255.255** (10.0.0.0/8) - typically used in large networks    
- **172.16.0.0 - 172.31.255.255** is the full **private IP range** defined by RFC1918 (CIDR **172.16.0.0/12**)
	- **AWS default VPCs** use a **single /16 block inside that range**, specifically **172.31.0.0/16**
- **192.168.0.0 - 192.168.255.255** (192.168.0.0/16) - common in home and small office networks

<font color=#C7EB25>All the rest of the IP addresses on the Internet are Public</font>.

{{< alert "circle-info" >}}

- Every new AWS account comes with a **default VPC** already created    
- If you launch an EC2 instance without choosing a subnet, it is placed in this default VPC    
- The default VPC is **internet‑enabled**, and EC2 instances launched inside it receive **public IPv4 addresses** by default    
- Instances also get both a **public DNS name** and a **private DNS name**

{{< /alert >}}
### VPC in AWS (IPv4)

- A **VPC (Virtual Private Cloud)** is your isolated network environment in AWS    
- You can create **multiple VPCs per region** (<font color=#EBAC25>default soft limit: <b>5</b></font>)    
- Each VPC can have up to **5 CIDR blocks**, and each CIDR must be between:    
    - **/28** (16 IP addresses)        
    - **/16** (65,536 IP addresses)
        
- VPCs must use **private IPv4 ranges** only:    
    - 10.0.0.0/8        
    - 172.16.0.0/12        
    - 192.168.0.0/16

<font color=#EB4925>Your VPC CIDR should not overlap with any existing networks (e.g., corporate on‑prem) to avoid routing conflicts</font>.






---
## >> Sources <<

IP Address Guide (CIDR): [IPAddressGuide](https://www.ipaddressguide.com/cidr)

- [What is Amazon VPC?](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
## >> References <<

**Cloud Practitioner:** [VPC]({{< ref "18-vpc" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}