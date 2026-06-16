---
title: "Solutions Architect: AWS Security & Encryption"
date: 2026-04-15
description: KMS, Encryption SDK, SSM Parameter Store.
summary: KMS, Encryption SDK, SSM Parameter Store
draft: true
tags:
  - SAA-C03
  - security
  - compliance
  - HSM
  - ACM
  - KMS
  - SSM
  - encryption
  - SecretsManager
categories:
  - AWS
series: AWS Solution Architect
---
---
ℹ️ **Associate‑level extension** of the [Security and Compliance]({{< ref "19-security-and-compliance" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series.

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |

## Encryption

### Encryption in flight (TLS / SSL)

Encryption in flight (TLS/SSL) means data is encrypted **before** it’s sent, decrypted **after** it’s received, and protected end‑to‑end using TLS certificates (HTTPS). This prevents man‑in‑the‑middle attacks by ensuring the connection can’t be intercepted or altered.
### Encryption at rest (server-side)

Server‑side encryption at rest means the server encrypts data **after** receiving it, stores it in encrypted form using a data key, and decrypts it **before** sending it back. The keys must be managed somewhere secure, and the server needs access to them to perform encryption and decryption.
### Client-side encryption

Client‑side encryption means the data is encrypted **before it ever reaches the server**, stays encrypted while stored, and is only decrypted by the receiving client. The server cannot decrypt it, and the approach often uses envelope encryption.
## AWS KMS

- Anytime you hear “encryption” for an AWS service, it’s most likely KMS
- AWS manages encryption keys for us
- Fully integrated with IAM for authorization
- Easy way to control access to your data
- Able to audit KMS Key usage using CloudTrail
- Seamlessly integrated into most AWS services (EBS, S3, RDS, SSM…)

<font color=#EB4925>Encrypted secrets can be stored in the code / environment variables.</font>
### KMS Keys Types

ℹ️ _Note:_ **KMS Keys** is the new name of KMS Customer Master Key.

- **Symmetric (AES-256 keys)**
	- Single encryption key that is used to Encrypt and Decrypt
	- AWS services that are integrated with KMS use Symmetric CMKs
	- You never get access to the KMS Key unencrypted (must call KMS API to use)
	 
- **Asymmetric (RSA & ECC key pairs)**
	- Public (Encrypt) and Private Key (Decrypt) pair
	- Used for Encrypt/Decrypt, or Sign/Verify operations
	- The public key is downloadable, but you can’t access the Private Key unencrypted
	- <font color=#EBAC25>Use case:</font> encryption outside of AWS by users who can’t call the KMS API
### AWS KMS (Key Management Service)

#### Types of KMS Keys

- AWS Owned Keys (free): SSE-S3, SSE-SQS, SSE-DDB (default key)
- AWS Managed Key: free (aws/service-name, example: aws/rds or aws/ebs)
- Customer managed keys created in KMS: $1 / month
- Customer managed keys imported: $1 / month • + pay for API call to KMS ($0.03 / 10000 calls)
#### Key Rotation

- AWS-managed KMS Key: automatic every 1 year
- Customer-managed KMS Key: (must be enabled) automatic & on-demand
- Imported KMS Key: only manual rotation possible using alias
### KMS Key Policies

KMS key policies define who can use or manage a KMS key, similar to how S3 bucket policies control access - but with one crucial difference: **a KMS key cannot be accessed at all unless a key policy explicitly allows it.**

{{< alert "circle-info" >}}

For most AWS services (like S3, SNS, SQS), IAM policies alone can grant access. **KMS is different.**

With KMS:
- **The key policy is the ultimate authority.**    
- If the key policy does not grant permission (directly or via delegation to IAM), **no IAM policy can override that**.    
- Even an admin with `AdministratorAccess` cannot use or manage a KMS key unless the key policy allows it.    

In other words:

> **IAM policies can** _**add**_ **permissions, but only if the key policy first allows IAM to participate.** **Without a key policy entry, the key is effectively locked.**

{{< /alert >}}

- **Default KMS Key Policy:**
	- Created if you don’t provide a specific KMS Key Policy
	- Complete access to the key to the root user = entire AWS account

```JSON
{
  "Sid": "Enable IAM User Permissions",
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::111122223333:root"
   },
  "Action": "kms:*",
  "Resource": "*"
}
```

- **Custom KMS Key Policy:**
	- Define users, roles that can access the KMS key
	- Define who can administer the key
	- Useful for cross-account access of your KMS key

```JSON
{
  "Sid": "Allow access for Key Administrators",
  "Effect": "Allow",
  "Principal": {"AWS":"arn:aws:iam::111122223333:role/ExampleAdminRole"},
  "Action": [
    "kms:Create*",
    "kms:Describe*",
    "kms:Enable*",
    "kms:List*",
    "kms:Put*",
    "kms:Update*",
    "kms:Revoke*",
    "kms:Disable*",
    "kms:Get*",
    "kms:Delete*",
    "kms:TagResource",
    "kms:UntagResource",
    "kms:ScheduleKeyDeletion",
    "kms:CancelKeyDeletion",
    "kms:RotateKeyOnDemand"
  ],
  "Resource": "*"
}
```

<font color=#EBAC25><i>More info:</i></font> [Key policies in AWS KMS](https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html)
#### Copying encrypted EBS Snapshots across accounts

1. Create a Snapshot, encrypted with your own KMS Key (Customer Managed Key)
2. <font color=#EB4925>Attach a KMS Key Policy to authorize cross-account access</font>
   
```JSON
{
  "Sid": "Allow use of the key with destination account",
  "Effect": "Allow",
  "Principal": {
    "AWS": "arn:aws:iam::TARGET-ACCOUNT-ID:role/ROLENAME"
  },
  "Action": [
    "kms:Decrypt",
    "kms:CreateGrant"
  ],
  "Resource": "*",
  "Condition": {
    "StringEquals": {
      "kms:ViaService": "ec2.REGION.amazonaws.com",
      "kms:CallerAccount": "TARGET-ACCOUNT-ID"
    }
  }
}

```   
   
3. Share the encrypted snapshot (the target account **cannot read it** unless the KMS key policy allows it)
4. (in target) Create a copy of the Snapshot, decrypt and re-encrypt it with a CMK in your target account (a target account cannot create volumes from a snapshot encrypted with a key it does not own.)
5. Create a volume from the snapshot
	- Snapshot now is in the target account
	- encrypted with a **target‑account KMS key**
	- the target account can finally create an EBS volume from it
### KMS Multi-Region Keys

- **Identical KMS keys replicated across Regions** that can be used interchangeably    
- **Same key ID, key material, and rotation state** across all Regions    
- **Encrypt in one Region and decrypt in another** without re‑encrypting    
- **No cross‑Region KMS API calls** needed during encryption or decryption    
- **Not global keys** — each Region hosts a **primary or replica**, managed independently    
- **Each key is still a separate KMS resource**, with its own policy and lifecycle    
- Ideal for **global client‑side encryption**, **Global DynamoDB tables**, and **Global Aurora**


---
## >> Sources <<

[Key policies in AWS KMS](https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html)
## >> References <<

**Cloud Practitioner:** [Security and Compliance]({{< ref "19-security-and-compliance" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}