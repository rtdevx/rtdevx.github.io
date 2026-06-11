---
title: "Solutions Architect: route 53"
date: 2026-04-06
description: Associate-level extension of the `Route53` Section from AWS Cloud Practitioner Series.
summary: Associate-level extension of the `Route53` Section from AWS Cloud Practitioner Series.
draft: false
tags:
  - SAA-C03
categories:
  - AWS
series: AWS Solution Architect
---
---
ℹ️ **Associate‑level extension** of the [Route53]({{< ref "15-aws-global-infrastructure/#route53" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series. In this post, I expand on key **Route53** concepts and introduce deeper topics relevant to the **Associate‑level understanding**.

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |

## DNS Terminology

- **Domain Registrar:** Amazon Route 53, GoDaddy, … 
- **DNS Records:** A, AAAA, CNAME, NS, … 
- **Zone File:** contains DNS records
- **Name Server:** resolves DNS queries (Authoritative or Non-Authoritative)
- **Top Level Domain (TLD):** .com, .us, .in, .gov, .org, …
- **Second Level Domain (SLD):** amazon.com, google.com, … (sometimes referred to as a **Zone Apex** or **Root Domain**)

![](./assets/AWS_Route53_URL.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### How DNS Works

![](./assets/AWS_Route53_How_DNS_Works.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
## Amazon Route 53

🏅 **Cloud Practitioner-level:** [Route 53]({{< ref "15-aws-global-infrastructure/#route53" >}})


**Route 53** is a fully managed, scalable, **authoritative**[^Ref1] DNS service that also acts as a domain registrar and can perform health checks on your resources.


[^Ref1]: **Authoritative** means the DNS server is the _official source of truth_ for a domain - it holds and serves the real DNS records, and you (as the domain owner) are allowed to create, change, or delete those records directly.
## Route 53 - Records

- **Each record contains:**
	- Domain/subdomain Name - e.g., example.com
	- Record Type - e.g., A or AAAA
	- Value - e.g., 12.34.56.78
	- Routing Policy - how Route 53 responds to queries
	- TTL - amount of time the record cached at DNS Resolvers
- **Route 53 supports the following DNS record types:**
	- (must know) A / AAAA / CNAME / NS
	- (advanced) CAA / DS / MX / NAPTR / PTR / SOA / TXT / SPF / SRV
### Route 53 - Record Types

- **A** - maps a hostname to an IPv4 address    
- **AAAA** - maps a hostname to an IPv6 address    
- **CNAME** - maps a hostname to another hostname    
	- The CNAME target must ultimately resolve to an **A** or **AAAA** record
	- You cannot create a CNAME at the **zone apex** (e.g., `example.com`), only at subdomains like `www.example.com`    
- **NS** - defines the name servers for the hosted zone
	- NS records determine how DNS traffic for the domain is routed

{{< alert "circle-info" >}}

**CNAME** is a standard DNS record that maps one hostname to another hostname, and it <font color=#EB4925>cannot be used at the zone apex</font>.

**ALIAS** is an Amazon Route 53-specific feature that behaves _like_ a CNAME but <font color=#C7EB25>can be used at the zone apex</font> and <font color=#C7EB25>can point to AWS resources</font> (e.g., ALB, CloudFront, S3 website endpoints) without violating DNS rules.

- **CNAME = standard DNS record**
- **ALIAS = Route 53 extension that solves CNAME limitations**

![](./assets/AWS_Route53_Alias_Records_Targets.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

{{< /alert >}}
#### Alias Records

- Maps a hostname to an AWS resource    
- Route 53-specific extension to standard DNS    
- Automatically tracks changes to the resource’s underlying IPs    
- Can be used at the **zone apex** (e.g., `example.com`), unlike CNAME    
- Always implemented as an **A/AAAA** record for AWS targets    
- <font color=#EB4925>TTL cannot be customised</font> (Route 53 manages it automatically)
### Route 53 - Records TTL

| High TTL – e.g., 24 hr    | Low TTL – e.g., 60 sec.            |
| ------------------------- | ---------------------------------- |
| Less traffic on Route 53  | More traffic on Route 53 ($$)      |
| Possibly outdated records | Records are outdated for less time |
|                           | Easy to change records             |

<font color=#EB4925>Except for Alias records, TTL is mandatory for each DNS record.</font>
## Route 53 - Hosted Zones

A **hosted zone** is a container for records, and records contain information about how you want to route traffic for a specific domain, such as *example.com*, and its subdomains (*acme.example.com*, *zenith.example.com*). 

A hosted zone and the corresponding domain have the same name. There are two types of hosted zones:

- **Public hosted zones** contain records that specify how you want to route traffic on the internet. For more information, see [Working with public hosted zones](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/AboutHZWorkingWith.html).
    
- **Private hosted zones** contain records that specify how you want to route traffic in an Amazon VPC. For more information, see [Working with private hosted zones](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html).

![](./assets/AWS_Route53_Priv_Pub_Hosted_Zones.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

<font color=#EBAC25><i>More info:</i></font> [Working with hosted zones](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html)
## Route 53 - Routing Policies

- <font color=#C7EB25>Simple</font> Routing Policy - <font color=#EB4925>No health checks,</font> just DNS check
- <font color=#C7EB25>Weighted</font> Routing Policy - <font color=#EB4925>Specify what amount of traffic goes where</font> (i.e. 70% = Server1, 20% = Server2, 10% = Server3. Simple form of Load Balancing)
- <font color=#C7EB25>Latency</font> Routing Policy - <font color=#EB4925>Based on latency</font> - minimizing the latency between user and the server sending the traffic that is geographically (latency-based) closer to the user
- <font color=#C7EB25>Failover</font> Routing Policy - <font color=#EB4925>Disaster Recovery</font> ([DR]({{< ref "23-other-services/#disaster-recovery-strategies" >}})) - based on Health Checks
- <font color=#C7EB25>Geolocation</font> Routing Policy - <font color=#EB4925>Routing based specifically on Geolocation</font>
- <font color=#C7EB25>Geoproximity</font> Routing Policy - <font color=#EB4925>based on the geographic location of your users and your resources</font> - it routes traffic to the closest resource that is available, <font color=#EB4925>can be "biased"</font>
- <font color=#C7EB25>IP-based</font> Routing Policy - <font color=#EB4925>Route the traffic based on the IP address originates from</font>

<font color=#EBAC25><i>More info:</i></font> [Choosing a routing policy](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html)
### Simple Routing

- Typically, **route traffic to a single resource**
- Can specify **multiple values in the same record**
- <font color=#EBAC25>If multiple values are returned, a random one is chosen by the client</font>
- When Alias enabled, specify only one AWS resource
- <font color=#EB4925>Can’t be associated with Health Checks</font>

![](./assets/AWS_Route53_Routing_Simple.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

<font color=#EBAC25><i>More info:</i></font> [Simple Routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-simple.html)
### Weighted Routing

- Control the % of the requests that go to each specific resource
- DNS records must have the same name and type
- <font color=#C7EB25>Can be associated with Health Checks</font>
- <font color=#EBAC25>Use cases:</font> load balancing between regions, testing new application versions…

{{< alert "circle-info" >}}

- Assign a weight of 0 to a record to stop sending traffic to a resource
- If all records have weight of 0, then all records will be returned equally

{{< /alert >}}

<font color=#EBAC25><i>More info:</i></font> [Weighted routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-weighted.html)
### Latency-based Routing

- Redirect to the resource that has the least latency close to us
- Super <font color=#EBAC25>helpful when latency for users is a priority</font>
- Latency is based on traffic between users and AWS Regions
- <font color=#EBAC25>Germany users may be directed to the US</font> (if that’s the lowest latency)
- <font color=#C7EB25>Can be associated with Health Checks</font> (has a failover capability)

<font color=#EBAC25><i>More info:</i></font> [Latency-based routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html)
### Failover Routing

**Failover routing** lets you route traffic to a resource when the resource is **healthy** or to a different resource when the first resource is **unhealthy**. 

The primary and secondary records can route traffic to anything from an Amazon S3 bucket that is configured as a website to a complex tree of records. 

![](./assets/AWS_Route53_Routing_Failover.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

<font color=#EBAC25><i>More info:</i></font> 
- [Failover routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html)
- [Active-passive failover](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html#dns-failover-types-active-passive)
### Geolocation Routing

- Different from Latency-based!
- <font color=#EBAC25>This routing is based on user location</font>
- Specify location by Continent, Country or by US State (if there’s overlapping, most precise location selected)
- Should create a “Default” record (in case there’s no match on location)
- <font color=#EBAC25>Use cases:</font> website localization, restrict content distribution, load balancing, …
- <font color=#C7EB25>Can be associated with Health Checks</font>

<font color=#EBAC25><i>More info:</i></font> [Geolocation Routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-geo.html)
### Geoproximity Routing

- Route traffic to your resources based on the geographic location of users and resources
- Ability to shift more traffic to resources based on the defined bias
- To change the size of the geographic region, specify bias values:
	- To expand (1 to 99) - more traffic to the resource
	- To shrink (-1 to -99) - less traffic to the resource

 <font color=#EB4925>You must use Route 53 Traffic Flow to use this feature</font>.

![](./assets/AWS_Route53_Routing_Geoproximity.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

<font color=#EBAC25><i>More info:</i></font> [Geoproximity Routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-geoproximity.html)
### IP-based Routing

- Routing is <font color=#EBAC25>based on clients’ IP addresses</font>
- You provide a list of CIDRs for your clients and the corresponding endpoints/locations (user-IP-to-endpoint mappings)
- <font color=#EBAC25>Use cases:</font> Optimize performance, reduce network costs…
- <font color=#EBAC25>Example:</font> route end users from a particular ISP to a specific endpoint

<font color=#EBAC25><i>More info:</i></font> [IP-based Routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-ipbased.html)
## Route 53 - Health Checks

{{< lead >}}

**Amazon Route 53 health checks monitor the health of your resources** such as web servers and email servers. You can optionally configure **Amazon CloudWatch alarms** for your health checks, so that you receive notification when a resource becomes unavailable.

{{< /lead >}}

![](./assets/AWS_Route53_Health_Checks.png "© Amazon AWS, [How Amazon Route 53 checks the health of your resources](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/welcome-health-checks.html)")

- HTTP Health Checks are only for public resources
- Health Check => Automated DNS Failover:
	1. Health checks that monitor an endpoint (application, server, other AWS resource)
	2. Health checks that monitor other health checks (Calculated Health Checks)
	3. Health checks that monitor CloudWatch Alarms (full control !!) – e.g., throttles of DynamoDB, alarms on RDS, custom metrics, … (helpful for private resources)	
- Health Checks are integrated with CloudWatch metrics
### Monitor an Endpoint

- **About 15 global health checkers will check the endpoint health**
	- Healthy/Unhealthy Threshold – 3 (default)
	- Interval – 30 sec (can set to 10 sec – higher cost)
	- Supported protocol: HTTP, HTTPS and TCP
	- If > 18% of health checkers report the endpoint is healthy, Route 53 considers it Healthy. Otherwise, it’s Unhealthy
- Health Checks pass only when the endpoint responds with the 2xx and 3xx status codes
- Health Checks can be setup to pass / fail based on the text in the first 5120 bytes of the response
- Configure you router/firewall to allow incoming requests from Route 53 Health Checkers
### Calculated Health Checks

- Combine the results of multiple Health Checks into a single Health Check
- You can use OR, AND, or NOT
- Can monitor up to 256 Child Health Checks
- Specify how many of the health checks need to pass to make the parent pass
- <font color=#EBAC25>Usage:</font> perform maintenance to your website without causing all health checks to fail
### Private Hosted Zones

- Route 53 health checkers are outside the VPC
- They can’t access private endpoints (private VPC or on-premises resource)
- You can create a **CloudWatch Metric** and associate a **CloudWatch Alarm**, then create a Health Check that checks the alarm itself

![](./assets/AWS_Route53_Health_Checks_Calculated.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
## Hybrid DNS

- Route 53 Resolver automatically answers DNS queries for EC2 internal hostnames, Private Hosted Zone records, and public DNS records    
- Supports <font color=#EBAC25>hybrid DNS</font>, <font color=#C7EB25>allowing resolution between your VPC (via Route 53 Resolver) and external networks</font>
- External networks can include other VPCs (including peered VPCs) or on‑premises environments connected through Direct Connect or VPN
## Resolver Endpoints

**Inbound Endpoint** - allows your DNS Resolvers to resolve domain names for AWS resources (e.g., EC2 instances) and records in Private Hosted Zones.

![](./assets/AWS_Route53_Endpoint_Inbound.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

**Outbound Endpoint** - Route 53 Resolver forwards DNS queries to your DNS Resolvers.

![](./assets/AWS_Route53_Endpoint_Outbound.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

<font color=#EBAC25><i>More info:</i></font> 
- [How Amazon Route 53 checks the health of your resources](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/welcome-health-checks.html)
- [Types of Amazon Route 53 health checks](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-types.html)

---
## >> Sources <<

**AWS Route 53:**
- [Amazon Route 53 - DNS service](https://aws.amazon.com/route53/)
- [What is Amazon Route 53?](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html)
- [Working with hosted zones](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html)
- [Choosing a routing policy](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html)
	- [Simple Routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-simple.html)
	- [Weighted routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-weighted.html)
	- [Latency-based routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-latency.html)
	- [Failover routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-failover.html)
		- [Active-passive failover](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html#dns-failover-types-active-passive)
	- [Geolocation Routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-geo.html)
	- [Geoproximity Routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-geoproximity.html)
	- [IP-based Routing](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-ipbased.html)
- Health Checks
	- [How Amazon Route 53 checks the health of your resources](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/welcome-health-checks.html)
	- [Types of Amazon Route 53 health checks](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-types.html)
## >> References <<

- **Cloud Practitioner:** [Route53]({{< ref "15-aws-global-infrastructure/#route53" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}
### Solutions Architect Resources

- [Ultimate AWS Certified Solutions Architect Associate 2026](https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03)
- [AWS Certified Solutions Architect Associate Code & Slides](https://courses.datacumulus.com/downloads/certified-solutions-architect-pn9/)
	- [AWS Certified Solutions Architect Associate | Slides](https://media.datacumulus.com/aws-saa/AWS%20Certified%20Solutions%20Architect%20Slides%20v47.pdf)
	- [AWS Certified Solutions Architect Associate | Code](https://links.datacumulus.com/sa-associate-code-pn9)
- [Practice Exams | AWS Certified Solutions Architect Associate](https://www.udemy.com/course/practice-exams-aws-certified-solutions-architect-associate)

_Source:_ https://courses.datacumulus.com/downloads/certified-solutions-architect-pn9/

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |
