---
title: "Solutions Architect: Serverless"
date: 2026-04-10
description: "Serverless is a new paradigm in which the developers don’t have to \r

  manage servers anymore… They just deploy code..."
summary: "Serverless is a new paradigm in which the developers don’t have to \r

  manage servers anymore… They just deploy code..."
draft: false
tags:
  - SAA-C03
  - Serverless
  - Lambda
  - database
  - S3
  - SNS
  - SQS
  - Fargate
categories:
  - AWS
  - Containers
series: AWS Solution Architect
---

| <font color=#EB4925>AWS Certifications Series </font> »               |                                                                       |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [AWS Cloud Practitioner]({{< ref "series/aws-cloud-practitioner" >}}) | [AWS Solution Architect]({{< ref "series/aws-solution-architect" >}}) |

{{< lead >}}
**Serverless** means developers deploy code without managing any servers, infrastructure, or scaling themselves.

**Serverless** was pioneered by AWS Lambda but now also includes anything that’s managed: “*databases*, *messaging*, *storage*, etc.”
{{< /lead >}}
## Serverless services in AWS

- AWS Lambda
- DynamoDB
- AWS Cognito
- AWS API Gateway
- Amazon S3
- AWS SNS & SQS
- AWS Kinesis Data Firehose
- Aurora Serverless
- Step Functions
- Fargate
## AWS Lambda

- Virtual functions (no servers to manage)
- Limited by time (short executions)
- Run on-demand
- Automated scaling

- Simple pricing model: pay only for requests and compute time, with a generous free tier    
- Deep integration across AWS services    
- Supports multiple programming languages    
- Built‑in monitoring through CloudWatch    
- Easy to scale function resources (up to 10 GB RAM)    
- Increasing RAM also boosts CPU and network performance
### Lambda language support

- Supports **Node.js**, **Python**, **Java**, **C#/.NET Core**, **PowerShell**, and **Ruby**    
- Allows **custom runtimes** via the Runtime API (e.g., Rust, Go)    
- Can run **Lambda container images**, as long as they implement the Lambda Runtime API    
- For arbitrary Docker images, **ECS or Fargate** is generally the better choice
### Lambda integrations

