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
    - **10.0.0.0** - network address        
    - **10.0.0.1** - AWS VPC router        
    - **10.0.0.2** - AWS‑provided DNS mapping        
    - **10.0.0.3** - reserved for future AWS use        
    - **10.0.0.255** - broadcast address (broadcasting isn’t supported in VPCs, so it’s reserved)

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
## Security Groups & NACLs

{{< lead >}}

**Security Groups** are **stateful**, meaning return traffic is automatically allowed, and they act as virtual firewalls **at the instance level**. 

Network **ACLs** are **stateless**, so both inbound and outbound rules must be explicitly defined, and they filter traffic **at the subnet boundary**.

{{< /lead >}}
### Network Access Control List (NACL)

- A Network ACL acts as a subnet‑level firewall that controls inbound and outbound traffic.    
- Each subnet is associated with a single NACL, and new subnets inherit the **default NACL** unless changed.    
- NACL rules are numbered **1–32766**, and the rule with the **lowest number** that matches the traffic determines the outcome.    
- Example: rule **#100 ALLOW** and rule **#200 DENY** for the same IP means the traffic is allowed because rule 100 takes precedence.    
- Any traffic that doesn’t match a rule hits the final _“_” deny* entry.    
- AWS recommends spacing rule numbers in increments of 100 for easier management.    
- Newly created NACLs start with **deny‑all** rules.    
- NACLs are useful for **blocking specific IP addresses** at the subnet boundary.
### Default NACL

- Accepts everything inbound/outbound with the subnets it’s associated with
- <font color=#EB4925>Do NOT modify the Default NACL, instead create custom NACLs</font>

