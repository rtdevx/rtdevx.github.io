---
title: Linux Performance Troubleshooting
date: 2025-09-29
description: Linux Performance Troubleshooting.
summary: Linux Performance Troubleshooting.
draft: false
tags:
  - troubleshooting
categories:
  - DevOps
  - Linux
---

{{< youtube rwVLa9me7e4 >}}


## Linux Perf Analysis

|     |                          |                                               |
| --- | ------------------------ | --------------------------------------------- |
| 1.  | `uptime`                 | Load averages                                 |
| 2.  | `dmesg -T \| tail`       | Kernel errors                                 |
| 3.  | `vmstat 1`               | Overall stats by time (Virtual Memory)        |
| 4.  | `mpstat -P ALL 1`        | CPU balance                                   |
| 5.  | `pidstat 1`              | Process usage                                 |
| 6.  | `iostat -xz 1` / `iotop` | Disk I/O                                      |
| 7.  | `free -m`                | Memory usage                                  |
| 8.  | `sar -n DEV 1`           | Network I/O                                   |
| 9.  | `sar -n TCP,ETCP 1`      | TCP stats                                     |
| 10. | `top` / `htop`           | Check overview                                |
| 11. | `lsof`                   | List Open Files                               |
| 12. | `tcpdump`                | Network Packet Analyzer                       |
| 13. | `netstat`                | Network Statistics                            |
| 14. | `iptraf`                 | Real-time IP LAN Monitoring                   |
| 15. | `psacct` / `acct`        | Monitor User Activity                         |
| 16. | `nethogs` / `iftop`      | Monitor per-process network bandwidth         |
| 17. | `nmon`                   | Monitor Linux performance                     |
| 18. | `s-tui`                  | Terminal-based CPU Stress and Monitoring tool |
| 19. | `atop`                   | Advanced system & process monitoring          |
| 20. | `btop`                   | Modern Resource Monitoring                    |

## >> Sources <<

- https://www.tecmint.com/command-line-tools-to-monitor-linux-performance/
- https://www.brendangregg.com/linuxperf.html