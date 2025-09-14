---
title: Security and Compliance
date: 2025-08-19
description: Security and Compliance, Shared Responsibility Model
summary: Security and Compliance, Shared Responsibility Model...
draft: false
tags:
  - CLF-C02
categories: AWS
---
## Shared Responsibility Model

### AWS responsibility - Security <font color=#EB4925>of</font> the Cloud

- Protecting infrastructure (hardware, software, facilities, networking) that runs the AWS services
- Managed services, like [S3]({{< ref "11-s3" >}}), [DynamoDB]({{< ref "12-databases/#dynamodb" >}}), [RDS]({{< ref "12-databases/#rds-and-aurora" >}}), etc.
### Customer responsibility - Security <font color=#EB4925>in</font> the cloud

- For [EC2]({{< ref "4-ec2" >}}) instance, customer is responsible to the management of the guest OS (including the security patches and updates), firewall and network configuration, IAM
- Encrypting application data
### Shared controls

- Patch Management, Configuration Management, Awareness & Training
#### <font color=#EBAC25>Example</font> - RDS

- **AWS responsibility**
	- Manage underlying EC2 instance, disable SSH access
	- Automated DB patching
	- Automated OS patching
	- Audit the underlying instance and disks and guarantee it functions
- **Customer responsibility**
	- Check if the ports / IP / security group inbound rules in DB's SG
	- In-database user creation and permissions
	- Creating a database with or without public access
	- Ensure parameter groups or DB is configured to only allow SSL connections
	- Database encryption setting
#### <font color=#EBAC25>Example</font> - S3

- **AWS responsibility**
	- Guarantee you get unlimited storage
	- Guarantee you get encryption
	- Ensure data separation between customers
	- Ensure AWS employees can't access your data
- **Customer responsibility**
	- Bucket configuration
	- Bucket policy / public setting
	- IAM user and roles
	- Enabling encryption

![](./assets/AWS_Shared_Responsibility_Model.jpeg)
_AWS Shared Responsibility Model_

_More about Shared Responsibility Model:_ https://aws.amazon.com/compliance/shared-responsibility-model/
## DDoS Protection on AWS

- [AWS Shield]({{< ref "19-security-and-compliance/#aws-shield" >}}) Standard - protects against DDoS attack for website and applications - <font color=#C7EB25>for all customers at no additional cost</font>
- [AWS Shield]({{< ref "19-security-and-compliance/#aws-shield" >}}) Advanced - 24/7 premium DDoS protection and support
- [AWS WAF]({{< ref "19-security-and-compliance/#aws-waf" >}}) - filter specific requests based on predefined rules
- [CloudFront]({{< ref "15-aws-global-infrastructure/#amazon-cloudfront" >}}) and [Route53]({{< ref "15-aws-global-infrastructure/#route53" >}})
	- Availability protection using global edge network
	- Combined with AWS Shield provides attach mitigation at the edge

Be ready to scale - use [AWS Auto Scaling]({{< ref "10-auto-scaling-groups" >}}).

![](./assets/AWS_Shield.png)
_Sample Reference Architecture for DDOS Protection in AWS_
##### <font color=#C7EB25>DDoS components on above picture:</font>

- [Route53]({{< ref "15-aws-global-infrastructure/#route53" >}}) - Latency / Geolocation routing policies
- [CloudFront]({{< ref "15-aws-global-infrastructure/#amazon-cloudfront" >}}) - to ensure data is cached at the edge
- [Shield]({{< ref "19-security-and-compliance/#aws-shield" >}}) - see below section
- [WAF]({{< ref "19-security-and-compliance/#aws-waf" >}}) - optionally
- [Load Balancer]({{< ref "9-elastic-load-balancing" >}}) and [Auto Scaling]({{< ref "10-auto-scaling-groups" >}})

_More about DDOS protection:_ https://docs.aws.amazon.com/whitepapers/latest/aws-best-practices-ddos-resiliency/aws-best-practices-ddos-resiliency.html
### AWS Shield

- <font color=#EBAC25>AWS Shield Standard</font>
	- Free service that is activated for every AWS customer
	- Provides protection from attacks such as SYN / UDP Floods, Reflection attacks and other [layer 3]({{< ref "osi-model/#3-network-layer" >}}) / [layer 4]({{< ref "osi-model/#4-transport-layer" >}}) attacks (read more about [ISO OSI Model]({{< ref "osi-model" >}}))
