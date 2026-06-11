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

![](AWS_Route53_How_DNS_Works.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
## Amazon Route 53

🏅 **Cloud Practitioner-level:** [Route 53]({{< ref "15-aws-global-infrastructure/#route53" >}})

{{< lead >}}
**Route 53** is a fully managed, scalable, **authoritative**[^Ref1] DNS service that also acts as a domain registrar and can perform health checks on your resources.
{{< /lead >}}

[^Ref1]: **Authoritative** means the DNS server is the _official source of truth_ for a domain — it holds and serves the real DNS records, and you (as the domain owner) are allowed to create, change, or delete those records directly.
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
- <font color=#C7EB25>IP-based</font> Routing Policy - <font color=#EB4925>Route the traffic based on the IP address originates from</font>

_More on Routing Policies:_ [Choosing a routing policy](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html)

---
## >> Sources <<

**AWS Route 53:**
- [Amazon Route 53 - DNS service](https://aws.amazon.com/route53/)
- [What is Amazon Route 53?](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html)
- [Working with hosted zones](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html)
- [Choosing a routing policy](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html)
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
