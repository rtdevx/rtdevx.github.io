---
title: Example Linux Interview Questions
date: 2025-08-24
description: Example Linux Interview Questions.
summary: Example Linux Interview Questions.
draft: true
tags:
categories:
  - DevOps
  - Linux
---
## Basic

---

{{< youtube l0QGLMwR-lY >}}

---
##### 1. How can you see which kernel version a system is currently running?

```
uname -a
```

##### 2. How can you check your current IP address?

```
ifconfig
ip addr show
```


##### 3. How to check for free disk space

```
df -h /
df -ah #ALL disks
```

##### 4. How to check if service is running?

```
service NAME status
systemctl status NAME
```

##### 5. How to check the size of a directory's contents on disk?

```
du -h
```

##### 6. How to check for open ports?

```
netstat -an
sudo netstat -an #shows PID and Program name
```

##### 7. How to check Linux process information (CPU, Memory, User)?

```
ps -aux | grep nginx
top
```

##### 8. How would you mount a filesystem?

```
mount /dev/sda2 /mnt
```

```
vi /etc/fstab
```

_More about fstab:_ https://linuxconfig.org/how-fstab-works-introduction-to-the-etc-fstab-file-on-linux
##### 9. Man pages?

```
man COMMAND
```
## Advanced

---

{{< youtube 6ZSyYCPofrE >}}

---
##### 1. What is the difference between a process and a thread?

{{< mermaid >}}
architecture-beta
    group api(cloud)[API]

    service db(database)[Database] in api
    service disk1(disk)[Storage] in api
    service disk2(disk)[Storage] in api
    service server(server)[Server] in api
    service internet(internet)[Internet] in api
    service cloud(cloud)[Cloud] in api

    cloud:R -- L:internet
    internet:L -- R:server
    db:L -- R:server
    disk1:T -- B:server
    disk2:T -- B:db
{{< /mermaid >}}

{{< mermaid >}}
stateDiagram-v2
    Pending
    Pending --> Processing
    Processing --> Completed
    Processing --> Failed
    Failed --> Pending
{{< /mermaid >}}

{{< mermaid >}}
C4Context
    title System Context
    Person(user, "User", "System User")
    System(system, "Core System", "Handles Business Logic")
    System_Ext(payment, "Payment System", "Processes Payments")
    Rel(user, system, "Uses")
    Rel(system, payment, "Calls")
{{< /mermaid >}}
##### 2. How does the strace command help in debugging?
##### 3. Explain how cgroups (control groups) are used in Linux.
##### 4. What is SELinux and how does it enhance security?
##### 5. How do you manage kernel modules in Linux?
##### 6. Explain the purpose of the “/proc” directory
##### 7. How can you optimize the performance of a Linux system?
##### 8. What is the difference between hard and soft real-time systems in Linux?
##### 9. How does the iptables command work in Linux?
##### 10. What are namespaces in Linux and how are they used?
##### 11. Explain the concept of load average in Linux.
##### 12. How does the nice command affect process scheduling?
##### 13. What is the role of the systemd init system in Linux?
##### 14. How do you create a swap file in Linux?
##### 15. What are the differences between ext4 and xfs file systems?

## Scenario based

---

{{< youtube NeLTNCOV-ic >}}

---

##### 1. You need to find out why a server is running slowly. What steps would you take? 
##### 2. A user's home directory is filling up disk space on the root partition. How would you resolve this?
##### 3. You need to secure a web server against common vulnerabilities. What measures would you take?
##### 4. The SSH service on your server is being targeted by brute force attacks. What steps would you take to mitigate this?
##### 5. You need to automate backups of a directory to a remote server. How would you do it?
##### 6. A critical service has crashed and won't restart. What steps do you take to troubleshoot and resolve the issue?
##### 7. Your server's time is out of sync, causing issues with applications. How do you fix this?
##### 8. You need to create a new user and ensure they have no shell access. How would you do this?
##### 9. Your server is running out of memory and starting to swap heavily. What actions would you take?
##### 10. You need to restrict a user’s disk usage. How would you implement this?
##### 11. A service needs to start on boot. How do you ensure this?
##### 12. Your web server is showing a 502 Bad Gateway error. What steps do you take to troubleshoot?
##### 13. You need to schedule a recurring task to clean temporary files. How would you do this?
##### 14. You need to compile and install software from source. What steps do you follow?
##### 15. You need to find and kill all processes started by a specific user. How do you do this?
## >> Sources <<

_More about fstab:_ https://linuxconfig.org/how-fstab-works-introduction-to-the-etc-fstab-file-on-linux