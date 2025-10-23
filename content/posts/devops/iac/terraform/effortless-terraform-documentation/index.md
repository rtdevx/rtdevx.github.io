---
title: Ansible Vault
date: 2025-09-19
description: Encrypting / Decrypting strings with Ansible Vault.
summary: Encrypting / Decrypting strings with Ansible Vault.
draft: false
tags:
  - terraform
categories:
  - DevOps
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
## 6. Example encrypted content

{{< alert "triangle-exclamation" >}}
<font color=#EB4925><b>Important!</b></font>

Files are protected with symmetric encryption of the Advanced Encryption Standard (_AES256_), where a single password or passphrase is used both to encrypt and decrypt the data.
{{< /alert >}}

📄 _File:_ secrets.encrypted

```YAML
$ANSIBLE_VAULT;1.1;AES256
39393566323132353465623038646136633335333265353232623262643361666130313164656561
3466313362343062623632323737313966386662343762360a656463363865666561306138623634
66336264363234613237633539623536313139613466303838646334336638313063666630663034
3265303032663131380a306462616163636563616234613532323266323033333034363932356565
32613432306464373664373430326361363833653834306561336238356434303261653136646636
38653563653530306534383837363762336462626631353830303233313836326361323765326230
30326665303332386230666566363535323639393630343239646635313434396235623938313431
38373939616265656161626664303462396130636262346435396561616530663266313938633536
6465
```
## >> Sources <<

- https://docs.ansible.com/ansible/latest/cli/ansible-vault.html