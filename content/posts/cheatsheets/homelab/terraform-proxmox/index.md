---
title: Automating Proxmox with Terraform
date: 2026-01-15
description: Automating Proxmox with Terraform allows you to manage virtual machines and containers using code, which simplifies deployment and reduces errors.
summary: Automating Proxmox with Terraform allows you to manage virtual machines and containers using code, which simplifies deployment and reduces errors.
draft: true
tags:
categories:
  - DevOps
  - IaC
  - Homelab
  - Proxmox
  - Terraform
series:
---
{{< lead >}}
Using **Terraform** with **Proxmox** provider to deploy a (cloud-init) virtual machine. 
{{< /lead >}}
## Youtube Tutorial

A very good tutorial from  **Jay** ([LearnLinux.tv](https://www.learnlinux.tv/))  on how to set up Proxmox to work with Terraform.

---

{{< youtube 1kFBk0ePtxo >}}
_Provisioning Virtual Machines in Proxmox with Terraform – Full Walkthrough_

--- 
## Set up Proxmox for Terraform

### 1. Create terraform user

```shell
# In Proxmox GUI
Datacenter > Permissions > Users > Add
```

![](./assets/proxmox_add_user.png)
### 2. Configure permissions

```shell
# In Proxmox GUI
Datacenter > Permissions > Roles > Create
```

| Roles required for Terraform                                               |                                                                    |                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| - Datastore.Allocate<br>- Datastore.Audit<br>- Pool.Allocate <br>- SDN.Use | - Sys.Audit <br>- Sys.Console <br>- Sys.Modify <br>- Sys.PowerMgmt | - VM.Allocate <br>- VM.Audit <br>- VM.Clone <br>- VM.Config.CDROM <br>- VM.Config.CPU <br>- VM.Config.Cloudinit <br>- VM.Config.Disk <br>- VM.Config.HWType <br>- VM.Config.Memory <br>- VM.Config.Network <br>- VM.Config.Options <br>- VM.Migrate <br>- VM.Monitor <br>- VM.PowerMgmt |

![](./assets/proxmox_role.png)
### 3. Create group

```shell
# In Proxmox GUI
Datacenter > Permissions > Groups > Create
```
### 4. Add Group Permissions

```shell
# In Proxmox GUI
Datacenter > Permissions > Add > Group Permission
```

![](./assets/proxmox_permissions.png)

Map permissions to the group:

![](./assets/proxmox_permissions_map.png)
## 5. Add `terraform` user to `terraform` group

```shell
# In Proxmox GUI
Datacenter > Permissions > Users > terraform
```

![](./assets/proxmox_permissions_user.png)
## 6. Create API token

```shell
# In Proxmox GUI
Datacenter > Permissions > API Tokens > Add
```

![](./assets/proxmox_add_api_token.png)
_Make sure to uncheck the "Privilege Separation" box._

{{< alert "circle-info" >}}
Note that <font color=#EB4925>Token ID can't be displayed again</font>. Copy it and keep secure.
{{< /alert >}}




















---
## >> Sources <<

[LearnLinux.tv](https://www.learnlinux.tv/)