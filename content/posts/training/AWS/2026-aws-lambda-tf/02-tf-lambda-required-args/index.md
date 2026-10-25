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
## Function name

- <font color=#EB4925>Required Argument</font>
- <font color=#EB4925>Must be unique inside of the region</font> and the AWS Account

{{< alert "circle-info" >}}

Because Lambda Function Name must be regionally unique, therefore using fixed Lambda Function name within a Terraform module will not work.

For Terraform modules, use `random_id` resource (see below).

{{< /alert >}}

```bash
resource "random_id" "id" {
  byte_length = 8
}
```

```bash
resource "aws_lambda_function" "lambda" {
  function_name = "friendly_name-${random_id.id.hex}"
}
```

_More:_ [Terraform Registry: random_id](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/id)
## Handler

(Optional) Function entry point in your code. Required if `package_type` is `Zip`. 

>This is where [Lambda Function]({{< ref "tags/lambda" >}}) finds it's entry point in the zip file.
## Runtime

(Optional) Identifier of the function's runtime. Required if `package_type` is `Zip`.

The runtime is the software environment in which the function runs.

`runtime = "nodejs12.x"`
### nodejs runtimes

| Name       | Identifier   | Operating system  | Deprecation date | Block function create | Block function update |
| ---------- | ------------ | ----------------- | ---------------- | --------------------- | --------------------- |
| Node.js 26 | `nodejs26.x` | Amazon Linux 2023 | Not scheduled    | Not scheduled         | Not scheduled         |
| Node.js 24 | `nodejs24.x` | Amazon Linux 2023 | Apr 30, 2028     | Jun 1, 2028           | Jul 1, 2028           |
| Node.js 22 | `nodejs22.x` | Amazon Linux 2023 | Apr 30, 2027     | Jul 29, 2027          | Aug 31, 2027          |
### Lambda Runtime Support Policy

{{< alert "circle-info" >}}

[AWS Lambda]({{< ref "tags/lambda" >}}) runtimes are managed through a <font color=#C7EB25>lifecycle</font> that includes <font color=#EBAC25>introduction</font>, <font color=#EBAC25>support</font>, and eventual <font color=#EB4925>deprecation</font>. This policy ensures that users have access to secure and updated runtimes for their serverless applications.

**Important Considerations**

- **End-of-Life (EOL):** Once a runtime reaches EOL, it will not receive any further security updates or technical support. Users are encouraged to migrate to supported runtimes to avoid vulnerabilities.
- **Upgrade Recommendations:** It is advisable to upgrade to the latest Long Term Support (LTS) version of a runtime to ensure continued support and security.    
- **Monitoring:** Users should regularly check AWS notifications and Trusted Advisor for updates on deprecated runtimes and plan migrations accordingly.

{{< /alert >}}

‼️_More:_ [AWS Lambda Function Runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)
## Execution role


## Lambda Code Sources

AWS Lambda supports three code sources when managed through Terraform:

- Local ZIP file (`filename`)
- ZIP stored in S3 (`s3_bucket` + `s3_key`)
- Container image stored in ECR (`image_uri`)
### Basic Function with Node.js

```bash
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
}
```

{{< alert "circle-info" >}}

When using **ECR**, the Lambda **runtime** and **handler** are defined _inside the container image_, not in Terraform. Terraform only needs:

- `function_name`    
- `role`    
- `package_type = "Image"`    
- `image_uri`    

So the “runtime” and “handler” requirement applies only to ZIP‑based Lambdas.

{{< /alert >}}
### Container Image Function

```bash
resource "aws_lambda_function" "example" {
  function_name = "example_container_function"
  role          = aws_iam_role.example.arn
  package_type  = "Image"
  image_uri     = "${aws_ecr_repository.example.repository_url}:latest"

  image_config {
    entry_point = ["/lambda-entrypoint.sh"]
    command     = ["app.handler"]
  }

  memory_size = 512
  timeout     = 30

  architectures = ["arm64"] # Graviton support for better price/performance
}
```

*More:* [Terraform Registry: aws_lambda_function](https://registry.terraform.io/providers/-/aws/latest/docs/resources/lambda_function)
## >> Sources <<

- [AWS Lambda](https://aws.amazon.com/lambda/)
- [Terraform Registry: aws_lambda_function](https://registry.terraform.io/providers/-/aws/latest/docs/resources/lambda_function)
- [Terraform Registry: random_id](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/id)
- [AWS Lambda Function Runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)
## >> Disclaimer <<

{{< 26_disclaimer_aws_lambda_1 >}}