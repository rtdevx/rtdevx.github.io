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

---

{{< lead >}}

<center><b><font color=#C7EB25>Do not skip</font> <font color=#27D3F5>S3</font> <font color=#EBAC25>foundational</font> <font color=#EB4925>section!</font></b></center><br>
<center><small><small>⬇️⬇️⬇️</small></small></center>

{{< /lead >}}

<center>‼️<a href="{{< ref "11-s3" >}}" target="_self"> S3 Foundational Section</a></center>

---
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
	
Rules can be created for a certain prefix (<font color=#EBAC25>example:</font> _s3://mybucket/mp3/*_)
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
### Event Notifications

- Supports events like **ObjectCreated**, **ObjectRemoved**, **ObjectRestore**, **Replication**, etc.    
- Allows object‑name filtering (e.g., `*.jpg`)    
- <font color=#EBAC25>Common use cases:</font> generate image thumbnails, trigger data processing pipelines, send notifications, update search indexes, run ETL jobs, or kick off serverless workflows    
- You can define as many S3 event notifications as needed

![](./assets/AWS_S3_Event_Notifications_Permissions.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### Performance

- Amazon S3 automatically scales to high request rates, latency 100-200 ms
- Your application can achieve at least **3,500 PUT/COPY/POST/DELETE** or **5,500 GET/HEAD requests per second per prefix in a bucket.**

| Example (object path => prefix): |                   |
| -------------------------------- | ----------------- |
| bucket/folder1/sub1/file         | => /folder1/sub1/ |
| bucket/folder1/sub2/file         | => /folder1/sub2/ |
| bucket/1/file                    | => /1/            |
| bucket/2/file                    | => /2/            |

{{< alert "circle-info" >}}

- Objects (files) have a Key
- The <font color=#C7EB25>key</font> is the FULL path:
	- s3://my-bucket/my_file.txt
	- s3://my-bucket/my_folder/another_folder/my_file.txt
- The <font color=#C7EB25>key</font> is composed of <font color=#EBAC25>prefix</font> + <font color=orange>object name</font>
	- s3://my-bucket/<font color=#EBAC25>my_folder/another_folder/</font><font color=orange>my_file.txt</font>
- There is no concept of "_directories_" within S3 buckets (although UI will suggest there is)
	- <font color=#EB4925>Just keys with very long names that contain slashes ("/")</font>

{{< /alert >}}

<font color=#EBAC25><i>More about S3 Objects:</i></font> [Amazon S3 - Objects]({{< ref "11-s3/#amazon-s3---objects" >}})

| Multi-Part upload:                                      | S3 Transfer Acceleration                                                                                                               |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| recommended for files > 100MB, must use for files > 5GB | Increase transfer speed by transferring file to an AWS edge location which will forward the data to the S3 bucket in the target region |
| Can help parallelize uploads (speed up transfers)       | Compatible with multi-part upload                                                                                                      |
| ![](./assets/AWS_S3_Acc1.png)                           | ![](./assets/AWS_S3_Acc2.png)                                                                                                          |

### Storage Lens

- Provides visibility to **understand, analyze, and optimize storage usage across your entire AWS Organization**
- **Surfaces anomalies**, **highlights cost‑saving opportunities**, and **recommends data‑protection best practices** using 30 days of usage and activity metrics
- Lets you aggregate insights at the Organization, account, region, bucket, or prefix level

- Default dashboard shows Multi-Region and Multi-Account data
	- Preconfigured by Amazon S3
## S3 - Security

- [Security best practices for Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)
- [Amazon S3 Security Controls Cheat Sheet](https://www.cybr.com/cloud-security/amazon-s3-security-controls-cheat-sheet/)

![](./assets/AWS_S3_Security_Controls.png "© cybr.com, [Amazon S3 Security Controls Cheat Sheet](https://www.cybr.com/cloud-security/amazon-s3-security-controls-cheat-sheet/)")

### Object Encryption

- **Server-Side Encryption (SSE)**
	- Server-Side Encryption with <font color=#EBAC25>Amazon S3-Managed Keys</font> (SSE-S3) - <font color=#C7EB25>Enabled by Default</font>
		- Encrypts S3 objects using keys handled, managed, and owned by AWS
	- Server-Side Encryption with <font color=#EBAC25>KMS Keys stored in AWS KMS</font> (SSE-KMS)
		- Leverage AWS Key Management Service (AWS KMS) to manage encryption keys
	- Server-Side Encryption with <font color=#EBAC25>Customer-Provided Keys</font> (SSE-C)
		- When you want to manage your own encryption keys
- **Client-Side Encryption**

{{< alert "circle-info" >}}

- **SSE‑S3** → AWS owns and manages everything
- **SSE‑KMS** → AWS KMS manages keys, but you can own them and enforce strict controls
- **SSE‑C** → You own the keys entirely and provide them with every request

{{< /alert >}}

| Feature            | SSE-S3                                | SSE-KMS                                                                | SSE-C                                                    |
| ------------------ | ------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------- |
| Who owns the keys? | AWS (S3 owns & manages all keys)      | AWS KMS owns keys, but you can own/manage Customer‑Managed Keys (CMKs) | You (customer provides and fully owns the keys)          |
| Key storage        | Managed internally by S3              | Stored in AWS KMS                                                      | Not stored by AWS                                        |
| Key rotation       | Automatic (AWS‑controlled)            | Optional automatic rotation for CMKs                                   | You must rotate keys yourself                            |
| Access control     | Basic S3 IAM permissions              | Fine‑grained IAM + KMS key policies                                    | Controlled entirely by you                               |
| Audit logging      | No per‑object key usage logs          | Full CloudTrail audit of every key request                             | No AWS audit logs (AWS never sees the key)               |
| Performance        | Fastest (no KMS calls)                | Slightly slower due to KMS API calls                                   | Similar to SSE‑S3, but you must supply keys per request  |
| Use cases          | Default encryption, general workloads | Compliance, regulated workloads, strict access control                 | Bring‑your‑own‑key requirements, external key management |


---
## >> Sources <<

- [Amazon S3](https://aws.amazon.com/s3/)
- [Amazon Simple Storage Service Documentation](https://docs.aws.amazon.com/s3/)

**S3 Security:**

- [Security best practices for Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)
- [Amazon S3 Security Controls Cheat Sheet](https://www.cybr.com/cloud-security/amazon-s3-security-controls-cheat-sheet/)
## >> References <<

**Cloud Practitioner:** 
- [S3]({{< ref "11-s3" >}})
	- [S3 Storage Classes]({{< ref "11-s3/#s3-storage-classes" >}})
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
