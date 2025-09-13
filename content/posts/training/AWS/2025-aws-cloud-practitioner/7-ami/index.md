---
title: Amazon Machine Image (AMI)
date: 2025-08-07
description: AMI are a customization of an EC2 instance...
summary: AMI are a customization of an EC2 instance...
draft: false
tags:
  - CLF-C02
categories: AWS
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
## >> Table of contents (CLF-C02) <<

|                                                                         |                                                                                     |                                                                                       |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [1. What is Cloud Computing]({{< ref "1-what-is-cloud-computing" >}})   | [2. IAM]({{< ref "2-iam" >}})                                                       | [3. Budget]({{< ref "3-budget" >}})                                                   |
| [4. EC2]({{< ref "4-ec2" >}})                                           | [5. Security Groups]({{< ref "5-security-groups" >}})                               | [6. Storage]({{< ref "6-storage" >}})                                                 |
| [7. AMI]({{< ref "7-ami" >}})                                           | [8. Scalability & High Availability]({{< ref "8-scalability-high-availability" >}}) | [9. Elastic Load Balancing]({{< ref "9-elastic-load-balancing" >}})                   |
| [10. Auto Scaling Group]({{< ref "10-auto-scaling-groups" >}})          | [11. S3]({{< ref "11-s3" >}})                                                       | [12. Databases]({{< ref "12-databases" >}})                                           |
| [13. Other Compute Services]({{< ref "13-other-compute-services" >}})   | [14. Deployments]({{< ref "14-deployments" >}})                                     | [15. AWS Global Infrastructure]({{< ref "15-aws-global-infrastructure" >}})           |
| [16. Cloud Integrations]({{< ref "16-cloud-integrations" >}})           | [17. Cloud Monitoring]({{< ref "17-cloud-monitoring" >}})                           | [18. VPC]({{< ref "18-vpc" >}})                                                       |
| [19. Security and Compliance]({{< ref "19-security-and-compliance" >}}) | [20. Machine Learning]({{< ref "20-machine-learning" >}})                           | [21. Account Management and Billing]({{< ref "21-account-management-and-billing" >}}) |
| [22. Advanced Identity]({{< ref "22-advanced-identity" >}})             | [23. Other Services]({{< ref "23-other-services" >}})                               | [24. AWS Architecting & Ecosystem]({{< ref "24-aws-architecting-cosystem" >}})        |
|                                                                         | [25. Preparing for AWS Practitioner exam]({{< ref "25-preparing-for-the-exam" >}})  |                                                                                       |
## >> Disclaimer <<

{{< alert >}}
_Disclaimer: Content for educational purposes only, no rights reserved._

Most of the content in this series is coming from **Stephane Maarek's** [Ultimate AWS Certified Cloud Practitioner CLF-C02 2025](https://www.udemy.com/course/aws-certified-cloud-practitioner-new/) course on Udemy.

I highly encourage you to take the [Stephane's courses](https://www.udemy.com/user/stephane-maarek/) as they are awesome and really help understanding the subject.

_More about Stephane Maarek:_

- https://www.linkedin.com/in/stephanemaarek
- https://x.com/stephanemaarek

**This article is just a summary and has been published to help me learning and passing the practitioner exam.**
{{< /alert >}}