- <font color=#EBAC25>AWS Shield Advanced</font>
	- Optional DDoS mitigation service (<font color=#EB4925>$3000</font> per month per organization)
	- Protecting against more sophisticated attacks on <font color=#EB4925>Amazon EC2, Elastic Load Balancing (ELB), Amazon CloudFront, AWS Global Accelerator and Route53</font>
## AWS WAF

- Protecting web applications from common web exploits (Layer 7)
- <font color=#C7EB25>Layer 7 is HTTP (vs Layer 4 is TCP)</font>
- <font color=#C7EB25>Can be deployed on Application Load Balancer, API Gateway, CloudFront</font>
### Web Access Control List

- Rules can include <font color=#EB4925>filters for IP addresses, HTTP headers, HTTP body, URi strings</font>
- Protecting from common attacks - <font color=#EB4925>SQL injection, Cross-Site Scripting (XSS)</font>
- Size constraints (to ensure request size) , geo match (block countries)
- Rate-based rules - <font color=#EB4925>to count occurrences of events, limit users to x requests per second</font>, etc. - for DDoS protection
## AWS Network Firewall

- Protects entire Amazon VPC (as oppose to [Security Groups & Network ACL]({{< ref "18-vpc/#security-groups--network-acl" >}}))
- From [Layer 3]({{< ref "osi-model/#3-network-layer" >}}) to [Layer 7]({{< ref "osi-model/#7-application-layer" >}}) protection
- Any direction, you can inspect
	- VPC to VPC traffic
	- Outbound to the internet
	- Inbound from the internet
	- To / From Direct Connect & Site-to-Site VPN

![](./assets/AWS_Network_Firewall.png)
_AWS Network Firewall is protecting entire VPC from [Layer 3]({{< ref "osi-model/#3-network-layer" >}}) to [Layer 7]({{< ref "osi-model/#7-application-layer" >}})_
##### <font color=#EB4925>AWS Network Firewall offers much better protection than</font> [NACL]({{< ref "18-vpc/#nacl-network-acl" >}}) <font color=#EB4925>that only operates at the subnet level. AWS Network Firewall operates at VPC level.</font>

_More about Network Firewall:_ https://docs.aws.amazon.com/network-firewall/
## AWS Firewall Manager

##### AWS Firewall Manager manages security rules in all accounts of an AWS Organization.

- Security policy: common set of security rules
	- VPC Security Groups for EC2, Application Load Balancer, etc...
	- WAF rules
	- AWS Shield Advanced
	- AWS Network Firewall
##### <font color=#EB4925>Rules are applied to new resources as they are created (good for compliance) across ALL EXISTING AND FUTURE accounts in all Organization.</font>
## Penetration Testing on AWS Cloud

##### <font color=#C7EB25>Allowed activities:</font>

##### AWS Customers <font color=#C7EB25>are allowed to carry out security assessment or penetration tests against their AWS infrastructure without prior approval for 8 services:</font>

- Amazon [EC2]({{< ref "4-ec2" >}}) instances, [NAT Gateways]({{< ref "18-vpc/#internet-gateway--nat-gateways" >}}) and [Elastic Load Balancers]({{< ref "9-elastic-load-balancing" >}})
- [Amazon RDS]({{< ref "12-databases/#rds-and-aurora" >}})
- [Amazon CloudFront]({{< ref "15-aws-global-infrastructure/#amazon-cloudfront" >}})
- [Amazon Aurora]({{< ref "12-databases/#rds-and-aurora" >}})
- [Amazon API Gateways]({{< ref "13-other-compute-services/#amazon-api-gateway" >}})
- [AWS Lambda]({{< ref "13-other-compute-services/#lambda" >}}) and Lambda Edge functions
- [Amazon Lightsail]({{< ref "13-other-compute-services/#lightsail" >}}) resources
- Amazon [Elastic Beanstalk]({{< ref "14-deployments/#beanstalk" >}}) environments
### <font color=#EB4925>Prohibited activities</font>

- DNS zone walking via Amazon Route53 and Hosted Zones
- Denial of Service (DoS), Distributed Denial of Service ([DDoS]({{< ref "19-security-and-compliance/#ddos-protection-on-aws" >}})), Simulated DoS, Simulated [DDoS]({{< ref "19-security-and-compliance/#ddos-protection-on-aws" >}})
- Port flooding
- Protocol flooding
- Request flooding (login request flooding, API request flooding)

For any simulated events, contact aws-security-simulated-event@amazon.com

_Read More about Penetration Testing:_ https://aws.amazon.com/security/penetration-testing/ 
## Data at rest vs Data in Transit

- <font color=#EBAC25>At rest:</font> data stored or archived on a device
	- On a hard disk, in RDS, in S3 Glacier, etc.
- <font color=#EBAC25>In transit (in motion):</font> data being transferred
##### <font color=#EB4925>Data in both states (at rest, in transit) should be encrypted as a best practice.</font>
### AWS KMS (Key Management Service)

##### <font color=#C7EB25>AWS is managing encryption keys for the customers using KMS.</font>

- **Encryption Opt-in:**
	- <font color=#EBAC25>EBS Volumes:</font> encrypt volumes
	- <font color=#EBAC25>S3 buckets:</font> server-side encryption of objects (SSE-S3 enabled by default, SSE-KMS opt-in)
	- <font color=#EBAC25>Redshift Database</font>
	- <font color=#EBAC25>RDS database</font>
	- <font color=#EBAC25>EFS drives:</font> encryption of data

- **Encryption Automatically enabled:**
	- [CloudTrail]({{< ref "17-cloud-monitoring/#aws-cloudtrail" >}}) Logs
	- [S3 Glacier]({{< ref "11-s3/#glacier" >}})
	- [Storage Gateway]({{< ref "11-s3/#aws-storage-gateway" >}})
### Cloud HSM

- **KMS** = <font color=#EB4925>AWS manages the software for encryption</font>
- **Cloud HSM** = <font color=#C7EB25>AWS is provisioning encryption hardware</font> (HSM = Hardware Security Module)
	- Customer is managing their own encryption keys instead of AWS
	- HSM devices are tamper resistant and FIPS compliant
### <font color=#EBAC25>Types of KMS Keys</font>

- **Customer Managed Key:**
	- Created, managed and used by the customer
	- Possibility of rotation policy (new key generated every year, old key preserved)
	- Possibility to bring-your-own-key
- **AWS Managed Key:**
	- Created and managed by AWS and used by the customer
	- Used by AWS services (S3, EBS, Redshift, etc.)
- **AWS Owned Key:**
	- Collection of CMDs that an AWS service owns and manages to use in multiple accounts
- **CloudHSM Keys:**
	- Keys generated from your own (dedicated) CloudHSM hardware device
	- Cryptographic operations are performed within the CloudHSM cluster

```AWSConsole
KMS > AWS managed keys
```
### AWS Certificate Manager (ACM)

**ACM** - allows easy provisioning and deploying SSL / TLS Certificates used to provide encryption for HTTPS enabled websites.

- Supports both, public and private TLS certificates
- Free of charge for public TLS certificates
- Automatic TLS certificate renewal
- Integrations with AWS Services, such as:
	- [Elastic Load Balancers]({{< ref "9-elastic-load-balancing" >}}) (ELB)
	- [CloudFront]({{< ref "15-aws-global-infrastructure/#amazon-cloudfront" >}}) Distributions
	- APIs on [API Gateway]({{< ref "13-other-compute-services/#amazon-api-gateway" >}})
### AWS Secrets Manager

- Capability to force rotation of secrets every X days
- Automate generations of secrets (uses Lambda)
- Integration with Amazon RDS (MySQL, PostgreSQL, Aurora)
- Secrets are encrypted using KMS

<font color=#EBAC25>Use case:</font> RDS integrations.

```AWSConsole
Secrets Manager > Store a new secret
```
## Artifact Overview

**Artifact** is a portal that provides customers with on-demand access to <font color=#C7EB25>AWS compliance documentation</font> and <font color=#C7EB25>AWS agreements</font>.

- Artifact Reports - allows downloading AWS security and compliance documents from third-party auditors, like AWS ISO certifications, Payment Card Industry (PCI) and System and Organization Control (SOC) reports
- Artifact Agreements - allows reviewing, accepting and tracking the status of AWS agreements, such as:
	- Business Associate Addendum (BAA)
	- Health Insurance Portability and Accountability Act (HIPAA) for an individual account in the organization
##### <font color=#EBAC25>Can be used to support internal audit or compliance.</font>

```CLI
Artifact > View reports
```
## GuardDuty

**GuardDuty** is an <font color=#EB4925>Intelligent Threat Discovery</font> to protect AWS account.

Uses Machine Learning algorithms, <font color=#EB4925>anomaly detection.</font>

Enabled with 1-click, no need to install any software.
##### Input data includes:

- [CloudTrail Event Logs]({{< ref "17-cloud-monitoring/#aws-cloudtrail" >}}) - unusual API calls, unauthorized deployments
	- CloudTrail Management Events - create VPC subnet, create trail, ...
	- CloudTrail S3 Data Events - get object, list object, delete object, ...
- [VPC Flow Logs]({{< ref "18-vpc/#vpc-flow-logs" >}}) - unusual internal traffic, unusual IP addresses
- DNS Logs - compromised EC2 instances sending encoded data within DNS queries
- Optional Features

EventBridge [Cloud Monitoring]({{< ref "17-cloud-monitoring" >}}) can be set up to be notified in case of any findings. Rules can target [Lambda]({{< ref "13-other-compute-services/#lambda" >}}) or [SNS]({{< ref "16-cloud-integrations/#amazon-sns" >}}).

GuardDuty has a dedicated finding for Crypto Currency (mining?) attacks.

![](./assets/AWS_GuardDuty.png)
_Amazon GuardDuty input data example_
## Amazon Inspector

##### <font color=#EBAC25>Automated Security Assessment.</font>

- For EC2 instances
	- Using [AWS System Manager (SSM)]({{< ref "14-deployments/#systems-manager-ssm" >}}) agent
	- Analyze against <font color=#EB4925>unintended network accessibility</font>
	- Analyze the <font color=#EB4925>running OS against known vulnerabilities</font>
- For Container Images pushed to [ECR]({{< ref "13-other-compute-services/#ecr" >}})
	- Assessment of [Container Images]({{< ref "13-other-compute-services/#ecs-elastic-container-service" >}}) as they are being pushed
- For [Lambda]({{< ref "13-other-compute-services/#lambda" >}}) Functions
	- Identifies software vulnerabilities in function code and package dependencies
	- Assessment of functions as they are deployed
##### <font color=#EBAC25>Reporting and integration with</font> [AWS Security Hub]({{< ref "19-security-and-compliance/#aws-security-hub" >}}).

**Amazon Inspector** <font color=#EB4925>evaluates vulnerabilities (against CVE database)</font> only running EC2 instances, Container Images and Lambda Functions.

A risk score is associated with all vulnerabilities for prioritization.
## AWS Config

**AWS Config** helps with auditing and recording compliance of your AWS resources. It is recording configurations and changes over time.

It can store the configuration data into [S3]({{< ref "11-s3" >}}) (then analyzed by [Athena]({{< ref "12-databases/#athena" >}})).
##### What AWS Config can record (examples):

- Unrestricted SSH access to the Security Groups (i.e. port open for everyone)
- Public access to S3 buckets
- ELB configuration changes over time

It is using [SNS]({{< ref "16-cloud-integrations/#amazon-sns" >}}) (_check:_ [Cloud Integrations]({{< ref "16-cloud-integrations" >}})) for sending notifications.

**AWS Config** is a per-region service but can be aggregated across regions and accounts.

```AWSConsole
AWS Config > 1-click setup
```
## AWS Macie

**Amazon Macie** is a fully managed data security and data privacy service that uses <font color=#C7EB25>machine learning and pattern matching</font> to discover <font color=#EB4925>your sensitive data in AWS.</font>

**Macie** helps identifying and alerting <font color=#EB4925>sensitive data</font>, such as e.g. <font color=#EB4925>PII</font> (Personally Identifiable Information).
## AWS Security Hub

**AWS Security Hub** is a <font color=#C7EB25>central security tool</font> to manage security across several AWS accounts and automate security checks.

Integrated dashboards showing current security and compliance status to quickly take actions.

**Security Hub** automatically aggregates alerts in predefined formats from AWS services (or AWS partner tools):

- Config
- GuardDuty
- Inspector
- Macie
- IAM Access Analyzer
- AWS Systems Manager
- AWS Firewall Manager
- AWS Health
- AWS Partner Network Solutions

<font color=#EBAC25>AWS Config service is a dependency and must first be enabled to use Security Hub.</font>

![](./assets/AWS_Security_Hub.png)
_AWS Security Hub_
## Amazon Detective

[GuardDuty]({{< ref "19-security-and-compliance/#guardduty" >}}), [Macie]({{< ref "19-security-and-compliance/#aws-macie" >}}) and [Security Hub]({{< ref "19-security-and-compliance/#aws-security-hub" >}}) are used to identify potential security issues of findings.

Often security findings require deeper analysis to isolate the root cause and take action - it can be a complex process.

**Amazon Detective** <font color=#EB4925>analyzes, investigates and identifies the root cause of security issues or suspicious activities</font> (using Machine Learning).

It is automatically collecting and processing events from [VPC Flow Logs]({{< ref "18-vpc/#vpc-flow-logs" >}}), [CloudTrail]({{< ref "17-cloud-monitoring/#aws-cloudtrail" >}}), and [GuardDuty]({{< ref "19-security-and-compliance/#guardduty" >}}) and creating an unified view. It can produce visualizations with details and context to help <font color=#EB4925>getting to the root cause.</font>
## AWS Abuse

Report suspected AWS resources used to abusive or illegal purposes.

- Abusive and prohibited behaviors:
	- SPAM
	- Port scannint
	- DoS or [DDoS]({{< ref "19-security-and-compliance/#ddos-protection-on-aws" >}})
	- Intrusion attempts
	- Hosting illegal or copyrighted content
	- Distributing malware

Contact the AWS Abuse team at abuse@amazonaws.com
## Root user privileges

Root user = AWS Account Owner
##### Actions that can be performed only by the root user:

- <font color=#EB4925>Change account settings</font> (account name, email address, root user password, root user access keys)
- View certain tax invoices
- <font color=#EB4925>Close AWS account</font>
- Restore IAM user permissions
- <font color=#EB4925>Change or cancel your AWS Support plan</font>
- <font color=#EB4925>Register as a seller in the Reserved Instance Marketplace</font>
- Configure an Amazon S3 bucket to enable MFA
- Edit or delete an Amazon S3 bucket policy that includes an invalid VPC ID or VPC endpoint ID
- Sign up for GovCloud
## IAM Access Analyzer

##### <font color=#EBAC25>Find out which resources are shared externally with IAM Access Analyzer.</font>

- S3 Buckets
- IAM Roles
- KMS Keys
- Lambda Functions and Layers
- SQS queues
- Secrets Manager Secrets

Define <font color=#EB4925>Zone of Trust</font> (AWS Account or AWS Organization).

Access outside zone of trusts = findings.
## Summary

- <font color=#EBAC25>Shared Responsibility Model</font> on AWS
- <font color=#EBAC25>Shield:</font> Automatic DDoS Protection + 24/7 support for advanced
- <font color=#EBAC25>WAF:</font> Web Application Firewall to filter incoming web requests based on rules
- <font color=#EBAC25>KMS:</font> Encryption keys managed by AWS
- <font color=#EBAC25>CloudHSM:</font> Hardware encryption (AWS Customer managing own keys)
- <font color=#EBAC25>AWS Certificate manager:</font> Provision, manage and deploy TLS Certificates
- <font color=#EBAC25>Artifact:</font> Get access to compliance reports such as PCI, ISO, etc.
- <font color=#EBAC25>GuardDuty:</font> Find malicious behavior within VPC, DNS and CloudTrail Logs
- <font color=#EBAC25>Inspector:</font> Find software vulnerabilities in EC2, ECR images and Lambda functions
- <font color=#EBAC25>Network Firewall:</font> Protect VPC against network attacks
- <font color=#EBAC25>Config:</font> Track config changes and compliance against rules
- <font color=#EBAC25>Macie:</font> Find sensitive data (e.g. PII Personally Identifiable Information data) in Amazon S3 buckets
- <font color=#EBAC25>CloudTrail:</font> Track API calls made by users within account
- <font color=#EBAC25>AWS Security Hub:</font> gather security findings from multiple AWS accounts
- <font color=#EBAC25>Amazon Detective:</font> Find the root cause of security issues or suspicious activities
- <font color=#EBAC25>AWS Abuse:</font> Report AWS resources used for abusive or illegal purposes
- <font color=#EBAC25>Root user privileges:</font>
	- Change account settings
	- Close AWS account
	- Change or cancel AWS Support plan
	- Register as a seller in the Reserved Instance Marketplace
- <font color=#EBAC25>IAM Access Analyzer:</font> Identify which resources are shared externally
- <font color=#EBAC25>Firewall Manager:</font> Manage security rules across an Organization (WAF, Shield...)

---
## >> Sources <<

- Shared Responsibility Model: https://aws.amazon.com/compliance/shared-responsibility-model/
- DDOS: https://docs.aws.amazon.com/whitepapers/latest/aws-best-practices-ddos-resiliency/aws-best-practices-ddos-resiliency.html
- Network Firewall: https://docs.aws.amazon.com/network-firewall/
- Penetration Testing: https://aws.amazon.com/security/penetration-testing/

- OSI Model: [ISO OSI Model]({{< ref "osi-model" >}})
## >> References <<

- [EC2]({{< ref "4-ec2" >}})
- [S3]({{< ref "11-s3" >}})
- [Storage]({{< ref "6-storage" >}})
- [Elastic Load Balancing]({{< ref "9-elastic-load-balancing" >}})
- [Cloud Monitoring]({{< ref "17-cloud-monitoring" >}})
- [Databases]({{< ref "12-databases" >}})
- [Other Compute Services]({{< ref "13-other-compute-services" >}})
- [AWS Global Infrastructure]({{< ref "15-aws-global-infrastructure" >}})
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

{{< disclaimer_practitioner25 >}}
