---
title: Ansible Vault
date: 2025-09-19
description: Encrypting / Decrypting strings with Ansible Vault.
summary: Encrypting / Decrypting strings with Ansible Vault.
draft: false
tags:
  - encryption
categories:
  - DevOps
  - Ansible
  - IaC
---

{{< lead >}}
**Quick reference to Ansible Vault.**

You can use Ansible vault to securely manage individual variables, entire files, or even structured data like YAML files. 

This data can then be safely stored in a version control system or shared with team members without exposing sensitive information.
{{< /lead >}}
## 1. Create a password file

```bash
sudo su - ansible
vi ~/.vault_key
chmod 600 ~/.vault_key
```
## 2. Encrypt file

```bash
ansible-vault encrypt --vault-password-file ~/.vault_key file.txt
```
## 3. Decrypt file

```bash
ansible-vault decrypt --vault-password-file ~/.vault_key file.txt
```
## 4. Editing / Viewing encrypted file

```bash
ansible-vault edit --vault-password-file ~/.vault_key file.txt
ansible-vault view --vault-password-file ~/.vault_key file.txt
```
## 5. Using variables in playbook

```bash
# Create encrypted file with variables
vi roles/k3s_initialize_control_plane/vars/secrets.encrypted

# Example
k3s_cluster_token: e4e9a8c08d29ab81e777cf916070bfd1

# Encrypt secrets.encrypted file using .vault_key
ansible-vault encrypt secrets.encrypted --vault-password-file ~/.vault_key

# Include vars in your playbook
- hosts: k3ssvr[0]
  become: true
  roles:
    - k3s_initialize_control_plane
  vars_files:
    - roles/k3s_initialize_control_plane/vars/secrets.encrypted

# Variable {{ k3s_cluster_token }} can now be used inside of the role
```

{{< alert "triangle-exclamation" >}}
<font color=#EB4925><b>Important!</b></font>

Files are protected with symmetric encryption of the Advanced Encryption Standard (_AES256_), where a single password or passphrase is used both to encrypt and decrypt the data.
{{< /alert >}}
## >> Sources <<

- https://docs.ansible.com/ansible/latest/cli/ansible-vault.html