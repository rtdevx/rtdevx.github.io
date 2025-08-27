---
title: Elastic Load Balancing
date: 2025-08-09
description: Elastic Load Balancing
summary: Elastic Load Balancing automatically distributes your incoming traffic across multiple targets...
draft: false
tags:
  - CLF-C02
categories: AWS
---
**Elastic Load Balancing** automatically **distributes your incoming traffic** across multiple targets (<font color=#10b981>EC2 instances, containers, IP addresses</font>) in **one or more Availability Zones**.

<font color=#f43f5e>It monitors the health of its registered targets and routes the traffic only to healthy targets.</font>

---

{{< youtube qpHLRc4Qt1E >}}
_AWS Elastic Load Balancing Introduction_

---
## Benefits of using Load Balancer

- Spread load across multiple downstream instances
- Expose a single point of access (DNS) to the application
- Seamlessly handle failures of downstream instances
- Do regular health checks to the instances
- SSL termination
- High Availability across Availability Zones

- ELB is a managed Load Balancer
	- AWS is responsible for upgrades, maintenance and High Availability
	- AWS provides only a few configuration items
## 3 kinds of Load Balancers offered by AWS

| Application Load Balancer               | Network Load Balancer                              | Gateway Load Balancer                                       |
| --------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------- |
| HTTP / HTTPS / gRPC protocols (Layer 7) | TCP / UDP protocols (Layer 4)                      | Geneve Protocol on IP Packets (Layer 3)                     |
| HTTP Routing features                   | High Performance (millions or requests per second) | Route Traffic to Firewalls that you manage on EC2 instances |
| Static DNS (URL)                        | Static IP through Elastic IP                       | Intrusion Detection                                         |

![](./assets/AWS_ALB_NLB_GLB.png)

### 1. Application Load Balancer 

- HTTP / HTTPS only (Layer 7)

{{< youtube cuJTmBvFCS0 >}}
_AWS ALB (Application Load Balancer) - Step By Step Tutorial_

---
### 2. Network Load Balancer 

- <font color=red>ultra high performance</font>, allows for TCP (Layer 4)

{{< youtube _d8xGNKAqeo >}}
_Mastering AWS Network Load Balancer | ALB vs NLB | Step by Step Tutorial_

---

### 3. Gateway Load Balancer

- Supports GENEVE protocol. Built for extra security (Layer 3)


---
## >> Sources <<

- https://aws.amazon.com/elasticloadbalancing/
- https://aws.amazon.com/compare/the-difference-between-the-difference-between-application-network-and-gateway-load-balancing/
- https://medium.com/@xiaotiancheng.orange/comparison-between-alb-nlb-and-glb-4444f3291173
- https://tutorialsdojo.com/application-load-balancer-vs-network-load-balancer-vs-gateway-load-balancer/

{{< icon "youtube" >}} _Stephane Maarek's AWS playlists on YouTube:_ https://www.youtube.com/@StephaneMaarek/playlists
{{< icon "youtube" >}} _Full YouTube Rahul's AWS Course:_ https://www.youtube.com/playlist?list=PL7iMyoQPMtAN4xl6oWzafqJebfay7K8KP
## >> References <<

- [Scalability & High Availability]({{< ref "8-scalability-high-availability" >}})
- [Auto Scaling Groups]({{< ref "10-auto-scaling-groups" >}})
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

{{< alert >}}
_Disclaimer: Content for educational purposes only, no rights reserved._

Most of the content in this series is coming from **Stephane Maarek's** [Ultimate AWS Certified Cloud Practitioner CLF-C02 2025](https://www.udemy.com/course/aws-certified-cloud-practitioner-new/) course on Udemy.

I highly encourage you to take the [Stephane's courses](https://www.udemy.com/user/stephane-maarek/) as they are awesome and really help understanding the subject.

_More about Stephane Maarek:_

- https://www.linkedin.com/in/stephanemaarek
- https://x.com/stephanemaarek

**This article is just a summary and has been published to help me learning and passing the practitioner exam.**
{{< /alert >}}
