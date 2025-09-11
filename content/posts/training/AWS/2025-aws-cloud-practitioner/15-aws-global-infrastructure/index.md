---
title: AWS Global Infrastructure
date: 2025-08-15
description: AWS Global Infrastructure
summary: A Global Application is an application deployed in multiple geographies. On AWS this could be Regions and / or Edge Locations....
draft: false
tags:
  - CLF-C02
categories: AWS
---
A Global Application is an application deployed in multiple geographies.
On AWS this could be Regions and / or Edge Locations.

- Decreased Latency
- [Disaster Recovery]({{< ref "23-other-services/#disaster-recovery-strategies" >}}) 
- (DOS / [DDoS]({{< ref "19-security-and-compliance/#ddos-protection-on-aws" >}})) Attack protection (distributed global infrastructure is harder to attack)

_More:_ https://aws.amazon.com/about-aws/global-infrastructure/

- [Route53]({{< ref "15-aws-global-infrastructure/#route53" >}})
- [CloudFront]({{< ref "15-aws-global-infrastructure/#amazon-cloudfront" >}}) (Global CDN)
- [S3 Transfer Acceleration]({{< ref "15-aws-global-infrastructure/#s3-transfer-acceleration" >}})
- [AWS Global Accelerator]({{< ref "15-aws-global-infrastructure/#aws-global-accelerator" >}})

---

{{< youtube 0hlZvybbaGk >}}
_AWS Global Infrastructure Overview - Regions, Availability Zones, Edge Locations and more_

---
## Route53

**Route53** is managed **DNS**.

