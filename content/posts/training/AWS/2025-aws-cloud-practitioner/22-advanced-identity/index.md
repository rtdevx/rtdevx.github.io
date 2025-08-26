---
title: Advanced Identity
date: 2025-08-22
description: Advanced Identity
summary: Advanced Identity...
draft: false
tags:
  - CLF-C02
categories: AWS
---
## AWS STS (Security Token Service)

- Enables creating <font color=#f43f5e>temporary, limited-privileged credentials</font> to access AWS resources
- Short-term credentials (you configure the expiration period)
- <font color=#f1ef63>Use cases:</font>
	- <font color=#f1ef63>Identify federation:</font> manage user identities in external systems and provide them STS tokens to access AWS resources
	- IAM Roles for cross / same account access
	- <font color=#f1ef63>IAM Roles for Amazon EC2:</font> provide temporary credentials for EC2 instances to access AWS resources
## Amazon Cognito

##### <font color=#f1ef63>Identity for Web and Mobile application users (potentially millions).</font>

Instead of creating users in IAM, web users can be created using Cognito

![](./assets/AWS_Cognito.png)
_Amazon Cognito for web and mobile applications. <font color=#10b981>It can also integrate with Google and Facebook login.</font>_
## Directory Services

##### <font color=#f1ef63>Database of objects:</font> User accounts, Computers, Printers, File Shares, Security Groups...
### AWS Directory Services

- <font color=#f1ef63>AWS Managed Microsoft AD</font>
	- Create our own AD in AWS, manage users locally, supports MFA
	- Establish "Trust" connections with on-premise AD
- <font color=#f1ef63>AD Connector</font>
	- Directory Gateway (proxy) to redirect to on-premise AD, supports MFA
	- Users are managed on the on-premise AD
- <font color=#f1ef63>Simple AD</font>
	- AD-compatible managed directory on AWS
	- Cannot be joined with on-premise AD
## AWS IAM Identity Center

### One login (single sign-on) for:

- AWS Accounts in AWS Organizations
- Business cloud application (e.g. Salesforce, Box, Microsoft 365, ...)
- SAML2.0-enabled applications
- EC2 Windows Instances
### Identity providers:

- Built-in identity store in IAM Identity Center
- 3rd party: Active Directory, OneLogin, Okta, ...
## Summary

- <font color=#f1ef63>IAM</font>
	- Identity and Access Management inside your AWS account
	- For users that you trust and belong to your company
- <font color=#f1ef63>Organizations</font>
	- Manage multiple accounts
- <font color=#f1ef63>Security Token Service (STS)</font>
	- Temporary, limited-privileges credentials to access AWS resources
- <font color=#f1ef63>Cognito</font>
	- Create a database of users for your web and mobile applications
- <font color=#f1ef63>Directory Services</font>
	- Integrate Microsoft Active Directory in AWS
- <font color=#f1ef63>IAM Identity Center</font>
	- One login for multiple AWS accounts and applications

---
## >> References <<

- <font color=#27D3F5>IAM</font>

## >> Table of contents (CLF-C02) <<

|                                                                         |                                                                                     |                                                                                       |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [1. What is Cloud Computing]({{< ref "1-what-is-cloud-computing" >}})   | [2. IAM]({{< ref "2-iam" >}})                                                       | [3. Budget]({{< ref "3-budget" >}})                                                   |
| [4. Ec2]({{< ref "4-ec2" >}})                                           | [5. Security Groups]({{< ref "5-security-groups" >}})                               | [6. Storage]({{< ref "6-storage" >}})                                                 |
| [7. AMI]({{< ref "7-ami" >}})                                           | [8. Scalability & High Availability]({{< ref "8-scalability-high-availability" >}}) | [9. Elastic Load Balancing]({{< ref "9-elastic-load-balancing" >}})                   |
| [10. Auto Scaling Group]({{< ref "10-auto-scaling-groups" >}})          | [11. S3]({{< ref "11-s3" >}})                                                       | [12. Databases]({{< ref "12-databases" >}})                                           |
| [13. Other Compute Services]({{< ref "13-other-compute-services" >}})   | [14. Deployments]({{< ref "14-deployments" >}})                                     | [15. AWS Global Infrastructure]({{< ref "15-aws-global-infrastructure" >}})           |
| [16. Cloud Integrations]({{< ref "16-cloud-integrations" >}})           | [17. Cloud Monitoring]({{< ref "17-cloud-monitoring" >}})                           | [18. VPC]({{< ref "18-vpc" >}})                                                       |
| [19. Security and Compliance]({{< ref "19-security-and-compliance" >}}) | [20. Machine Learning]({{< ref "20-machine-learning" >}})                           | [21. Account Management and Billing]({{< ref "21-account-management-and-billing" >}}) |
| [22. Advanced Identity]({{< ref "22-advanced-identity" >}})             | [23. Other Services]({{< ref "23-other-services" >}})                               | [24. AWS Architecting & Ecosystem]({{< ref "24-aws-architecting-cosystem" >}})        |
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
