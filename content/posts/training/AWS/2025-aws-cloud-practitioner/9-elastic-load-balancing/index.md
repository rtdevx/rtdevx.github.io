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
**Elastic Load Balancing** automatically **distributes your incoming traffic** across multiple targets (<font color=#C7EB25>EC2 instances, containers, IP addresses</font>) in **one or more Availability Zones**.

<font color=#EB4925>It monitors the health of its registered targets and routes the traffic only to healthy targets.</font>

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
- [High Availability]({{< ref "8-scalability-high-availability/#high-availability" >}}) across Availability Zones

- [ELB]({{< ref "9-elastic-load-balancing" >}}) is a managed Load Balancer
	- AWS is responsible for upgrades, maintenance and High Availability
	- AWS provides only a few configuration items
## 3 kinds of Load Balancers offered by AWS

| Application Load Balancer                                                               | Network Load Balancer                                                       | Gateway Load Balancer                                                               |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| HTTP / HTTPS / gRPC protocols ([layer 7]({{< ref "osi-model/#7-application-layer" >}})) | TCP / UDP protocols ([layer 4]({{< ref "osi-model/#4-transport-layer" >}})) | Geneve Protocol on IP Packets ([layer 3]({{< ref "osi-model/#3-network-layer" >}})) |
| HTTP Routing features                                                                   | High Performance (millions or requests per second)                          | Route Traffic to Firewalls that you manage on EC2 instances                         |
| Static DNS (URL)                                                                        | Static IP through Elastic IP                                                | Intrusion Detection                                                                 |

![](./assets/AWS_ALB_NLB_GLB.png)

### 1. Application Load Balancer 

- HTTP / HTTPS only ([layer 7]({{< ref "osi-model/#7-application-layer" >}}))

{{< youtube cuJTmBvFCS0 >}}
_AWS ALB (Application Load Balancer) - Step By Step Tutorial_

---
### 2. Network Load Balancer 

- <font color=red>ultra high performance</font>, allows for TCP ([layer 4]({{< ref "osi-model/#4-transport-layer" >}}))

{{< youtube _d8xGNKAqeo >}}
_Mastering AWS Network Load Balancer | ALB vs NLB | Step by Step Tutorial_

---

### 3. Gateway Load Balancer

- Supports GENEVE protocol. Built for extra security ([layer 3]({{< ref "osi-model/#3-network-layer" >}}))


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

{{< toc_cf-c02 >}}
## >> Disclaimer <<

{{< disclaimer_practitioner25 >}}
