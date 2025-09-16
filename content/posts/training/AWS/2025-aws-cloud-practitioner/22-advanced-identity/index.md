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

- Enables creating <font color=#EB4925>temporary, limited-privileged credentials</font> to access AWS resources
- Short-term credentials (you configure the expiration period)
- <font color=#EBAC25>Use cases:</font>
	- <font color=#EBAC25>Identify federation:</font> manage user identities in external systems and provide them STS tokens to access AWS resources
	- IAM Roles for cross / same account access
	- <font color=#EBAC25>IAM Roles for Amazon EC2:</font> provide temporary credentials for EC2 instances to access AWS resources
## Amazon Cognito

##### <font color=#EBAC25>Identity for Web and Mobile application users (potentially millions).</font>

Instead of creating users in IAM, web users can be created using Cognito

![](./assets/AWS_Cognito.png)
_Amazon Cognito for web and mobile applications. <font color=#C7EB25>It can also integrate with Google and Facebook login.</font>_
## Directory Services

##### <font color=#EBAC25>Database of objects:</font> User accounts, Computers, Printers, File Shares, Security Groups...
### AWS Directory Services

- <font color=#EBAC25>AWS Managed Microsoft AD</font>
	- Create our own AD in AWS, manage users locally, supports MFA
	- Establish "Trust" connections with on-premise AD
- <font color=#EBAC25>AD Connector</font>
	- Directory Gateway (proxy) to redirect to on-premise AD, supports MFA
	- Users are managed on the on-premise AD
- <font color=#EBAC25>Simple AD</font>
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

- <font color=#EBAC25>IAM</font>
	- Identity and Access Management inside your AWS account
	- For users that you trust and belong to your company
- <font color=#EBAC25>Organizations</font>
	- Manage multiple accounts
- <font color=#EBAC25>Security Token Service (STS)</font>
	- Temporary, limited-privileges credentials to access AWS resources
- <font color=#EBAC25>Cognito</font>
	- Create a database of users for your web and mobile applications
- <font color=#EBAC25>Directory Services</font>
	- Integrate Microsoft Active Directory in AWS
- <font color=#EBAC25>IAM Identity Center</font>
	- One login for multiple AWS accounts and applications

---
## >> References <<

- [Identity and Access management (IAM)]({{< ref "2-iam" >}})
## >> Table of contents (CLF-C02) <<

{{< toc_cf-c02 >}}
## >> Disclaimer <<

{{< disclaimer_practitioner25 >}}
