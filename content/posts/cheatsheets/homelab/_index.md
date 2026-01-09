+++
draft = true
title = 'My Homelab'
summary = 'My homelab: where servers misbehave, automation keeps them in line, and curiosity runs the place.....'
+++

My homelab is a fully automated playground of declarative infrastructure, where every machine boots itself into a known-good state, every service is shaped by code, and the entire environment evolves through repeatable, zero‑touch workflows.

**1-click ansible-pull Ubuntu setup:**

```shell
sudo apt update && sudo apt install -y curl
bash <(curl -s https://raw.githubusercontent.com/rtdevx/cicd-ansible-pull/main/scripts/bootstrap.sh)
```