---
title: "Terraform: Loops, Meta-Arguments, Splat Operator and Functions"
date: 2025-10-05
description: Terraform Loops, Meta-Arguments, Splat Operator and Functions.
summary: Terraform Loops, Meta-Arguments, Splat Operator and Functions.
draft: false
tags:
  - Assoc003
categories:
  - Terraform
  - DevOps
  - IaC
---
## Variable List and Map

📄 _File:_ c2-variables.tf

```shell
# INFO: Redefining "instance_type" variable to use List and / or Map

# INFO: EC2 Instance Type - List
variable "instance_type_list" {
  description = "EC2 Instance Type(List)"
  type        = list(string)            # NOTE: Define list of strings variable type
  default     = ["t3.nano", "t3.micro"] # NOTE: (Multiple) default values
}

# INFO: EC2 Instance Type - Map
variable "instance_type_map" {
  description = "EC2 Instance Type(Map)"
  type        = map(string) # NOTE: Define map of strings
  default = {
    "dev"  = "t3.nano"  # NOTE: Define default string for dev
    "qa"   = "t3.micro" # NOTE: Define default string for qa
    "prod" = "t3.small" # NOTE: Define default string for prod
  }
}
```

📄 _File:_ c5-ec2instance.tf

```shell
# INFO: Create EC2 Instance
# INFO: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#example-usage

# EC2 Instance
resource "aws_instance" "myec2vm" {
  ami = data.aws_ami.amzlinux2.id
  # NOTE: Referencing List and Map variables
  #instance_type = var.instance_type
  #instance_type = var.instance_type_list[1] # NOTE: Accessing variable of a type "list"
  instance_type = var.instance_type_map["dev"]           # NOTE: Accessing variable of a type "map"
  user_data     = file("${path.module}/app1-install.sh") # NOTE: Apply User Data
  key_name      = var.instance_keypair                   # NOTE: Attach Key-Pair ID
  vpc_security_group_ids = [                             # NOTE: Attach INGRESS SG
    aws_security_group.vpc-ssh.id,
    aws_security_group.vpc-web-80.id,
    aws_security_group.vpc-web-443.id,
    aws_security_group.vpc-egress.id # NOTE: Attach EGRESS SG
  ]
  count = "2" # NOTE: Add count Meta-Argument to create a number of the same resoure type
  tags = {
    "Name"        = "Count Demo ${count.index}" # NOTE: Update the name to reflect "count.index" to iterate
    "Description" = "Variable Lists, Maps and Meta-Arguments"
  }
}
```

{{< alert "circle-info" >}}

**Drawbacks of using count in this example**
- Resource Instances in this case were identified using index numbers instead of string values like actual `subnet_id`
- If an element was removed from the middle of the list, every instance after that element would see its `subnet_id` value change, resulting in more remote object changes than intended
- Even the `subnet_ids` should be pre-defined or we need to get them again using `for_each` or for using various `datasources`
- Using `for_each` gives the same flexibility without the extra churn

{{< /alert >}}
## For Loops and Splat Operators in Outputs

📄 _File:_ c6-outputs.tf

```shell
# INFO: Terraform Output Values
# INFO: https://developer.hashicorp.com/terraform/language/block/output

/* Concepts Covered
1. For Loop with List
2. For Loop with Map
3. For Loop with Map Advanced
4. Legacy Splat Operator (latest) - Returns List
5. Latest Generalized Splat Operator - Returns the List
*/

# Output - For Loop with List
output "for_output_list" {
  description = "For Loop with List"
  value       = [for instance in aws_instance.myec2vm : instance.public_dns] # NOTE: Accessing list via square brackets
}

# Output - For Loop with Map
output "for_output_map1" {
  description = "For Loop with Map"
  value = {
    for instance in aws_instance.myec2vm : instance.id => instance.public_dns # NOTE: Accessing map via "flower" brackets. Maps are key-value.
  }
}

# Output - For Loop with Map Advanced
output "for_output_map2" {
  description = "FOr Loop with Map - Advanced"
  value = {
    for c, instance in aws_instance.myec2vm : c => instance.public_dns # NOTE: For c means for each count (like count.index)
  }

}

# Output Legacy Splat Operator (Legacy) - Returns the List
/*
output "legacy_splat_instance_publicdns" {
  description = "Legacy Splat Operator"
  value = aws_instance.myec2vm.*.public_dns
}
*/

# Output Latest Generalized Splat Operator - Returns the List
output "latest_splat_instance_publicdns" {
  description = "Generalized latest Splat Operator"
  value       = aws_instance.myec2vm[*].public_dns
}
```

## `for_each` Meta-Argument

📄 _File:_ c5-ec2instance.tf

{{< highlight shell "linenos=table,hl_lines=30-35" >}}
# INFO: Create EC2 Instance
# INFO: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance#example-usage
# INFO: First retrieve all available availability zones in the region
#INFO: https://registry.terraform.io/providers/-/aws/latest/docs/data-sources/availability_zones

# INFO: Gather all Availability Zones in your respective Region (as defined in c2-variables.tf)
data "aws_availability_zones" "my_azones" {
  filter {
    name   = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}

# INFO: EC2 Instance
resource "aws_instance" "myec2vm" {
  ami = data.aws_ami.amzlinux2.id
  # NOTE: Referencing List and Map variables
  #instance_type = var.instance_type
  #instance_type = var.instance_type_list[1] # NOTE: Accessing variable of a type "list"
  instance_type = var.instance_type_map["dev"]           # NOTE: Accessing variable of a type "map"
  user_data     = file("${path.module}/app1-install.sh") # NOTE: Apply User Data
  key_name      = var.instance_keypair                   # NOTE: Attach Key-Pair ID
  vpc_security_group_ids = [                             # NOTE: Attach INGRESS SG
    aws_security_group.vpc-ssh.id,
    aws_security_group.vpc-web-80.id,
    aws_security_group.vpc-web-443.id,
    aws_security_group.vpc-egress.id # NOTE: Attach EGRESS SG
  ]

  # NOTE: Create EC2 Instance in all Availabilty Zones of a VPC  
  for_each          = toset(data.aws_availability_zones.my_azones.names)
  availability_zone = each.key # NOTE: You can also use each.value because for list items each.key == each.value

  tags = {
    "Name" = "for_each-Demo-${each.value}"
  }
}
{{< /highlight >}}

_More about `for_each`:_ 
- https://developer.hashicorp.com/terraform/language/meta-arguments
- https://developer.hashicorp.com/terraform/language/meta-arguments#for_each

---
## >> Sources <<

_Terraform:_

`availability_zones` datasource
- https://registry.terraform.io/providers/-/aws/latest/docs/data-sources/availability_zones

`for_each`
- https://developer.hashicorp.com/terraform/language/meta-arguments
- https://developer.hashicorp.com/terraform/language/meta-arguments#for_each

Kalyan’s GitHub Repositories:

https://github.com/stacksimplify/terraform-on-aws-ec2/tree/main/05-Terraform-Loops-MetaArguments-SplatOperator
## >> Disclaimer <<

{{< disclaimer_terraform_on_AWS_25 >}}