---
title: Terraform Modules
date: 2025-10-11
description: Develop local, re-usable Terraform Modules.
summary: Develop local, re-usable Terraform Modules.
draft: false
tags:
  - Terraform
  - HCTA0-003
categories:
  - DevOps
  - IaC
series: Terraform on AWS
---
{{< lead >}}

Modules can be downloaded locally from the [Terraform Registry](https://registry.terraform.io/browse/modules?provider=aws) (and modified to your needs) or built from scratch.

{{< /lead >}}
## Example `s3_bucket` Module

##### Folder Structure

```

terraform-project/
├── main.tf
├── variables.tf
├── outputs.tf
└── modules/
    └── s3_bucket/
        ├── main.tf
        ├── variables.tf
        └── outputs.tf
```

📄 _File:_  `modules/s3_bucket/variables.tf`

```shell
variable "bucket_name" {
  description = "Name of the S3 bucket"
  type        = string
}

variable "acl" {
  description = "Access control list for the bucket"
  type        = string
  default     = "private"
}

variable "tags" {
  description = "Tags to apply to the bucket"
  type        = map(string)
  default     = {}
}
```

📄 _File:_ `modules/s3_bucket/main.tf`

```shell
resource "aws_s3_bucket" "this" {
  bucket = var.bucket_name
  acl    = var.acl
  tags   = var.tags
}
```

📄 _File:_ `modules/s3_bucket/outputs.tf`

```shell
output "bucket_id" {
  description = "The ID of the bucket"
  value       = aws_s3_bucket.this.id
}

output "bucket_arn" {
  description = "The ARN of the bucket"
  value       = aws_s3_bucket.this.arn
}
```

📄 _File:_ Root Module: `main.tf`

```shell
module "my_bucket" {
  source      = "./modules/s3_bucket"
  bucket_name = "my-terraform-bucket"
  acl         = "private"
  tags = {
    Environment = "Dev"
    Owner       = "Rob"
  }
}

output "bucket_arn" {
  value = module.my_bucket.bucket_arn
}
```

## When to Provide Default Values?

{{< alert >}}

In Terraform, **default values in a module's `variables.tf` file are optional**, but they serve specific purposes depending on how you want your module to behave.

{{< /alert >}}

1. **To Make Inputs Optional**
    
    - If you want a variable to be optional for the user of the module, you must provide a default value.
    - Without a default, the variable becomes **required**, and Terraform will throw an error if it's not set.

```shell
variable "acl" {
  description = "Access control list for the bucket"
  type        = string
  default     = "private"  # Makes this optional
}
```

2. **To Set Sensible Defaults**
    
    - Use defaults to provide common or recommended values so users don’t have to specify them every time.
    - This improves usability and reduces boilerplate.

3. **To Support Multiple Environments**
    
    - Defaults can help standardize behavior across environments (e.g., default tags, naming conventions).

4. **To Avoid Breaking Changes**
    
    - When updating a module, adding a new variable **without a default** will break existing usage unless users update their code.
    - Providing a default ensures backward compatibility.
## When Not to Provide Defaults

- If the variable is **critical and must be explicitly set** (e.g., `bucket_name`), omit the default to force the user to provide it.
- If the value depends on external context (e.g., environment-specific settings), it's better to require it.
## Best Practice

- Use defaults for convenience and safety.
- Avoid defaults for values that must be unique or environment-specific.
- Always document your variables with `description` to clarify intent.

