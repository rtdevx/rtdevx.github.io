---
title: "Solutions Architect: Disaster Recovery & Migrations"
date: 2026-04-17
description: Associate-level extension of the `Disaster Recovery Strategies` Section from AWS Cloud Practitioner Series.
summary: Associate-level extension of the `Disaster Recovery Strategies` Section from AWS Cloud Practitioner Series.
draft: true
tags:
  - SAA-C03
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
    - **RPO (Recovery Point Objective)** — how much data you can afford to lose        
    - **RTO (Recovery Time Objective)** — how quickly systems must be restored

![](./assets/AWS_DR_RPO_RTO.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")




---
## >> Sources <<

[AWS Elastic Disaster Recovery Documentation](https://docs.aws.amazon.com/drs/)
## >> References <<

**Cloud Practitioner:** [Disaster Recovery Strategies]({{< ref "23-other-services/#disaster-recovery-strategies" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}