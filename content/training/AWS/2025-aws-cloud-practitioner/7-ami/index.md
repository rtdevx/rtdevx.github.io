---
title: Amazon Machine Image (AMI)
date: 2025-08-07
description: AMI are a customization of an EC2 instance...
summary: AMI are a customization of an EC2 instance...
draft: false
tags:
  - AWS
  - CLF-C02
categories: Training Courses
---
## What is Amazon EC2 AMI

AMI are a customization of an EC2 instance.

- Custom software, configuration, etc. can be added
- Faster boot / configuration time because all your software is pre-packaged

---

{{< youtube ocMOyJ9Tlyk >}}
_AWS EC2 AMI Introduction_
<br /><br />
{{< youtube DOpx2C5F7cs >}}
_AWS EC2 AMI Tutorial_

---

<font color=#f43f5e>AMI are build for a specific AWS region</font> but can be copied across regions.
### AMI can be launched from

- Public AMI - AWS provided
- Own AMI - managed by an organization
- AWS Marketplace - created by a vendor or another 3rd party (can be sold / bought)
## Steps to build an AMI

- Start EC2 Instance and customize it
- Stop the instance (for data integrity)
- Build AMI - this will also create <font color=#27D3F5>EBS snapshots</font>
- Launch instances from other AMI's

```AWSConsole
EC2 > Instances > Select an EC2 instance > Actions > Image and Templates > Create image
```
## EC2 Image Builder

EC2 Image Builder is a fully managed AWS service that helps you to automate the creation, management and deployment of customized, secure and up-to-date server images.

Custom images can be created via AWS Console, AWS CLI or API.

Automate the creation, maintain, validate the build of EC2 AMI's. Can run on a schedule and can be distributed to multiple AWS Regions.

---
## Sources

- [What is Image Builder](https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html)

{{< icon "youtube" >}} _Stephane Maarek's AWS playlists on YouTube:_ https://www.youtube.com/@StephaneMaarek/playlists
## References

- <font color=#27D3F5>EC2</font>
- <font color=#27D3F5>Storage</font>
---
### Disclaimer

{{< alert >}}
_Disclaimer: Content for educational purposes only, no rights reserved._

Most of the content in this series is coming from **Stephane Maarek's** [Ultimate AWS Certified Cloud Practitioner CLF-C02 2025](https://www.udemy.com/course/aws-certified-cloud-practitioner-new/) course on Udemy.

I highly encourage you to take the [Stephane's courses](https://www.udemy.com/user/stephane-maarek/) as they are awesome and really help understanding the subject.

_More about Stephane Maarek:_

- https://www.linkedin.com/in/stephanemaarek
- https://x.com/stephanemaarek

**This article is just a summary and has been published to help me learning and passing the practitioner exam.**
{{< /alert >}}
