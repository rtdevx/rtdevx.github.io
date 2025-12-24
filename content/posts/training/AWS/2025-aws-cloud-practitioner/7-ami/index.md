---
title: Amazon Machine Image (AMI)
date: 2025-08-07
description: AMI are a customization of an EC2 instance...
summary: AMI are a customization of an EC2 instance...
draft: false
tags:
  - CLF-C02
categories: AWS
series: AWS Cloud Practitioner
---
## What is Amazon EC2 AMI

AMI are a customization of an [EC2 instance]({{< ref "4-ec2" >}}).

- Custom software, configuration, etc. can be added
- Faster boot / configuration time because all your software is pre-packaged

---

{{< youtube DOpx2C5F7cs >}}
_AWS EC2 AMI Tutorial_

---

<font color=#EB4925>AMI are build for a specific AWS region</font> but can be copied across regions.
### AMI can be launched from

- Public AMI - AWS provided
- Own AMI - managed by an organization
- AWS Marketplace - created by a vendor or another 3rd party (can be sold / bought)
## Steps to build an AMI

- Start EC2 Instance and customize it
- Stop the instance (for data integrity)
- Build AMI - this will also create [EBS Sapshots]({{< ref "6-storage/#ebs-snapshots" >}})
- Launch instances from other AMI's

```AWSConsole
EC2 > Instances > Select an EC2 instance > Actions > Image and Templates > Create image
```
## EC2 Image Builder

**EC2 Image Builder** is a fully managed AWS service that helps you to automate the creation, management and deployment of customized, secure and up-to-date server images.

Custom images can be created via AWS Console, AWS CLI or API.

Automate the creation, maintain, validate the build of EC2 AMI's. Can run on a schedule and can be distributed to multiple AWS Regions.
## Summary

##### AMI

- Create ready-to-use EC2 instances with own customizations
##### EC2 Image Builder

- automatically build, test and distribute AMI's

---
## >> Sources <<

- [What is Image Builder](https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html)

{{< icon "youtube" >}} _Stephane Maarek's AWS playlists on YouTube:_ https://www.youtube.com/@StephaneMaarek/playlists
## >> References <<

- [EC2]({{< ref "4-ec2" >}})
- [Storage]({{< ref "6-storage" >}})
## >> Disclaimer <<

{{< disclaimer_practitioner25 >}}

