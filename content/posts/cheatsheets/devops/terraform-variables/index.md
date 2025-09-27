---
title: Terraform Variables Cheatsheet
date: 2025-09-09
description: Terraform Variables Cheatsheet.
summary: Terraform Variables Cheatsheet.
draft: false
tags:
categories:
  - DevOps
  - Cheatsheets
  - Terraform
---
```terraform
# INFO: String Variable
variable "vpcname" {
  description = "The name of the VPC"
  type        = string
  default     = "myvpc"  
}

# INFO: Number Variable
variable "sshport" {
  description = "The port for SSH access"
  type        = number
  default     = 22
}

# INFO: Boolean Variable
variable "enabled"  {
  description = "Enable or disable the feature"
  type        = bool
  default     = true
}

# INFO: List Variable
variable "mylist" {
  description = "A list of availability zones"
  type        = list(string)
  default     = ["Value1", "Value2"]
}

# INFO: Map Variable (Key-value pairs)
variable "mymap" {
  description = "A map of instance types"
  type        = map(string)
  default     = {
    Key1 = "Value1"
    Key2 = "Value2"
  }
}

# NOTE: Using variables in a resource

# INFO: String Variable
resource "aws_vpc" "mytfvpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = var.vpcname
  }
}

# INFO: Number Variable
resource "aws_vpc" "mytfvpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = var.mylist[0]
  }
}

# INFO: Map Variable
resource "aws_vpc" "mytfvpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = var.mymap["Key1"]
  }
}

# NOTE: Input variables
variable "inputname" {
  description = "Set the name of the VPC"
  type        = string
  default     = ""
}

resource "aws_vpc" "mytfvpc" {
  cidr_block = "10.0.0.0/16"
    tags = {
      Name = var.inputname
    }
  }

# NOTE: Output
output "vpcid" {
  description = "Output the VPC ID"
  value       = aws_vpc.mytfvpc.id
}

# NOTE: Tuples and Objects
variable "mytuple" {
  description = "A tuple with mixed types"
  type        = tuple([string, number, bool])
  default     = ["example", 42, true]
}

variable "myobject" {
  description = "An object with specific attributes"
  type = object({
    name   = string
    age    = number
    active = bool
  })
  default = {
    name   = "example"
    age    = 30
    active = true
  }
}
```