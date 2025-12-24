---
title: Building AWS VPC
date: 2025-10-06
description: Building AWS VPC using Terraform.
summary: Building AWS VPC using Terraform.
draft: false
tags:
  - Terraform
  - HCTA0-003
categories:
  - DevOps
  - IaC
  - AWS
series: Terraform on AWS
---
## 👨🏻‍💻Part 1: Building VPC manually

### VPC Components

- Create VPC 
	- 2 AZ
		- Public Subnets
		- Private Subnets
- Create Internet Gateway and Associate to VPC
- Create NAT Gateway in Public Subnet 
- Create Public Route Table, Add Public Route via Internet Gateway and Associate Public Subnet
- Create Private Route Table, Add Private Route via NAT Gateway and Associate Private Subnet

{{< mermaid >}}

flowchart RL

%% Class Definitions
classDef redclass fill:#EB4925
classDef redclasss stroke:#EB4925
classDef yellowclass stroke:#EBAC25
classDef greenclass stroke:#C7EB25

    %% External Internet
    Internet["☁️ Internet"]

    %% VPC container
    subgraph VPC["AWS VPC"]

        %% IGW + NATs
        IGW["Internet Gateway"]:::redclass
        NAT1["NAT Gateway AZ1"]:::redclasss
        NAT2["NAT Gateway AZ2"]:::redclasss

        %% AZ1
        subgraph AZ1["AZ1"]
            Pub1["Public Subnet AZ1<br/><i>(0.0.0.0/0 ↔ IGW)</i>"]:::greenclass
            Priv1["Private Subnet AZ1<br/><i>(0.0.0.0/0 ↔ NAT1)</i>"]:::redclasss
        end

        %% AZ2
        subgraph AZ2["AZ2"]
            Pub2["Public Subnet AZ2<br/><i>(0.0.0.0/0 ↔ IGW)</i>"]:::greenclass
            Priv2["Private Subnet AZ2<br/><i>(0.0.0.0/0 ↔ NAT2)</i>"]:::redclasss
        end

        %% Public subnet traffic (bi-directional)
        Pub1 <--> IGW
        Pub2 <--> IGW

        %% Private subnet traffic (bi-directional)
        Priv1 --> NAT1
        Priv2 --> NAT2

        %% NAT ↔ IGW (bi-directional)
        NAT1 --> IGW
        NAT2 --> IGW

    end

    %% IGW ↔ Internet (bi-directional)
    IGW <--> Internet

{{< /mermaid >}}
### 1. Create VPC

```CLI
IAM console > VPC
```

- **Name:** my-manual-vpc
- **IPv4 CIDR Block:** 10.0.0.0/16
### 2. Create Subnets

```CLI
IAM console > VPC > Subnets
```

ℹ️ For the purpose of the manual exercise, we are only creating subnets in 1 AZ. With terraform we will spread the infrastructure across 2 AZ.
##### Public Subnets

- **VPC ID:** my-manual-vpc
- **Subnet Name:** my-public-subnet-1
- **Availability zone:** eu-west-2a
- **IPv4 CIDR Block:** 10.0.1.0/24
##### Private Subnets

- **Subnet Name:** my-private-subnet-1
- **Availability zone:** eu-west-2a
- **IPv4 CIDR Block:** 10.0.101.0/24
##### DB Subnets

- **VPC ID:** my-manual-vpc
- **Subnet Name:** my-db-subnet-1
- **Availability zone:** eu-west-2a
- **IPv4 CIDR Block:** 10.0.201.0/24

{{< alert "circle-info" >}}

No association with NAT or Internet Gateway is required for the DB subnet as Databases will not require outbound communication.

{{< /alert >}}
### 3. Create IGW and associate it with VPC

```CLI
IAM console > VPC > Internet gateways
```

- **Name Tag:** my-igw
- Click on **Create Internet Gateway**
- Click on Actions -> Attach to VPC -> my-manual-vpc
### 4. Create NAT Gateway

💡NAT Gateway should always be placed in the Public Subnet.

```CLI
IAM console > VPC > NAT gateways
```

- **Name:** my-nat-gateway
- **Subnet:** my-public-subnet-1
- **Allocate Elastic Ip:** click on that
- Click on **Create NAT Gateway**
### 5. Create Public Route Table, Create Routes, Associate Subnets
##### Create Public Route Table

```CLI
IAM console > VPC > Route tables
```

- **Name tag:** my-public-route-table
- **vpc:** my-manual-vpc
- Click on **Create**
##### Create Public Route in newly created Route Table

```CLI
IAM console > VPC > Route tables > my-public-route-table > Routes
```

- Click on **Edit Routes** > **Add Route**
- **Add Destination:** 0.0.0.0/0
- **Target:** my-igw
- Click on **Save Route**

![](./assets/TF_AWS_Create_Public_Route1.png)

![](./assets/TF_AWS_Create_Public_Route2.png)
##### Associate Public Subnet 1 in Route Table

```CLI
IAM console > VPC > Route tables > my-public-route-table > Subnet associations > Explicit subnet associations
```

- Click on **Edit Subnet Associations**
- Select **my-public-subnet-1**
- Click on **Save**

![](./assets/TF_AWS_Create_Public_Route3_associate.png)

![](./assets/TF_AWS_Create_Public_Route4_associate.png)
### 6. Create Private Route Table, Create Routes, Associate Subnets

##### Create Private Route Table

```CLI
IAM console > VPC > Route tables
```

- **Name tag:** my-private-route-table
- **vpc:** my-manual-vpc
- Click on **Create**
##### Create Private Route in newly created Route Table

```CLI
IAM console > VPC > Route tables > my-private-route-table > Routes
```

