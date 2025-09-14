---
title: Building Talos Linux Kubernetes Cluster
date: 2025-07-20
description: Building Talos Linux Kubernetes Cluster...
summary: Building Talos Linux Kubernetes Cluster...
draft: false
tags:
  - devops
categories:
  - Kubernetes
  - Homelab
  - Linux
---
{{< lead >}}
**Talos** **Linux** is a minimal, hardened and immutable **Linux** distribution designed for **Kubernetes**. It supports cloud platforms, bare metal and virtualization, and all system management is done via an API.
{{< /lead >}}

## 📺 YouTube Tutorial

{{< youtube 4_U0KK-blXQ >}}

💡Talos Linux - The Best OS For Kubernetes.

{{< lead >}}
### This blog post describes Talos Linux installation on Proxmox Virtual Environment.

When downloading ISO image, ensure downloading one with QEMU guest agent support for Proxmox.
{{< /lead >}}
## 💾 Download Talos Linux

- If you need the `QEMU` guest agent so you can do guest VM shutdowns of your Talos VMs on `Proxmox`, then you will need a custom ISO
- To get this, navigate to [https://factory.talos.dev/](https://factory.talos.dev/)
- Scroll down and select your Talos version (`v1.10.0` for example)
- Then tick the box for `siderolabs/qemu-guest-agent` and submit
- This will provide you with a link to the bare metal ISO
- The lines we’re interested in are as follows
## Building Talos Kubernetes cluster using patches

### Install talosctl, kubectl and k9s

On your `Jump Server` (Bastion Host), install `talosctl`, `kubectl` and `k9s`. I am using `Ubuntu Linux` in this example.

```bash
# talosctl
curl -sL https://talos.dev/install | sh

# kubectl
sudo snap install kubectl --classic

# k9s
sudo snap install k9s

# ERROR: k9s command not found after snap install issue in Ubuntu 24.04
# https://github.com/derailed/k9s/issues/2128
sudo ln -s /snap/k9s/current/bin/k9s /snap/bin/
```
### Cluster Build

#### 1. Generate Secrets

```bash
cd ~

talosctl gen secrets
```
#### 2. Export Variables

```Bash
export CLUSTER_IP=192.168.XX.AB
export CLUSTER_NAME=talos-cluster

export CONTROL_PLANE_IP1=192.168.XX.AC
export CONTROL_PLANE_IP2=192.168.XX.AD
export CONTROL_PLANE_IP3=192.168.XX.AE

export WORKER_IP1=192.168.XX.BA
export WORKER_IP2=192.168.XX.BB
export WORKER_IP3=192.168.XX.BC
```
#### 3. Generate config files for the cluster using patches

```bash
git clone https://github.com/rtdevx/homelab.git

cd ~/homelab/kubernetes/talos

talosctl gen config $CLUSTER_NAME https://$CLUSTER_IP:6443 \
  --with-secrets ~/secrets.yaml \
  --config-patch @patches/all.yaml \
  --config-patch-control-plane @patches/cp.yaml \
  --config-patch-worker @patches/worker.yaml \
  --output ~/rendered/
```
#### 4. Set Up the cluster

```bash
cd ~

talosctl apply -f rendered/controlplane.yaml -n $CONTROL_PLANE_IP1 --insecure
talosctl apply -f rendered/controlplane.yaml -n $CONTROL_PLANE_IP2 --insecure
talosctl apply -f rendered/controlplane.yaml -n $CONTROL_PLANE_IP3 --insecure
```
#### 5. Add Worker Nodes

```bash
talosctl apply -f rendered/worker.yaml -n $WORKER_IP1 --insecure
talosctl apply -f rendered/worker.yaml -n $WORKER_IP2 --insecure
talosctl apply -f rendered/worker.yaml -n $WORKER_IP3 --insecure
```

‼️Note: `--insecure` is only used for the initial install. After cluster is installed with it's newly generated keys, this option should not be used.
#### 6. Configure talosctl

```bash
mkdir -p ~/.talos 
cp rendered/talosconfig ~/.talos/config

# Test
talosctl config contexts

# Set endpoints for talosctl
talosctl config endpoint $CONTROL_PLANE_IP1 $CONTROL_PLANE_IP2 $CONTROL_PLANE_IP3

# Set config node
talosctl config node $CONTROL_PLANE_IP1
```
#### 7. Install (Bootstrap) Kubernetes

```Bash
talosctl bootstrap

# Fetch kubeconfig
talosctl kubeconfig
```
#### 8. Add kubectl alias (Optional)

```Bash
vi ~/.bashrc

#Custom Aliases
alias k='kubectl'
```

---
## >> Sources <<

- Proxmox Official Documentation: https://www.talos.dev/v1.10/talos-guides/install/virtualized-platforms/proxmox/
- Building Cluster using patches: https://www.talos.dev/v1.10/talos-guides/configuration/patching/