![](./assets/AWS_Route53_1.png)
_[How Route 53 routes traffic for your domain](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/welcome-dns-service.html#welcome-dns-service-how-route-53-routes-traffic)_
### Route53 Routing Policies

- <font color=#10b981>Simple</font> Routing Policy - <font color=#f43f5e>No health checks,</font> just DNS check
- <font color=#10b981>Weighted</font> Routing Policy - <font color=#f43f5e>Specify what amount of traffic goes where</font> (i.e. 70% = Server1, 20% = Server2, 10% = Server3. Simple form of Load Balancing)
- <font color=#10b981>Latency</font> Routing Policy - <font color=#f43f5e>Based on latency</font> - minimizing the latency between user and the server sending the traffic that is geographically (latency-based) closer to the user
- <font color=#10b981>Failover</font> Routing Policy - <font color=#f43f5e>Disaster Recovery</font> ([DR]({{< ref "23-other-services/#disaster-recovery-strategies" >}})) - based on Health Checks
- <font color=#10b981>Geolocation</font> Routing Policy - <font color=#f43f5e>Routing based specifically on Geolocation</font>
- <font color=#10b981>IP-based</font> Routing Policy - <font color=#f43f5e>Route the traffic based on the IP address originates from</font>

_More on Routing Policies:_ https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html

---

{{< youtube tXgOSt80Mtg >}}
_AWS Route 53 Course_

---
#### Registering a domain

```CLI
# Register a Domain
Route 53 > Registered Domains > Register Domain > CHOOSEADOMAIN.COM

# Hosted zones
Route 53 > Hosted zones > select "CHOOSEADOMAIN.COM" > Update the DNS records with the right EC2 instances, select an adequate Routing Policy
```

_More about Registering and managing domains:_ https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/registrar.html

_More about Route 53:_ https://docs.aws.amazon.com/route53/
## Amazon CloudFront

- <font color=#10b981>Content Delivery Network</font> (CDN)
- Improves read performance, content cached at the edge
- Improves users experience
- Many Points of Presence globally (Edge Locations, Edge Caches)
- [DDoS]({{< ref "19-security-and-compliance/#ddos-protection-on-aws" >}}) protection (because it's distributed globally)
- <font color=#10b981>Integrated with Shield and AWS WAF</font> (Web Application Firewall)
### CloudFront - Origins

- S3 Bucket
	- For distributing files and caching them at the edge
	- For uploading files to S3 through CloudFront
	- Secured using Origin Access Control (OAC)
- VPC Origin
	- For applications hosted in [VPC]({{< ref "18-vpc" >}}) private subnets
	- [Application Load Balancer]({{< ref "9-elastic-load-balancing/#1-application-load-balancer" >}}) / [Network Load Balancer]({{< ref "9-elastic-load-balancing/#2-network-load-balancer" >}}) / [EC2]({{< ref "4-ec2" >}}) Instances
- Custom Origin (HTTP)
	- S3 website (must first enable the bucket as a static S3 website)
	- Any public HTTP backend

![](./assets/AWS_CloudFront1.png)
_[How CloudFront delivers content](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/HowCloudFrontWorks.html)_
### CloudFront vs [S3 Cross Region Replication]({{< ref "11-s3/#s3---replication" >}})

#### CloudFront

- Global Edge Network
- Files are cached for a TTL (day?)
- <font color=#f1ef63>Use case:</font> static content that must be available everywhere
#### S3 Cross Region Replication

- Must be setup for each region you want your replication to happen
- Files are updated in near real-time
- Read-only
- <font color=#f1ef63>Use case:</font> dynamic content that needs to be available at low-latency in few regions only
## S3 Transfer Acceleration

Increase transfer speed by transferring files to an AWS edge location which will forward the data to the S3 bucket in the target region.
## AWS Global Accelerator

**AWS Global Accelerator** is used to improve global application availability and performance using the AWS global network.

Leverage the AWS internal network to optimize the route to your application (60% improvement).

![](./assets/AWS_Global_Accelerator.png)

_More about AWS Global Accelerator:_ 
- https://aws.amazon.com/global-accelerator/
- https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html
- https://speedtest.globalaccelerator.aws
## AWS Global Accelerator vs CloudFront

- They both use AWS global network and it's edge locations
- Both services integrate with AWS Shield for [DDoS]({{< ref "19-security-and-compliance/#ddos-protection-on-aws" >}}) protection
- **CloudFront** - Content Delivery Network
	- Improves performance for cacheable content (images, videos, etc.)
	- Content is served at the edge
- **Global Accelerator**
	- No caching, proxying packets at the edge to applications running in one or more AWS regions
	- Improves performance for a wide range of applications running in one or more AWS regions
	- Improves performance for a wide range of applications over TCP or UDP
	- Good for HTTP use cases that require static IP addresses
	- Good for HTTP use cases that require deterministic, fast, regional failover
## AWS Outposts

##### <font color=#f1ef63>AWS Outposts</font> = Hybrid Cloud appliances.

Outposts are "server racks" that offer the same AWS infrastructure, services, API's & tools to build your own applications on-premises just as in the cloud.
##### <font color=#10b981>AWS will setup and manage Outposts racks within your on-premises infrastructure.</font>

**Benefits**

- Low latency access to on-premises system
- Local data processing
- Data residency
- Easier migration from on-premises to the cloud
- Fully managed service
- Some example services that work on Outposts:
	- [EC2]({{< ref "4-ec2" >}})
	- [EBS]({{< ref "6-storage/#ebs-volume" >}})
	- [S3]({{< ref "11-s3" >}})
	- [EKS]({{< ref "13-other-compute-services/#amazon-eks" >}})
	- [ECS]({{< ref "13-other-compute-services/#ecs-elastic-container-service" >}})
	- [RDS]({{< ref "12-databases/#rds-and-aurora" >}})
	- [EMR]({{< ref "12-databases/#amazon-emr" >}})
## Wavelength

Wavelength Zones are infrastructure deployments embedded within the telecommunication providers datacenters <font color=#10b981>at the edge of the 5G networks</font>.

- Ultra low latency applications through 5G networks
- Traffic doesn't leave the **Communication Service Provider's (CSP)** network
- High bandwidth and secure connection to the parent AWS Region
- No additional charges or service agreements
- <font color=#f1ef63>Use cases:</font>
	- Smart Cities
	- ML-assisted (Machine Learning) diagnostics
	- Connected Vehicles
	- Interactive Live Video Streams
	- AR / VR
	- Real-time gaming
## AWS Local Zones

**AWS Local Zones** allow placing compute, storage, database and other selected AWS services closer to the users to run latency-sensitive applications.

It is an "<font color=#f1ef63>Extension of AWS Region</font>".
##### <font color=#f1ef63>Example:</font>

- AWS Region: N. Virginia (us-east-1)
	- AWS Local Zones: Boston, Chicago, Dallas, Houston, Miami, ...

![](./assets/AWS_Local_Zones.png)
_[How AWS Local Zones work](https://docs.aws.amazon.com/local-zones/latest/ug/what-is-aws-local-zones.html)_

##### <font color=#f1ef63>Compatible with:</font>

- [EC2]({{< ref "4-ec2" >}})
- [RDS]({{< ref "12-databases/#rds-and-aurora" >}})
- [ECS]({{< ref "13-other-compute-services/#ecs-elastic-container-service" >}})
- [EBS]({{< ref "6-storage/#ebs-volume" >}})
- [ElastiCache]({{< ref "12-databases/#amazon-elasticache" >}})
- [Direct Connect]({{< ref "18-vpc/#site-to-site-vpn--direct-connect" >}})
- More...

_More about AWS Local Zones:_ https://docs.aws.amazon.com/local-zones/latest/ug/what-is-aws-local-zones.html

## Summary

<font color=#f1ef63>Route 53 - Global DNS</font>

- Great to route users to the closest deployment with least latency
- Great for Disaster Recovery - DR - Strategies

<font color=#f1ef63>CloudFront - Global CDN - Content Delivery Network</font>

- Replicate part of your application to AWS Edge Locations - decreased latency
- Cache common requests - improved user experience and decreased latency

<font color=#f1ef63>S3 Transfer Acceleration</font>

- Accelerate global uploads & downloads into Amazon S3 

<font color=#f1ef63>AWS Global Accelerator</font>

- Improve global application availability and performance using the AWS global network

<font color=#f1ef63>AWS Outposts</font>

- Deploy Outposts racks in an on-premises datacenter to extend some AWS services and for easier migration

<font color=#f1ef63>AWS Wavelength</font>

- Brings AWS services to the edge of the 5G networks
- Ultra-low latency applications

<font color=#f1ef63>AWS Local Zones</font>

- Bring AWS resources (compute, database, storage, ...) closer to your users
- Good for latency-sensitive applications

---
## >> Sources <<

Global Infrastructure: https://aws.amazon.com/about-aws/global-infrastructure/
### Route 53
Route 53: https://docs.aws.amazon.com/route53/
Route 53 Routing Policies: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html
Registering and managing domains: https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/registrar.html
### CloudFront
CloudFront: https://docs.aws.amazon.com/cloudfront/
### AWS Global Accelerator
https://aws.amazon.com/global-accelerator/
https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html
https://speedtest.globalaccelerator.aws
### AWS Local Zones
https://docs.aws.amazon.com/local-zones/latest/ug/what-is-aws-local-zones.html
## >> References <<

- [S3]({{< ref "11-s3" >}})
- [Security and Compliance]({{< ref "19-security-and-compliance" >}})
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
