---
title: Pihole with Unbound on Proxmox LXC
date: 2025-07-23
description: "**Pi-hole** is a Linux network-level advertisement and Internet tracker blocking application which acts as a DNS sinkhole and optionally a DHCP server, intended for use on a private network."
summary: "**Pi-hole** is a Linux network-level advertisement and Internet tracker blocking application which acts as a DNS sinkhole and optionally a DHCP server, intended for use on a private network."
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

---

{{< youtube kcpu4z5eSEU >}}
_Proxmox Automation with Proxmox Helper Scripts! _

---
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

---

{{< youtube OcSBggDyeJ4 >}}
_Pi-hole Syncing… But Smarter..._

---

<font color=#EBAC25><i>More info:</i></font> 
- [Nebula Sync](https://github.com/lovelaze/nebula-sync)
- https://technotim.com/posts/pihole-sync-nebula/

## Blocklists

Most of these were collected from [https://firebog.net/](https://firebog.net/)

```shell
https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts
https://mirror1.malwaredomains.com/files/justdomains
https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/master/KADhosts_without_controversies.txt
https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Spam/hosts
https://v.firebog.net/hosts/static/w3kbl.txt
https://adaway.org/hosts.txt
https://v.firebog.net/hosts/Prigent-Ads.txt
https://raw.githubusercontent.com/DandelionSprout/adfilt/master/Alternate%20versions%20Anti-Malware%20List/AntiMalwareHosts.txt
https://osint.digitalside.it/Threat-Intel/lists/latestdomains.txt
https://zerodot1.gitlab.io/CoinBlockerLists/hosts_browser
https://phishing.army/download/phishing_army_blocklist_extended.txt
https://v.firebog.net/hosts/AdguardDNS.txt
https://v.firebog.net/hosts/Admiral.txt
https://raw.githubusercontent.com/anudeepND/blacklist/master/adservers.txt
https://s3.amazonaws.com/lists.disconnect.me/simple_ad.txt
https://v.firebog.net/hosts/Easylist.txt
https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext
https://raw.githubusercontent.com/FadeMind/hosts.extras/master/UncheckyAds/hosts
https://raw.githubusercontent.com/bigdargon/hostsVN/master/hosts
https://v.firebog.net/hosts/Easyprivacy.txt
https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-blocklist.txt
https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.Risk/hosts
https://urlhaus.abuse.ch/downloads/hostfile/
https://raw.githubusercontent.com/PolishFiltersTeam/KADhosts/master/KADhosts.txt
https://raw.githubusercontent.com/jdlingyu/ad-wars/master/hosts
https://raw.githubusercontent.com/Perflyst/PiHoleBlocklist/master/android-tracking.txt
https://raw.githubusercontent.com/Perflyst/PiHoleBlocklist/master/SmartTV.txt
https://raw.githubusercontent.com/Perflyst/PiHoleBlocklist/master/AmazonFireTV.txt
https://v.firebog.net/hosts/Prigent-Malware.txt
https://raw.githubusercontent.com/matomo-org/referrer-spam-blacklist/master/spammers.txt
https://someonewhocares.org/hosts/zero/hosts
https://raw.githubusercontent.com/FadeMind/hosts.extras/master/add.2o7Net/hosts
https://raw.githubusercontent.com/crazy-max/WindowsSpyBlocker/master/data/hosts/spy.txt
https://s3.amazonaws.com/lists.disconnect.me/simple_malvertising.txt
https://v.firebog.net/hosts/Prigent-Crypto.txt
https://mirror.cedia.org.ec/malwaredomains/immortal_domains.txt
https://bitbucket.org/ethanr/dns-blacklists/raw/8575c9f96e5b4a1308f2f12394abd86d0927a4a0/bad_lists/Mandiant_APT1_Report_Appendix_D.txt
https://gitlab.com/quidsup/notrack-blocklists/raw/master/notrack-malware.txt
https://v.firebog.net/hosts/Shalla-mal.txt
https://raw.githubusercontent.com/Spam404/lists/master/main-blacklist.txt
https://raw.githubusercontent.com/VeleSila/yhosts/master/hosts
https://winhelp2002.mvps.org/hosts.txt
https://v.firebog.net/hosts/neohostsbasic.txt
https://raw.githubusercontent.com/RooneyMcNibNug/pihole-stuff/master/SNAFU.txt
https://paulgb.github.io/BarbBlock/blacklists/hosts-file.txt
https://phishing.army/download/phishing_army_blocklist.txt
https://www.github.developerdan.com/hosts/lists/ads-and-tracking-extended.txt
https://malware-filter.gitlab.io/malware-filter/phishing-filter-hosts.txt
https://v.firebog.net/hosts/RPiList-Malware.txt
https://v.firebog.net/hosts/RPiList-Phishing.txt
https://raw.githubusercontent.com/AssoEchap/stalkerware-indicators/master/generated/hosts
```

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