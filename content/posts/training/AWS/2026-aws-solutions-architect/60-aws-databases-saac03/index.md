---
title: "Solutions Architect: Databases in AWS"
date: 2026-04-11
description: Associate-level extension of the `Databases` Section from AWS Cloud Practitioner Series.
summary: Associate-level extension of the `Databases` Section from AWS Cloud Practitioner Series.
draft: false
tags:
  - SAA-C03
  - database
categories:
  - AWS
series: AWS Solution Architect
---
---
ℹ️ **Associate‑level extension** of the [Databases]({{< ref "12-databases" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series.

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |

## Choosing the right Database

- AWS offers many managed databases, so the choice depends on your workload and architecture    
- Key questions to guide selection:    
    - Is the workload **read‑heavy, write‑heavy, or mixed**? Does throughput need to scale or vary during the day        
    - How much data will you store, how fast will it grow, and how will it be accessed        
    - What level of **durability** and “source of truth” guarantees do you need        
    - Required **latency** and expected concurrency        
    - What **data model** fits: structured, semi‑structured, joins, query patterns        
    - Do you need a strict schema or flexibility? Reporting? Search? RDBMS vs NoSQL        
    - Any **licensing costs** to consider, or opportunities to move to cloud‑native engines like Aurora
## Database Types

- **RDBMS / OLTP (SQL):** RDS, Aurora — best when you need joins    
- **NoSQL:** DynamoDB (JSON‑style), ElastiCache (key/value), Neptune (graph), DocumentDB (MongoDB‑compatible), Keyspaces (Cassandra)    
- **Object Storage:** S3 for large objects, Glacier for archival    
- **Data Warehousing / Analytics:** Redshift (OLAP), Athena, EMR    
- **Search:** OpenSearch for free‑text and unstructured queries    
- **Graph:** Neptune for relationship‑focused data    
- **Ledger:** QLDB for immutable, cryptographically verifiable records    
- **Time Series:** Timestream for time‑stamped data
## Amazon RDS - Summary

- Fully managed relational databases: PostgreSQL, MySQL, MariaDB, Oracle, SQL Server, DB2, plus **RDS Custom** for deeper OS/instance access    
- You choose instance size and EBS volume type/size, with **storage auto‑scaling**    
- Supports **Read Replicas** and **Multi‑AZ** for availability and read scaling    
- Security via **IAM**, Security Groups, **KMS encryption**, and **SSL**    
- Automated backups with **PITR (up to 35 days)**, plus manual snapshots for long‑term retention 
- Includes managed maintenance (with downtime)    
- Supports **IAM authentication** and integrates with **Secrets Manager**    
- Ideal for relational/OLTP workloads needing SQL queries and transactions
## Amazon Aurora - Summary

- MySQL/PostgreSQL‑compatible engine with **separate compute and distributed storage**    
- Storage keeps **6 copies across 3 AZs**, auto‑scales, self‑heals; compute scales via multi‑AZ clusters and read replicas    
- Cluster endpoints for **writer** and **readers**    
- Shares RDS features for security, monitoring, and maintenance    
- Supports PITR, snapshots, fast **database cloning**, and S3 import/export    
- **Aurora Serverless** handles spiky or unpredictable workloads with no capacity planning    
- **Aurora Global** offers low‑latency global reads with sub‑second replication    
- **Aurora ML** integrates with SageMaker and Comprehend for in‑database ML inference    
- Best for RDS‑style workloads needing **higher performance, more automation, and richer features**
## Amazon ElastiCache - Summary

- Fully managed **Redis/Memcached** service (similar to RDS but for caching)    
- **In‑memory** store with sub‑millisecond latency    
- Choose from cache‑optimised instance types    
- Supports **Redis clustering**, Multi‑AZ, and read replicas (sharding)    
- Security via IAM, Security Groups, KMS, and Redis Auth    
- Offers backups, snapshots, and PITR    
- Includes managed maintenance    
- Requires app‑level changes to use effectively    
- Ideal for **key/value workloads**, heavy‑read patterns, DB query caching, and session storage (no SQL)
## DynamoDB - Summary

- Fully managed, serverless **NoSQL** database with consistent millisecond latency    
- Supports **provisioned** (with auto‑scaling) and **on‑demand** capacity modes    
- Can act as a key/value store (e.g., session data) with **TTL**    
- Highly available, Multi‑AZ by default; supports **transactions** and decoupled read/write paths    
- **DAX** adds microsecond‑latency read caching    
- Security, auth, and access control handled entirely through **IAM**    
- **DynamoDB Streams** enable event‑driven processing via Lambda or Kinesis    
- **Global Tables** provide active‑active multi‑region replication    
- Backups: **PITR** (35 days) and on‑demand snapshots; restores create a new table    
- **Export to S3** (no RCUs) and **import from S3** (no WCUs)    
- Flexible schema evolution    
- Ideal for serverless apps, small JSON‑like documents, and distributed low‑latency caching
## Amazon S3 - Summary

- S3 is a **key/value object store**, ideal for large objects (less efficient for many tiny files)    
- Fully serverless, infinitely scalable, supports versioning; max object size **50 TB**    
- Storage tiers: **Standard**, **Infrequent Access**, **Intelligent‑Tiering**, **Glacier** (with lifecycle policies)    
- Core features: versioning, encryption, replication, MFA‑Delete, access logs    
- Security via **IAM**, bucket policies, ACLs, Access Points, Object Lambda, CORS, Object/Vault Lock 
- Encryption options: **SSE‑S3**, **SSE‑KMS**, **SSE‑C**, client‑side, TLS, default encryption    
- Bulk operations with **S3 Batch**, inventory reports for listing    
- Performance tools: **multipart upload**, Transfer Acceleration, S3 Select    
- Event automation via **SNS, SQS, Lambda, EventBridge**    
- Use cases: static hosting, large object storage, scalable key/value storage
## DocumentDB

- AWS’s managed, MongoDB‑compatible NoSQL database for storing and querying JSON    
- Similar deployment model to Aurora, but for MongoDB workloads    
- Fully managed, highly available with **replication across 3 AZs**    
- Storage auto‑expands in **10 GB increments**    
- Designed to scale to **millions of requests per second**
## Amazon Neptune

- Fully managed **graph database** for highly connected datasets    
- Ideal for social‑network‑style relationships (users, posts, comments, likes, shares)    
- Replicated across **3 AZs** with up to **15 read replicas**    
- Handles billions of relationships with **millisecond‑level** query latency    
- Optimised for complex graph queries that are hard for relational/NoSQL systems    
- Great for **knowledge graphs**, fraud detection, recommendation engines, and social networks

![](./assets/AWS_DB_Neptune.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### Amazon Neptune - Streams

- Provides a **real‑time, strictly ordered feed** of all graph data changes    
- Updates appear immediately with **no duplicates**    
- Stream data is accessible via an **HTTP REST API**    
- <font color=#EBAC25>Use cases:</font>    
    - Trigger notifications on specific graph changes        
    - Keep another data store (S3, OpenSearch, ElastiCache, etc.) in sync        
    - Support **cross‑region** Neptune replication
## Amazon Keyspaces (for Apache Cassandra)

- Fully managed, serverless, Cassandra‑compatible NoSQL database    
- Automatically scales up/down with traffic; highly available with **3× replication across AZs**    
- Uses **CQL** and delivers single‑digit millisecond latency at massive scale    
- Supports on‑demand or provisioned capacity (with auto‑scaling)    
- Provides encryption, backups, and **PITR** (Point-In-Time Recovery) **up to 35 days**    
- Great for IoT data, time‑series workloads, and large‑scale distributed apps
## Amazon Timestream

- Fully managed, serverless **time‑series database** that auto‑scales with demand    
- Handles **trillions of events per day**, delivering far lower cost and much faster performance than relational DBs    
- Supports scheduled queries, multi‑measure records, and **SQL‑compatible** querying    
- Tiered storage: recent data in memory, historical data in cost‑optimised storage    
- Built‑in time‑series analytics for near real‑time pattern detection    
- Encrypted in transit and at rest    
- Ideal for **IoT**, operational monitoring, and real‑time analytics

---
## >> Sources <<

- [AWS Databases](https://aws.amazon.com/products/databases/)
	- [Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)
	- [Amazon Aurora](https://aws.amazon.com/rds/aurora/)
	- [Amazon ElastiCache](https://aws.amazon.com/elasticache/)
	- [DynamoDB](https://docs.aws.amazon.com/dynamodb/)
	- [Amazon S3]({{< ref "tags/s3" >}})
		- [S3 - Cloud Practitioner]({{< ref "11-s3" >}})
		- [S3 - Solutions Architect]({{< ref "11-s3-saac03" >}})
	- [DocumentDB](https://docs.aws.amazon.com/documentdb/)
	- [Amazon Neptune](https://docs.aws.amazon.com/neptune/)
	- [Amazon Keyspaces (for Apache Cassandra)](https://docs.aws.amazon.com/keyspaces/)
	- [Amazon Timestream](https://docs.aws.amazon.com/timestream/)
## >> References <<

**Cloud Practitioner:** 
- [Databases]({{< ref "12-databases" >}})
- [S3 - Cloud Practitioner]({{< ref "11-s3" >}})

**Solutions Architect:**
- [RDS, Aurora, Elasticache]({{< ref "12-rds-aurora-elasicache-saac03" >}})
- [S3 - Solutions Architect]({{< ref "11-s3-saac03" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}