- Click on **Edit Routes** > **Add Route**
- **Destination:** 0.0.0.0/0
- **Target:** my-nat-gateway
- Click on **Save Route**

![](./assets/TF_AWS_Create_Private_Route1.png)
##### Associate Private Subnet 1 in Route Table

```CLI
IAM console > VPC > Route tables > my-public-route-table > Subnet associations > Explicit subnet associations
```

- Click on **Edit Subnet Associations**
- Select **my-private-subnet-1**
- Click on **Save**
### 7. Clean-Up

- Delete `my-nat-gateway`
- Wait till NAT Gateway is deleted
- Delete `my-manual-vpc`
## 📄Part 2: Building VPC using Terraform

_File:_  📄c2-generic-variables.tf

```shell
# INFO: Input Variables
# INFO: https://developer.hashicorp.com/terraform/language/block/variable

# INFO: AWS Region
variable "aws_region" {
  description = "Region in which AWS Resources will be created"
  type        = string
  default     = "eu-west-2"
}

# INFO: Environment Variable
variable "environment" {
  description = "Environment Variable used as a prefix"
  type        = string
  default     = "DEV"
}
# INFO: Business Division
variable "business_division" {
  description = "Business Division in the large organization this Infrastructure belongs"
  type        = string
  default     = "Operations"
}

# ! Default values will be overwritten in terraform.tfvars
```

_File:_  📄c3-local-values.tf

```shell
# INFO: Local Values
# INFO: https://developer.hashicorp.com/terraform/language/block/locals
# INFO: slice Function used for AZ's: https://developer.hashicorp.com/terraform/language/functions/slice

data "aws_availability_zones" "available" {}
locals {
  owners      = var.business_division
  environment = var.environment
  name        = "${var.business_division}-${var.environment}"
  #name        = "${local.owners}-${local.environment}"

  azs = slice(data.aws_availability_zones.available.names, 0, 2)

  common_tags = {
    owners      = local.owners
    environment = local.environment
  }
}
```

_File:_  📄c4-01-vpc-variables.tf

```shell
# INFO: VPC Input Variables required by VPC module
# INFO: https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest

# INFO: VPC Name
variable "vpc_name" {
  description = "VPC Name"
  type        = string
  default     = "myvpc"
}

# INFO: VPC CIDR Block
variable "vpc_cidr" {
  description = "VPC CIDR Block"
  type        = string
  default     = "10.0.0.0/16"
}
```

_File:_  📄c4-02-vpc-module.tf

```shell
# INFO: Create VPC using Terraform Module
# INFO: https://registry.terraform.io/modules/terraform-aws-modules/vpc/aws/latest

module "vpc" {
  source = "./modules/aws-vpc"
  #version = "~> 6.4.0"

  name = "${local.name}-${var.vpc_name}"
  cidr = var.vpc_cidr

  azs = local.azs

  private_subnets  = [for k, v in local.azs : cidrsubnet(var.vpc_cidr, 8, k)]
  public_subnets   = [for k, v in local.azs : cidrsubnet(var.vpc_cidr, 8, k + 4)]
  database_subnets = [for k, v in local.azs : cidrsubnet(var.vpc_cidr, 8, k + 8)]

  create_database_subnet_group       = true
  create_database_subnet_route_table = true

  enable_nat_gateway = true
  single_nat_gateway = true

  tags = local.common_tags

}
```

_File:_  📄c4-03-vpc-outputs.tf

```shell
# INFO: Output VPC ID
output "vpc_id" {
  description = "The ID of the VPC"
  value       = module.vpc.vpc_id
}

# INFO: Output VPC CIDR block
output "vpc_cidr_block" {
  description = "The CIDR block of the VPC"
  value       = module.vpc.vpc_cidr_block
}

# INFO: Output Private Subnets Information
output "private_subnets" {
  description = "List of IDs of private subnets"
  value       = module.vpc.private_subnets
}

output "private_subnets_cidr_blocks" {
  description = "List of cidr_blocks of private subnets"
  value       = module.vpc.private_subnets_cidr_blocks
}

# INFO: Output Public Subnets Information
output "public_subnets" {
  description = "List of IDs of public subnets"
  value       = module.vpc.public_subnets
}

output "public_subnets_cidr_blocks" {
  description = "List of cidr_blocks of public subnets"
  value       = module.vpc.public_subnets_cidr_blocks
}

# INFO: Output Database Subnets Information
output "database_subnets" {
  description = "List of IDs of database subnets"
  value       = module.vpc.database_subnets
}

output "database_subnets_cidr_blocks" {
  description = "List of cidr_blocks of database subnets"
  value       = module.vpc.database_subnets_cidr_blocks
}

output "database_subnet_group" {
  description = "ID of database subnet group"
  value       = module.vpc.database_subnet_group
}

# INFO: Output NAT Gateway route IDs
output "private_nat_gateway_route_ids" {
  description = "List of IDs of the private nat gateway route"
  value       = module.vpc.private_nat_gateway_route_ids
}

# INFO: Output Availability Zones
output "azs" {
  description = "A list of availability zones spefified as argument to this module"
  value       = local.azs
}
```

_File:_  📄terraform.tfvars

```shell
# ! This will overwrite default values from c2-generic-variables.tf

aws_region       = "eu-west-2"
environment      = "UAT"
business_division = "Training"
```

_File:_  📄vpc.auto.tfvars

```shell
# ! This will overwrite default values from c2-generic-variables.tf

vpc_name = "myvpc"
vpc_cidr = "10.0.0.0/16"
```

---
## >> Disclaimer <<

{{< disclaimer_terraform_on_AWS_25 >}}
