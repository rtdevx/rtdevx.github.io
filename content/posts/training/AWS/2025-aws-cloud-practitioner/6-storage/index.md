---
title: Storage
date: 2025-08-06
description: Storage in AWS
summary: Storage in AWS...
draft: false
tags:
  - CLF-C02
  - Storage
  - S3
categories: AWS
series: AWS Cloud Practitioner
---
## EBS Volume

- **EBS** (Elastic Block Store) - Network drive that can be attached to instances while they run
- <font color=#C7EB25>It allows instances to persist the data, even after their termination</font>
- <font color=#C7EB25>Can be mounted to 1 instance at a time</font>
- <font color=#C7EB25>Bound to an Availability Zone</font>
- It's a "**Network Drive**"
	- it uses the network to communicate to the instance (there can be latency)
	- it can be detached from an EC2 instance and attached to another one quickly
- <font color=#C7EB25>It's locked to an Availability Zone (AZ)</font>
	- an EBS Volume that is _us-east-1a_ can't be attached to _us-east-1b_
	- to move a volume across AZ, snapshot has to be created first
- <font color=#C7EB25>It has a provisioned capacity (size in GB and IOPS)</font>
	- you will get billed for a provisioned capacity
	- You can increase the capacity of the drive

![](./assets/AWS_EC2_EBS_Volume1.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
_<font color=#EB4925>EBS Volumes can be attached to only 1 EC2 instance at a time but EC2 instances can have multiple EBS Volumes attached to them</font>_
### EBS Delete on Termination

![](./assets/AWS_EC2_EBS_Delete_on_Termination.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

- Controls the EBS behavior when [EC2 instance]({{< ref "4-ec2" >}}) terminates
	- by default the root EBS volume is deleted (attribute enabled)
	- by default any other attached EBS volume is not deleted (attribute disabled)
- This can be controlled by both, AWS Console and AWS CLI
- <font color=#EBAC25>Use case:</font> preserve root volume when instance is terminated
## EBS Snapshots

- Make a backup (snapshot) of EBS volume at a point in time
- Not necessary to detach the volume to do the snapshot but recommended
- Snapshots can be copied across AZ or Regions
### EBS Snapshots features

- EBS Snapshot Archive
	- Move a Snapshot to an "archive tier" that is 75% cheaper
	- Takes between 24 to 72 hours of restoring the archive

```AWSConsole
EC2 > Snapshots > Recycle Bin > Create retention rule
```

When Snapshot Archive is enabled, it is possible to Archive it from a drop-down box in AWS Console. Archived Snapshots appear in the Recycle Bin.

- Recycle Bin for EBS Snapshots
	- Setup rules to retain deleted snapshots so you can recover them after an accidental deletion
	- Specify retention (from 1 day to 1 year)

- Fast Snapshot Restore (FSR)
	- Force full initialization of snapshot to have no latency on the first use (EXPENSIVE!)
## EC2 Instance Store

- EBS volumes are network drives with good but "limited" performance
- <font color=#C7EB25>If high-performance hardware disk is required, EC2 Instance Store can be used</font>

- Better I/O performance
- EC2 Instance Store is ephemeral (data is lost after stopping EC2 instance)
- <font color=#EBAC25>Use case:</font> buffer, cache, scratch data, temporary content

<font color=#EB4925>Risk of data loss if hardware fails.</font>
## EFS - Elastic File System

- <font color=#EBAC25>Managed NFS</font> (Network File System) that can be mounted on 100s of EC2 instances
- <font color=#EB4925>EFS works with Linux EC2 instances only</font> and is <font color=#C7EB25>multi-AZ.</font>
- Highly-available, scalable, <font color=#EB4925>expensive</font> (3x gp2 EBS), pay per use, no capacity planning
- Encryption at rest using **KMS**
- Scales automatically, <font color=#EBAC25>pay-per-use</font>, no capacity planning

![](./assets/AWS_Storage_EFS.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### Performance & Storage Classes

#### EFS Scale
- Supports <font color=#EBAC25>thousands of concurrent NFS clients</font> and <font color=#EBAC25>10+ GB/s</font> of throughput    
- Automatically grows to <font color=#EBAC25>petabyte‑scale</font> as your data increases    
#### Performance Modes _(chosen at file system creation)_

- **General Purpose (default)** - best for latency‑sensitive workloads (web servers, CMS, etc.)    
- **Max I/O** - higher latency but higher throughput and massive parallelism (big data, media processing)
#### Throughput Modes

- **Bursting** - baseline of <font color=#EBAC25>50 MiB/s per TB</font>, with bursts up to <font color=#EBAC25>100 MiB/s</font>
- **Provisioned** - set a fixed throughput regardless of storage size (e.g., **1 GiB/s** even with 1 TB stored)    
- **Elastic (Recommended)** - <font color=#C7EB25>automatically adjusts throughput based on workload demand</font>
    - Up to <font color=#EBAC25>3 GiB/s reads</font> and <font color=#EBAC25>1 GiB/s writes</font>
    - Ideal for <font color=#EB4925>unpredictable or spiky workloads</font>
#### Storage Classes

EFS Storage tiers and lifecycle management.
##### Standard

- For frequently accessed files
##### EFS Infrequent Access (EFS-IA)

- Storage class that is cost-optimized for files not accessed every day
- up to <font color=#EB4925>92% lower cost</font> compared to EFS Standard
- When enabled, EFS will automatically move your files to **EFS-IA** based on last time they were accessed
- Enable **EFS-IA** with a **Lifecycle Policy**
	- Example: move files that are not accessed for 60 days to **EFS-IA**
- Transparent to the applications accessing EFS (apps don't see whether file is in EFS or EFS-IA)
##### Archive

- Rarely accessed data (few times each year), <font color=#EB4925>50% cheaper</font>
### Availability and durability

- **Standard:** Multi-AZ, great for prod
- **One Zone:** One AZ, great for dev, backup enabled by default, compatible with IA (EFS One Zone-IA)
## EBS vs EFS

| Feature             | EBS                              | EFS                           |
| ------------------- | -------------------------------- | ----------------------------- |
| **Access Model**    | Single-instance                  | Multi-instance                |
| **Use Cases**       | Databases, Development           | Web serving, big data         |
| **Performance**     | Low-latency, high IOPS           | High throughput               |
| **Scalability**     | Limited to provisioned volume    | Auto-scales to petabytes      |
| **File Size Limit** | No limit                         | 47.9 TiB                      |
| **Accessibility**   | Not accessible over the internet | Shared across instances       |
| **Pricing**         | Cheaper for single-instance      | Cost-effective for shared use |

<font color=#EBAC25><i>More info:</i></font>
- https://aws.amazon.com/efs/when-to-choose-efs/
- https://lucidity.cloud/blog/ebs-vs-efs
- https://www.cloudzero.com/blog/ebs-vs-efs/
## Amazon FSx

3rd party with high-performance file system on AWS.

- **FSx for Lustre** - fully managed, high-performance, scalable <font color=#C7EB25>file storage for High Performance Computing (HPC)</font>. 
	- <font color=#EBAC25>Use cases:</font> Machine Learning, Analytics, Video processing, Financial Modelling
	- Scales up to 100s GB/s, millions of IOPS, sub-ms latencies
	- Seamless integration with [S3]({{< ref "tags/s3" >}})
		- Can “read S3” as a file system (through FSx)
		- Can write the output of the computations back to S3 (through FSx)
	- Can be used from on-premises servers (VPN or Direct Connect)

- **FSx for Windows File Server** - fully managed, highly reliable and scalable Windows native shared file system built on Windows File Server. <font color=#C7EB25>Supports SMB and NTFS file systems. Integrated with AD for security. Can be accessed from AWS or from On-Premise.</font>
	- Microsoft Active Directory integration, ACLs, user quotas
	- <font color=#C7EB25>Can be mounted on Linux EC2 instances</font>
	- Supports **Microsoft's Distributed File System (DFS) Namespaces** (group files across multiple FS)

- **FSx for NetApp ONTAP** - Managed NetApp ONTAP on AWS. File System compatible with NFS, SMB, iSCSI protocol
	- Move workloads running on ONTAP or NAS to AWS
	- Works with:
		- Linux
		- Windows
		- MacOS
		- VMware Cloud on AWS
		- Amazon Workspaces & AppStream 2.0
		- Amazon EC2, ECS and EKS
	- Storage shrinks or grows automatically
	- Snapshots, replication, low-cost, compression and data de-duplication
	- Point-in-time insta

- **FSx for OpenZFS**
	- Fully managed **OpenZFS** file system on AWS
	- Supports NFS v3, v4, v4.1, and v4.2
	- Ideal for migrating existing ZFS workloads to AWS
	- Works with Linux, Windows, macOS, VMware Cloud on AWS, WorkSpaces, AppStream 2.0, EC2, ECS, and EKS
	- Delivers up to **1,000,000 IOPS** with **<0.5 ms latency**
	- Provides snapshots, compression, and low‑cost storage
	- Supports instant, point‑in‑time restores
## Hybrid Cloud for Storage

- AWS promotes **hybrid cloud** architectures
- Part of your environment runs in AWS, part remains on‑premises
- <font color=#EBAC25>Common reasons:</font> long migration timelines, security or compliance needs, or broader IT strategy
- Since S3 is a **proprietary** storage system (unlike NFS/EFS), <font color=#EBAC25>exposing S3 data on‑premises requires a bridge</font>
	- <font color=#EBAC25>Solution:</font> AWS Storage Gateway

![](./assets/AWS_Storage_Cloud_Native.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
## Storage Comparison

- **S3:** Object Storage
- **S3 Glacier:** Object Archival
- **EBS volumes:** Network storage for one EC2 instance at a time
- **Instance Storage:** Physical storage for your EC2 instance (high IOPS)
- **EFS:** Network File System for Linux instances, POSIX filesystem
- **FSx for Windows:** Network File System for Windows servers
- **FSx for Lustre:** High Performance Computing Linux file system
- **FSx for NetApp ONTAP:** High OS Compatibility
- **FSx for OpenZFS:** Managed ZFS file system
- **Storage Gateway:** S3 & FSx File Gateway, Volume Gateway (cache & stored), Tape Gateway
- **Transfer Family:** FTP, FTPS, SFTP interface on top of Amazon S3 or Amazon EFS
- **DataSync:** Schedule data sync from on-premises to AWS, or AWS to AWS
- **Snowcone / Snowball / Snowmobile:** to move large amount of data to the cloud, physically
- **Database:** for specific workloads, usually with indexing and querying
## Summary

**EBS Volumes**

- network drives attached to one [EC2 instance]({{< ref "4-ec2" >}}) at a time
- Mapped to an Availability Zones
- Can use EBS snapshots for backups and then transferring across AZ's

**EC2 Instance Store**

- high performance hardware disk attached to our EC2 instance
- ephemeral (data lost if instance stopped or terminated)

**EFS**

- Network File System
- Can be attached to 100s of EC2 instances
- spans through a region
- expensive compared to EBS

**EFS-IA**

- Cost-optimized storage class for infrequently accessed files
- Lifecycle Policy for automatically moving files between tiers

**FSx for Windows**

- Network File System for Windows servers
- SMB and NTFS
- Can be accessed from on-prem and the cloud

**FSx for Lustre**

- High Performance (HPC) Linux file system


---
## >> Sources <<

- https://aws.amazon.com/efs/when-to-choose-efs/
- https://lucidity.cloud/blog/ebs-vs-efs
- https://www.cloudzero.com/blog/ebs-vs-efs/
## >> References <<

- [S3]({{< ref "11-s3" >}})
- [EC2]({{< ref "4-ec2" >}})
- [AMI]({{< ref "7-ami" >}})
## >> Disclaimer <<

{{< disclaimer_practitioner25 >}}

| <font color=#EB4925>AWS Certification Series</font> »                 |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |
