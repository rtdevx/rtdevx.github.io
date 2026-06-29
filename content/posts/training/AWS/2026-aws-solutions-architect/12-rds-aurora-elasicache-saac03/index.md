---
title: "Solutions Architect: RDS, Aurora, Elasticache"
date: 2026-04-05
description: Associate-level extension of the `Databases` Section from AWS Cloud Practitioner Series.
summary: Associate-level extension of the `Databases` Section from AWS Cloud Practitioner Series.
draft: false
tags:
  - SAA-C03
  - database
  - DisasterRecovery
  - Backup
  - HighAvailability
  - Cache
  - Serverless
categories:
  - AWS
series: AWS Solution Architect
---
---
ℹ️ **Associate‑level extension** of the [Databases]({{< ref "12-databases" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series. 

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |

## RDS

🏅 **Cloud Practitioner-level:** [Amazon RDS]({{< ref "12-databases/#amazon-rds" >}})

- **RDS** stands for _Relational Database Service_
	- Fully managed service for SQL‑based relational databases
	- Lets you run and maintain cloud‑hosted databases without managing the underlying infrastructure    
- **Supported engines:**    
    - **PostgreSQL**        
    - **MySQL**        
    - **MariaDB**        
    - **Oracle**        
    - **Microsoft SQL Server**        
    - **IBM DB2**        
    - **Aurora** (AWS‑built, cloud‑optimised engine)
### RDS - Storage Autoscaling

- <font color=#C7EB25>Automatically increases storage on your RDS instance when you start running low</font>
- Removes the need for manual storage adjustments    
- <font color=#EB4925>You define a Maximum Storage Threshold</font> as the upper limit    
- **Storage is auto‑expanded when:**
    - Free space drops below **10%**        
    - Low‑storage condition lasts **5 minutes**        
    - At least **6 hours** have passed since the last increase        
- Ideal for <font color=#EBAC25>workloads with unpredictable or spiky storage growth</font>
- Supported across **all RDS engines**
### RDS Read Replicas

- Supports **up to 15 Read Replicas**    
- Replicas can be created **within the same AZ**, **across AZs**, or **across Regions**    
- Replication is **ASYNC**, so read replicas are **eventually consistent**    
- A read replica can be **promoted to a standalone primary database** (i.e., becomes its own **read/write** DB instance)    
- Applications must update their **connection strings** to make use of read replicas

![](./assets/AWS_RDS_Replicas.jpg "© Amazon AWS, [Amazon RDS read replicas](https://aws.amazon.com/rds/features/read-replicas/)")

{{< alert "circle-info" >}}

**RDS Read Replicas** let you <font color=#EBAC25>offload reporting or analytics to a separate read‑only copy of your database so production stays unaffected</font>, since replicas handle <font color=#EBAC25>SELECT‑only queries</font> and <font color=#EB4925>keep heavy workloads away from the primary</font>.

{{< /alert >}}

ℹ️ In AWS you normally pay for data transferred between AZs, but <b><font color=#EB4925>RDS Read Replicas within the same region avoid that cross‑AZ data transfer cost</font></b>.

![](./assets/AWS_RDS_Replication_Cost.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
#### RDS Read Replica promotion

{{< alert "lightbulb" >}}

🙋🏻 _Question:_ Can RDS Read Replica become the primary and will RDS Proxy detect it automatically??

<font color=#EBAC25>RDS Read Replica can be promoted to a standalone primary</font> but it becomes and independent RDS instance with it's own endpoint. <font color=#EB4925>It is not automatically wired into any failover mechanism</font> - RDS Proxy must be reconfigured to point to the new primary.

- ✔ Can become a standalone primary    
- ✖ Does not auto‑update RDS Proxy    
- ✖ Does not auto‑update application endpoints    
- ✔ Requires manual reconfiguration

{{< /alert >}}
### RDS Multi AZ (Disaster Recovery)

**RDS Multi‑AZ** provides **synchronous replication** to a standby in another AZ, uses a **single DNS endpoint** for automatic failover, boosts availability during AZ, network, instance, or storage failures, requires **no application changes**, and is designed for **high availability rather than scaling**; additionally, **Read Replicas themselves can be configured as Multi‑AZ** for disaster‑recovery purposes.

<font color=#C7EB25>You can switch an RDS instance from <b>Single‑AZ to Multi‑AZ with zero downtime</b> by modifying the database configuration, no restart required</font>.

<font color=#EBAC25><i>More info:</i></font> [Amazon RDS multi-AZ](https://aws.amazon.com/rds/features/multi-az/)
### RDS Backups

- **Automated backups:**
	- Daily full backup of the database (during the backup window)
	- Transaction logs are backed-up by RDS every 5 minutes
	- Ability to restore to any point in time (from oldest backup to 5 minutes ago)
	- 1 to 35 days of retention, set 0 to disable automated backups
- **Manual DB Snapshots:**
	- Manually triggered by the user
	- Retention of backup set by the user

ℹ️ <font color=#EBAC25>Restoring a RDS / Aurora backup or a snapshot creates a new database.</font>

- **Restoring MySQL RDS database from S3**
	- Create a backup of your on-premises database
	- Store it on Amazon S3 (object storage)
	- Restore the backup file onto a new RDS instance running MySQL

<font color=#EBAC25><i>More info:</i></font> [RDS Backups](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html)
## Aurora

🏅 **Cloud Practitioner-level:** [Amazon Aurora]({{< ref "12-databases/#amazon-aurora" >}})

{{< lead >}}

**Aurora** is AWS’s **high‑performance**, **cloud‑optimised database engine** that’s **compatible with MySQL and PostgreSQL**, delivers significantly higher throughput than RDS, auto‑scales storage up to 256 TB, supports up to 15 low‑lag replicas, provides near‑instant failover with built‑in high availability, and costs roughly 20% more than standard RDS in exchange for much greater efficiency.

{{< /lead >}}
### High Availability and Read Scaling

![](./assets/AWS_DB_Aurora_Read_Scaling.png "© Amazon AWS, [High availability for Amazon Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html)")

**Aurora** keeps **six copies of your data across three AZs**, needing **4 copies for writes** and **3 for reads**, uses **self‑healing, peer‑to‑peer replication**, and stripes storage across hundreds of volumes. A single Aurora writer handles writes, failover to a new writer happens in **under 30 seconds**, up to **15 read replicas** can serve reads, and **cross‑region replication** is supported.

<font color=#EBAC25><i>More info:</i></font> [High availability for Amazon Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html)
### Aurora DB Cluster

![](./assets/AWS_DB_Aurora_Cluster.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### Features of Aurora

- Automatic fail-over
- Backup and Recovery
- Isolation and security
- Industry compliance
- Push-button scaling
- Automated Patching with Zero Downtime
- Advanced Monitoring
- Routine Maintenance
- Backtrack: restore data at any point of time without using backups

<font color=#EBAC25><i>More info:</i></font> [Amazon Aurora features](https://aws.amazon.com/rds/aurora/features/)
### Aurora Replicas - Auto Scaling

![](./assets/AWS_DB_Aurora_Autoscaling.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### Aurora - Custom Endpoints

- Define a subset of Aurora Instances as a Custom Endpoint
- <font color=#EBAC25>Example:</font> Run analytical queries on specific replicas
- The Reader Endpoint is generally not used after defining Custom Endpoints

![](./assets/AWS_DB_Aurora_Custom_Endpoints.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### Aurora Serverless

- Automated database instantiation and <font color=#EBAC25>auto scaling based on actual usage</font>
- <font color=#EBAC25>Good for infrequent, intermittent or unpredictable workloads</font>
- <font color=#EBAC25>No capacity planning</font> needed
- Pay per second, can be more cost-effective

<font color=#EBAC25><i>More info:</i></font> [Using Aurora serverless](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html)
### Global Aurora

{{< lead >}}

By using the **Amazon Aurora Global Database feature**, you can <font color=#C7EB25>run your globally distributed applications using a single Aurora database that spans multiple AWS Regions</font>.

{{< /lead >}}

An Aurora global database consists of one _primary_ AWS Region where your data is written, and up to 10 read-only _secondary_ AWS Regions.

- Promoting another region (for disaster recovery) has an RTO of < 1 minute
- **Typical cross-region replication takes less than 1 second**

<font color=#EBAC25><i>More info:</i></font> [Using Amazon Aurora Global Database](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html)
### Aurora Machine Learning

**Aurora Machine Learning** lets you embed ML‑powered predictions directly into SQL queries, providing a simple and secure integration with AWS ML services like **SageMaker** (any model) and **Comprehend** (sentiment analysis), enabling use cases such as:

- fraud detection
- targeted ads
- sentiment analysis
- product recommendations 
### Aurora Backups

- **Automated backups**
	- 1 to 35 days (cannot be disabled)
	- point-in-time recovery in that timeframe
- **Manual DB Snapshots**
	- Manually triggered by the user
	- Retention of backup for set by the user

ℹ️ <font color=#EBAC25>Restoring a RDS / Aurora backup or a snapshot creates a new database.</font>

- **Restoring MySQL Aurora cluster from S3**
	- Create a backup of your on-premises database using Percona XtraBackup
	- Store the backup file on Amazon S3
	- Restore the backup file onto a new Aurora cluster running MySQL

<font color=#EBAC25><i>More info:</i></font> [Overview of backing up and restoring an Aurora DB cluster](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Backups.html)
### Aurora Database Cloning

- Create a new Aurora DB Cluster from an existing one
- Faster than snapshot & restore
- Very fast & cost-effective

<font color=#EBAC25>Useful to create a “staging” database from a “production” database</font> without impacting the production database.

![](./assets/AWS_DB_Aurora_Cloning.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
## RDS & Aurora Security

- **At-rest encryption:**
	- Database master & replicas encryption using [AWS KMS]({{< ref "tags/kms" >}}) - <font color=#EB4925>must be defined at launch time</font>
	- If the master is not encrypted, the read replicas cannot be encrypted
	- To encrypt an un-encrypted database, go through a DB snapshot & restore as encrypted
- **In-flight encryption:** TLS-ready by default, use the AWS TLS root certificates client-side
- **IAM Authentication:** IAM roles to connect to your database (instead of username/pw)
- **Security Groups:** Control Network access to your RDS / Aurora DB
- **No SSH** available except on RDS Custom
- **Audit Logs can be enabled** and sent to CloudWatch Logs for longer retention
## Amazon RDS Proxy

- Fully managed database proxy for RDS    
- Pools and shares DB connections to reduce load on database resources    
- Improves efficiency by lowering CPU/RAM pressure and avoiding excessive open connections    
- Serverless, autoscaling, and Multi‑AZ for high availability    
- Cuts RDS/Aurora failover time by up to **66%**    
- Supports RDS (MySQL, PostgreSQL, MariaDB, SQL Server) and Aurora (MySQL, PostgreSQL)    
- Works with most applications without code changes    
- Enforces IAM authentication and stores credentials in Secrets Manager    
- Never publicly accessible - must be accessed from within a VPC

![](./assets/AWS_DB_RDS_Proxy.png "© Amazon AWS, [Amazon RDS Proxy](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html)")

{{< alert "circle-info" >}}

RDS Proxy it works for **both Aurora and RDS** - but the _failover behaviour_ and _endpoint logic_ differ because the underlying database architectures are completely different.

{{< /alert >}}
### How RDS Proxy behaves with Aurora

Aurora has:

- a **cluster endpoint** (always points to the writer)    
- **reader endpoint** (load balances readers)    
- **automatic failover**    
- **automatic replica promotion**    

RDS Proxy integrates tightly with this:

- When Aurora promotes a reader → **cluster endpoint updates**    
- RDS Proxy automatically follows the new writer    
- No manual changes needed    

**Result:**

> Aurora + RDS Proxy = fully automatic failover.
### How RDS Proxy behaves with RDS

RDS (non‑Aurora) has:

- **Multi‑AZ failover only**    
- **No automatic promotion of read replicas**    
- **Each instance has its own endpoint**    

RDS Proxy integrates only with **Multi‑AZ failover**, not with read replicas.

- If the RDS primary fails → Multi‑AZ standby becomes primary → **same writer endpoint** → RDS Proxy follows automatically    
- If you **promote a read replica** → it becomes a **separate, standalone DB** → **new endpoint** → RDS Proxy does _not_ follow it    

**Result:**

> RDS + RDS Proxy = <font color=#EBAC25>automatic failover only for Multi‑AZ, not for read replica promotion</font>.

<font color=#EBAC25><i>More info:</i></font> [Amazon RDS Proxy](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html)
## ElastiCache

🏅 **Cloud Practitioner-level:** [ElastiCache]({{< ref "12-databases/#amazon-elasticache" >}})

<font color=#EBAC25><i>More info:</i></font>
- [Amazon ElastiCache](https://aws.amazon.com/elasticache/)
- [Amazon ElastiCache Documentation](https://docs.aws.amazon.com/elasticache/)

{{< lead >}}

**Serverless**, **fully managed caching service** delivering microsecond latency with **Valkey-**, **Memcached-**, and **Redis**.

<font color=#EBAC25><i>More info:</i></font> [Amazon ElastiCache](https://aws.amazon.com/elasticache/)

{{< /lead >}}

- The same way RDS is to get managed Relational Databases…
- ElastiCache is to get managed <font color=#EBAC25>Redis</font> or <font color=#EBAC25>Memcached</font>
- <font color=#EBAC25>Caches are in-memory databases with really high performance, low latency</font>
- <font color=#EBAC25>Helps reduce load off of databases for read intensive workloads
- Helps make your application stateless</font>
- AWS takes care of OS maintenance / patching, optimizations, setup, configuration, monitoring, failure recovery and backups
- <font color=#EB4925>Using ElastiCache involves heavy application code changes.</font>
### DB Cache

- Applications queries ElastiCache, if not available, get from RDS and store in ElastiCache
- Helps relieve load in RDS
- Cache must have an invalidation strategy to make sure only the most current data is used in there.
### User Session Store

- User logs into any of the application
- The application writes the session data into ElastiCache
- The user hits another instance of our application
- The instance retrieves the data and the user is already logged in

![](./assets/AWS_DB_Elasticache_User_Session_Store.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### Redis vs Memcached

| REDIS                                                           | MEMCACHED                                      |
| --------------------------------------------------------------- | ---------------------------------------------- |
| **Multi AZ** with Auto-Failover                                 | Multi-node for partitioning of data (sharding) |
| **Read Replicas** to scale reads and have **high availability** | **No high availability** (replication)         |
| Data Durability using AOF persistence                           | **Non persistent**                             |
| **Backup and restore features**                                 | **Backup and restore** (Serverless)            |
| Supports Sets and Sorted Sets                                   | Multi-threaded architecture                    |

### Patterns

- **Lazy Loading:** all the read data is cached, data can become stale in cache
- **Write Through:** Adds or update data in the cache when written to a DB (no stale data)
- **Session Store:** store temporary session data in a cache (using TTL features)

![](./assets/AWS_DB_Elasticache_Patterns.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

> <font color=#EBAC25>There are only two hard things in Computer Science:</font> cache invalidation and naming things.

---
## >> Sources <<

- [Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)
	- [Amazon RDS multi-AZ](https://aws.amazon.com/rds/features/multi-az/)
	- [RDS Backups](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html)
- [Amazon Aurora](https://aws.amazon.com/rds/aurora/)
	- [Amazon Aurora features](https://aws.amazon.com/rds/aurora/features/)
	- [High availability for Amazon Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html)
	- [Using Aurora serverless](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html)
	- [Using Amazon Aurora Global Database](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html)
	- [Overview of backing up and restoring an Aurora DB cluster](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Backups.html)
- [Amazon RDS Proxy](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html)
- [Amazon ElastiCache](https://aws.amazon.com/elasticache/)
	- [Amazon ElastiCache Documentation](https://docs.aws.amazon.com/elasticache/)
## >> References <<

- **Cloud Practitioner:** [Databases]({{< ref "12-databases" >}})
	- **Cloud Practitioner:** [RDS and Aurora]({{< ref "12-databases/#rds-and-aurora" >}})
	- **Cloud Practitioner:** [Elasticache]({{< ref "12-databases/#amazon-elasticache" >}})

- **Solutions Architect:** [Databases in AWS]({{< ref "60-aws-databases-saac03" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}