![](./assets/AWS_VPC_NACL_Default.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

{{< alert "circle-info" >}}

🙋🏻 _Question:_ Why do NACLs have both ALLOW and DENY rules?

Because **NACLs are stateless**, they must explicitly decide what to do with every packet. That means they need **ALLOW rules** to permit traffic and **DENY rules** to block traffic - nothing is remembered, and nothing is implied.

🙋🏻 _Question:_ What is “Rule #”?

**Rule # is the priority number**.

- Lower number = **higher priority**    
- NACL evaluates rules **in order**, starting from the lowest number    
- The **first matching rule wins**, and evaluation stops immediately    

🙋🏻 _Question:_ Why does the default NACL show both ALLOW and DENY?

The default NACL includes:
- **Rule 100 ALLOW all** → permits all traffic    
- **Rule * DENY all** → catch‑all fallback if nothing else matches    

This ensures the NACL always has a final decision path.

{{< /alert >}}
### Ephemeral Ports

- Every connection between two endpoints requires ports, and while clients connect to a server’s well‑known port, the server replies back using an **ephemeral (temporary) port**.    
- Different operating systems allocate ephemeral ports from different ranges - for example, **49152-65535** on IANA and Windows 10, and **32768-60999** on many Linux kernels.

![](./assets/AWS_VPC_NACL_Ephemeral.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### Security Group vs. NACLs

| Security Group                                                                 | NACL                                                                                                      |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Operates at the instance level                                                 | Operates at the subnet level                                                                              |
| Supports allow rules only                                                      | Supports allow rules and deny rules                                                                       |
| **Stateful:** return traffic is automatically allowed, regardless of any rules | **Stateless:** return traffic must be explicitly allowed by rules (think of ephemeral ports)              |
| All rules are evaluated before deciding whether to allow traffic               | Rules are evaluated in order (lowest to highest) when deciding whether to allow traffic, first match wins |
| Applies to an EC2 instance when specified by someone                           | Automatically applies to all EC2 instances in the subnet that it’s associated with                        |

<font color=#EBAC25><i>More info:</i></font> [Control subnet traffic with network access control lists](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html)
## VPC Peering

- VPC Peering lets you **privately connect two VPCs** over the AWS internal network so they can communicate as if they were part of the same environment.    
- The VPCs must have **non‑overlapping CIDR ranges**.    
- Peering is **not transitive** - every pair of VPCs that needs to talk must have its own peering connection.    
- You must update the **route tables in each VPC’s subnets** so that EC2 instances can reach each other through the peering link.

{{< alert "circle-info" >}}

- You can create VPC Peering connection between VPCs in different AWS accounts/regions
- You can reference a security group in a peered VPC (works cross accounts – same region)

{{< /alert >}}
## VPC Endpoints

{{< lead >}}

VPC Endpoints let your resources in a VPC **privately** access AWS services **without using the Internet**, **without needing an Internet Gateway**, and **without going through a NAT Gateway**. They keep traffic entirely inside the AWS network, improving security and often reducing cost.

{{< /lead >}}

{{< mermaid >}}

flowchart TB

    subgraph VPC["VPC"]

        subgraph PrivateSubnet["Private Subnet"]
            EC2["EC2 Instance"]
        end

        subgraph EndpointENI["Interface Endpoint (ENI)"]
            ENI1["ENI with Private IP"]
        end

        subgraph GatewayEndpoint["Gateway Endpoint"]
            GWEP["S3 / DynamoDB Gateway Endpoint"]
        end

    end

    AWSService["AWS Service (e.g., SSM, Secrets Manager)"]
    S3["Amazon S3"]

    %% Traffic flows
    EC2 -->|Private traffic| ENI1
    ENI1 --> AWSService

    EC2 -->|Route table entry| GWEP
    GWEP --> S3

{{< /mermaid >}}
### Interface Endpoints (most common)

- Powered by **ENIs** (Elastic Network Interfaces) in your subnets    
- Provide **private IPs** to reach AWS services like SSM, Secrets Manager, API Gateway, STS, CloudWatch, etc.    
- Support **Security Groups**    
- You pay **per hour + data processed**    

Think of them as: **“Private ENIs that act as a doorway to an AWS service.”**
### Gateway Endpoints

- Only for **S3** and **DynamoDB**    
- Added to your **route tables**    
- **Free** to use    
- No ENIs, no Security Groups    

Think of them as: **“Route‑table entries that send traffic to S3/DynamoDB privately.”**
### Why VPC Endpoints matter

- **No Internet exposure**    
- **No NAT Gateway cost** for S3/DynamoDB traffic    
- **Lower latency** (stays on AWS backbone)    
- **Better security posture** (private connectivity, IAM policies, endpoint policies)
### Lambda in VPC accessing DynamoDB

- DynamoDB is a **public AWS service**, so a Lambda function inside a VPC must either reach it through the **public Internet** (which requires a NAT Gateway in a public subnet plus an Internet Gateway), or

- Use the better, **private and free** option: create a **DynamoDB Gateway VPC Endpoint** and update your route tables so the Lambda function can access DynamoDB entirely through the **AWS private network**.
## VPC Flow Logs

- VPC Flow Logs record IP traffic flowing **into and out of** your VPC, subnets, or individual ENIs.    
- They’re useful for monitoring and diagnosing network connectivity issues.    
- Flow log data can be sent to **S3**, **CloudWatch Logs**, or **Kinesis Data Firehose**.    
- They also capture traffic from **AWS‑managed network interfaces** such as ELB, RDS, ElastiCache, Redshift, WorkSpaces, NAT Gateways, and Transit Gateways.
### VPC Flow Logs Syntax

- **srcaddr & dstaddr** - help identify problematic IP protocol
- **srcport & dstport** - help identity problematic ports bytes end
- Action - success or failure of the request due to Security Group / NACL
- Can be used for analytics on usage patterns, or malicious behavior
- **Query VPC flow logs using Athena on S3 or CloudWatch Logs Insights**

![](./assets/AWS_VPC_Flow_Logs.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

<font color=#EBAC25><i>More info:</i></font> [Flow log record examples](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-records-examples.html)
### VPC Flow Logs - Troubleshoot SG & NACL issues

![](./assets/AWS_VPC_Flow_Logs_NACL_Issue.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### VPC Flow Logs - Architectures

![](./assets/AWS_VPC_Flow_Logs_Architectures.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
## Site-to-Site VPN

- A **Virtual Private Gateway (VGW)** is the AWS‑side VPN concentrator; you create it and attach it to the VPC that will use the Site‑to‑Site VPN, and you can optionally set a custom ASN for routing.    
- A **Customer Gateway (CGW)** represents your on‑premises side and can be either a physical device or a software‑based VPN appliance.

{{< mermaid >}}

flowchart TD

    %% On‑premises side
    subgraph OnPrem["Corporate Data Center"]
        CGW_Private["Customer Gateway (Private IP)"]
        Server["On‑Prem Server"]
        NAT_Device["NAT Device (Public IP)"]
        CGW_Public["Customer Gateway (Public IP)"]
    end

    %% AWS side
    subgraph AWS["AWS VPC"]
        VGW["Virtual Private Gateway (VGW)"]
        RT["Route Table (Route Propagation Enabled)"]
        PrivateSubnet["Private Subnet"]
        EC2["EC2 Instance"]
        SG["Security Group (Allow ICMP if pinging)"]
    end

    %% Connections
    Server --> CGW_Private
    CGW_Private --> NAT_Device
    NAT_Device -->|NAT‑T Public IP| VGW

    CGW_Public -->|Direct Public IP| VGW

    VGW --> RT
    RT --> PrivateSubnet
    PrivateSubnet --> EC2
    EC2 --> SG

{{< /mermaid >}}
<br>
{{< alert "circle-info" >}}

**On‑premises side**

- Your Customer Gateway device may have:    
    - A **private IP** behind a NAT device (using NAT‑T), <font color=#EB4925>OR</font>
    - A **public IP** directly exposed
        
- Either way, AWS must see a **public, routable IP** for the VPN tunnel.

**AWS side**

- A **Virtual Private Gateway (VGW)** terminates the VPN tunnel.    
- The **route table must have route propagation enabled** so on‑prem routes automatically appear.    
- If you want to **ping EC2 instances**, the Security Group must allow **ICMP inbound**.

{{< /alert >}}
### AWS VPN CloudHub

- AWS VPN CloudHub lets you securely connect multiple remote sites using a **hub‑and‑spoke VPN model**, ideal for low‑cost primary or backup connectivity between locations.    
- Because it’s still a **VPN over the public Internet**, you set it up by attaching multiple VPN connections to the **same Virtual Private Gateway**, enabling **dynamic routing**, and updating your route tables so all sites can communicate.

![](./assets/AWS_VPC_VPN_CloudHub.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

{{< alert "circle-info" >}}

**AWS side**

- A single **Virtual Private Gateway (VGW)** acts as the _hub_.    
- Multiple Availability Zones and private subnets host EC2 instances.    
- The VGW is attached to the VPC and handles all VPN tunnels.

**Customer side**

- Each customer site has its own **Customer Gateway (CGW)**.    
- Each CGW establishes a **separate VPN tunnel** to the VGW.

**CloudHub behaviour**

- Because all tunnels terminate on the **same VGW**, AWS can route traffic **between customer sites**, not just between each site and the VPC.    
- This creates a **hub‑and‑spoke** topology:    
    - VGW = hub        
    - Customer Gateways = spokes        
- With **BGP dynamic routing**, all sites learn each other’s routes.

**Benefits**

- Simple, low‑cost multi‑site connectivity    
- No need for complex on‑prem mesh VPNs    
- Works as primary or backup WAN connectivity    
- Uses the public Internet but encrypted end‑to‑end

{{< /alert >}}
## Direct Connect (DX)

- AWS Direct Connect gives you a **dedicated, private network link** from your on‑premises environment to your VPC.    
- You establish a physical connection between your data centre and an **AWS Direct Connect location**.    
- Your VPC still needs a **Virtual Private Gateway** to receive the connection.    
- The same Direct Connect link can reach both **public AWS services** (like S3) and **private VPC resources** (like EC2).    
- Common use cases include:    
    - Higher, more predictable **bandwidth** for large data transfers at lower cost        
    - **Consistent, low‑latency** connectivity for real‑time applications        
    - **Hybrid architectures** spanning on‑prem and cloud        
- Direct Connect supports both **IPv4 and IPv6** traffic.
### Direct Connect Gateway

<font color=#EB4925>If you want to setup a Direct Connect to one or more VPC in many different regions (same account), you must use a Direct Connect Gateway</font>.

![](./assets/AWS_VPC_DX_GW.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### Direct Connect - Connection Types

- **Dedicated Connections** provide a physical, customer‑specific Ethernet port at speeds from **1 Gbps up to 400 Gbps**. You request these through AWS, and an AWS Direct Connect Partner completes the provisioning.    
- **Hosted Connections** are provisioned entirely through AWS Direct Connect Partners and range from **50 Mbps to 25 Gbps**. They offer flexible, on‑demand capacity adjustments, though new connections often take **over a month** to be fully established.
### Direct Connect - Encryption

- Traffic sent over AWS Direct Connect is <font color=#EB4925>not encrypted by default</font>, even though it travels over a private link.    
- <font color=#EB4925>If you need encryption, you can layer a VPN (IPsec) tunnel on top of Direct Connect to create an encrypted private connection</font>.
- This adds an extra layer of security, but also introduces a bit more setup complexity.
### Direct Connect - Resiliency

![](./assets/AWS_VPC_DX_Resiliency.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
#### Site-to-Site VPN connection as a backup

In case Direct Connect fails, you can set up a backup Direct Connect connection (expensive), or a Site-to-Site VPN connection.

![](./assets/AWS_VPC_DX_Resiliency_VPN_Backup.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

---
## >> Sources <<

IP Address Guide (CIDR): [IPAddressGuide](https://www.ipaddressguide.com/cidr)

- [What is Amazon VPC?](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [Control subnet traffic with network access control lists](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html)
- [Flow log record examples](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-records-examples.html)
## >> References <<

**Cloud Practitioner:** [VPC]({{< ref "18-vpc" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}