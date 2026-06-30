---
title: Cloud Integrations & Messaging
date: 2025-08-16
description: Cloud Integrations. This section is about multiple applications communicating with each other.
summary: Cloud Integrations / decoupling. This section is about multiple applications communicating with each other. SNS, SQS, MQ....
draft: false
tags:
  - CLF-C02
  - SQS
  - SNS
  - MQ
  - Kinesis
categories: AWS
series: AWS Cloud Practitioner
---
This section is about multiple applications communicating with each other.

1. **Synchronous communication** (application to application)
	- Can be problematic if there are sudden spikes of traffic
2. **Asynchronous / Event-based communication** (application to queue to application)
	- It is called <font color=#C7EB25>decoupling</font> of applications
		- **SQS:** queue model
		- **SNS:** pub / sub model
		- **Kinesis:** real-time data streaming model
	- Those services can scale independently from our application

![](./assets/AWS_Integrations.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
## SQS

##### <font color=#EBAC25>SQS</font> = Simple Queue Service.

![](./assets/AWS_SQS_Queue.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
_[What is Amazon SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)_
### SQS - Standard Queue

- Oldest AWS offering (over 10 years old)
- Fully managed, <font color=#C7EB25>serverless</font> service used to <font color=#C7EB25>decouple</font> applications
- Sales from 1 message per second to 10,000s per second
- Default messages retention: 4 days, maximum 14 days
- No limit to how many messages can be in the queue
- Messages are deleted after they're read by consumers (applications)
- Low latency
- Consumers share the work to read messages and scale horizontally

![](./assets/AWS_SQS_Queue2.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### SQS - FIFO Queue

##### <font color=#EBAC25>FIFO</font> = First in First Out (ordering of messages in the queue)

![](./assets/AWS_SQS_Queue_FIFO.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
_Messages are processed in order by the consumer._

- Messages are processed in order by the consumer
- Ordering by Message Group ID (all messages in the same group are ordered) – mandatory parameter
### SQS – Consuming Messages

- Consumers (running on EC2 instances, servers, or AWS Lambda)…
- Poll SQS for messages (receive up to 10 messages at a time)
- Process the messages (example: insert the message into an RDS database)
- Delete the messages using the DeleteMessage API
### Amazon SQS - Security

- **Encryption:**    
    - In‑flight via HTTPS        
    - At‑rest with KMS keys        
    - Optional client‑side encryption for full control        
- **Access control:**    
    - IAM policies govern who can call SQS APIs        
    - SQS access policies (like S3 bucket policies) enable cross‑account access        
    - Useful for allowing services such as SNS or S3 to send messages to a queue
### SQS – Message Visibility Timeout

- Once a consumer reads a message, it becomes invisible to others    
- Default visibility timeout is **30 seconds** - the window to finish processing    
- When the timeout expires, the message becomes visible again    
- If processing isn’t finished in time, the message may be processed **twice**    
- Consumers can extend the timeout using **ChangeMessageVisibility**    
- <font color=#EBAC25>Very long timeouts delay retries if a consumer crashes</font>
- <font color=#EBAC25>Very short timeouts increase the chance of duplicate processing</font>

![](./assets/AWS_SQS_Visibility_Timeout.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### Amazon SQS - Long Polling

- Consumers can wait for messages to arrive instead of returning immediately    
- This is **Long Polling**, which reduces API calls and improves efficiency/latency    
- Wait time ranges from **1–20 seconds** (20 seconds recommended)    
- Preferable to short polling
### SQS as a buffer to database writes

![](./assets/AWS_SQS_DB_Buffer.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### SQS to decouple between application tiers

![](./assets/AWS_SQS_Decouple_App_Tiers.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

## Amazon Kinesis

🏅 **Solutions Architect Associate level extension:** [Kinesis - SAAC03]({{< ref "55-serverless-saac03/#amazon-kinesis-data-streams" >}}).
##### <font color=#EBAC25>Kinesis</font> = real-time big data streaming.

Managed service to collect, process and analyze real-time streaming data at any scale.
## Amazon SNS

##### <font color=#EBAC25>SNS</font> = Simple Notification Service.

**SNS** is sending one message to multiple receivers.

![](./assets/AWS_SNS1.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

- The "event publishers" only sending message to one SNS topic
- As many "event publishers" as we want to listen to the SNS topic notifications
- <font color=#EB4925>Each subscriber to the topic will get all the messages</font>
- Up to 12,500,000 subscriptions per topic, 100,000 topics limit

![](./assets/AWS_SNS2.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
## SQS vs SNS vs Kinesis

| SQS                                             | SNS                                                  | Kinesis                                                   |
| ----------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------- |
| Consumer “pull data”                            | Push data to many subscribers                        | Standard: pull data (2 MB per shard)                      |
| Data is deleted after being consumed            | Up to 12,500,000 subscribers                         | Enhanced-fan out: push data (2 MB per shard per consumer) |
| Can have as many workers (consumers) as we want | Data is not persisted (lost if not delivered)        | Possibility to replay data                                |
| No need to provision throughput                 | Pub/Sub                                              | Meant for real-time big data, analytics and ETL           |
| Ordering guarantees only on FIFO queues         | Up to 100,000 topics                                 | Ordering at the shard level                               |
| Individual message delay capability             | No need to provision throughput                      | Data expires after X days                                 |
|                                                 | Integrates with SQS for fan out architecture pattern | Provisioned mode or on demand capacity mode               |
|                                                 | FIFO capability for SQS FIFO                         |                                                           |

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

- <font color=#EBAC25>SQS</font>
	- Queue service in AWS
	- Multiple Producers, messages kept up to 14 days
	- Multiple Consumers share the read and delete messages when done
	- Used to <font color=#C7EB25>decouple</font> applications in AWS
- <font color=#EBAC25>SNS</font>
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
- <font color=#EBAC25>Kinesis</font>
	- Real-time data streaming
- <font color=#EBAC25>Amazon MQ</font>
	- Managed message broker for Active MQ and Rabbit MQ in the cloud (MQTT, AMQP protocols)

---
## >> Sources <<

- Amazon SQS: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
## >> Disclaimer <<

{{< disclaimer_practitioner25 >}}

| <font color=#EB4925>AWS Certification Series</font> »                 |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |
