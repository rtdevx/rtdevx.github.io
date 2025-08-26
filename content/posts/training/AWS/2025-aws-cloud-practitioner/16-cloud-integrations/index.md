---
title: Cloud Integrations
date: 2025-08-16
description: Cloud Integrations. This section is about multiple applications communicating with each other.
summary: Cloud Integrations / decoupling. This section is about multiple applications communicating with each other. SNS, SQS, MQ....
draft: false
tags:
  - CLF-C02
categories: AWS
---
This section is about multiple applications communicating with each other.

1. Synchronous communication (application to application)
	- Can be problematic if there are sudden spikes of traffic
2. Asynchronous / Event-based communication (application to queue to application)
	- It is called <font color=#10b981>decoupling</font> of applications
		- **SQS:** queue model
		- **SNS:** pub / sub model
		- **Kinesis:** real-time data streaming model
	- Those services can scale independently from our application

![](./assets/AWS_Integrations.png)
## SQS

##### <font color=#f1ef63>SQS</font> = Simple Queue Service.

![](./assets/AWS_SQS_Queue.png)
_[What is Amazon SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)_
### SQS - Standard Queue

- Oldest AWS offering (over 10 years old)
- Fully managed, <font color=#10b981>serverless</font> service used to <font color=#10b981>decouple</font> applications
- Sales from 1 message per second to 10,000s per second
- Default messages retention: 4 days, maximum 14 days
- No limit to how many messages can be in the queue
- Messages are deleted after they're read by consumers (applications)
- Low latency
- Consumers share the work to read messages and scale horizontally

![](./assets/AWS_SQS_Queue2.png)
### SQS - FIFO Queue

##### <font color=#f1ef63>FIFO</font> = First in First Out (ordering of messages in the queue)

![](./assets/AWS_SQS_Queue_FIFO.png)
_Messages are processed in order by the consumer._
## Amazon Kinesis

##### <font color=#f1ef63>Kinesis</font> = real-time big data streaming.

Managed service to collect, process and analyze real-time streaming data at any scale.
## Amazon SNS

##### <font color=#f1ef63>SNS</font> = Simple Notification Service.

**SNS** is sending one message to multiple receivers.

![](./assets/AWS_SNS1.png)

- The "event publishers" only sending message to one SNS topic
- As many "event publishers" as we want to listen to the SNS topic notifications
- <font color=#f43f5e>Each subscriber to the topic will get all the messages</font>
- Up to 12,500,000 subscriptions per topic, 100,000 topics limit

![](./assets/AWS_SNS2.png)
## Amazon MQ

SQS and SNS are "cloud-native" services. Traditional applications running from on-premises may use open protocols, such as:

- MQTT
- AMQP
- STOMP
- Openwire
- WSS

When migrating to the cloud, instead of re-engineering the application to use **SQS** and **SNS**, **Amazon MQ** can be used instead.

**Amazon MQ** is a managed message broker service for:

- RabbitMQ
- Active MQ

- Amazon MQ doesn't scale as much as SQS / SNS
- Amazon MQ runs on servers, can run in Multi-AZ with failover
- Amazon MQ has both - queue feature (~SQS) and topic features (~SNS)
## Summary

- <font color=#f1ef63>SQS</font>
	- Queue service in AWS
	- Multiple Producers, messages kept up to 14 days
	- Multiple Consumers share the read and delete messages when done
	- Used to <font color=#10b981>decouple</font> applications in AWS
- <font color=#f1ef63>SNS</font>
	- Notification service in AWS
	- Subscribers:
		- Email
		- Lambda
		- SQS
		- HTTP
		- Mobile
		- Others
	- Multiple Subscribers, sending all messages to all of them
	- No message retention
- <font color=#f1ef63>Kinesis</font>
	- Real-time data streaming
- <font color=#f1ef63>Amazon MQ</font>
	- Managed message broker for Active MQ and Rabbit MQ in the cloud (MQTT, AMQP protocols)

---
## >> Sources <<

- Amazon SQS: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
## >> Table of contents (CLF-C02) <<

|                                                                         |                                                                                     |                                                                                       |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [1. What is Cloud Computing]({{< ref "1-what-is-cloud-computing" >}})   | [2. IAM]({{< ref "2-iam" >}})                                                       | [3. Budget]({{< ref "3-budget" >}})                                                   |
| [4. Ec2]({{< ref "4-ec2" >}})                                           | [5. Security Groups]({{< ref "5-security-groups" >}})                               | [6. Storage]({{< ref "6-storage" >}})                                                 |
| [7. AMI]({{< ref "7-ami" >}})                                           | [8. Scalability & High Availability]({{< ref "8-scalability-high-availability" >}}) | [9. Elastic Load Balancing]({{< ref "9-elastic-load-balancing" >}})                   |
| [10. Auto Scaling Group]({{< ref "10-auto-scaling-groups" >}})          | [11. S3]({{< ref "11-s3" >}})                                                       | [12. Databases]({{< ref "12-databases" >}})                                           |
| [13. Other Compute Services]({{< ref "13-other-compute-services" >}})   | [14. Deployments]({{< ref "14-deployments" >}})                                     | [15. AWS Global Infrastructure]({{< ref "15-aws-global-infrastructure" >}})           |
| [16. Cloud Integrations]({{< ref "16-cloud-integrations" >}})           | [17. Cloud Monitoring]({{< ref "17-cloud-monitoring" >}})                           | [18. VPC]({{< ref "18-vpc" >}})                                                       |
| [19. Security and Compliance]({{< ref "19-security-and-compliance" >}}) | [20. Machine Learning]({{< ref "20-machine-learning" >}})                           | [21. Account Management and Billing]({{< ref "21-account-management-and-billing" >}}) |
| [22. Advanced Identity]({{< ref "22-advanced-identity" >}})             | [23. Other Services]({{< ref "23-other-services" >}})                               | [24. AWS Architecting & Ecosystem]({{< ref "24-aws-architecting-cosystem" >}})        |
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
