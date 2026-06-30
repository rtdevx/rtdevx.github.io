---
title: "Solutions Architect: CloudFront & Global Accelerator"
date: 2026-04-08
description: Associate-level extension of the `CloudFront & Global Accelerator` Section from AWS Cloud Practitioner Series.
summary: Associate-level extension of the `CloudFront & Global Accelerator` Section from AWS Cloud Practitioner Series.
draft: false
tags:
  - SAA-C03
  - Cache
  - CDN
  - CloudFront
  - DDoS
categories:
  - AWS
series: AWS Solution Architect
---
---
ℹ️ **Associate‑level extension** of the [Amazon CloudFront]({{< ref "15-aws-global-infrastructure/#amazon-cloudfront" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series. 

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |
## CloudFront Introduction

**CloudFront Introduction** was covered in [Amazon CloudFront]({{< ref "15-aws-global-infrastructure/#amazon-cloudfront" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series:

|                                                                                    |                                                                                          |                                                                                                                                    |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [Amazon CloudFront]({{< ref "15-aws-global-infrastructure/#amazon-cloudfront" >}}) | [CloudFront - Origins]({{< ref "15-aws-global-infrastructure/#cloudfront---origins" >}}) | [CloudFront vs S3 Cross Region Replication]({{< ref "15-aws-global-infrastructure/#cloudfront-vs-s3-cross-region-replication" >}}) |

### ALB or EC2 as an origin (VPC Origins)

![](./assets/AWS_CloudFront_VPC_Origins.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

{{< alert "circle-info" >}}

**CloudFront** can use **private VPC resources as origins**, <font color=#EB4925>letting you serve content from applications in private subnets without exposing them publicly</font> - including private **ALBs**, **NLBs**, or **EC2 instances**.

{{< /alert >}}
### ALB or EC2 as an origin (Public Network)

![](./assets/AWS_CloudFront_Network_Origins.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### CloudFront Geo Restriction

**CloudFront** lets you **control access** to your distribution by applying **geo‑restriction rules**: 

You can <font color=#C7EB25>allow traffic only from approved countries</font> or <font color=#EB4925>block traffic from specific countries</font>, based on a third‑party Geo‑IP database - commonly used for <font color=#EBAC25>copyright‑driven content restrictions</font>.
### CloudFront Cache Invalidations

{{< alert "circle-info" >}}

<font color=#EBAC25>When your origin content changes, CloudFront won’t fetch the new version until the cached object’s TTL expires</font>. 

You can bypass the TTL by issuing a **CloudFront invalidation**, refreshing specific paths (e.g., `/index.html`, `/images/*`) or even all files (`*`).

{{< /alert >}}
## Unicast IP vs Anycast IP

- **Unicast IP:** one server holds one IP address
- **Anycast IP:** all servers hold the same IP address and the client is routed to the nearest one

![](./assets/AWS_CloudFrnt_Unicast_Anyacst.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
## AWS Global Accelerator

**AWS Global Accelerator** was covered in [AWS Global Infrastructure | Global Accelerator]({{< ref "15-aws-global-infrastructure/#aws-global-accelerator" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series.

- Works with **Elastic IPs**, **EC2 instances**, **ALBs**, and **NLBs** (public or private)    
- Provides consistent performance with intelligent, low‑latency routing and fast regional failover   
- Avoids client‑side caching issues because the IPs never change    
- Uses the AWS global network for optimized delivery    
- Continuously health‑checks your endpoints for rapid failover (typically under 1 minute)    
- Strong for disaster recovery scenarios    
- Security benefits: 
	- only two static IPs to whitelist
	- built‑in DDoS protection via AWS Shield

ℹ️ _Read More:_ [AWS Global Accelerator vs CloudFront]({{< ref "15-aws-global-infrastructure/#aws-global-accelerator-vs-cloudfront" >}})
## CloudFront vs S3 CRR vs Global Accelerator

|Feature / Purpose|**CloudFront**|**S3 Cross‑Region Replication (CRR)**|**AWS Global Accelerator**|
|---|---|---|---|
|**Primary Purpose**|Global content delivery (CDN)|Replicate S3 objects to another region|Global network routing acceleration|
|**Optimises**|Latency for content delivery|Data durability, compliance, geo‑redundancy|Latency for TCP/UDP applications|
|**Type of Service**|CDN (caches content at edge locations)|Storage replication feature|Networking acceleration service|
|**Traffic Direction**|User → Edge → Origin|S3 bucket → S3 bucket|User → AWS edge → Application endpoint|
|**Use Case**|Speed up static/dynamic content delivery|Keep copies of objects in multiple regions|Improve performance & availability of global apps|
|**Data Movement**|No replication; caches objects temporarily|Permanent replication of objects|No replication; routes traffic over AWS backbone|
|**Where Data Lives**|Cached at edge locations (temporary)|Stored in multiple S3 buckets (permanent)|Data stays in your app; only routing changes|
|**Supports Dynamic Content**|Yes|No|Yes|
|**Supports Static Content**|Yes|Yes|Yes (via routing)|
|**Improves Availability**|Yes (edge caching + failover)|Yes (multi‑region copies)|Yes (automatic failover between endpoints)|
|**Improves Durability**|No|Yes (multi‑region storage)|No|
|**Security Integration**|WAF, Shield, OAC/OAI|Bucket policies, IAM, KMS|WAF (via CloudFront), Shield Advanced|
|**Typical Use Cases**|Websites, APIs, media streaming|Compliance, DR, multi‑region apps|Global apps needing low latency (gaming, SaaS, APIs)|
|**Pricing Model**|Data transfer + requests|Replication + storage + PUT costs|Fixed hourly + data transfer acceleration|

### CloudFront

> Make content fast for users anywhere in the world by caching it close to them.

### S3 Cross‑Region Replication

> Keep permanent copies of S3 objects in another region for compliance, DR, or multi‑region apps.

### AWS Global Accelerator

> Speed up global user traffic by routing it over AWS’s private backbone instead of the public internet.

---
## >> Sources <<

- [Amazon CloudFront - Content Delivery Network](https://aws.amazon.com/cloudfront/)
- [Amazon CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
## >> References <<

**Cloud Practitioner:** 
- [Amazon CloudFront]({{< ref "15-aws-global-infrastructure/#amazon-cloudfront" >}})
- [AWS Global Infrastructure | Global Accelerator]({{< ref "15-aws-global-infrastructure/#aws-global-accelerator" >}})
	- [AWS Global Accelerator vs CloudFront]({{< ref "15-aws-global-infrastructure/#aws-global-accelerator-vs-cloudfront" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}