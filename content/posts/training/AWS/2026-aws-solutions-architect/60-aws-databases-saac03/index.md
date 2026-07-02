---
title: "Solutions Architect: Databases in AWS"
date: 2026-04-11
description: Associate-level extension of the `Databases` Section from AWS Cloud Practitioner Series.
summary: Associate-level extension of the `Databases` Section from AWS Cloud Practitioner Series.
draft: false
tags:
  - SAA-C03
  - database
  - analytics
  - Kinesis
categories:
  - AWS
series: AWS Solution Architect
---
---


### Amazon S3 - Summary

- S3 is a **key/value object store**, ideal for large objects (less efficient for many tiny files)    
- Fully serverless, infinitely scalable, supports versioning; max object size **50 TB**    
- Storage tiers: **Standard**, **Infrequent Access**, **Intelligent‑Tiering**, **Glacier** (with lifecycle policies)    
- Core features: versioning, encryption, replication, MFA‑Delete, access logs    
- Security via **IAM**, bucket policies, ACLs, Access Points, Object Lambda, CORS, Object/Vault Lock 
- Encryption options: **SSE‑S3**, **SSE‑KMS**, **SSE‑C**, client‑side, TLS, default encryption    
- Bulk operations with **S3 Batch**, inventory reports for listing    
- Performance tools: **multipart upload**, Transfer Acceleration, S3 Select    
- Event automation via **SNS, SQS, Lambda, EventBridge**    
- <font color=#EBAC25>Use cases:</font> static hosting, large object storage, scalable key/value storage
### DocumentDB

- AWS’s managed, MongoDB‑compatible NoSQL database for storing and querying JSON    
- Similar deployment model to Aurora, but for MongoDB workloads    
- Fully managed, highly available with **replication across 3 AZs**    
- Storage auto‑expands in **10 GB increments**    
- Designed to scale to **millions of requests per second**
### Amazon Neptune

- Fully managed **graph database** for highly connected datasets    
- Ideal for <font color=#EBAC25>social‑network‑style relationships</fontt> (users, posts, comments, likes, shares)    
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
### Amazon Keyspaces (for Apache Cassandra)

- Fully managed, serverless, Cassandra‑compatible NoSQL database    
- Automatically scales up/down with traffic; highly available with **3× replication across AZs**    
- Uses **CQL** and delivers single‑digit millisecond latency at massive scale    
- Supports on‑demand or provisioned capacity (with auto‑scaling)    
- Provides encryption, backups, and **PITR** (Point-In-Time Recovery) **up to 35 days**    
- Great for IoT data, time‑series workloads, and large‑scale distributed apps
### Amazon Timestream

- Fully managed, serverless **time‑series database** that auto‑scales with demand    
- Handles **trillions of events per day**, delivering far lower cost and much faster performance than relational DBs    
- Supports scheduled queries, multi‑measure records, and **SQL‑compatible** querying    
- Tiered storage: recent data in memory, historical data in cost‑optimised storage    
- Built‑in time‑series analytics for near real‑time pattern detection    
- Encrypted in transit and at rest    
- Ideal for **IoT**, operational monitoring, and real‑time analytics
## Data & Analytics

### Amazon Athena

- Serverless SQL query engine for data stored in **S3** (built on Presto)    
- Supports formats like **CSV, JSON, ORC, Avro, Parquet**    
- Pricing: **$5 per TB scanned**    
- Often paired with **QuickSight** for dashboards and reporting    
- Great for analytics on logs such as **VPC Flow Logs, ELB logs, CloudTrail**    
- <font color=#EBAC25>Exam tip:</font> use **Athena** to run serverless SQL queries directly on [S3]({{< ref "tags/s3" >}})
### Redshift

- Analytics‑focused **OLAP** data warehouse (PostgreSQL‑based but not for OLTP)    
- Delivers **10× faster** performance than traditional warehouses and scales to petabytes    
- Uses **columnar storage** and a massively parallel query engine    
- Available as **provisioned** or **serverless**    
- Queried using standard SQL; integrates with BI tools like **QuickSight** and **Tableau**    
- Compared to Athena: faster for complex **joins** and aggregations due to indexing

{{< alert "circle-info" >}}

You can configure **Amazon Redshift** to **automatically copy snapshots** (automated or manual) of a cluster **to another AWS Region**.

{{< /alert >}}

