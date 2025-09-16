---
title: Cloud Monitoring
date: 2025-08-17
description: Cloud Monitoring
summary: CloudWatch, EventBridge, CloudTrail, X-Ray, CodeGuru, Health Dashboard...
draft: false
tags:
  - CLF-C02
categories: AWS
---
## CloudWatch Metrics

**CloudWatch** provides metrics for every service in AWS.

It is possible to create **CloudWatch Dashboards** that consist of different metrics.

![](./assets/AWS_CW_Metrics.png)
_CloudWatch console_

_CloudWatch Console:_ https://console.aws.amazon.com/cloudwatch
### Important Metrics

- **EC2 instances:** CPU Utilization, Status Checks, Network (not RAM!)
	- Default metrics **every 5 minutes**
	- Option for Detailed Monitoring ($!): metrics **every 1 minute**
- **EBS Volumes:** Disk Read / Writes
- **S3 Buckets:** Bucket size, Number of Objects, All requests
- **Billing:** Total Estimated Charge (only in us-east-1)
- **Service Limits:** how much of service API's was used (Lambda?)
- Custom metrics: push your own metrics

```AWSConsole
# See All metrics
CloudWatch > Metrics > All metrics

# Create a custom alarm
CloudWatch > Alarms > All alarms
```
### CloudWatch Alarms

- Alarms are used to trigger notifications for any metric
- Alarms actions
	- [Auto Scaling]({{< ref "10-auto-scaling-groups" >}}) - increase or decrease EC2 instances "desired" count
	- [EC2]({{< ref "4-ec2" >}}) Actions - stop, terminate, reboot or recover and EC2 instance
	- [SNS]({{< ref "16-cloud-integrations/#amazon-sns" >}}) notifications - send a notification into an SNS topic
- Various options (sampling, %, max, min, etc...)
- Can choose the period on which to evaluate an alarm
- **Example:** create a billing alarm on the CloudWatch Billing metric
- Alarm States: OK, INSUFFICIENT_DATA, ALARM

<font color=#EB4925>Billing alarms are only available in us-east-1</font>
### CloudWatch Logs

CloudWatch Logs can collect logs from:

- [Elastic Beanstalk]({{< ref "14-deployments/#beanstalk" >}}) - collection of logs from application
- [ECS]({{< ref "13-other-compute-services/#ecs-elastic-container-service" >}}) - collection of logs from containers
- AWS [Lambda]({{< ref "13-other-compute-services/#lambda" >}}) - collection of logs from functions
- [CloudTrail]({{< ref "17-cloud-monitoring/#aws-cloudtrail" >}}) based on filter
- <font color=#C7EB25>CloudWatch log agents</font> - on EC2 machines or on-premises servers
- [Route53]({{< ref "15-aws-global-infrastructure/#route53" >}}) - DNS logs
### CloudWatch Logs for EC2 / on-premise

<font color=#EB4925>CloudWatch agent is required to be installed on EC2 instance 
to push the logs that are needed.</font>

<font color=#EB4925>CloudWatch agent can also be installed on on-premise servers too.</font>

[IAM]({{< ref "2-iam" >}}) permissions must be set for CloudWatch Logs to function correctly.
## Amazon EventBridge

- Schedule - cron jobs (scheduled scripts)
- Event Pattern - Event rules to react to a service doing something
- Trigger Lambda functions, send SQS / SNS messages

![](./assets/AWS_CW_EventBridge1.png)

![](./assets/AWS_CW_EventBridge2.png)

- Default Event Bus - for AWS Services
- Partner Event Bus - for external entities (i.e. Zendesk) sending events to the cloud
- Custom Event Bus - custom

![](./assets/AWS_CW_EventBridge3.png)

```AWSConsole
EventBridge > Create rule
```

![](./assets/AWS_CW_EventBridge4.png)
## AWS CloudTrail

##### <font color=#EB4925>AWS CloudTrail provides governance, compliance and audit your AWS Account and it is ENABLED BY DEFAULT.</font>

It can get a history of events / API calls made within your AWS account by:

