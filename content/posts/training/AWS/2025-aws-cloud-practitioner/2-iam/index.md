---
title: Identity and Access management
date: 2025-08-02
description: Identity and Access management
summary: Identity and Access management...
draft: false
tags:
  - CLF-C02
categories: AWS
series: AWS Cloud Practitioner
---
## **IAM** = Identity and Access management

**IAM** is AWS Global service.

<font color=#EB4925>Groups only contain users, NOT other groups.</font>

Users don't have to belong to a group and user can belong to multiple groups.

Users or Groups can have assigned JSON documents called <font color=#EB4925>policies</font>. Those <font color=#EB4925>policies define permissions</font> for the users / groups.

In AWS you apply the <font color=#EB4925>least privilege principle:</font> don't give user more permission than they need.

---

{{< youtube bO25vbkoJlA >}}

---
## Creating user in AWS CLI

```AWSConsole
IAM console > Users
```

### Create user

![](./assets/AWS_IAM_Create_User.png)
### Create group "admin"

![](./assets/AWS_IAM_Create_Group.png)

![](./assets/AWS_IAM_Create_User_Tags.png)
## IAM policies structure

![](./assets/AWS_IAM_Policies_Structure.png)

**IAM policies structure includes:**

- **Version:** policy version
- **ID** (Optional): identifier
- **Statement:** one or more statements (<font color=#EB4925>required</font>)	
	- **SID:** identifier (optional)
	- **Effect:** <font color=#C7EB25>Allow</font> or <font color=#EB4925>Deny</font>
	- **Principal:** account / user / role to which policy is applied to
	- **Action:** list of allowed or denied actions
	- **Resource:** list of resources to which the action is applied to
	- **Condition:** conditions for when the policy is applied (optional)
## MFA

![](./assets/AWS_IAM_MFA.png)
## Accessing AWS

- **AWS Management Console** - protected by <font color=#EBAC25>password + MFA</font>
- **AWS Command Line** (CLI) - protected by <font color=#EBAC25>access keys</font>
- **AWS Software Development Kit** (SDK) - for code - protected by <font color=#EBAC25>access keys</font>
##### <font color=#C7EB25>Access Keys can be generated through AWS Console. Users manage their own access keys.</font>

**Access Key ID** = username<br />
**Secret Access Key** = password

![](./assets/AWS_IAM_Fake_Access_Keys_Example.png)
### Creating Access Key

```AWSConsole
IAM > Users > Username > Security Credentials > Access Keys > Create Access Key > Command Line Interface (CLI)
```
### <font color=#EBAC25>Configuring AWS CLI with the new access key</font>

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

- [EC2]({{< ref "4-ec2" >}}) Instance Roles
- [Lambda Function]({{< ref "13-other-compute-services/#lambda" >}}) Roles
- Roles for [CloudFormation]({{< ref "14-deployments/#cloudformation" >}})
#### Create AWS Service Role

```AWSConsole
IAM > Roles > Create role > AWS service
```

![](./assets/AWS_IAM_Role_Create.png)

Add permissions:

![](./assets/AWS_IAM_Role_Add_Permissions.png)
## <font color=#EBAC25>IAM Security Tools</font>

### IAM Credentials Report (account-level)

- Report that lists all users and status of their credentials

```AWSConsole
IAM > Credentials Report
```
### IAM Access Advisor (user-level)

- Access Advisor shows the service permissions granted to a user and when those services were last accessed

```AWSConsole
IAM > Users > Username > Last Accessed
```

<font color=#EB4925>IAM Access Advisor (Last Accessed) can be used to determine what user is accessing and to adjust his / her role in line with the "Least Privilege Principle".</font>
## <font color=#EBAC25>IAM Best Practices</font>

- Don't use root account
- One physical user = One AWS user
- **Assign users to groups** and assign permissions (policies) to groups
- Create **strong password policy**
- Use and **enforce MFA**
- **Create and use Roles** for giving permissions to AWS services
- Use Access Keys for Programmatic access (CLI / SDK)
- Audit permissions using **IAM Credentials Report** and **IAM Access Advisor**
- <font color=#EB4925>Never share IAM users & Access Keys</font>
## Shared Responsibility Model for IAM

| **AWS**                                  | **Organization**                                         |
| ---------------------------------------- | -------------------------------------------------------- |
| Infrastructure (global network security) | Users, Groups, Roles, Policies management and monitoring |
| Configuration and vulnerability analysis | Enabling MFA on all accounts                             |
| Compliance validation                    | Rotating keys                                            |
|                                          | Using IAM tools to apply appropriate permissions         |
|                                          | Analyze access patterns and review permissions           |

---
## >> Sources <<

- _AWS Global Infrastructure:_ [AWS Global Infrastructure](https://infrastructure.aws)
- _Shared Responsibility Model:_ [Shared Responsibility Model - Amazon Web Services (AWS)](https://aws.amazon.com/compliance/shared-responsibility-model/)

{{< icon "youtube" >}} _Full YouTube Rahul's AWS Course:_ https://www.youtube.com/playlist?list=PL7iMyoQPMtAN4xl6oWzafqJebfay7K8KP

- [Security and compliance](https://docs.aws.amazon.com/whitepapers/latest/aws-overview/security-and-compliance.html)    
- [What is IAM?](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)    
- [What is AWS IAM Identity Center?](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html)    
- [IAM identities](https://docs.aws.amazon.com/IAM/latest/UserGuide/id.html)    
- [AWS security documentation](https://docs.aws.amazon.com/security/)
## >> References << 

- [Account Management and Billing]({{< ref "21-account-management-and-billing" >}})
## >> Disclaimer <<

{{< disclaimer_practitioner25 >}}
