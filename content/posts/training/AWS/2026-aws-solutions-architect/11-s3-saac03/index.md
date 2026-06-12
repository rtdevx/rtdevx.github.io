---
title: "Solutions Architect: S3"
date: 2026-04-07
description: Associate-level extension of the `S3` Section from AWS Cloud Practitioner Series.
summary: Associate-level extension of the `S3` Section from AWS Cloud Practitioner Series.
draft: false
tags:
  - SAA-C03
categories:
  - AWS
series: AWS Solution Architect
---

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |

## S3 - Introduction

ℹ️ **Associate‑level extension** of the [S3]({{< ref "11-s3" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series. In this post, I expand on key **S3** concepts and introduce deeper topics relevant to the **Associate‑level understanding**.

{{< lead >}}

<center><b><font color=#C7EB25>Do not skip</font> the <font color=#EB4925>S3</font> <font color=#EBAC25>foundational</font> <font color=#EB4925>section!</font></b></center><br>
<center><small><small>*check link below.</small></small></center>

{{< /lead >}}

‼️ _Note:_ [S3 Foundational Section]({{< ref "11-s3" >}})
## S3 - Advanced

ℹ️ Read more about [S3 Storage Classes]({{< ref "11-s3/#s3-storage-classes" >}}) in the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series.
### Moving between Storage Classes

- You can transition objects between storage classes
- For **infrequently accessed** object, move them to **Standard IA**
- For **archive objects** that you don’t need fast access to, move them to **Glacier** or **Glacier Deep Archive**
- Moving objects **can be automated using a Lifecycle Rules**

![](./assets/AWS_S3_Storage_Classes_Transition.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### Lifecycle Rules

- **Transition Actions** - configure objects to transition to another storage class
	- Move objects to Standard IA class 60 days after creation
	- Move to Glacier for archiving after 6 months

- **Expiration actions** - configure objects to expire (delete) after some time
	- Access log files can be set to delete after a 365 days
	- Can be used to delete old versions of files (if versioning is enabled)
	- Can be used to delete incomplete Multi-Part uploads
	
Rules can be created for a certain prefix (example: _s3://mybucket/mp3/*_)
Rules can be created for certain objects Tags (<font color=#EBAC25>example:</font> Department: Finance)
#### Storage Class Analysis

- Helps you determine when to move objects into the appropriate storage class    
- Provides **recommendations for Standard and Standard‑IA**    
- Does **not support One‑Zone IA or Glacier**
- Report updates daily    
- Takes 24-48 hours before analysis begins
### Requester Pays

- Normally, the bucket owner pays for all S3 storage and data‑transfer costs    
- With **Requester Pays**, the requester covers request and data‑download charges instead    
- Useful for sharing large datasets across AWS accounts
- The requester must be authenticated in AWS (cannot be anonymous)

---
## >> Sources <<

[Amazon S3](https://aws.amazon.com/s3/)
[Amazon Simple Storage Service Documentation](https://docs.aws.amazon.com/s3/)
## >> References <<

**Cloud Practitioner:** [S3]({{< ref "11-s3" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}
### Solutions Architect Resources

- [Ultimate AWS Certified Solutions Architect Associate 2026](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
- [AWS Certified Solutions Architect Associate Code & Slides](https://courses.datacumulus.com/downloads/certified-solutions-architect-pn9/)
	- [AWS Certified Solutions Architect Associate | Slides](https://media.datacumulus.com/aws-saa/AWS%20Certified%20Solutions%20Architect%20Slides%20v47.pdf)
	- [AWS Certified Solutions Architect Associate | Code](https://links.datacumulus.com/sa-associate-code-pn9)
- [Practice Exams | AWS Certified Solutions Architect Associate](https://www.udemy.com/course/practice-exams-aws-certified-solutions-architect-associate)

_Source:_ https://courses.datacumulus.com/downloads/certified-solutions-architect-pn9/

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |
