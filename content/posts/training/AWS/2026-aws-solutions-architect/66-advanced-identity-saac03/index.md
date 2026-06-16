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
### IAM Permission Boundaries

IAM Permission Boundaries are supported for users and roles (not groups). This is an advanced feature to use a managed policy to set the maximum permissions an IAM entity can get.

- Let non‑admins perform delegated tasks (e.g., creating IAM users) within strict limits    
- Allow developers to self‑manage permissions without being able to escalate to admin    
- Useful for restricting a **single user** when full‑account controls like SCPs are too broad

<font color=#EBAC25><i>More info:</i></font> 🔥[Permissions boundaries for IAM entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html)
### IAM Policy evaluation logic

{{< lead >}}

When a principal tries to use the AWS Management Console, the AWS API, or the AWS CLI, that principal sends a _request_ to AWS. When an AWS service receives the request, AWS completes several steps to determine whether to allow or deny the request.

{{< /lead >}}

![](./assets/AWS_IAM_Policy_Evaluation_Logic.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

<font color=#EBAC25><i>More info:</i></font> [Policy evaluation logic](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html)
## IAM Identity Center

- **One login (single sign-on) for all your:**
	- AWS accounts in AWS Organizations
	- Business cloud applications (e.g., Salesforce, Box, Microsoft 365, …)
	- SAML2.0-enabled applications
	- EC2 Windows Instances
- **Identity providers:**
	- Built-in identity store in IAM Identity Center
	- 3rd party: Active Directory (AD), OneLogin, Okta…

![](./assets/AWS_IAM_Identity_Center_1.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

![](./assets/AWS_IAM_Identity_Center_2.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

{{< alert "circle-info" >}}

**AWS IAM Identity Center** provides centralised, fine‑grained access control across your AWS Organization. You define **permission sets** to **manage multi‑account access**, assign users/groups to SAML 2.0 business apps, and use **ABAC** to grant AWS permissions dynamically based on user attributes (e.g., cost center, title, locale). 

Define access once, then adjust permissions simply by updating user attributes.

{{< /alert >}}

<font color=#EBAC25><i>More info:</i></font> [AWS IAM Identity Center](https://docs.aws.amazon.com/singlesignon/)
## AWS Directory Services

- **AWS Managed Microsoft AD**
	- <font color=#EBAC25>Create your own AD in AWS</font>, manage users locally, supports MFA
	- <font color=#EBAC25>Establish “trust” connections with your on premises AD</font>

![](./assets/AWS_IAM_AD_1.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

- **AD Connector**
	- <font color=#EBAC25>Directory Gateway (proxy) to redirect to on premises AD</font>, supports MFA
	- <font color=#EBAC25>Users are managed on the on-premises AD</font>

![](./assets/AWS_IAM_AD_2.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

- **Simple AD**
	- AD-compatible managed directory on AWS
	- Cannot be joined with on-premises AD
## AWS Control Tower

{{< lead >}}

Automates environment setup, applies and manages guardrails, detects and remediates policy violations, and provides a dashboard to monitor overall compliance.

{{< /lead >}}

- Easy way to <font color=#EBAC25>set up and govern a secure and compliant multi-account AWS environment</font> based on best practices
- <font color=#EBAC25>AWS Control Tower uses AWS Organizations to create accounts</font>
## Summary

{{< lead >}}

Active Directory feeds identities into IAM Identity Center, which then controls access across the AWS Organization and integrates with Control Tower’s landing zone.

{{< /lead >}}

{{< mermaid >}}

flowchart TD

    subgraph CT["AWS Control Tower"]
        CT1["Automated landing zone setup"]
        CT2["Guardrails (SCPs + Config)"]
        CT3["Compliance & logging"]
    end

    subgraph ORG["AWS Organizations"]
        ORG1["Multi-account structure (OUs, accounts)"]
        ORG2["Consolidated billing"]
        ORG3["SCPs, Tag Policies, Backup Policies"]
    end

    subgraph IDSC["IAM Identity Center"]
        ID1["Centralised SSO"]
        ID2["Permission Sets for multi-account access"]
        ID3["ABAC using user attributes"]
        ID4["SAML 2.0 app access"]
    end

    subgraph AD["External Identity Provider"]
        AD1["Active Directory"]
        AD2["Azure AD / Entra ID"]
        AD3["Other IdPs (SAML/OIDC)"]
    end

    CT -->|uses| ORG
    ORG -->|provides structure to| IDSC
    CT -->|integrates with| IDSC

    AD -->|sync users & groups| IDSC

{{< /mermaid >}}
### AWS Organizations

The foundation for multi‑account AWS environments. It lets you centrally create, group, and manage accounts, apply **SCPs**, enforce tagging standards, and use consolidated billing with shared discounts. It provides the governance layer that everything else builds on.
### AWS IAM Identity Center

The central place for managing **user identities and access** across all accounts in your AWS Organization. It provides:

- **SSO** into AWS accounts and business applications    
- **Permission sets** for consistent, multi‑account access    
- **ABAC** using user attributes for fine‑grained, dynamic permissions    

Identity Center sits _on top of_ Organizations and uses its account structure to assign access cleanly.
### AWS Control Tower

A higher‑level orchestration service that automates the setup and governance of a secure multi‑account environment. It provides:

- Automated landing zone creation    
- Prebuilt **guardrails** (SCPs + Config rules)    
- Continuous compliance monitoring    
- Centralised logging and baseline security controls    

Control Tower _uses_ Organizations under the hood and integrates with IAM Identity Center for access management.
### How they work together

- **AWS Organizations** provides the multi‑account structure, OUs, and policy boundaries.    
- **IAM Identity Center** provides unified identity and access across those accounts.    
- **AWS Control Tower** automates the creation, governance, and compliance of that entire setup using both Organizations and Identity Center as core building blocks.






---
## >> Sources <<

- [AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)
- [AWS Organizations and AWS Account Management Documentation](https://docs.aws.amazon.com/organizations/)
- [AWS Organizations: An overview of concepts and best practices](https://medium.com/@AnwarESS/aws-organizations-an-overview-of-concepts-and-best-practicesapproach-e207213582ec)
- 🔥[Service control policy examples](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps_examples.html)
- 🔥[Permissions boundaries for IAM entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html)
- [Policy evaluation logic](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html)
- [AWS IAM Identity Center](https://docs.aws.amazon.com/singlesignon/)
## >> References <<

**Cloud Practitioner:** [Identity and Access management]({{< ref "2-iam" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}