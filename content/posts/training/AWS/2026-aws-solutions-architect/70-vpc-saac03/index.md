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

<center>📡 <font color=#EBAC25><b>Useful TAG: </b></font><a href="{{< ref "tags/vpc" >}}" target="_self">VPC</a></center>

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
### VPC - Subnet (IPv4)

- AWS reserves **5 IP addresses** in every subnet (the first four and the last one)    
- These addresses **cannot** be assigned to EC2 instances    
- For a subnet like **10.0.0.0/24**, the reserved IPs are:    
    - **10.0.0.0** — network address        
    - **10.0.0.1** — AWS VPC router        
    - **10.0.0.2** — AWS‑provided DNS mapping        
    - **10.0.0.3** — reserved for future AWS use        
    - **10.0.0.255** — broadcast address (broadcasting isn’t supported in VPCs, so it’s reserved)

{{< alert "circle-info" >}}

<font color=#EBAC25>Exam Tip</font>, if you need 29 IP addresses for EC2 instances:

- You can’t choose a subnet of size /27 (32 IP addresses, 32 – 5 = 27 < 29)
- You need to choose a subnet of size /26 (64 IP addresses, 64 – 5 = 59 > 29)

{{< /alert >}}
## Internet Gateway (IGW)

- <font color=#EBAC25>An Internet Gateway enables resources in a VPC (such as EC2 instances) to reach the public Internet   </font>
- It is fully managed, horizontally scalable, and highly available    
- <font color=#EBAC25>It must be created separately and then attached to a VPC </font>   
- A VPC can have **only one** Internet Gateway attached, and an Internet Gateway can attach to **only one** VPC    
- The IGW alone does **not** provide Internet access - <font color=#EB4925>you must also update the route tables to send traffic to it</font>

<font color=#EBAC25><i>More info:</i></font> [Building AWS VPC]({{< ref "06-vpc" >}})
## NAT Gateway

- Fully managed AWS NAT service with high bandwidth, high availability, and no admin overhead 
- Billed by the hour plus data processing charges    
- Deployed in a specific Availability Zone and associated with an Elastic IP    
- Cannot be used by instances in the **same** subnet—only by instances in **other** subnets    
- Requires an Internet Gateway for outbound traffic (Private Subnet → NAT Gateway → IGW)    
- Provides **5 Gbps** baseline throughput and automatically scales up to **100 Gbps**    
- No Security Groups are needed or supported for NAT Gateways

ℹ️ _Note:_ NAT Gateway is resilient within a single Availability Zone. Must create multiple NAT Gateways in multiple AZs for fault tolerance.

{{< mermaid >}}

flowchart TB

    subgraph VPC["VPC"]
        
        subgraph AZA["AZ A"]
            subgraph PubA["Public Subnet A"]
                NAT_A["NAT Gateway A"]
            end
            subgraph PrivA["Private Subnet A"]
                EC2_A["EC2 Instance A"]
            end
        end

        subgraph AZB["AZ B"]
            subgraph PubB["Public Subnet B"]
                NAT_B["NAT Gateway B"]
            end
            subgraph PrivB["Private Subnet B"]
                EC2_B["EC2 Instance B"]
            end
        end

    end

    IGW["Internet Gateway"]

    EC2_A -->|Outbound traffic| NAT_A
    EC2_B -->|Outbound traffic| NAT_B

    NAT_A --> IGW
    NAT_B --> IGW

{{< /mermaid >}}
### Regional NAT Gateway (RNAT)

- Provides a **highly available, VPC‑wide NAT service**    
- RNAT uses its **own dedicated route tables**    
- Removes the need to deploy NAT Gateways in every Availability Zone - it is **shared across all AZs**    
- You **don’t need public subnets** in your VPC to host RNAT    
- Automatically detects when new AZs become available and **extends coverage** to them

{{< mermaid >}}

flowchart TB

    subgraph VPC["VPC"]
        
        subgraph AZA["AZ A"]
            subgraph PrivA["Private Subnet A"]
                EC2_A["EC2 Instance A"]
            end
        end

        subgraph AZB["AZ B"]
            subgraph PrivB["Private Subnet B"]
                EC2_B["EC2 Instance B"]
            end
        end

    end

    RNAT["Regional NAT Gateway"]
    IGW["Internet Gateway"]

    EC2_A -->|0.0.0.0/0| RNAT
    EC2_B -->|0.0.0.0/0| RNAT

    RNAT --> IGW

{{< /mermaid >}}

---
## >> Sources <<

IP Address Guide (CIDR): [IPAddressGuide](https://www.ipaddressguide.com/cidr)

- [What is Amazon VPC?](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
## >> References <<

**Cloud Practitioner:** [VPC]({{< ref "18-vpc" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}