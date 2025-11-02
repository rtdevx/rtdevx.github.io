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

```shell
uname -a
```

##### 2. How can you check your current IP address?

```shell
ifconfig
ip addr show
```


##### 3. How to check for free disk space

```shell
df -h /
df -ah #ALL disks
```

##### 4. How to check if service is running?

```shell
service NAME status
systemctl status NAME
```

##### 5. How to check the size of a directory's contents on disk?

```shell
du -h
```

##### 6. How to check for open ports?

```shell
netstat -an
sudo netstat -an #shows PID and Program name
```

##### 7. How to check Linux process information (CPU, Memory, User)?

```shell
ps -aux | grep nginx
top
```

##### 8. How would you mount a filesystem?

```shell
mount /dev/sda2 /mnt
```

```shell
vi /etc/fstab
```

_More about fstab:_ https://linuxconfig.org/how-fstab-works-introduction-to-the-etc-fstab-file-on-linux
##### 9. Man pages?

```shell
man COMMAND
```
## Advanced

---

{{< youtube 6ZSyYCPofrE >}}

---
##### 1. What is the difference between a **process** and a **thread**?

- A process is an independent program in execution with its own memory space, while a thread is a smaller unit of a process that shares the same memory space

- Threads within the same process can communicate more easily but processes are more isolated from each other

{{< mermaid >}}

flowchart LR

    Process --> P1[Independent Program]
    Process --> P2[Own memory space, own PID]
    Process --> P3[Inter-process communication is complex]

    classDef process fill:#EB4925,stroke:#333,stroke-width:1px

    class Process,P1,P2,P3 process

	 Process ==> Thread

    Thread --> T1[Shares memory with process]
    Thread --> T2[Shares PID with other threads]
    Thread --> T3[Communication is easier]

    classDef thread fill:#EBAC25,stroke:#333,stroke-width:1px

    class Thread,T1,T2,T3 thread
    
{{< /mermaid >}}
##### 2. How does the `strace` command help in debugging?

- `strace` command is a diagnostic tool that traces system calls and signals
- It helps with debugging by showing which system calls a program is making, in what order and what the return values are.
	- This <font color=#EBAC25>helps identifying where a program is failing or misbehaving</font>
##### 3. Explain how `cgroups` (control groups) are used in Linux.

- `cgroups` is a Linux kernel feature that limits and isolates the resource usage (CPU, memory, disk I/O, etc.) for the process
- It is widely used for [conteinarization]({{< ref "categories/containers" >}}), providing mechanisms to control resource allocation among various tasks
##### 4. What is **SELinux** and how does it enhance security?

- **SELinux** (Security-Enhanced Linux) is a security module for the Linux kernel that provides a mechanism for supporting access control security policies
- It uses mandatory access controls (**MAC**) to enforce the security policies which limits the scope of what processes can do
##### 5. How do you manage **kernel modules** in Linux?

- Kernel modules can be managed using commands like
	- `modprobe` (add or remove modules)
	- `lsmod` (list currently loaded modules)
	- `rmmod` (remove modules)
- Configuration files in `/etc/modprobe.d` can also be used to manage modules
##### 6. Explain the purpose of the `/proc` directory

- The `/proc` directory is a pseudo-filesystem that provides a mechanism to access process and kernel information
- <font color=#EBAC25>It contains virtual files that represent system information such as <b>CPU</b>, <b>Memory</b>, other configurations</font>
##### 7. How can you optimize the **performance** of a **Linux system**?

- Performance can be optimized by:
	- tuning kernel parameters (using `sysctl`), 
	- managing resource usage with `cgroups`, 
	- optimizing I/O scheduling, 
	- utilizing performance monitoring tools like:
		- `top` / `htop`
		- `iotop`

 Performance can also be optimized by profiling applications using `perf` or `strace`
##### 8. What is the difference between hard and soft **real-time systems** in Linux?

- Hard real-time systems guarantee that critical tasks complete within a strict time constraint
- Soft real-time systems prioritize completing tasks as soon as possible but do not guarantee strict timing
##### 9. How does the **iptables** command work in Linux?

- `iptables` is a command-line utility configuring Linux kernel firewall implemented within the netfilter project
- it allows administrators to set up, maintain and inspect tables of IP packet filter rules which controls the flow of incoming and outgoing packets
##### 10. What are **namespaces** in Linux and how are they used?

- `Namespaces` are a feature of the Linux kernel that isolate and virtualize system resources such as
	- process IDs
	- network interfaces
	- file systems
- `Namespaces` are fundamental for container technologies allowing each container to have it's own, isolated environment
##### 11. Explain the concept of **load average** in Linux.

- Load average represents the average number of processes in the runnable or uninterruptable state
- It is usually displayed as three numbers, corresponding to the last 1, 5 and 15 minutes
- A high Load Average indicates that system is under heavy load
##### 12. How does the `nice` command affect process scheduling?

- The `nice` command changes the scheduling priority of a process

By default, processes start with a priority of 0, but nice can set a lower priority (higher `nice` value), causing the process to receive less CPU time compared to other with higher  priority (lower `nice` value).
##### 13. What is the role of the **systemd** init system in Linux?

- `systemd` is an init system and syhstem manager for Linux operating systems
- It manages system startup and services, handling initialization tasks, dependency management, logging and service monitoring
##### 14. How do you create a **swap file** in Linux?

- Create an empty file

