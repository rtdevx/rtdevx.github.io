---
title: EC2 (SAAC03)
date: 2026-04-01
description: EC2 - Associate Level.
summary: EC2 - Associate Level.
draft: false
tags:
  - SAA-C03
categories:
  - AWS
series: AWS Solution Architect
---
{{< lead >}}

ℹ️ **Associate‑level extension** of the [EC2]({{< ref "4-ec2" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series. In this post, I expand on key EC2 concepts and introduce deeper topics relevant to the **Associate‑level understanding**.

{{< /lead >}}

{{< alert "list" >}}

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |
{{< /alert >}}
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

Depending on the type of workload, you can create a placement group using one of the following placement strategies:

- **Cluster** – Packs instances close together <font color=#EBAC25>inside an Availability Zone</font>. This strategy enables workloads to achieve the low-latency network performance necessary for tightly-coupled node-to-node communication that is typical of high-performance computing (HPC) applications.

- **Partition** – <font color=#EBAC25>Spreads your instances across logical partitions such that groups of instances in one partition do not share the underlying hardware with groups of instances in different partitions.</font> This strategy is typically used by large distributed and replicated workloads, such as Hadoop, Cassandra, and Kafka.

- **Spread** – <font color=#EBAC25>Strictly places a small group of instances across distinct underlying hardware</font> to reduce correlated failures.

Placement groups are optional. If you don't launch your instances into a placement group, EC2 tries to place the instances in such a way that all of your instances are spread out across the underlying hardware to minimize correlated failures.
#### Pricing

There is no charge for creating a placement group.

📡 _Source:_ https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html

---
## >> Sources <<

[EC2]({{< ref "4-ec2" >}})

**Placement Groups:** https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}
### Course details and Resources

- [Ultimate AWS Certified Solutions Architect Associate 2026](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
- [AWS Certified Solutions Architect Associate Code & Slides](https://courses.datacumulus.com/downloads/certified-solutions-architect-pn9/)
	- [AWS Certified Solutions Architect Associate | Slides](https://media.datacumulus.com/aws-saa/AWS%20Certified%20Solutions%20Architect%20Slides%20v47.pdf)
	- [AWS Certified Solutions Architect Associate | Code](https://links.datacumulus.com/sa-associate-code-pn9)
- [Practice Exams | AWS Certified Solutions Architect Associate](https://www.udemy.com/course/practice-exams-aws-certified-solutions-architect-associate)

_Source:_ https://courses.datacumulus.com/downloads/certified-solutions-architect-pn9/

{{< alert "list" >}}

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |
{{< /alert >}}