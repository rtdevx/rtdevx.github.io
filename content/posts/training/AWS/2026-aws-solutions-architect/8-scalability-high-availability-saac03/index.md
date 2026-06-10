---
title: "Solutions Architect: Scalability & High Availability"
date: 2026-04-04
description: Associate-level extension of the `Scalability & High Availability` Section from AWS Cloud Practitioner Series.
summary: Associate-level extension of the `Scalability & High Availability` Section from AWS Cloud Practitioner Series.
draft: false
tags:
  - SAA-C03
categories:
  - AWS
series: AWS Solution Architect
---
---
ℹ️ `Scalability & High Availability` is already covered at a high level in the [Scalability & High Availability]({{< ref "8-scalability-high-availability" >}}) section of the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series. 

This section focuses only on the **Associate‑level additions**.

{{< alert "list" >}}

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |
{{< /alert >}}

---
## Scalability & High Availability

[Scalability]({{< ref "8-scalability-high-availability/#scalability" >}}) means an application or system can handle increased load by adapting.
    
- [Two kinds]({{< ref "8-scalability-high-availability/#two-kinds-of-scalability" >}}) of scalability:
    - **Vertical scalability**        
    - **Horizontal scalability (elasticity)**        
- [Scalability]({{< ref "8-scalability-high-availability/#scalability" >}}) is related to, but distinct from, [High Availability][Scalability]({{< ref "8-scalability-high-availability/#high-availability" >}})

📡 _Source:_ [High availability and scalability on AWS](https://docs.aws.amazon.com/whitepapers/latest/real-time-communication-on-aws/high-availability-and-scalability-on-aws.html)

---

{{< lead >}}

**Scalability** » <font color=#C7EB25>handling increasing load</font>.
**High Availability** » <font color=#C7EB25>staying operational</font> when parts of the system fail.

{{< /lead >}}

---
## Elastic Load Balancing

ℹ️ For more information about **Load Balancing**, refer to [Elastic Load Balancing]({{< ref "9-elastic-load-balancing" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series.
## Auto Scaling Groups

ℹ️ For more information about **Auto Scaling Groups**, refer to [Auto Scaling Groups]({{< ref "10-auto-scaling-groups" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series.

---
## >> Sources <<

[High availability and scalability on AWS](https://docs.aws.amazon.com/whitepapers/latest/real-time-communication-on-aws/high-availability-and-scalability-on-aws.html)
## >> References <<

- **Cloud Practitioner:** [Scalability & High Availability]({{< ref "8-scalability-high-availability" >}})
- **Cloud Practitioner:** [Elastic Load Balancing]({{< ref "9-elastic-load-balancing" >}})
- **Cloud Practitioner:** [Auto Scaling Groups]({{< ref "10-auto-scaling-groups" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}
### Solutions Architect Resources

- [Ultimate AWS Certified Solutions Architect Associate 2026](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
- [AWS Certified Solutions Architect Associate Code & Slides](https://courses.datacumulus.com/downloads/certified-solutions-architect-pn9/)
	- [AWS Certified Solutions Architect Associate | Slides](https://media.datacumulus.com/aws-saa/AWS%20Certified%20Solutions%20Architect%20Slides%20v47.pdf)
	- [AWS Certified Solutions Architect Associate | Code](https://links.datacumulus.com/sa-associate-code-pn9)
- [Practice Exams | AWS Certified Solutions Architect Associate](https://www.udemy.com/course/practice-exams-aws-certified-solutions-architect-associate)

_Source:_ https://courses.datacumulus.com/downloads/certified-solutions-architect-pn9/

{{< alert "list" >}}

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |
{{< /alert >}}