---
title: Terraform and Lambda - Basics
date: 2026-05-01
description: Terraform and Lambda Basics. Commands, Syntax, Arguments.
summary: Terraform and Lambda Basics. Commands, Syntax, Arguments.
draft: false
tags:
  - Terraform
  - Lambda
  - APIGateway
  - Serverless
  - HighAvailability
categories:
  - DevOps
  - IaC
  - AWS
series: Terraform and Lambda
---
{{< lead >}}
Using **Terraform** to manage **AWS Lambda** gives you a clean, repeatable way to define serverless functions as code. 

Instead of configuring everything manually in the AWS console, you describe your Lambda, its permissions, and its dependencies in simple Terraform blocks. This keeps your setup consistent across environments and easy to track in version control.
{{< /lead >}}

## Lambda introduction

---

{{< youtube 5rG-YgTHMC8 >}}
*Code:* https://github.com/nealdct/serverless-for-beginners

---
### Lambda and Terraform

A basic Lambda setup usually includes an IAM role and the function itself. Here’s a compact example:

```bash
resource "aws_iam_role" "lambda_exec" {
  name = "lambda_basic_execution"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action    = "sts:AssumeRole"
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "hello_world" {
  function_name = "hello_world"
  handler       = "index.handler"
  runtime       = "nodejs18.x"
  role          = aws_iam_role.lambda_exec.arn
  filename      = "lambda.zip"
}
```

*More:* [Terraform Registry: aws_lambda_function](https://registry.terraform.io/providers/-/aws/latest/docs/resources/lambda_function)
### Serverless Services

- No instances to manage.
- No need to provision hardware.
- No management of Operating Systems or Software.
- Capacity provisioning and patching is handled automatically.
- Provides automatic scaling and [High Availability]({{< ref "tags/highavailability" >}}).
- Can be very cheap.
### AWS Lambda

- **Languages** - Lambda natively supports Java, Go, PowerShell, Node.js, C#, Python, and Ruby.
- **Execution Role** ([IAM]({{< ref "tags/iam" >}}) Role) - this role grants the function permissions to access AWS services and resources.
- [Monitoring]({{< ref "tags/monitoring" >}}) and **Logging** - integrated with [CloudWatch]({{< ref "tags/cloudwatch" >}}).
- **Memory and Timeout** - memory and maximum execution timeout can be specified for each function.

{{< alert "edit" >}}
📝 _Note:_  the maximum execution time is 15 minutes.
{{< /alert >}}

[Lambda]({{< ref "tags/lambda" >}}) functions run in response to events from various AWS Services or direct invocation from the AWS SDKs or API.

Functions can be invoked <font color=#C7EB25>synchronously</font> or <font color=#EBAC25>asynchronously</font>:

- with <font color=#C7EB25>synchronous</font> invocation, applications wait for the function to process the event and return a response.
- with <font color=#EBAC25>asynchronous</font> invocation, Lambda queues the event for processing and returns a response immediately.

{{< alert "circle-info" >}}

<a href="{{< ref "tags/lambda" >}}" target="_self">Lambda</a> scales horizontally by running multiple instances of a function in parallel - up to the concurrency limit.

{{< /alert >}}

{{< lead >}}

<font color=#EB4925>Lambda functions are Regional and do not have VPC access by default</font>. They can be connected to VPC.

{{< /lead >}}

{{< mermaid >}}

flowchart TD

    Lambda["AWS Lambda<br/>(Outside VPC by Default)"]

    subgraph VPC["Amazon VPC"]

        subgraph AZA["AZ A"]

            ENI1["ENI"]

            EC2A["EC2 Instance"]

        end

        subgraph AZB["AZ B"]

            ENI2["ENI"]

            EC2B["EC2 Instance"]

        end

        NAT["NAT Gateway"]

        IGW["Internet Gateway"]

    end

    Internet["Internet"]

    Lambda -.->|"VPC Configuration"| ENI1

    Lambda -.->|"VPC Configuration"| ENI2

    ENI1 --> EC2A

    ENI2 --> EC2B

    ENI1 --> NAT

    ENI2 --> NAT

    NAT --> IGW

    IGW --> Internet

{{< /mermaid >}}
#### Creating a Lambda Function

{{< alert "circle-info" >}}

In our basic <ins><i>Example</i></ins> below, a manual test event invokes the first `Lambda` function, which sends a message to an `Amazon SQS` queue. The queue is then polled by a second `Lambda` function through an event source mapping, and the function stores the processed data in a `DynamoDB` table.

{{< /alert >}}

{{< mermaid >}}

flowchart LR

    Test["Manual Test Event"]

    Producer["Lambda Function"]

    SQS["Amazon SQS Queue"]

    Consumer["Lambda Function"]

    DDB["Amazon DynamoDB Table"]

    Test -->|Invoke| Producer

    Producer -->|SendMessage| SQS

    SQS -->|Poll & Invoke| Consumer

    Consumer -->|PutItem| DDB

{{< /mermaid >}}
### SQS
### SNS
### Event Bridge
## API Gateway

{{< alert "circle-info" >}}

When you start exposing your Lambda functions to the outside world, AWS API Gateway is usually the first service you meet. In the context of your Terraform‑based workflow, API Gateway acts as the HTTP front door: it receives requests, routes them to your Lambda, and returns the response to the client.

This pairing is common in serverless architectures because it removes the need for servers, load balancers, or networking configuration. You define an endpoint, connect it to your Lambda, and Terraform handles the provisioning.

{{< /alert >}}

---

{{< youtube jcibXVFiFek >}}

---

- **Public access** - Lambda alone can’t accept HTTP requests; API Gateway provides the URL.    
- **Routing & methods** - You can define GET, POST, etc., and map them to specific Lambda integrations.    
- **Security** - You can add API keys, IAM auth, or JWT authorizers later as your course progresses. 
- **Versioning & stages** - API Gateway lets you publish dev/test/prod stages cleanly.
### API Gateway and Terraform

This is a stripped‑down example showing how an HTTP API can invoke your Lambda:

```bash
resource "aws_apigatewayv2_api" "http_api" {
  name          = "example-http-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id           = aws_apigatewayv2_api.http_api.id
  integration_type = "AWS_PROXY"
  integration_uri  = aws_lambda_function.hello_world.invoke_arn
}

resource "aws_apigatewayv2_route" "default_route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "default_stage" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}

```

Once applied, Terraform gives you a public endpoint. When someone hits that URL, API Gateway forwards the request to your Lambda and returns the response.
## >> Sources <<

- [AWS Lambda](https://aws.amazon.com/lambda/)
- [Terraform Registry: aws_lambda_function](https://registry.terraform.io/providers/-/aws/latest/docs/resources/lambda_function)

- Code for the AWS Lambda YouTube Video: https://github.com/nealdct/serverless-for-beginners
## >> Disclaimer <<

{{< 26_disclaimer_aws_lambda_1 >}}