- Console
- SDK
- CLI
- AWS Services

<font color=#C7EB25>Logs from CloudTrail can be stored in CloudWatch Logs or S3. Trail can be applied to All Regions (default) or a single region.</font>

### <font color=#EB4925>If a resource is deleted in AWS, investigate CloudTrail first!</font>

![](./assets/AWS_CW_CloudTrail1.png)

```AWSConsole
# Check Events History
CloudTrail > Event history
```
## AWS X-Ray

##### <font color=#EB4925>Visual analysis of our applications.</font> Common view of entire architecture.

- **Troubleshooting performance**
- **Understanding dependencies in a microservices architecture**
- Pinpoint service issues
- Review request behavior
- **Find Errors** and **Exceptions**
- SLA's
- Identify impacted users

![](./assets/AWS_CW_XRAY1.png)
## Amazon CodeGuru

##### ML-powered service for automated code reviews and application performance recommendations.

**Provides 2 functionalities:**

- **CodeGuru Reviewer** - automated code reviews for static code analysis (development)
	- Identify critical issues, security vulnerabilities and hard to find bugs
	- Common coding best practices, resource leaks, security detection, input validation
	- Uses **Machine Learning** and automated reasoning
	- Hard-learned lessons across millions of code reviews on 1000s of open-source repositories
	- Supports Java and Python
	- Integrates with GitHub, Bitbucket and ~~AWS CodeCommit~~
- **CodeGuru Profiler** - visibility / recommendations about application performance during runtime (production)
	- Helps understand the runtime behavior of an application
	- Identify if application is consuming excessive CPU, etc...
	- **Features:**
		- Identify and remove code inefficiencies
		- Improve application performance (e.g. reduce CPU utilization)
		- **Decrease compute costs**
		- Provide heap summary (identify which objects using up the memory)
		- Anomaly detection
- Supports applications running on AWS as well as on-premise
- Minimal overhead on application
## AWS Health Dashboard

##### Shows all regions, all services health. General information, not specific to you.

Shows historical information for each day.

Has an RSS feed that can be subscribed to.
### AWS Health Dashboard - Your Account

**AWS Account Health Dashboard** provides alerts and remediation guidance when AWS is experiencing events that may impact you.

<font color=#EB4925>While the **Service Health Dashboard** displays the general status of AWS services, **Account Health Dashboard** gives you a personalized view into the performance and availability of the AWS services underlying your AWS resources.</font>

<font color=#EB4925>It can aggregate data from an entire AWS Organization.</font>
## Summary

- <font color=#EBAC25>CloudWatch</font>
	- Metrics - monitor the performance of AWS services and billing metrics
	- Alarms - automate notification, perform [EC2]({{< ref "4-ec2" >}}) action, notify to [SNS]({{< ref "16-cloud-integrations/#amazon-sns" >}}) based on metric
	- Logs - collects log files from EC2 instances, servers, [Lambda]({{< ref "13-other-compute-services/#lambda" >}}) functions
- <font color=#EBAC25>Events (EventBridge)</font> - react to events in AWS or trigger a rule on a schedule
- <font color=#EBAC25>CloudTrail</font> - audit API calls made within your AWS account
	- CloudTrail Insights - automated analysis of your CloudTrail Events
- <font color=#EBAC25>X-Ray</font> - trace requests made through your distributed applications (analyze flow)
- <font color=#EBAC25>AWS Health Dashboard</font> - general status of ALL AWS services across all regions
- <font color=#EBAC25>AWS Account Health Dashboard</font> - AWS events that impact your infrastructure
- <font color=#EBAC25>Amazon CodeGuru</font> - automated code reviews and application performance recommendations

---
## >> Sources <<

CloudWatch / CloudWatch Logs / CloudWatch Events (EventBridge): 
- https://docs.aws.amazon.com/cloudwatch/
- https://console.aws.amazon.com/cloudwatch

## >> Table of contents (CLF-C02) <<

{{< toc_cf-c02 >}}
## >> Disclaimer <<

{{< disclaimer_practitioner25 >}}
