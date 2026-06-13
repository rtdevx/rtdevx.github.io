---
title: "Solutions Architect: CloudFront & Global Accelerator"
date: 2026-04-08
description: Associate-level extension of the `CloudFront & Global Accelerator` Section from AWS Cloud Practitioner Series.
summary: Associate-level extension of the `CloudFront & Global Accelerator` Section from AWS Cloud Practitioner Series.
draft: false
tags:
  - SAA-C03
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

**CloudFront** can use **private VPC resources as origins**, letting you serve content from applications in private subnets without exposing them publicly - including private **ALBs**, **NLBs**, or **EC2 instances**.

{{< /alert >}}
### ALB or EC2 as an origin (Public Network)

![](./assets/AWS_CloudFront_Network_Origins.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### CloudFront Geo Restriction

**CloudFront** lets you **control access** to your distribution by applying **geo‑restriction rules**: 

You can <font color=#C7EB25>allow traffic only from approved countries</font> or <font color=#EB4925>block traffic from specific countries</font>, based on a third‑party Geo‑IP database - commonly used for <font color=#EBAC25>copyright‑driven content restrictions</font>.
### CloudFront Cache Invalidations

{{< alert "circle-info" >}}

When your origin content changes, CloudFront won’t fetch the new version until the cached object’s **TTL expires**. 

You can bypass the TTL by issuing a **CloudFront invalidation**, refreshing specific paths (e.g., `/index.html`, `/images/*`) or even all files (`*`).

{{< /alert >}}
### Unicast IP vs Anycast IP

- **Unicast IP:** one server holds one IP address
- **Anycast IP:** all servers hold the same IP address and the client is routed to the nearest one

![](./assets/AWS_CloudFrnt_Unicast_Anyacst.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")



---
## >> Sources <<

- [Amazon CloudFront - Content Delivery Network](https://aws.amazon.com/cloudfront/)
- [Amazon CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
## >> References <<

**Cloud Practitioner:** [Amazon CloudFront]({{< ref "15-aws-global-infrastructure/#amazon-cloudfront" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}