![](./assets/AWS_DB_Redshift_1.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
#### Redshift Spectrum

- Lets you **query data directly in S3** without loading it into Redshift    
- Requires an active **Redshift cluster** to run the query    
- Queries are executed by **thousands of Spectrum nodes** for large‑scale parallel processing

![](./assets/AWS_DB_Redshift_Spectrum.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### Amazon OpenSearch Service

- Successor to Amazon Elasticsearch, offering full‑text and partial‑match search across any field    
- Complements other databases (e.g., DynamoDB) by enabling rich search beyond key/index lookups    
- Available as **managed** or **serverless** clusters    
- SQL support is optional via a plugin    
- Ingests data from [Kinesis]({{< ref "55-serverless-saac03/#amazon-kinesis-data-streams" >}}) Firehose, AWS IoT, and CloudWatch Logs    
- Security via **Cognito**, IAM, KMS encryption, and TLS    
- Includes **OpenSearch Dashboards** for visualisation
### Amazon EMR

- Managed **Hadoop/Spark** platform for large‑scale data processing    
- Spins up clusters of **hundreds of EC2 instances** for big data workloads    
- Bundles tools like **Spark, HBase, Presto, Flink**    
- Handles provisioning, configuration, and auto‑scaling; supports **Spot Instances**    
- Ideal for **ETL**, machine learning, log processing, web indexing, and other big‑data pipelines
### Amazon QuickSight

- Serverless, ML‑powered **Business Intelligence service** for building interactive dashboards    
- Fast, auto‑scaling, embeddable, with **per‑session pricing**    
- <font color=#EBAC25>Use cases:</font> business analytics, visualisations, ad‑hoc analysis, data insights    
- Integrates with **RDS, Aurora, Athena, Redshift, S3**, and more    
- Can use the in‑memory **SPICE** engine for high‑speed querying    
- Enterprise edition adds **Column‑Level Security (CLS)**
### AWS Glue

- Fully managed, serverless **ETL** service for preparing and transforming data    
- Automates data discovery, cleaning, and schema handling for analytics    
- Ideal for building scalable, code‑optional ETL pipelines

{{< alert "circle-info" >}}

- **Glue Job Bookmarks:** prevent re-processing old data
- **Glue DataBrew:** clean and normalize data using pre-built transformation
- **Glue Studio:** new GUI to create, run and monitor ETL jobs in Glue
- **Glue Streaming ETL** (built on Apache Spark Structured Streaming): compatible with [Kinesis]({{< ref "55-serverless-saac03/#amazon-kinesis-data-streams" >}}) Data Streaming, Kafka, MSK (managed Kafka)

{{< /alert >}}
#### AWS Lake Formation

- Fully managed service for quickly building a **centralised data lake**    
- Automates data discovery, cleansing, transformation, ingestion, and cataloging (with ML‑based de‑duplication)    
- Supports combining **structured and unstructured** data    
- Provides fine‑grained **row/column‑level access control**    
- Includes blueprints for common sources (S3, RDS, relational/NoSQL DBs)    
- <font color=#EBAC25>Built on top of AWS Glue</font>

![](./assets/AWS_DB_Lake_Formation.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### Amazon Managed Streaming for Apache Kafka (Amazon MSK)

- Fully managed **Apache Kafka** service on AWS; alternative to Kinesis    
- AWS handles broker and ZooKeeper provisioning, updates, and recovery    
- Deploys in your **VPC**, supports **multi‑AZ** (up to 3) for high availability    
- Data stored durably on **EBS** for as long as needed    
- **MSK Serverless**: Kafka without capacity management—compute and storage scale automatically

![](./assets/AWS_DB_Kafka.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

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

- [Amazon Athena](https://docs.aws.amazon.com/athena/latest/ug/what-is.html)
- [Redshift](https://docs.aws.amazon.com/redshift/)
- [Amazon OpenSearch Service](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html)
- [Amazon EMR](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html)
- [Amazon QuickSight](https://docs.amazonaws.cn/en_us/quicksight/latest/APIReference/Welcome.html)
- [AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html)
- [Amazon MSK](https://docs.aws.amazon.com/msk/)
## >> References <<

**Cloud Practitioner:** 
- [Databases]({{< ref "12-databases" >}})
- [S3 - Cloud Practitioner]({{< ref "11-s3" >}})

**Solutions Architect:**
- [RDS, Aurora, Elasticache]({{< ref "12-rds-aurora-elasicache-saac03" >}})
- [S3 - Solutions Architect]({{< ref "11-s3-saac03" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}