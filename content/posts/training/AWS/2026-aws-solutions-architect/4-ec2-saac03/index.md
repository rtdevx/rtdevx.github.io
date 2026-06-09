---
title: "Solutions Architect: EC2"
date: 2026-04-02
description: Associate-level extension of the EC2 Section from AWS Cloud Practitioner Series.
summary: Associate-level extension of the EC2 Section from AWS Cloud Practitioner Series.
draft: false
tags:
  - SAA-C03
categories:
  - AWS
series: AWS Solution Architect
---
--- 
ℹ️ **Associate‑level extension** of the [EC2]({{< ref "4-ec2" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series. In this post, I expand on key EC2 concepts and introduce deeper topics relevant to the **Associate‑level understanding**.

{{< alert "list" >}}

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |
{{< /alert >}}

---
## Public vs Private vs Elastic IP

- **Public IP**
	- Machine can be identified on the internet
	- Unique across whole web
	- Can be geo-located
- **Private IP**
	- Machine can be identified on the Private Network only
	- Unique across the Private Network
	- Connection to the internet via NAT / Internet Gateway (proxy)
- **Elastic IP**
	- When machine is stopped and started again, it can change it's public IP
	- If fixed Public IP is needed, Elastic IP is required
	- Elastic IP is a Public IPv4 IP address owned by you until it's deleted
	- Can be attached to one instance at a time
	- <font color=#EB4925>Only 5 Elastic IP's per account</font> (soft limit, can be extended with AWS support)

{{< alert "skull-crossbones" >}}

**Avoid using Elastic IPs where possible**, since they usually indicate weak architecture choices; instead rely on random public IPs with DNS or, place workloads behind a load balancer so no public IP is needed.

<font color=#EBAC25>By default, your EC2 machine comes with a private IP for the internal AWS Network and a public IP, for the WWW.</font>

If EC2 instance is stopped and then started, **the public IP can change**.

{{< /alert >}}
## Placement Groups

To meet the needs of your workload, you can launch a group of _interdependent_ EC2 instances into a _placement group_ to influence their placement.

![](./assets/AWS_EC2_Placement_Groups.jpg "© kodekloud.com, [KodeKloud: EC2 Placement](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Elastic-Compute-CloudEC2/EC2-Placement/page)")


Depending on the type of workload, you can create a placement group using one of the following placement strategies:
### Cluster

Packs instances close together <font color=#EBAC25>inside an Availability Zone</font>. This strategy enables workloads to achieve the low-latency network performance necessary for tightly-coupled node-to-node communication that is typical of high-performance computing (HPC) applications.

|               |                                                                                                                                                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pros**      | - Extremely high network throughput and very low latency between instances (up to 10–100 Gbps with Enhanced Networking)<br>- Ideal for tightly coupled, high‑performance workloads that need fast node‑to‑node communication |
| **Cons**      | - All instances are in a single AZ, so an AZ outage takes down the entire group <br>- Capacity can be limited — launches may fail if AWS can’t place all instances close enough together                                     |
| **Use Cases** | - Big Data or distributed compute jobs that must complete quickly    <br>- HPC workloads, analytics engines, or applications requiring ultra‑low latency and high network bandwidth                                          |
### Partition

<font color=#EBAC25>Spreads your instances across logical partitions such that groups of instances in one partition do not share the underlying hardware with groups of instances in different partitions.</font> This strategy is typically used by large distributed and replicated workloads, such as Hadoop, Cassandra, and Kafka.

|               |                                                                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pros**      | - Can span multiple Availability Zones, improving resilience    <br>- Reduces the risk of simultaneous failure across instances    <br>- Instances are isolated on separate racks and physical hardware |
| **Cons**      | - Limited to **seven partitions per AZ** within a placement group                                                                                                                                       |
| **Use Cases** | - Applications that need maximum high availability    <br>- Critical workloads where each instance must be isolated from failures in other nodes                                                        |
### **Spread** 

<font color=#EBAC25>Strictly places a small group of instances across distinct underlying hardware</font> to reduce correlated failures.

|               |                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pros**      | - Highest failure isolation — each instance sits on distinct hardware    <br>- Ideal for small numbers of critical instances needing maximum resilience |
| **Cons**      | - Limited to **seven instances per AZ**                                                                                                                 |
| **Use Cases** | - Critical services where no two instances should fail together                                                                                         |

{{< alert "circle-info" >}}

Placement groups are optional. If you don't launch your instances into a placement group, EC2 tries to place the instances in such a way that all of your instances are spread out across the underlying hardware to minimize correlated failures.

{{< /alert >}}
### Pricing

There is no charge for creating a placement group.

📡 _Sources:_ 
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html
- [KodeKloud: EC2 Placement](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Elastic-Compute-CloudEC2/EC2-Placement)
## Elastic Network Interfaces (ENI)

- Logical component in a VPC that represents a virtual network card 
- The ENI can have the following attributes:
	- Primary private IPv4, one or more secondary IPv4
	- One Elastic IP (IPv4) per private IPv4
	- One Public IPv4
	- One or more security groups
	- A MAC address
	- You can create ENI independently and attach them on the fly (move them) on EC2 instances for failover
	- Bound to a specific availability zone (AZ)

📡 _More:_ https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html
## EC2 Hibernate

- **EC2 Hibernate**
	- The in-memory (RAM) state is preserved
	- The instance boot is much faster! (the OS is not stopped / restarted)
	- RAM state is written to a file in the root EBS volume
		- <font color=#EB4925>The root EBS volume must be encrypted</font>
 
- **Use cases**
	- Long-running processing
	- Saving the RAM state
	- Services that take time to initialize

- **Instance RAM Size** - must be less than 150 GB
- **Instance Size** - not supported for bare metal instances
- **AMI** - Amazon Linux 2, Linux AMI, Ubuntu, RHEL, CentOS & Windows…
- **Root Volume** - must be EBS, encrypted, not instance store
- **Available for** On-Demand, Reserved and Spot Instances

‼️An instance <font color=#EB4925>can NOT be hibernated more than 60 days.</font>

---
## >> Sources <<

[EC2]({{< ref "4-ec2" >}})

**Placement Groups:** 
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html
- [KodeKloud: EC2 Placement](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Elastic-Compute-CloudEC2/EC2-Placement)

Elastic Network Interface (ENI):

- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}
### Solutions Architect details and Resources

- [Ultimate AWS Certified Solutions Architect Associate 2026](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
- [AWS Certified Solutions Architect Associate Code & Slides](https://courses.datacumulus.com/downloads/certified-solutions-architect-pn9/)
	- [AWS Certified Solutions Architect Associate | Slides](https://media.datacumulus.com/aws-saa/AWS%20Certified%20Solutions%20Architect%20Slides%20v47.pdf)
	- [AWS Certified Solutions Architect Associate | Code](https://links.datacumulus.com/sa-associate-code-pn9)
- [Practice Exams | AWS Certified Solutions Architect Associate](https://www.udemy.com/course/practice-exams-aws-certified-solutions-architect-associate)

_Source:_ https://courses.datacumulus.com/downloads/certified-solutions-architect-pn9/

--- 
ℹ️ **Associate‑level extension** of the [EC2]({{< ref "4-ec2" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series. In this post, I expand on key EC2 concepts and introduce deeper topics relevant to the **Associate‑level understanding**.

{{< alert "list" >}}

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |
{{< /alert >}}

---