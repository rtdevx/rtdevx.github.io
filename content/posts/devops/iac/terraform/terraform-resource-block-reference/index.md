---
title: Terraform resource block reference 🔥
date: 2025-10-27
description: The resource block defines a piece of infrastructure and specifies the settings for Terraform to create it with.
summary: The resource block defines a piece of infrastructure and specifies the settings for Terraform to create it with.
draft: false
tags:
  - Assoc003
categories:
  - Terraform
  - DevOps
  - IaC
---
{{< lead >}}
The `resource` block defines a piece of infrastructure and specifies the settings for Terraform to create it with. 

The arguments that an individual resource supports are determined by the provider. Refer to the provider documentation for more information about specific resource configuration.
{{< /lead >}}
## Configuration model

The `resource` block supports the following arguments:

- [`resource "<TYPE>" "<LABEL>"`](https://developer.hashicorp.com/terraform/language/block/resource#resource)   block
    - [`PROVIDER ARGUMENTS`](https://developer.hashicorp.com/terraform/language/block/resource#provider-arguments)   block | refer to your provider documentation
    - [`count`](https://developer.hashicorp.com/terraform/language/block/resource#count)   number | mutually exclusive with `for_each`
    - [`depends_on`](https://developer.hashicorp.com/terraform/language/block/resource#depends_on)   list of references
    - [`for_each`](https://developer.hashicorp.com/terraform/language/block/resource#for_each)   map or set of strings | mutually exclusive with `count`
    - [`provider`](https://developer.hashicorp.com/terraform/language/block/resource#provider)   reference
    - [`lifecycle`](https://developer.hashicorp.com/terraform/language/block/resource#lifecycle)   block
        - [`action_trigger`](https://developer.hashicorp.com/terraform/language/block/resource#action_trigger)   block
            - [`events`](https://developer.hashicorp.com/terraform/language/block/resource#action_trigger)   list | required to invoke an action
            - [`condition`](https://developer.hashicorp.com/terraform/language/block/resource#action_trigger)   expression
            - [`actions`](https://developer.hashicorp.com/terraform/language/block/resource#action_trigger)   list | required to invoke an action
        - [`create_before_destroy`](https://developer.hashicorp.com/terraform/language/block/resource#create_before_destroy)   boolean
        - [`prevent_destroy`](https://developer.hashicorp.com/terraform/language/block/resource#prevent_destroy)   boolean
        - [`ignore_changes`](https://developer.hashicorp.com/terraform/language/block/resource#ignore_changes)   list of attributes
        - [`replace_triggered_by`](https://developer.hashicorp.com/terraform/language/block/resource#replace_triggered_by)   list of references
        - [`precondition`](https://developer.hashicorp.com/terraform/language/block/resource#precondition)   block
            - [`condition`](https://developer.hashicorp.com/terraform/language/block/resource#precondition)   string
            - [`error_message`](https://developer.hashicorp.com/terraform/language/block/resource#precondition)   string
        - [`postcondition`](https://developer.hashicorp.com/terraform/language/block/resource#postcondition)   block
            - [`condition`](https://developer.hashicorp.com/terraform/language/block/resource#postcondition)   string
            - [`error_message`](https://developer.hashicorp.com/terraform/language/block/resource#postcondition)   string
    - [`connection`](https://developer.hashicorp.com/terraform/language/block/resource#connection)   block
        - [`type`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`user`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`password`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`host`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`port`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`timeout`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`script_path`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`private_key`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`certificate`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`agent`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`agent_identity`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`host_key`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`target_platform`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`script_path`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`https`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`insecure`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`use_ntlm`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`cacert`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`bastion_host`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`bastion_host_key`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`bastion_port`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`bastion_user`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`bastion_password`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`bastion_private_key`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`bastion_certificate`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`proxy_scheme`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`proxy_port`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`proxy_user_name`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
        - [`proxy_user_password`](https://developer.hashicorp.com/terraform/language/block/resource#connection-arguments)   string
    - [`provisioner "<TYPE>"`](https://developer.hashicorp.com/terraform/language/block/resource#provisioner)   block
        - [`source`](https://developer.hashicorp.com/terraform/language/block/resource#source)   string
        - [`destination`](https://developer.hashicorp.com/terraform/language/block/resource#destination)   string
        - [`content`](https://developer.hashicorp.com/terraform/language/block/resource#content)   string
        - [`command`](https://developer.hashicorp.com/terraform/language/block/resource#command)   string
        - [`working_dir`](https://developer.hashicorp.com/terraform/language/block/resource#working_dir)   string
        - [`interpreter`](https://developer.hashicorp.com/terraform/language/block/resource#interpreter)   string
        - [`environment`](https://developer.hashicorp.com/terraform/language/block/resource#command)   string
        - [`when`](https://developer.hashicorp.com/terraform/language/block/resource#when)   keyword
        - [`quiet`](https://developer.hashicorp.com/terraform/language/block/resource#quiet)   boolean
        - [`inline`](https://developer.hashicorp.com/terraform/language/block/resource#inline)   list of strings
        - [`script`](https://developer.hashicorp.com/terraform/language/block/resource#script)   string
        - [`scripts`](https://developer.hashicorp.com/terraform/language/block/resource#scripts)   string
        - [`on_failure`](https://developer.hashicorp.com/terraform/language/block/resource#on_failure)   keyword
        - [`connection`](https://developer.hashicorp.com/terraform/language/block/resource#connection)   block
## Complete configuration

The following `resource` block defines all of the supported built-in arguments you can set on a resource:

```shell
resource "<TYPE>" "<LABEL>" {
  <PROVIDER_ARGUMENTS>
  count = <NUMBER>      # `for_each` and `count` are mutually exclusive
  depends_on = [ <RESOURCE.ADDRESS.EXPRESSION> ]
  for_each = {          # `for_each` and `count` are mutually exclusive
    <KEY> = <VALUE>
  }
  for_each = [       # `for_each` accepts a map or a set of strings
    "<VALUE>",
    "<VALUE>"
  ]
  provider = <REFERENCE.TO.ALIAS>
  lifecycle {
    action_trigger {
      events = [        # specify one or more lifecycle events as a list 
        before_create, 
        after_create,
        before_update,
        after_update
      ]
      condition = <EXPRESSSION>
      actions = [ action.<TYPE>.<LABEL> ]
    }
    create_before_destroy = <true || false>
    prevent_destroy = <true || false>
    ignore_changes = [ <ATTRIBUTE> ]
    replace_triggered_by = [ <RESOURCE.ADDRESS.EXPRESSION> ]
    precondition {
      condition = <EXPRESSION>
      error_message = "<STRING>"
    }
    postcondition {
      condition = <EXPRESSION>
      error_message = "<STRING>"
    }
  }
  connection {
    type = <"ssh" or "winrm">
    host = <EXPRESSION>
    <DEFAULT_CONNECTION_SETTINGS>
  }
  provisioner "<TYPE>" {
    source = "<PATH>"
    destination = "<PATH>"
    content = "<CONTENT TO COPY TO `destination`>"
    command = <COMMAND>
    working_dir = "<PATH TO DIR WHERE TERRAFORM EXECUTES `command`>"
    interpreter = [
      "<PATH TO INTERPRETER EXECUTABLE>",
      "<COMMAND> <ARGUMENTS>"
    ]
    environment {
      "<KEY>" = "<VALUE>"
    }
    when = <TERRAFORM COMMAND>
    quiet = <true || false>
    inline = [ "<COMMAND>" ]
    script = "<PATH>"
    scripts = [
      "<PATH>"
    ]
    on_failure = <continue || fail>
    connection {
      type = <"ssh" or "winrm">
      host = <EXPRESSION>
      <SPECIFIC_CONNECTION_SETTINGS>
    }
  }
}
```

_More info:_ https://developer.hashicorp.com/terraform/language/block/resource

---
## >> Sources <<

- https://developer.hashicorp.com/terraform/language/block/resource