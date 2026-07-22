---
title: "Solutions Architect: EC2"
date: 2026-04-02
description: Associate-level extension of the `EC2` Section from AWS Cloud Practitioner Series.
summary: Associate-level extension of the `EC2` Section from AWS Cloud Practitioner Series.
draft: false
tags:
  - SAA-C03
  - EC2
  - AMI
  - HPC
  - ENI
  - Capacity
categories:
  - AWS
series: AWS Solution Architect
---
--- 
ℹ️ **Associate‑level extension** of the [EC2]({{< ref "4-ec2" >}}) section from the [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) series. In this post, I expand on key EC2 concepts and introduce deeper topics relevant to the **Associate‑level understanding**.

| <font color=#EB4925>AWS Certification Series</font> »                 |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |

## Public vs Private vs Elastic IP

- **Public IP**
	- Machine can be identified on the internet
	- Unique across whole web
	- Can be geo-located
- **Private IP**
	- Machine can be identified on the Private Network only
	- Unique across the Private Network
	- Connection to the internet via NAT / Internet Gateway (proxy)
- **Elastic IP**
	- When machine is stopped and started again, it can change it's public IP
	- If fixed Public IP is needed, Elastic IP is required
	- Elastic IP is a Public IPv4 IP address owned by you until it's deleted
	- Can be attached to one instance at a time
	- <font color=#EB4925>Only 5 Elastic IP's per account</font> (soft limit, can be extended with AWS support)

{{< alert "skull-crossbones" >}}

**Avoid using Elastic IPs where possible**, since they usually indicate weak architecture choices; instead rely on random public IPs with DNS or, place workloads behind a load balancer so no public IP is needed.

<font color=#EBAC25>By default, your EC2 machine comes with a private IP for the internal AWS Network and a public IP, for the WWW.</font>

If EC2 instance is stopped and then started, **the public IP can change**.

{{< /alert >}}
## Placement Groups

To meet the needs of your workload, you can launch a group of _interdependent_ EC2 instances into a _placement group_ to influence their placement.

![](./assets/AWS_EC2_Placement_Groups.jpg "© kodekloud.com, [KodeKloud: EC2 Placement](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Elastic-Compute-CloudEC2/EC2-Placement/page)")


Depending on the type of workload, you can create a placement group using one of the following placement strategies:
### Cluster

Packs instances close together <font color=#EBAC25>inside an Availability Zone</font>. This strategy enables workloads to achieve the <font color=#C7EB25>low-latency network performance</font> necessary for tightly-coupled node-to-node communication that is typical of <font color=#C7EB25>high-performance computing</font> (HPC) applications.

|               |                                                                                                                                                                                                                                  |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pros**      | - Extremely high network throughput and very low latency between instances (**up to 10–100 Gbps with Enhanced Networking**)<br>- Ideal for tightly coupled, high‑performance workloads that need fast node‑to‑node communication |
| **Cons**      | - <font color=#EB4925>All instances are in a single AZ</font>, so an AZ outage takes down the entire group <br>- Capacity can be limited - launches may fail if AWS can’t place all instances close enough together              |
| **Use Cases** | - Big Data or distributed compute jobs that must complete quickly    <br>- HPC workloads, analytics engines, or applications requiring ultra‑low latency and high network bandwidth                                              |
### Partition

<font color=#EBAC25>Spreads your instances across logical partitions such that groups of instances in one partition do not share the underlying hardware with groups of instances in different partitions.</font> This strategy is typically used by large distributed and replicated workloads, such as Hadoop, Cassandra, and Kafka.

![](./assets/AWS_EC2_Placament_Groups_Partition.png)

|               |                                                                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pros**      | - Can span multiple Availability Zones, improving resilience    <br>- Reduces the risk of simultaneous failure across instances    <br>- Instances are isolated on separate racks and physical hardware |
| **Cons**      | - Limited to **seven partitions per AZ** within a placement group                                                                                                                                       |
| **Use Cases** | - Applications that need maximum high availability    <br>- Critical workloads where each instance must be isolated from failures in other nodes                                                        |
### Spread 

<font color=#EBAC25>Strictly places a small group of instances across distinct underlying hardware</font> to reduce correlated failures.

|               |                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pros**      | - Highest failure isolation - each instance sits on distinct hardware    <br>- Ideal for small numbers of critical instances needing maximum resilience |
| **Cons**      | - Limited to **seven instances per AZ**                                                                                                                 |
| **Use Cases** | - Critical services where no two instances should fail together                                                                                         |

{{< alert "circle-info" >}}

Placement groups are optional. If you don't launch your instances into a placement group, EC2 tries to place the instances in such a way that all of your instances are spread out across the underlying hardware to minimize correlated failures.

{{< /alert >}}
### Pricing

There is no charge for creating a placement group.

📡 _Sources:_ 
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html
- [KodeKloud: EC2 Placement](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Elastic-Compute-CloudEC2/EC2-Placement)
## Elastic Network Interfaces (ENI)

