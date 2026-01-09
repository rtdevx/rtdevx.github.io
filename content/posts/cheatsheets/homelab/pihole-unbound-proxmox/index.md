---
title: Pihole with Unbound on Proxmox LXC
date: 2025-11-29
description: Content Creation description.
summary: Content Creation summary.
draft: false
tags:
  - privacy
  - adblock
categories:
  - Homelab
  - Proxmox
series:
---
{{< lead >}}

**Pi-hole** is a Linux network-level advertisement and Internet tracker blocking application which acts as a DNS sinkhole and optionally a DHCP server, intended for use on a private network.

{{< /lead >}}

{{< lead >}}

**Unbound** is a free, open-source DNS resolver that is validating, recursive, and caching. It is designed for speed and security, supporting modern features like DNS over TLS and DNSSEC validation.

{{< /lead >}}

| <font color=#EB4925>External Resources</font> »                                 |                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Pi-hole﻿®](https://pi-hole.net/)                                               | **Pi-hole** is a software that blocks ads and trackers across your entire network. Learn how to install, configure, and use **Pi-hole** as your DNS server, VPN, or web interface.                                                                                                                                                                              |
| [unbound](https://www.nlnetlabs.nl/projects/unbound/about/)                     | Unbound is a validating, recursive, caching DNS resolver. It is designed to be fast and lean and incorporates modern features based on open standards.                                                                                                                                                                                                          |
| [Proxmox Helper Scripts](https://community-scripts.github.io/ProxmoxVE/scripts) | Proxmox Helper Scripts are a collection of open-source scripts designed to simplify and automate tasks in the Proxmox Virtual Environment (VE), making it easier for users to manage their virtual machines and containers. These scripts help with various functions, such as setting up applications, managing containers, and performing system maintenance. |
## Proxmox Helper Scripts

Installing all components using [Proxmox Helper Scripts](https://community-scripts.github.io/ProxmoxVE/scripts).

{{< alert "triangle-exclamation" >}}

# <font color=#EB4925>Warning:</font>

If you use community‑provided scripts, always review them before running. Check the source, skim the code, and avoid piping directly into `bash` without inspection. A quick look helps keep your system safe.

{{< /alert >}}

More about Proxmox Helper Scipts in this Video:

{{< youtube kcpu4z5eSEU >}}
## 2-node pi-hole installation

Pi-hole Proxmox Helper Scipt: https://community-scripts.github.io/ProxmoxVE/scripts?id=pihole&category=Adblock+%26+DNS

![](./assets/install-pihole-helper.png)

{{< alert "circle-info" >}}

It turns that this script can also install unbound. Installing it in `recursive mode`.

{{< /alert >}}

ℹ️ _Note:_ Repeat the steps for the second node if you want 2-nodes-installation. For 2 nodes installation, I will set up the `nebula-sync` so both nodes can be in sync.
## Setting up Pi-hole sync

{{< lead >}}

To synchronize multiple Pi-hole 6.x instances, you can use tools like **nebula-sync**, which allow for configuration synchronization between the primary and replica instances. These tools can automate the process and ensure that settings remain consistent across your Pi-hole installations.

{{< /lead >}}

{{< alert "circle-info" >}}

Please note that good, old `gravity-sync` project has discontinued and will not support `pi-hole` version 6.

{{< /alert >}}

{{< youtube OcSBggDyeJ4 >}}

<font color=#EBAC25><i>More info:</i></font> 
- [Nebula Sync](https://github.com/lovelaze/nebula-sync)
- https://technotim.com/posts/pihole-sync-nebula/



---
## >> Sources <<

- [Pi-hole﻿®](https://pi-hole.net/)
- [unbound](https://www.nlnetlabs.nl/projects/unbound/about/)
- [Proxmox Helper Scripts](https://community-scripts.github.io/ProxmoxVE/scripts)
- [Nebula Sync](https://github.com/lovelaze/nebula-sync)
- https://technotim.com/posts/pihole-sync-nebula/

Youtube Videos:

- https://www.youtube.com/watch?v=kcpu4z5eSEU
- https://www.youtube.com/watch?v=OcSBggDyeJ4