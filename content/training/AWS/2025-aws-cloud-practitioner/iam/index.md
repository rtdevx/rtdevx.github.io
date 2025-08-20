---
title: 2 - Identity and Access management
date: 2025-08-02
description: Identity and Access management
summary: Identity and Access management...
draft: false
tags:
  - AWS
  - Training
categories: AWS Cloud Practitioner
---
## **IAM** = Identity and Access management

**IAM** is AWS Global service.

<font color=#f43f5e>Groups only contain users, NOT other groups.</font>

Users don't have to belong to a group and user can belong to multiple groups.

Users or Groups can me assigned JSON documents called policies. Those policies define permissions for the users / groups.

In AWS you apply the <font color=#f43f5e>least privilege principle:</font> don't give user more permission than they need.

---

{{< youtube bO25vbkoJlA >}}

---
## Creating user in AWS CLI

```AWSConsole
IAM console > Users
```

### Create user

![](4%20-%20Content%20Creation/Git/rtdevx.github.io/content/training/AWS/2025-aws-cloud-practitioner/iam/assets/AWS_IAM_Create_User.png)
### Create group "admin"

![](4%20-%20Content%20Creation/Git/rtdevx.github.io/content/training/AWS/2025-aws-cloud-practitioner/iam/assets/AWS_IAM_Create_Group.png)
![](4%20-%20Content%20Creation/Git/rtdevx.github.io/content/training/AWS/2025-aws-cloud-practitioner/iam/assets/AWS_IAM_Create_User_Tags.png)
## IAM policies structure

![](4%20-%20Content%20Creation/Git/rtdevx.github.io/content/training/AWS/2025-aws-cloud-practitioner/iam/assets/AWS_IAM_Policies_Structure.png)

IAM policies structure includes:

- **Version:** policy version
- **ID** (Optional): identifier
- **Statement:** one or more statements (<font color=#f43f5e>required</font>)

Statement consist of:

- **SID:** identifier (optional)
- **Effect:** <font color=#10b981>Allow</font> or <font color=#f43f5e>Deny</font>
- **Principal:** account / user / role to which policy is applied to
- **Action:** list of allowed or denied actions
- **Resource:** list of resources to which the action is applied to
- **Condition:** conditions for when the policy is applied (optional)
## MFA

![](4%20-%20Content%20Creation/Git/rtdevx.github.io/content/training/AWS/2025-aws-cloud-practitioner/iam/assets/AWS_IAM_MFA.png)
## Accessing AWS

- AWS Management Console - protected by password + MFA
- AWS Command Line (CLI) - protected by access keys
- AWS Software Development Kit (SDK) - for code - protected by access keys

<font color=#f4e40b>Access Keys</font> can be generated through AWS Console.
Users manage their own access keys.

Access Key ID = username
Secret Access Key = password

![](4%20-%20Content%20Creation/Git/rtdevx.github.io/content/training/AWS/2025-aws-cloud-practitioner/iam/assets/AWS_IAM_Fake_Access_Keys_Example.png)
### Creating Access Key

```AWSConsole
IAM > Users > Username > Security Credentials > Access Keys > Create Access Key > Command Line Interface (CLI)
```

### Configuring AWS CLI with the new access key

```CMD
# Configure AWS CLI
aws configure

# Test
aws iam list-users
```

### IAM roles for Services

- Some AWS services will need to perform actions on your behalf
- Those AWS services will need permissions to be assigned with IAM Roles

**Common Roles for Services:**

- EC2 Instance Roles
- Lambda Function Roles
- Roles for CloudFormation
#### Create AWS Service Role

```AWSConsole
IAM > Roles > Create role > AWS service
```

![](4%20-%20Content%20Creation/Git/rtdevx.github.io/content/training/AWS/2025-aws-cloud-practitioner/iam/assets/AWS_IAM_Role_Create.png)

Add permissions:

![](4%20-%20Content%20Creation/Git/rtdevx.github.io/content/training/AWS/2025-aws-cloud-practitioner/iam/assets/AWS_IAM_Role_Add_Permissions.png)
## IAM Security Tools

- **IAM Credentials Report** (account-level)
	- Report that lists all users and status of their credentials

```AWSConsole
IAM > Credentials Report
```

- **IAM Access Advisor** (user-level)
	- Access Advisor shows the service permissions granted to a user and when those services were last accessed

```AWSConsole
IAM > Users > Username > Last Accessed
```

<font color=#f43f5e>IAM Access Advisor (Last Accessed) can be used to determine what user is accessing and to adjust his / her role in line with the "Least Privilege Principle"</font>
## IAM Beset Practices

- Don't use root account
- One physical user = One AWS user
- **Assign users to groups** and assign permissions (policies) to groups
- Create **strong password policy**
- Use and **enforce MFA**
- **Create and use Roles** for giving permissions to AWS services
- Use Access Keys for Programmatic access (CLI / SDK)
- Audit permissions using **IAM Credentials Report** and **IAM Access Advisor**
- <font color=#f43f5e>Never share IAM users & Access Keys</font>
## Shared Responsibility Model for IAM

| **AWS**                                  | **Organization**                                         |
| ---------------------------------------- | -------------------------------------------------------- |
| Infrastructure (global network security) | Users, Groups, Roles, Policies management and monitoring |
| Configuration and vulnerability analysis | Enabling MFA on all accounts                             |
| Compliance validation                    | Rotating keys                                            |
|                                          | Using IAM tools to apply appropriate permissions         |
|                                          | Analyze access patterns and review permissions           |

---
## Sources

- _AWS Global Infrastructure:_ [AWS Global Infrastructure](https://infrastructure.aws)
- _Shared Responsibility Model:_ [Shared Responsibility Model - Amazon Web Services (AWS)](https://aws.amazon.com/compliance/shared-responsibility-model/)
## References

- <font color=#27D3F5>Account Management and Billing</font>
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