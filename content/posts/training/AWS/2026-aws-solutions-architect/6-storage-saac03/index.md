---
title: "Solutions Architect: Storage"
date: 2026-04-03
description: Associate-level extension of the Storage Section from AWS Cloud Practitioner Series.
summary: Associate-level extension of the Storage Section from AWS Cloud Practitioner Series.
draft: false
tags:
  - SAA-C03
categories:
  - AWS
series: AWS Solution Architect
---
---
ℹ️ **Associate‑level extension** of the [Storage]({{< ref "6-storage" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series. In this post, I expand on key EC2 concepts and introduce deeper topics relevant to the **Associate‑level understanding**.

{{< alert "list" >}}

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |

ℹ️ There’s very little difference between the **Cloud Practitioner** and **Associate** content in the **Storage** domain, so I’m only covering the additional **Associate‑level** points here. 

For full foundational coverage, refer to the table below from the Cloud Practitioner section.

{{< /alert >}}

|                                    |                                                                                                                     |                                                                                                             |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [Storage]({{< ref "6-storage" >}}) | - [EBS]({{< ref "6-storage/#ebs-volume" >}})<br>- [EC2 Instance Store]({{< ref "6-storage/#ec2-instance-store" >}}) | - [EFS]({{< ref "6-storage/#efs---elastic-file-system" >}})<br>- [FSx]({{< ref "6-storage/#amazon-fsx" >}}) |
| AMI                                | - [AMI]({{< ref "7-ami" >}})                                                                                        |                                                                                                             |
## EBS Volume Types

**EBS volumes come in six types:**

- **gp2 / gp3 (SSD)** - General‑purpose SSD volumes offering a balance of cost and performance for most workloads    
- **io1 / io2 Block Express (SSD)** - Highest‑performance SSD options for mission‑critical, low‑latency, or high‑throughput workloads    
- **st1 (HDD)** - Low‑cost, throughput‑optimised HDD volumes for frequently accessed, streaming‑style workloads    
- **sc1 (HDD)** - Lowest‑cost HDD option for infrequently accessed data

**Additional notes:**

- EBS volumes are defined by **size, throughput, and IOPS**    
- Only **gp2/gp3** and **io1/io2 Block Express** can be used as **boot volumes**

||[Amazon EBS General Purpose SSD volumes](https://docs.aws.amazon.com/ebs/latest/userguide/general-purpose.html)|   |[Amazon EBS Provisioned IOPS SSD volumes](https://docs.aws.amazon.com/ebs/latest/userguide/provisioned-iops.html)|   |
|---|:-:|:-:|:-:|:-:|
|**Volume type**|`gp3` 6|`gp2`|`io2` Block Express|`io1`|
|**Durability**|99.8% - 99.9% durability (0.1% - 0.2% annual failure rate)|   |99.999% durability (0.001% annual failure rate)|99.8% - 99.9% durability (0.1% - 0.2% annual failure rate)|
|**Use cases**|- Transactional workloads<br>    <br>- Virtual desktops<br>    <br>- Medium-sized, single-instance databases<br>    <br>- Low-latency interactive applications<br>    <br>- Boot volumes<br>    <br>- Development and test environments|   |Workloads that require:<br><br>- Consistent sub-millisecond latency with average latency under 500 microseconds 5<br>    <br>- Sustained IOPS performance<br>    <br>- More than 80,000 IOPS or 2,000 MiB/s of throughput|- Workloads that require sustained IOPS performance or more than 16,000 IOPS<br>    <br>- I/O-intensive database workloads|
|**Volume size**|1 GiB - 64 TiB|1 GiB - 16 TiB|4 GiB - 64 TiB|4 GiB - 16 TiB|
|**Max IOPS**|80,000 3 (25.6 KiB I/O 4)|16,000 (16 KiB I/O 4)|256,000 3 (16 KiB I/O 4)|64,000 (16 KiB I/O 4)|
|**Max throughput**|2,000 MiB/s|250 MiB/s 1|4,000 MiB/s|1,000 MiB/s 2|
|**Amazon EBS Multi-attach**|Not supported|   |Supported|   |
|**NVMe reservations**|Not supported|   |Supported|Not supported|
|**Boot volume**|Supported|   |   |   |



📡 _Sources:_ 
- [Amazon EBS volume types](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html)
## EBS Multi-Attach




---
## >> Sources <<

[Amazon EBS volume types](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html)
## >> References <<

- [Storage]({{< ref "6-storage" >}})
	- [EBS]({{< ref "6-storage/#ebs-volume" >}})
	- [EC2 Instance Store]({{< ref "6-storage/#ec2-instance-store" >}})
	- [EFS]({{< ref "6-storage/#efs---elastic-file-system" >}})
	- [FSx]({{< ref "6-storage/#amazon-fsx" >}})
- [AMI]({{< ref "7-ami" >}})
- EC2
	- [EC2]({{< ref "4-ec2" >}})
	- [EC2 - SAAC03]({{< ref "4-ec2-saac03" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}
### Solutions Architect Resources

- [Ultimate AWS Certified Solutions Architect Associate 2026](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
- [AWS Certified Solutions Architect Associate Code & Slides](https://courses.datacumulus.com/downloads/certified-solutions-architect-pn9/)
	- [AWS Certified Solutions Architect Associate | Slides](https://media.datacumulus.com/aws-saa/AWS%20Certified%20Solutions%20Architect%20Slides%20v47.pdf)
	- [AWS Certified Solutions Architect Associate | Code](https://links.datacumulus.com/sa-associate-code-pn9)
- [Practice Exams | AWS Certified Solutions Architect Associate](https://www.udemy.com/course/practice-exams-aws-certified-solutions-architect-associate)

_Source:_ https://courses.datacumulus.com/downloads/certified-solutions-architect-pn9/

---
ℹ️ **Associate‑level extension** of the [Storage]({{< ref "6-storage" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series. In this post, I expand on key EC2 concepts and introduce deeper topics relevant to the **Associate‑level understanding**.

{{< alert "list" >}}

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |
{{< /alert >}}

---