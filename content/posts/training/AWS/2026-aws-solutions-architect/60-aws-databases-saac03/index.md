---
title: "Solutions Architect: Databases in AWS"
date: 2026-04-11
description: Associate-level extension of the `Databases` Section from AWS Cloud Practitioner Series.
summary: Associate-level extension of the `Databases` Section from AWS Cloud Practitioner Series.
draft: true
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



---
## >> Sources <<


## >> References <<

**Cloud Practitioner:** 
- [Databases]({{< ref "12-databases" >}})

**Solutions Architect:**
- [RDS, Aurora, Elasticache]({{< ref "12-rds-aurora-elasicache-saac03" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}