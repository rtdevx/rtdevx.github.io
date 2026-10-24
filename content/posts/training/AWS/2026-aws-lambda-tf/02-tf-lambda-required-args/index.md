---
title: Terraform and Lambda - Required Arguments
date: 2026-05-02
description: At minimum, a Terraform‑managed Lambda needs a function name, runtime, handler, IAM role ARN, and a source code package (filename, S3 location or ECR).
summary: At minimum, a Terraform‑managed Lambda needs a function name, runtime, handler, IAM role ARN, and a source code package (filename, S3 location or ECR).
draft: false
tags:
  - Terraform
  - Lambda
  - APIGateway
categories:
  - DevOps
  - IaC
  - AWS
series: Terraform and Lambda
---
{{< lead >}}

<font color=#C7EB25>The first</font> and <font color=#EBAC25>the most fundamental thing</font> <font color=#EB4925>for the Lambda function to run is:</font> **the code**.

{{< /lead >}}

AWS Lambda supports three code sources when managed through Terraform:

- Local ZIP file (`filename`)
- ZIP stored in S3 (`s3_bucket` + `s3_key`)
- Container image stored in ECR (`image_uri`)
## Basic Function with Node.js

{{< highlight YAML "linenos=table,hl_lines=21-22 26-29" >}}
# IAM role for Lambda execution
data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "example" {
  name               = "lambda_execution_role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}
# Package the Lambda function code
data "archive_file" "example" {
  type        = "zip"
  source_file = "${path.module}/lambda/index.js"
  output_path = "${path.module}/lambda/function.zip"
}
# Lambda function
resource "aws_lambda_function" "example" {
  filename      = data.archive_file.example.output_path
  function_name = "example_lambda_function"
  role          = aws_iam_role.example.arn
  handler       = "index.handler"
  code_sha256   = data.archive_file.example.output_base64sha256

  runtime = "nodejs24.x"

  environment {
    variables = {
      ENVIRONMENT = "production"
      LOG_LEVEL   = "info"
    }
  }

  tags = {
    Environment = "production"
    Application = "example"
  }
}

{{< /highlight >}}

{{< alert "circle-info" >}}

When using **ECR**, the Lambda **runtime** and **handler** are defined _inside the container image_, not in Terraform. Terraform only needs:

- `function_name`    
- `role`    
- `package_type = "Image"`    
- `image_uri`    

So the “runtime” and “handler” requirement applies only to ZIP‑based Lambdas.

{{< /alert >}}

*More:* [Resource: aws_lambda_function](https://registry.terraform.io/providers/-/aws/latest/docs/resources/lambda_function)
## >> Sources <<

- [Resource: aws_lambda_function](https://registry.terraform.io/providers/-/aws/latest/docs/resources/lambda_function)
## >> Disclaimer <<

{{< 26_disclaimer_aws_lambda_1 >}}