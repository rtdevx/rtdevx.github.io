---
title: "Solutions Architect: Disaster Recovery & Migrations"
date: 2026-04-17
description: Associate-level extension of the `Disaster Recovery Strategies` Section from AWS Cloud Practitioner Series.
summary: Associate-level extension of the `Disaster Recovery Strategies` Section from AWS Cloud Practitioner Series.
draft: false
tags:
  - SAA-C03
  - DisasterRecovery
  - Backup
  - HighAvailability
categories:
  - AWS
series: AWS Solution Architect
---
---
ℹ️ **Associate‑level extension** of the [Disaster Recovery Strategies]({{< ref "23-other-services/#disaster-recovery-strategies" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series.

<center>📡 <font color=#EBAC25><b>Useful TAG: </b></font><a href="{{< ref "tags/disasterrecovery" >}}" target="_self">DisasterRecovery</a></center>

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |

## Disaster Recovery Overview

{{< lead >}}

**AWS Elastic Disaster Recovery** minimizes downtime and data loss with fast, reliable recovery of on-premises and cloud-based applications using affordable storage, minimal compute, and point-in-time recovery.

{{< /lead >}}

- A **disaster** is any event that disrupts business operations or causes financial loss.    
- **Disaster Recovery (DR)** focuses on preparing for such events and restoring systems afterward.    
- DR can take several forms:    
    - **On‑prem to on‑prem**: traditional and typically very costly        
    - **On‑prem to AWS**: hybrid recovery        
    - **AWS Region A to Region B**: cloud‑native cross‑region recovery

- Two key metrics define your DR strategy:    
    - <font color=#EBAC25>RPO (Recovery Point Objective)</font> - how much data you can afford to lose        
    - <font color=#EBAC25>RTO (Recovery Time Objective)</font> - how quickly systems must be restored

![](./assets/AWS_DR_RPO_RTO.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
## Disaster Recovery Strategies

- <font color=#EBAC25>Backup and Restore</font> - cheapest method (<font color=#C7EB25>high RPO</font>)
- <font color=#EBAC25>Pilot Light</font> - core functions are there (e.g. database) but it's not scaled up
- <font color=#EBAC25>Warm Standby</font> - full version of the app but at minimum size (databases, webs, api, ...)
- <font color=#EBAC25>Multi-Site / Hot-Site</font> - full version, full size active-active DR
### Backup and Restore

A **Backup and Restore** DR strategy stores your data in services like Amazon S3 or AWS Backup and recreates your infrastructure only when a disaster occurs. 

Recovery involves restoring the latest backups and redeploying resources, giving you low cost but higher RTO and RPO compared to other DR models.
### Pilot Light

- A **minimal, always‑on version** of your application runs in AWS, keeping the critical components active.    
- It’s similar to Backup & Restore but **recovers faster** because the essential services are already running in the cloud.

![](./assets/AWS_DR_Pilot.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### Warm Standby

- The full application stack runs in AWS but at **reduced capacity**.    
- If a disaster occurs, you **scale it up** to handle normal production traffic.

![](./assets/AWS_DR_Warm.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### Multi Site / Hot Site

- Provides an extremely low **RTO** (seconds to minutes) but is also the **most expensive** option.    
- The full production environment runs **simultaneously** on‑premises and in AWS at full scale.

![](./assets/AWS_DR_Hot_Site.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
## Disaster Recovery Best Practices

**Backup**
- Use EBS snapshots, RDS automated backups/snapshots, and regularly push data to S3, S3 IA, or Glacier with lifecycle policies and cross‑region replication.    
- For on‑premises backups, use **Snowball** or **Storage Gateway**.    

**High Availability**
- Use **Route 53** to shift DNS between regions.    
- Leverage Multi‑AZ features for **RDS**, **ElastiCache**, **EFS**, and **S3**.    
- Keep a **Site‑to‑Site VPN** as a fallback if Direct Connect fails.    

**Replication**
- Use **cross‑region RDS replication**, **Aurora Global Databases**, or on‑prem to RDS database replication.    
- Storage Gateway can also support replication workflows.    

**Automation**
- Rebuild environments with **CloudFormation** or **Elastic Beanstalk**.    
- Auto‑recover EC2 instances via **CloudWatch** alarms.    
- Use **Lambda** for custom automation tasks.    

**Chaos Testing**
- Inject controlled failures (e.g., Netflix‑style “simian army” or "chaos monkey") to validate resilience.
## AWS Elastic Disaster Recovery (DRS)

- AWS Elastic Disaster Recovery lets you rapidly restore physical, virtual, or cloud‑based servers into AWS.    
- It protects critical workloads - databases like Oracle, MySQL, SQL Server, enterprise apps like SAP, and even against ransomware - using **continuous block‑level replication**.

![](./assets/AWS_DR_DRS.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
## DMS - Database Migration Service

<font color=#EBAC25><i>More info:</i></font>  [What is AWS Database Migration Service?](https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html)

- AWS Database Migration Service lets you **migrate databases to AWS quickly and securely**, with built‑in resilience and self‑healing.    
- The **source database stays online** throughout the migration.    
- Supports both **homogeneous** migrations (e.g., Oracle → Oracle) and **heterogeneous** migrations (e.g., SQL Server → Aurora).    
- Provides **continuous data replication** using CDC.    
- Replication tasks run on a **DMS replication instance**, which you deploy on EC2.
### DMS Sources and Targets

| Sources                                                                                                       | Targets                                                                                         |
| ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| On-Premises and EC2 instances databases: Oracle, MS SQL Server, MySQL, MariaDB, PostgreSQL, MongoDB, SAP, DB2 | On-Premises and EC2 instances databases: Oracle, MS SQL Server, MySQL, MariaDB, PostgreSQL, SAP |
| Azure: Azure SQL Database                                                                                     | Amazon RDS                                                                                      |
| Amazon RDS: all including Aurora                                                                              | Redshift, DynamoDB, S3                                                                          |
| Amazon S3                                                                                                     | OpenSearch Service                                                                              |
| DocumentDB                                                                                                    | Kinesis Data Streams                                                                            |
|                                                                                                               | Apache Kafka                                                                                    |
|                                                                                                               | DocumentDB & Amazon Neptune                                                                     |
|                                                                                                               | Redis & Babelfish                                                                               |
<font color=#EBAC25><i>More info:</i></font>  [Sources for AWS DMS](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Introduction.Sources.html)
### AWS Schema Conversion Tool (SCT)

- AWS SCT converts a database schema from one engine to another.    
- For OLTP, it can migrate schemas from SQL Server or Oracle to MySQL, PostgreSQL, or Aurora; for OLAP, it can convert Teradata or Oracle schemas to Amazon Redshift.    
- Use **compute‑heavy instances** to speed up large or complex schema conversions.

ℹ️ _Note:_ You do not need to use SCT if you are migrating the same DB engine.
### DMS - Continuous Replication

![](./assets/AWS_DR_DMS_Replication.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### AWS DMS - Multi-AZ Deployment

- When Multi‑AZ is enabled, DMS creates and maintains a **synchronously replicated standby** in another Availability Zone.    
- This setup provides **data redundancy**, avoids **I/O freezes**, and reduces **latency spikes** during failover.

---
## >> Sources <<

- [AWS Elastic Disaster Recovery Documentation](https://docs.aws.amazon.com/drs/)
- [What is AWS Database Migration Service?](https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html)
	- [Sources for AWS DMS](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Introduction.Sources.html)
## >> References <<

**Cloud Practitioner:** [Disaster Recovery Strategies]({{< ref "23-other-services/#disaster-recovery-strategies" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}

[^1]: 
