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
  - CloudWatch
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

Because [Lambda Function]({{< ref "tags/lambda" >}}) Name must be regionally unique, therefore using fixed Lambda Function name within a [Terraform]({{< ref "tags/terraform" >}}) module will not work.

‼️For Terraform modules, use `random_id` resource (see below).

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

```bash
runtime = "nodejs12.x"
```
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

‼️ _More:_ [AWS Lambda Function Runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)
## ✨Execution role

`role` (<font color=#EB4925>Required</font>) ARN of the function's execution role. <font color=#EBAC25>The role provides the function's identity and access to AWS services and resources</font>.

```bash
role          = aws_iam_role.example.arn
```

{{< lead >}}

The <font color=#C7EB25>Execution Role</font> <font color=#EBAC25>defines which AWS resources the Lambda function can access</font>.

{{< /lead >}}
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
## Optional Settings

### Log group

[Lambda]({{< ref "tags/lambda" >}}) uses [CloudWatch]({{< ref "tags/cloudwatch" >}}) Logs to store its logs. <font color=#EBAC25>This is set up automatically and doesn't need to be configured</font> except of permissions. 

{{< alert "circle-info" >}}

<font color=#EB4925>Lambda Function requires IAM permissions to create a Log Group</font>. Log group name is fixed and can't be changed: `/aws/lambda/{function-name}`.

Under a `Log Group`, there are a multiple `Log Streams`. `Log Streams` contain Log Entries. 

{{< /alert >}}

{{< lead >}}

{{< center >}}
# {{< icon "skull-crossbones" >}}{{< icon "skull-crossbones" >}}{{< icon "skull-crossbones" >}}
{{< /center >}}

<a href="{{< ref "tags/cloudwatch" >}}" target="_self">CloudWatch</a> <font color=#EB4925>Lifecycle policies should be created</font> when creating Lambda Functions otherwise logs never expire (default) and are not deleted automatically.

{{< /lead >}}
#### ✨Terraform managed Log Group

1. Create a Log Group resource

```bash
resource "aws_cloudwatch_log_group" "loggroup" {
  name              = "${aws_lambda_function.lambda.function_name}"
  retention_in_days = 14

  tags = {
    Environment = "production"
    Application = "serviceA"
  }
}
```

2. Remove the `logs:CreateLogGroup`

{{< lead >}}

{{< center >}}
# {{< icon "skull-crossbones" >}}{{< icon "skull-crossbones" >}}{{< icon "skull-crossbones" >}}
{{< /center >}}

Remove `logs:CreateLogGroup` permission from the Lambda Function. 

When both - Lambda and Terraform can create the `LogGroup`, <font color=#EB4925>it could create the race condition</font>. <font color=#EBAC25>By removing the permissions from the Lambda Function, you ensure Terraform will be the one that is managing the resource</font>.

{{< /lead >}}
### Environment variables

(Optional) Configuration block for environment variables.

Parameters can be passed to the Lambda Function via Environment Variables.


{{< highlight bash "linenos=table,hl_lines=2 " >}}
# S3 Bucket
resource "aws_s3_bucket" "bucket" {
  bucket = "example-bucket"
}

{{< /highlight >}}

{{< highlight bash "linenos=table,hl_lines=11-13 " >}}
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
      BUCKET = "aws_s3_bucket.bucket"
    }
  }
}

{{< /highlight >}}

ℹ️ _Note:_ Can be used to reference `AWS Resources`, Passwords in `AWS Secrets Manager` , etc.
### 🔥Memory

`memory_size` - (Optional) Amount of memory in MB your Lambda Function can use at runtime. Valid value between 128 MB to 32,768 MB (32 GB), in 1 MB increments. Defaults to 128.

[CloudWatch]({{< ref "tags/cloudwatch" >}}) Logs can be used to find out how much memory our [Lambda Function]({{< ref "tags/lambda" >}}) is using.

{{< alert "lightbulb" >}}

‼️ _Note:_ In <a href="{{< ref "tags/lambda" >}}" target="_self">AWS Lambda</a>, allocated memory directly affects allocated CPU.

<a href="{{< ref "tags/lambda" >}}" target="_self">Lambda Function</a> is billed for the duration - for that reason sometimes increasing the memory could make it cheaper.

{{< /alert >}}

>More RAM => More CPU power => Shorter running time

{{< mermaid >}}

flowchart TD 

	Memory["Increase Lambda Memory"] 
	Memory --> CPU["More CPU"] 
	Memory --> Rate["Higher Cost Per Millisecond"] 
	CPU --> Faster["Faster Execution"] 
	Faster --> Runtime["Shorter Runtime"] 
	Runtime --> Decision{"Runtime Reduced Enough?"} 
	Rate --> Decision Decision -->|Yes| 
	Lower["Lower Overall Cost"] Decision -->|No| 
	Higher["Higher Overall Cost"] 
	
	style Memory fill:#FF9900,color:#fff 
	style CPU fill:#527FFF,color:#fff 
	style Faster fill:#2E7D32,color:#fff 
	style Runtime fill:#2E7D32,color:#fff 
	style Lower fill:#1565C0,color:#fff 
	style Higher fill:#D32F2F,color:#fff

{{< /mermaid >}}
### Timeout

### Reserved concurrency

## >> Sources <<

- [AWS Lambda](https://aws.amazon.com/lambda/)
- [Terraform Registry: aws_lambda_function](https://registry.terraform.io/providers/-/aws/latest/docs/resources/lambda_function)
- [Terraform Registry: random_id](https://registry.terraform.io/providers/hashicorp/random/latest/docs/resources/id)
- [AWS Lambda Function Runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)
## >> Disclaimer <<

{{< 26_disclaimer_aws_lambda_1 >}}