```shell
dd if=/dev/zero
of=swapfile bs=1M
count=1024 #for 1GB swap file
```

- Set the correct permissions

```shell
chmod 600 /swapfile
```

- Set up the swap space

```shell
mkswap /swapfile
```

- Enable the swap file

```shell
swapon /swapfile
```

- Add it to `/etc/fstab` to ensure it is enabled after reboot
##### 15. What are the differences between **ext4** and **xfs** file systems?

- `ext4` is a widely used Linux file system known for it's simplicity and robustness
- It supports large files and volumes, journaling and defragmentation

- `xfs` is designed for high performance, scalability and handling large files efficiently
- It supports online resizing but not shrinking and has advanced features for parallel I/O
## Scenario based

---

{{< youtube NeLTNCOV-ic >}}

---
##### 1. You need to find out why a server is running slowly. What steps would you take? 

- Check the system load with `top` or `htop` command, look at CPI and memory usage and identify any processes consuming excessive resources
- Use `iostat` and `iotop` to check disk I/O
- `free -m` for memory usage
- `df -h` for disk space
- `netstat` or `ss` for any network-related issues
- Review system logs in `/var/log` for any errors or warnings
##### 2. A user's home directory is filling up disk space on the root partition. How would you resolve this?

- Check the disk usage with `du -sh /home/user`
- If possible, move large files to another partition with more space using `mv` or `rsync`
- Alternatively `tar` and / or `gzip` files
##### 3. You need to secure a web server against common vulnerabilities. What measures would you take?

- Ensure system is updated
- Configure firewall using `iptables`, `firewalld` or `ufw`
- Disable unnecessary services and remove default files
- Implement HTTPS/TLS certificates
- Use tools like `fail2ban` to block malicious IPs and configure `SELinux` or `AppArmor` for enhanced security
##### 4. The SSH service on your server is being targeted by brute force attacks. What steps would you take to mitigate this?

- Change the default port from 22 to something less common in `/etc/ssh/sshd_config`
- Implement key-based authentication and disable password authentication
- Use `fail2ban` to block IPs after certain number of failed login attempts
- Allow only specific IP addresses to connect to SSH using `iptables` or `ufw`
##### 5. You need to automate backups of a directory to a remote server. How would you do it?

- Use `rsync` for efficient file transfers. Set up SSH key-based authentication between the local and remote servers
- Write a script to run `rsync` with the desired options and schedule it using by [cron]({{< ref "posts/cheatsheets/linux/crontab" >}})
##### 6. A critical service has crashed and won't restart. What steps do you take to troubleshoot and resolve the issue?

- Check the status and logs of the service using `systemctl status SERVICENAME` or `journalctl -u SERVICENAME`
- Look for any configuration errors or missing dependencies
- Verify the configuration file syntax (`nginx -t` for Nginx, `apachectl configtest` for Apache)
- Resolve any issues found and restart the service with `systemctl restart SERVICENAME`
##### 7. Your server's time is out of sync, causing issues with applications. How do you fix this?

- Install and configure `ntpd` or `chrony` to synchronize time with NTP servers
- Use `ntpq -p` to check the status of NTP peers
- Ensure the correct time zone is set using `timedatectl`
##### 8. You need to create a new user and ensure they have no shell access. How would you do this?

- Use the `useradd` command with the `-s` option to set the user's shell to `/sbin/nologin` or `/bin/false`

```shell
useradd -s /sbin/nologin USERNAME
```
##### 9. Your server is running out of memory and starting to swap heavily. What actions would you take?

- Identify which process is using memory using `top` or `ps aux --sort=-%mem`
- Consider stopping or restarting those processes
- Increase swap space by creating a [swap file]({{< ref "posts/linux/linux-interview-questions/#14-how-do-you-create-a-swap-file-in-linux" >}}) if needed
- Optimize application memory usage or add more physical memory to the server
##### 10. You need to restrict a user’s disk usage. How would you implement this?

- Use disk quotas
	- Enable quotas on the file system by modifying `/etc/fstab` and remounting the filesystem
	- Use `edquota` to set user-specific disk quotas and `quotaon` to enable quotas
##### 11. A service needs to start on boot. How do you ensure this?

```shell
systemctl enable SERVICENAME
systemctl SERVICENAME
```
##### 12. Your web server is showing a 502 Bad Gateway error. What steps do you take to troubleshoot?

- Check the status and logs of both the web server (e.g. Nginx) and the backend services and proxies
- Verify the backend service is running and reachable
- Check configuration files for any misconfigurations
- Ensure sufficient resources (CPU, Memory) are available
##### 13. You need to schedule a recurring task to clean temporary files. How would you do this?

- Write a script to clean temporary files

```shell
#!/bin/bash

rm -rf /tmp/*
```

- Make it executable `chmod +x /path/to/scriptname.sh`
- Add a [cron]({{< ref "posts/cheatsheets/linux/crontab" >}}) job to execute the script at desired intervals
##### 14. You need to compile and install software from source. What steps do you follow?

```shell
tar -xzf filename.tar.gz
cd filename
./configure
make
make install
```
##### 15. You need to find and kill all processes started by a specific user. How do you do this?

```shell
ps -u USERNAME

ps -u USERNAME | grep -v PID | awk 'print $1' | xargs kill -9
```
## >> Sources <<

_More about fstab:_ https://linuxconfig.org/how-fstab-works-introduction-to-the-etc-fstab-file-on-linux