![](./assets/AWS_Serverless_Lambda_Integrations.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

![](./assets/AWS_Serverless_Lambda_CRON.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
### Lambda pricing example

**You can find Lambda pricing information here:** [AWS Lambda pricing](https://aws.amazon.com/lambda/pricing)

- First **1M requests are free**, then **$0.20 per additional million**    
- You also get **400,000 GB‑seconds** of compute time free each month    
    - Equals **400,000 seconds** at 1 GB RAM        
    - Equals **3,200,000 seconds** at 128 MB RAM        
- After the free tier, compute costs **$1.00 per 600,000 GB‑seconds**    
- Overall, Lambda is extremely cost‑efficient, which drives its popularity
### Lambda Limits

- **Execution:**
	- Memory allocation: 128 MB - 10GB (1 MB increments)
	- Maximum execution time: 900 seconds (15 minutes)
	- Environment variables (4 KB)
	- Disk capacity in the “function container” (in /tmp): 512 MB to 10GB
	- Concurrency executions: 1000 (can be increased)
- **Deployment:**
	- Lambda function deployment size (compressed .zip): 50 MB
	- Size of uncompressed deployment (code + dependencies): 250 MB
	- Can use the /tmp directory to load other files at startup
	- Size of environment variables: 4 KB
#### Lambda Concurrency and Throttling

- **Concurrency limit:** up to 1000 concurrent executions
	- <font color=#EB4925>Can set a “<b>reserved concurrency</b>” at the function level (=limit)</font>
	- When invocations exceed your concurrency limit, Lambda **throttles** them
	- **Synchronous calls** return a **429 ThrottleError**
	- **Asynchronous calls** are **retried automatically**, and if they still fail, they’re sent to the **DLQ**
- If you need a higher limit, open a support ticket

{{< alert "circle-info" >}}

**Synchronous invocation**

The caller **waits for the Lambda function to finish** and gets the result immediately. <font color=#EBAC25>Examples:</font> API Gateway (REST), ALB, direct SDK calls.

If throttled → the caller instantly receives a **429 ThrottleError**.

**Asynchronous invocation**

The caller **does not wait** for the function to finish. Lambda queues the event and processes it in the background. <font color=#EBAC25>Examples:</font> S3 events, SNS, EventBridge.

If throttled → Lambda **automatically retries**, and if it still fails after retries, the event is sent to a DLQ.

**DLQ (Dead‑Letter Queue)**

A **DLQ** is a fallback destination (SQS queue or SNS topic) where Lambda sends events that **could not be processed successfully**, even after retries. It lets you inspect failed events instead of losing them.

{{< /alert >}}

![](./assets/AWS_Lambda_Concurrency_Issue.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")

{{< alert "circle-info" >}}

- If your function runs out of available concurrency, extra requests are **throttled**    
- For **429 throttling errors** or **500‑series system errors**, Lambda **requeues the event** and retries for **up to 6 hours**

{{< /alert >}}
#### Cold Starts & Provisioned Concurrency

- **Cold Start:** When a new Lambda instance is created, it must load your code and run initialization first; if this setup is heavy, the first request has noticeably higher latency.
    
- **Provisioned Concurrency:** Pre‑warms a set number of Lambda instances so they’re always ready, eliminating cold starts and ensuring consistently low latency; can be managed automatically with Application Auto Scaling.

![](./assets/AWS_Lambda_Concurrency_Reserved.png "© Amazon AWS, [Understanding Lambda function scaling](https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html)")

<font color=#EBAC25><i>More info:</i></font> 
- [Configuring provisioned concurrency for a Lambda function](https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html)
- [Understanding Lambda function scaling](https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html)
#### Lambda SnapStart

- Boosts Lambda performance (especially for Java, Python, and .NET) by running functions from a **pre‑initialized state** instead of starting from scratch    
- When a new version is published, Lambda **initializes the function once**, takes a **snapshot of its memory and disk state**, and caches it    
- Subsequent invocations launch from this cached snapshot, delivering **consistently low‑latency execution**
### Customization At The Edge

- Modern apps often run some logic at the **edge**, close to users to reduce latency    
- An **Edge Function** is code you attach to a CloudFront distribution to customize behavior    
- CloudFront offers **CloudFront Functions** and **Lambda@Edge**, both globally deployed and fully serverless    
- Ideal for **customizing CDN content** with no servers to manage
#### CloudFront Functions

- Lightweight JavaScript functions designed for ultra‑high‑scale, low‑latency CDN customisation  
- Start in under a millisecond and handle millions of requests per second    
- Operate on **Viewer Request** (when CloudFront receives the request) and **Viewer Response** (before CloudFront returns the response)    
- Fully native to CloudFront, with code managed entirely inside the service
#### Lambda@Edge

- Lambda@Edge lets you run **Node.js or Python** functions at CloudFront locations, scaling to thousands of requests per second    
- You can modify CloudFront traffic at all four lifecycle points:    
    - **Viewer Request** – when CloudFront first receives the request        
    - **Origin Request** – before CloudFront sends the request to the origin        
    - **Origin Response** – after the origin returns a response        
    - **Viewer Response** – before CloudFront sends the response back to the user        
- You write and publish the function in **us‑east‑1**, and CloudFront automatically replicates it globally
#### CloudFront Functions vs. Lambda@Edge

|                                    | CloudFront Functions                      | Lambda@Edge                                                                    |
| ---------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------ |
| Runtime Support                    | JavaScript                                | Node.js, Python                                                                |
| Scale                              | **Millions** of requests per second       | Up to **10,000** of requests per second per Region                             |
| Event Sources                      | - Viewer Request<br>- Viewer Response     | - Viewer Request<br>- Viewer Response<br>- Origin Request<br>- Origin Response |
| Max. Execution Time                | < 1 ms                                    | Up to 30 seconds                                                               |
| Max. Memory                        | 2 MB                                      | 128 MB up to 10 GB                                                             |
| Total Package Size                 | 10 KB                                     | 1 MB – 50 MB                                                                   |
| Network Access, File System Access | No                                        | Yes                                                                            |
| Access to the Request Body         | No                                        | Yes                                                                            |
| Pricing                            | Free tier available, 1/6th price of @Edge | No free tier, charged per request & duration                                   |

<font color=#EBAC25><i>More info:</i></font> [Differences between CloudFront Functions and Lambda@Edge](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions-choosing.html)
#### CloudFront Functions & Lambda@Edge Use Cases

- Website Security and Privacy
- Dynamic Web Application at the Edge
- Search Engine Optimization (SEO)
- Intelligently Route Across Origins and Data Centers
- Bot Mitigation at the Edge
- Real-time Image Transformation
- A/B Testing
- User Authentication and Authorization
- User Prioritization
- User Tracking and Analytics
### Lambda Deployments

- By default, Lambda runs **outside your VPC** in an AWS‑managed VPC    
- Because of this, it **cannot directly reach private resources** in your VPC such as RDS, ElastiCache, or internal load balancers
#### Lambda in VPC

- You must define the VPC ID, the Subnets and the Security Groups
- Lambda will create an ENI (Elastic Network Interface) in your subnets

![](./assets/AWS_Lambda_in_VPC.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
#### Lambda with RDS Proxy

- When Lambda connects directly to a database, high traffic can create **too many open connections**    
- **RDS Proxy** solves this by pooling and reusing connections, improving scalability    
- It also boosts availability by **preserving connections during failovers** and cutting failover time by **up to 66%**    
- Security improves through **IAM authentication** and credential storage in **Secrets Manager**   
- Because RDS Proxy is **never publicly accessible**, the Lambda function must run **inside your VPC**

![](./assets/AWS_Lambda_RDS_Proxy.png "© Stéphane Maarek, [DataCumulus](https://courses.datacumulus.com/)")
#### Invoking Lambda from RDS & Aurora

- Your database can directly **invoke Lambda functions** to process events from inside the DB    
- Supported on **RDS PostgreSQL** and **Aurora MySQL**    
- The DB instance must have **outbound network access** to reach Lambda (Public, NAT Gateway, or VPC Endpoints)    
- The DB also needs permission to invoke the function via a **Lambda resource‑based policy** and an **IAM policy**

---
## >> Sources <<

- [Serverless on AWS](https://aws.amazon.com/serverless/)
- [Serverless Documentation](https://docs.aws.amazon.com/serverless/)

**Lambda:**

- [AWS Lambda pricing](https://aws.amazon.com/lambda/pricing)

- [Configuring provisioned concurrency for a Lambda function](https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html)
- [Understanding Lambda function scaling](https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html)
- [Differences between CloudFront Functions and Lambda@Edge](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions-choosing.html)


## >> References <<

**TAG:** [Serverless]({{< ref "tags/serverless" >}})
## >> Disclaimer <<

{{< 26_disclaimer_aws_saac03 >}}