- Logical component in a VPC that represents a virtual network card 
- The ENI can have the following attributes:
	- <font color=#EBAC25>Primary private IPv4</font>, <font color=#EBAC25>one or more secondary IPv4</font>
	- <font color=#EBAC25>One Elastic IP (IPv4)</font> per private IPv4
	- <font color=#EBAC25>One Public IPv4</font>
	- <font color=#EBAC25>One or more security groups</font>
	- A MAC address
	- You can <font color=#EBAC25>create ENI independently and attach them on the fly (move them) on EC2 instances for failover</font>
	- <font color=#EB4925>Bound to a specific availability zone</font> (AZ)

![](./assets/AWS_EC2_ENI.jpg "© kodekloud.com, [KodeKloud: Elastic Network Interfaces](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Compute/Elastic-Network-Interfaces)")

{{< alert "circle-info" >}}

**ENIs** are a <font color=#EBAC25>more advanced networking feature in AWS</font>, and they take a bit of time and hands‑on practice to fully understand. 

They’re powerful once you get comfortable with them, especially for <font color=#EBAC25>multi‑homed architectures</font>, <font color=#EBAC25>failover patterns</font>, and <font color=#EBAC25>security‑focused</font> designs. 

For a deeper dive, **AWS** has a **solid introductory post here:** 

🔥[Elastic Network Interfaces in the Virtual Private Cloud](https://aws.amazon.com/blogs/aws/new-elastic-network-interfaces-in-the-virtual-private-cloud/)

{{< /alert >}}

📡 _More:_ 
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html
- [KodeKloud: Elastic Network Interfaces](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Compute/Elastic-Network-Interfaces)
## EC2 Hibernate

- **EC2 Hibernate**
	- The in-memory (RAM) state is preserved
	- The instance boot is much faster! (the OS is not stopped / restarted)
	- RAM state is written to a file in the root EBS volume
		- <font color=#EB4925>The root EBS volume must be encrypted</font>
 
- **Use cases**
	- Long-running processing
	- Saving the RAM state
	- Services that take time to initialize

- **Instance RAM Size** - must be less than 150 GB
- **Instance Size** - not supported for bare metal instances
- **AMI** - Amazon Linux 2, Linux AMI, Ubuntu, RHEL, CentOS & Windows…
- **Root Volume** - must be EBS, encrypted, not instance store
- **Available for** On-Demand, Reserved and Spot Instances

‼️An instance <font color=#EB4925>can NOT be hibernated more than 60 days.</font>
## EC2 Fleet and Spot Fleet

{{< lead >}}

**Fleets** provide the following features and benefits, enabling you to **maximize cost savings** and **optimize availability and performance** when running applications on multiple EC2 instances.

{{< /lead >}}

- **Multiple instance types**

A fleet can launch multiple instance types, ensuring it isn't dependent on the availability of any single instance type. This increases the overall availability of instances in your fleet.

- **Distributing instances across Availability Zones**

A fleet can launch into multiple Availability Zones, enabling you to reduce costs and improve availability. If your fleet includes Spot Instances, the fleet automatically selects Availability Zones based on your preferences regarding price and interruptions.

- **Multiple purchasing options**

A fleet can launch multiple purchase options (Spot and On-Demand Instances), allowing you to optimize costs through Spot Instance usage. You can also take advantage of Reserved Instance and Savings Plans discounts by using them in conjunction with On-Demand Instances in the fleet.

- **Automated replacement of Spot Instances**

If your fleet includes Spot Instances, it can automatically request replacement Spot capacity if your Spot Instances are interrupted. Through [Capacity Rebalancing](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-fleet-capacity-rebalance.html), a fleet can also monitor and proactively replace your Spot Instances that are at an elevated risk of interruption.

- **Reserve On-Demand capacity**

A fleet can use an [On-Demand Capacity Reservation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-fleet-on-demand-capacity-reservations.html) to reserve On-Demand capacity. A fleet can also include [Capacity Blocks for ML](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-blocks.html), allowing you to reserve GPU instances on a future date to support short duration machine learning (ML) workloads.

<font color=#EBAC25><i>More info:</i></font> [EC2 Fleet and Spot Fleet](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Fleets.html)

---
## >> Sources <<

**Placement Groups:** 
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html
- [KodeKloud: EC2 Placement](https://notes.kodekloud.com/docs/AWS-Certified-Developer-Associate/Elastic-Compute-CloudEC2/EC2-Placement)

**Elastic Network Interface (ENI):**

- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html
- [KodeKloud: Elastic Network Interfaces](https://notes.kodekloud.com/docs/AWS-Solutions-Architect-Associate-Certification/Services-Compute/Elastic-Network-Interfaces)
- 🔥[Elastic Network Interfaces in the Virtual Private Cloud](https://aws.amazon.com/blogs/aws/new-elastic-network-interfaces-in-the-virtual-private-cloud/)

**EC2 Fleets:**

- [EC2 Fleet and Spot Fleet](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Fleets.html)
## >> References <<

**Cloud Practitioner:** [EC2]({{< ref "4-ec2" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}