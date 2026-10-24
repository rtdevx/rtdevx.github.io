---
title: Terraform and Lambda - Basics
date: 2026-05-01
description: Terraform and Lambda Basics. Commands, Syntax, Arguments.
summary: Terraform and Lambda Basics. Commands, Syntax, Arguments.
draft: false
tags:
  - Terraform
  - Lambda
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

*More:* [Resource: aws_lambda_function](https://registry.terraform.io/providers/-/aws/latest/docs/resources/lambda_function)
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

[Resource: aws_lambda_function](https://registry.terraform.io/providers/-/aws/latest/docs/resources/lambda_function)
## >> Disclaimer <<

{{< 26_disclaimer_aws_lambda_1 >}}