---
title: Budget
date: 2025-08-03
description: AWS Budget
summary: AWS Budget...
draft: false
tags:
  - CLF-C02
categories: AWS
series: AWS Cloud Practitioner
---
## Setting up a budget

<font color=#EB4925>Billing and Cost Management is only available for the root user (or user with the right privileges).</font>
### 1. Enabling Billing and Cost Management for IAM user

- Log in as root to AWS Console
- Click on your user in the top right corner, select an account
- Scroll down to "_IAM user and role access to Billing information_"
- Activate [IAM]({{< ref "2-iam" >}}) access

This will allow access to billing information for IAM users that are in _Administrators_ group.

![](./assets/AWS_IAM_Activate_access_to_billing_info.png)
### 2. Create a budget

```AWSConsole
Billing and Cost Management > Budgets > Create a budget
```

![](./assets/AWS_Budget_setup.png)
## >> Disclaimer <<

{{< disclaimer_practitioner25 >}}
