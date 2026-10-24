---
title: Terraform and Lambda - Basics
date: 2026-05-01
description: Terraform Basics. Commands, Syntax, Arguments, Attributes, Meta-attributes.
summary: Terraform Basics. Commands, Syntax, Arguments, Attributes, Meta-attributes.
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

---

![](https://www.youtube.com/watch?v=5rG-YgTHMC8)

---
## Minimal Example

A basic Lambda setup usually includes an IAM role and the function itself. Here’s a compact example:

```
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
## >> Sources <<

[Resource: aws_lambda_function](https://registry.terraform.io/providers/-/aws/latest/docs/resources/lambda_function)