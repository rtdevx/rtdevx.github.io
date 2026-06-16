---
title: "Solutions Architect: Advanced Identity"
date: 2026-04-14
description: Associate-level extension of the `Identity and Access management` Section from AWS Cloud Practitioner Series.
summary: Associate-level extension of the `Identity and Access management` Section from AWS Cloud Practitioner Series.
draft: false
tags:
  - SAA-C03
  - RBAC
  - iam
  - security
  - compliance
categories:
  - AWS
series: AWS Solution Architect
---
---
ℹ️ **Associate‑level extension** of the [Identity and Access management]({{< ref "2-iam" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series.

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |

## AWS Organizations

- A **global** service for centrally managing multiple AWS accounts    
- The primary account is the **management account**; all others are **member accounts**    
- Member accounts can belong to **only one** organization    
- Supports **consolidated billing** with a single payment method and shared usage‑based discounts (EC2, S3, etc.)    
- **Reserved Instances** and **Savings Plans** discounts are shared across accounts    
- Provides APIs to **automate account creation** and management

![](./assets/AWS_IAM_Organizations_1.png "© https://medium.com/@AnwarESS, [@AnwarESS, medium.com](https://medium.com/@AnwarESS/aws-organizations-an-overview-of-concepts-and-best-practicesapproach-e207213582ec)")

![](./assets/AWS_IAM_Organizations_2.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

- Encourages a **multi‑account** strategy instead of packing everything into one account with many VPCs    
- Lets you apply **tagging standards** for clear, centralised cost allocation    
- Enable **CloudTrail** across all accounts and centralise logs in a dedicated S3 logging account    
- Send **CloudWatch Logs** to a central logging account as well    
- Use **cross‑account roles** for centralised administration
### SCP

- Strengthen security with **Service Control Policies (SCPs)** applied to OUs or individual accounts to restrict what IAM users and roles can do    
- SCPs **don’t apply** to the management account, which always retains full admin rights    
- Like IAM, SCPs require **explicit allows** from the root OU down to the target account - nothing is permitted by default

![](./assets/AWS_IAM_SCP_Hierarchy.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
#### SCP Least Privilege

{{< lead >}}

**Restricting unused AWS services with SCPs strengthens security and simplifies compliance.** Start by explicitly denying services your organisation doesn’t need, which helps meet standards like **PCI DSS**.

{{< /lead >}}

```JSON
{  
  "Version": "2012-10-17",  
  "Statement": [  
    {  
      "Sid": "DenyAllUnnecessaryServices",  
      "Effect": "Deny",  
      "NotjsoAction": [  
        "s3:*",  
        "lambda:*",  
          ...  
      ],  
      "Resource": "*"  
    }  
  ]  
}
```

{{< alert "circle-info" >}}

Use the [Service control policy examples](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples.html) page as a reference - it includes a GitHub repository with ready‑made SCP samples you can adapt.

<font color=#EBAC25><i>More info:</i></font> 🔥[Service control policy examples](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples.html)

{{< /alert >}}
### AWS Organizations - Tag Policies

- <font color=#EBAC25>Enforces consistent tagging across all accounts in your AWS Organization</font>
- <font color=#EBAC25>Defines allowed tag keys</font> and values to maintain proper categorisation and support cost allocation and Attribute-based Access Control (ABAC)    
- Blocks non‑compliant tagging operations on specified services and resources (but doesn’t affect untagged resources)    
- Produces reports showing compliant and non‑compliant resources    
- Can integrate with **EventBridge** to detect and react to tagging violations
### IAM Conditions

![](./assets/AWS_IAM_Conditions_1.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

![](./assets/AWS_IAM_Conditions_2.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### IAM for S3

```JSON
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:ListBucket"
        ]
        Resource = [
          "arn:aws:s3:::test"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject"
        ]
        Resource = [
          "arn:aws:s3:::test/*"
        ]
      },      
```
### Resource Policies & aws:PrincipalOrgID

**aws:PrincipalOrgID** can be used in any resource policies to restrict access to accounts that are member of an AWS Organization

![](./assets/AWS_IAM_PrincipalOrgID.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### IAM Roles vs Resource Based Policies

- **Cross account:** 
	- attaching a resource-based policy to a resource (<font color=#EBAC25>example:</font> S3 bucket policy)
	- OR using a role as a proxy

![](./assets/AWS_IAM_Cross_Account.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

{{< alert "circle-info" >}}

<font color=#EB4925>When you assume a role (user, application or service), you give up your original permissions and take the permissions assigned to the role.</font>

- When using a resource-based policy, the principal doesn’t have to give up his permissions
- <font color=#EBAC25>Example:</font> User in account A needs to scan a DynamoDB table in Account A and dump it in an S3 bucket in Account B.

{{< /alert >}}

---
## >> Sources <<

- [AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)
- [AWS Organizations and AWS Account Management Documentation](https://docs.aws.amazon.com/organizations/)
- [AWS Organizations: An overview of concepts and best practices](https://medium.com/@AnwarESS/aws-organizations-an-overview-of-concepts-and-best-practicesapproach-e207213582ec)
- 🔥[Service control policy examples](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples.html)
## >> References <<

**Cloud Practitioner:** [Identity and Access management]({{< ref "2-iam" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}