---
title: Terraform State
date: 2025-10-28
description: Terraform must store state about your managed infrastructure and configuration...
summary: Terraform must store state about your managed infrastructure and configuration...
draft: false
tags:
  - Assoc003
  - Terraform
categories:
  - DevOps
  - IaC
---
{{< lead >}}
Terraform must store state about your managed infrastructure and configuration. <font color=#C7EB25>This state is used by Terraform to map real world resources to your configuration, keep track of metadata, and to improve performance</font> for large infrastructures.

_More:_ https://developer.hashicorp.com/terraform/language/state
{{< /lead >}}

## `terraform state` commands

Refer to the following subcommands for additional information:
### `terraform state list`

Usage: `terraform state list [options] [address...]`

The command will list all resources in the state file matching the given addresses (if any). If no addresses are given, all resources are listed.

The resources listed are sorted according to module depth order followed alphabetically. This means that resources that are in your immediate configuration are listed first, and resources that are more deeply nested within modules are listed last.

_More:_ [`terraform state list`](https://developer.hashicorp.com/terraform/cli/commands/state/list)

### `terraform state mv`

The `terraform state mv` command changes bindings in Terraform state so that existing remote objects bind to new resource instances.

Usage: `terraform state mv [options] SOURCE DESTINATION`

{{< alert "circle-info" >}}
<font color=#EB4925>Warning:</font> If you are using Terraform in a collaborative environment, you must ensure that when you are using `terraform state mv` for a code refactoring purpose you communicate carefully with your coworkers to ensure that nobody makes any other changes between your configuration change and your `terraform state mv` command, because otherwise they might inadvertently create a plan that will destroy the old object and create a new object at the new address.
{{< /alert >}}
#### Example: Rename a Resource

Renaming a resource means making a configuration change like the following:

```shell
resource "packet_device" "worker" {
resource "packet_device" "helper" {
   # ...
 }
```

To tell Terraform that it should treat the new "helper" resource as a rename of the old "worker" resource, you can pair the above configuration change with the following command:

```shell
terraform state mv packet_device.worker packet_device.helper
```
#### Example: Move a Resource Into a Module

If you originally wrote a resource in your root module but now wish to refactor it into a child module, you can move the `resource` block into the child module configuration, removing the original in the root module, and then run the following command to tell Terraform to treat it as a move:

```shell
terraform state mv packet_device.worker module.worker.packet_device.worker
```

_More:_ [`terraform state mv`](https://developer.hashicorp.com/terraform/cli/commands/state/mv)
### `terraform state pull`

The `terraform state pull` downloads and outputs state information from a [remote state](https://developer.hashicorp.com/terraform/language/state/remote) or local state.

Usage: `terraform state pull`

This command downloads the state from its current location, upgrades the local copy to the latest state file version that is compatible with locally-installed Terraform, and outputs the raw format to stdout.

_More:_ [`terraform state pull`](https://developer.hashicorp.com/terraform/cli/commands/state/pull)
### `terraform state replace-provider`

The `terraform state replace-provider` command replaces the provider for resources in a [Terraform state](https://developer.hashicorp.com/terraform/language/state).

Usage: `terraform state replace-provider [options] FROM_PROVIDER_FQN TO_PROVIDER_FQN`

This command will update all resources using the "from" provider, setting the provider to the specified "to" provider. This allows changing the source of a provider which currently has resources in state.
#### Example

The example below replaces the `hashicorp/aws` provider with a fork by `acme`, hosted at a private registry at `registry.acme.corp`:

```shell
$ terraform state replace-provider hashicorp/aws registry.acme.corp/acme/aws
```

_More:_ [`terraform state replace-provider`](https://developer.hashicorp.com/terraform/cli/commands/state/replace-provider)

### `terraform state rm`

The `terraform state rm` command removes the binding to an existing remote object without first destroying it. The remote object continues to exist but is no longer managed by Terraform.

Usage: `terraform state rm [options] ADDRESS...`

Terraform will search the state for any instances matching the given [resource address](https://developer.hashicorp.com/terraform/cli/state/resource-addressing), and remove the record of each one so that Terraform will no longer be tracking the corresponding remote objects.

This means that although the objects will still continue to exist in the remote system, a subsequent [`terraform plan`](https://developer.hashicorp.com/terraform/cli/commands/plan) will include an action to create a new object for each of the "forgotten" instances. Depending on the constraints imposed by the remote system, creating those objects might fail if their names or other identifiers conflict with the old objects still present.
#### Example: Remove all Instances of a Resource

The following example will cause Terraform to "forget" all of the instances of the `packet_device` resource named "worker".

```
$ terraform state rm 'packet_device.worker'
```

_More:_ [`terraform state rm`](https://developer.hashicorp.com/terraform/cli/commands/state/rm)
### `terraform state show`

The `terraform state show` command shows the attributes of a single resource in the [Terraform state](https://developer.hashicorp.com/terraform/language/state).

Usage: `terraform state show [options] ADDRESS`

The command will show the attributes of a single resource in the state file that matches the given address.
#### Example: Show a Resource

The example below shows a `packet_device` resource named `worker`:

```shell
$ terraform state show 'packet_device.worker'
# packet_device.worker:
resource "packet_device" "worker" {
    billing_cycle = "hourly"
    created       = "2015-12-17T00:06:56Z"
    facility      = "ewr1"
    hostname      = "prod-xyz01"
    id            = "6015bg2b-b8c4-4925-aad2-f0671d5d3b13"
    locked        = false
}
```

_More:_ [`terraform state show`](https://developer.hashicorp.com/terraform/cli/commands/state/show)
## Remote State

The Terraform state subcommands all work with remote state just as if it was local state. Reads and writes may take longer than normal as each read and each write do a full network roundtrip. Otherwise, backups are still written to disk and the CLI usage is the same as if it were local state.

## Backups

All `terraform state` subcommands that modify the state write backup files. The path of these backup file can be controlled with `-backup`.

{{< alert "circle-info" >}}
Note that <font color=#EB4925>backups for state modification can not be disabled</font>. Due to the sensitivity of the state file, Terraform forces every state modification command to write a backup file. You'll have to remove these files manually if you don't want to keep them around.
{{< /alert >}}
## Terraform backend

Terraform uses persisted state data to keep track of the resources it manages. You can either [integrate with HCP Terraform](https://developer.hashicorp.com/terraform/language/terraform#terraform-cloud) to store state data or define a `backend` block to store state in a remote object. This lets multiple people access the state data and work together on that collection of infrastructure resources.

To configure a backend, add a nested `backend` block within the top-level `terraform` block. The following example configures the `remote` backend.

```shell
terraform {
  backend "remote" {
    organization = "example_corp"

    workspaces {
      name = "my-app-prod"
    }
  }
}
```

_More:_ [Terraform Backend](https://developer.hashicorp.com/terraform/language/backend)

---
## >> Sources <<

- [`terraform state`](https://developer.hashicorp.com/terraform/language/state)

Terraform state commands:

- [`terraform state list`](https://developer.hashicorp.com/terraform/cli/commands/state/list)
- [`terraform state mv`](https://developer.hashicorp.com/terraform/cli/commands/state/mv)
- [`terraform state pull`](https://developer.hashicorp.com/terraform/cli/commands/state/pull)
- [`terraform state replace-provider`](https://developer.hashicorp.com/terraform/cli/commands/state/replace-provider)
- [`terraform state rm`](https://developer.hashicorp.com/terraform/cli/commands/state/rm)
- [`terraform state show`](https://developer.hashicorp.com/terraform/cli/commands/state/show)

Terraform Backend:

- [Terraform Backend](https://developer.hashicorp.com/terraform/language/backend)