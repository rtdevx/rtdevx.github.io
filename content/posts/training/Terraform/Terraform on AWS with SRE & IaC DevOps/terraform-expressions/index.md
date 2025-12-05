---
title: Terraform Expressions 🔥
date: 2025-10-25
description: Terraform expressions are used to compute values within Terraform configurations, allowing for dynamic and flexible infrastructure management.
summary: Terraform expressions are used to compute values within Terraform configurations, allowing for dynamic and flexible infrastructure management.
draft: false
tags:
  - Assoc003
  - Terraform
categories:
  - DevOps
  - IaC
---
{{< lead >}}
`Terraform expressions` are used to <font color=#EBAC25>compute values within Terraform configurations</font>, allowing for <font color=#EBAC25>dynamic and flexible infrastructure management</font>. They can include simple literals, complex references, and various built-in functions to manipulate data types and structures.

<font color=#EBAC25><i>More info:</i></font> [Terraform Expressions](https://developer.hashicorp.com/terraform/language/expressions)
{{< /lead >}}
## Types and Values

Data types that Terraform expressions can resolve to, and the literal syntaxes for values of those types.
### Types

{{< alert "circle-info" >}}
`Strings`, `numbers`, and `bools` are sometimes called <font color=#EB4925>primitive types</font>. `Lists`/`tuples` and `maps`/`objects` are sometimes called <font color=#EB4925>complex types</font>, <font color=#EB4925>structural types</font>, or <font color=#EB4925>collection types</font>.
{{< /alert >}}
#### Primitive types
- `string` - characters representing some text, like `"hello world!"`.
- `number` - a numeric value. The `number` type can represent both whole numbers like `15` and fractional values like `6.283185`.
- `bool` - a boolean value, either `true` or `false`. `bool` values can be used in conditional logic.
#### Complex types
- `list` (or `tuple`) - a sequence of values, like `["us-west-1a", "us-west-1c"]`. Identify elements in a list with consecutive whole numbers, starting with zero.
- `set` - a collection of unique values that do not have any secondary identifiers or ordering.

{{< alert "circle-info" >}}
Terraform does not support directly accessing elements of a set by index because sets are unordered collections. To access elements in a set by index, first convert the set to a list.
{{< /alert >}}

1. Define a set. The following example specifies a set name `example_set`:
    
    ```shell
    variable "example_set" {
      type    = set(string)
      default = ["foo", "bar"]
    }
    ```
    
2. Use the `tolist` function to convert the set to a list. The following example stores the converted list as a local variable called `example_list`:
    
    ```shell
    locals {
      example_list = tolist(var.example_set)
    }
    ```
    
3. You can then reference an element in the list:
    
    ```shell
    output "first_element" {
      value = local.example_list[0]
    }
    output "second_element" {
      value = local.example_list[1]
    }
    ```

- `map` (or `object`) - a group of values identified by named labels, like `{name = "Mabel", age = 52}`. Maps/objects are represented by a pair of curly braces containing a series of `<KEY> = <VALUE>` pairs:

```shell
{
  name = "John"
  age  = 52
}
```

{{< alert "circle-info" >}}
`Key/value` pairs can be separated by either a comma or a line break. <font color=#EB4925>The keys in a map must be strings</font>.
{{< /alert >}}

- `null` - a value that represents absence or omission. `null` is most useful in conditional expressions, so you can dynamically omit an argument if a condition isn't met.

<font color=#EBAC25><i>More info:</i></font> [Types and Values](https://developer.hashicorp.com/terraform/language/expressions/types)
## Strings and Templates

Syntaxes for string literals, including interpolation sequences and template directives.
### Quoted Strings

A quoted string is a series of characters delimited by straight double-quote characters (`"`).

```
"hello"
```

#### Escape Sequences

In quoted strings, the backslash character serves as an escape sequence, with the following characters selecting the escape behaviour:

|Sequence|Replacement|
|---|---|
|`\n`|Newline|
|`\r`|Carriage Return|
|`\t`|Tab|
|`\"`|Literal quote (without terminating the string)|
|`\\`|Literal backslash|
|`\uNNNN`|Unicode character from the basic multilingual plane (NNNN is four hex digits)|
|`\UNNNNNNNN`|Unicode character from supplementary planes (NNNNNNNN is eight hex digits)|
There are also two special escape sequences that do not use backslashes:

|Sequence|Replacement|
|---|---|
|`$${`|Literal `${`, without beginning an interpolation sequence.|
|`%%{`|Literal `%{`, without beginning a template directive sequence.|
### Heredoc Strings

Terraform supports a "heredoc" style of string literal inspired by Unix shell languages, which allows multi-line strings to be expressed more clearly.

```shell
<<EOT
hello
world
EOT
```

Terraform also accepts an _indented_ heredoc string variant that is introduced by the `<<-` sequence:

```shell
block {
  value = <<-EOT
  hello
    world
  EOT
}
```

{{< alert "circle-info" >}}
Don't use "heredoc" strings to generate JSON or YAML. Instead, use [the `jsonencode` function](https://developer.hashicorp.com/terraform/language/functions/jsonencode) or [the `yamlencode` function](https://developer.hashicorp.com/terraform/language/functions/yamlencode) so that Terraform can be responsible for guaranteeing valid JSON or YAML syntax.

```shell
example = jsonencode({
  a = 1
  b = "hello"
})
```
{{< /alert >}}
### Escape Sequences

Backslash sequences are not interpreted as escapes in a heredoc string expression. Instead, the backslash character is interpreted literally.

Heredocs support two special escape sequences that do not use backslashes:

|Sequence|Replacement|
|---|---|
|`$${`|Literal `${`, without beginning an interpolation sequence.|
|`%%{`|Literal `%{`, without beginning a template directive sequence.|
### Interpolation

A `${ ... }` sequence is an <font color=#C7EB25>interpolation</font>, which evaluates the expression given between the markers, converts the result to a string if necessary, and then inserts it into the final string:

```shell
"Hello, ${var.name}!"
```

In the above example, the named object `var.name` is accessed and its value inserted into the string, producing a result like "Hello, Juan!".

<font color=#EBAC25><i>More info:</i></font> [Strings and Templates](https://developer.hashicorp.com/terraform/language/expressions/strings)
## References to Values

How to refer to named values like variables and resource attributes.    

The main kinds of named values available in Terraform are:

- [Resources](https://developer.hashicorp.com/terraform/language/expressions/references#resources)
- [Input variables](https://developer.hashicorp.com/terraform/language/expressions/references#input-variables)
- [Local values](https://developer.hashicorp.com/terraform/language/expressions/references#local-values)
- [Child module outputs](https://developer.hashicorp.com/terraform/language/expressions/references#child-module-outputs)
- [Data sources](https://developer.hashicorp.com/terraform/language/expressions/references#data-sources)
- [Filesystem and workspace info](https://developer.hashicorp.com/terraform/language/expressions/references#filesystem-and-workspace-info)
- [Block-local values](https://developer.hashicorp.com/terraform/language/expressions/references#block-local-values)

<font color=#EBAC25><i>More info:</i></font> [References to Values](https://developer.hashicorp.com/terraform/language/expressions/references)
## Operators

Arithmetic, comparison, and logical operators.

When multiple operators are used together in an expression, they are evaluated in the following order of operations:

1. `!`, `-` (multiplication by `-1`)
2. `*`, `/`, `%`
3. `+`, `-` (subtraction)
4. `>`, `>=`, `<`, `<=`
5. `==`, `!=`
6. `&&`
7. `||`

- [Arithmetic Operators](https://developer.hashicorp.com/terraform/language/expressions/operators#arithmetic-operators)
- [Equality Operators](https://developer.hashicorp.com/terraform/language/expressions/operators#equality-operators)
- [Comparison Operators](https://developer.hashicorp.com/terraform/language/expressions/operators#comparison-operators)
- [Logical Operators](https://developer.hashicorp.com/terraform/language/expressions/operators#logical-operators)

<font color=#EBAC25><i>More info:</i></font> [Operators](https://developer.hashicorp.com/terraform/language/expressions/operators)
## Function Calls

Syntax for calling Terraform's built-in functions.  

The Terraform language has a number of [built-in functions](https://developer.hashicorp.com/terraform/language/functions) that can be used in expressions to transform and combine values. These are similar to the operators but all follow a common syntax:

```shell
<FUNCTION NAME>(<ARGUMENT 1>, <ARGUMENT 2>)
```

The function name specifies which function to call. Each defined function expects a specific number of arguments with specific value types, and returns a specific value type as a result.

<font color=#EBAC25><i>More info:</i></font> [Function Calls](https://developer.hashicorp.com/terraform/language/expressions/function-calls)
## Conditional Expressions

`<CONDITION> ? <TRUE VAL> : <FALSE VAL>` expression, which chooses between two values based on a bool condition. 

The syntax of a conditional expression is as follows:

```shell
condition ? true_val : false_val
```

If `condition` is `true` then the result is `true_val`. If `condition` is `false` then the result is `false_val`.

A common use of conditional expressions is to define defaults to replace invalid values:

```shell
var.a == "" ? "default-a" : var.a
```

If `var.a` is an empty string then the result is `"default-a"`, but otherwise it is the actual value of `var.a`.

Use the logical operators `&&` (AND), `||` (OR), and `!` (NOT) to combine multiple conditions together.

```shell
  condition = var.name != "" && lower(var.name) == var.name
```

### `contains` Function

Use the [`contains` function](https://developer.hashicorp.com/terraform/language/functions/contains) to test whether a given value is one of a set of predefined valid values.

```shell
  condition = contains(["STAGE", "PROD"], var.environment)
```

### `length` Function

Use the [`length` function](https://developer.hashicorp.com/terraform/language/functions/length) to test a collection's length and require a non-empty list or map.

```shell
  condition = length(var.items) != 0
```

### `for` Expressions

Use [`for` expressions](https://developer.hashicorp.com/terraform/language/expressions/for) in conjunction with the functions `alltrue` and `anytrue` to test whether a condition holds for all or for any elements of a collection.

```shell
  condition = alltrue([
    for v in var.instances : contains(["t2.micro", "m3.medium"], v.type)
  ])
```

### `can` Function

Use the [`can` function](https://developer.hashicorp.com/terraform/language/functions/can) to concisely use the validity of an expression as a condition. It returns `true` if its given expression evaluates successfully and `false` if it returns any error.

```shell
  condition = can(regex("^[a-z]+$", var.name))
```

### `self` Object

Use the `self` object in postcondition blocks to refer to attributes of the instance under evaluation.

```shell
resource "aws_instance" "example" {
  instance_type = "t2.micro"
  ami           = "ami-abc123"

  lifecycle {
    postcondition {
      condition     = self.instance_state == "running"
      error_message = "EC2 instance must be running."
    }
  }
}
```

### `each` and `count` Objects

In blocks where [`for_each`](https://developer.hashicorp.com/terraform/language/meta-arguments#for_each) or [`count`](https://developer.hashicorp.com/terraform/language/meta-arguments#count) are set, use `each` and `count` objects to refer to other resources that are expanded in a chain.

```shell
variable "vpc_cidrs" {
  type = set(string)
}

data "aws_vpc" "example" {
  for_each = var.vpc_cidrs

  filter {
    name   = "cidr"
    values = [each.key]
  }
}

resource "aws_internet_gateway" "example" {
  for_each = data.aws_vpc.example
  vpc_id = each.value.id

  lifecycle {
    precondition {
      condition     = data.aws_vpc.example[each.key].state == "available"
      error_message = "VPC ${each.key} must be available."
    }
  }
}
```

<font color=#EBAC25><i>More info:</i></font> [Conditional Expressions](https://developer.hashicorp.com/terraform/language/expressions/conditionals)
## For Expressions

Expressions like `[for s in var.list : upper(s)]`, which can transform a complex type value into another complex type value.    

<font color=#EBAC25><i>More info:</i></font> [For Expressions](https://developer.hashicorp.com/terraform/language/expressions/for)
## Splat Expressions

Expressions like `var.list[*].id`, which can extract simpler collections from more complicated expressions. 

A `splat expression` provides a more concise way to express a common operation that could otherwise be performed with a `for` expression.

If `var.list` is a list of objects that all have an attribute `id`, then a list of the ids could be produced with the following `for` expression:

```shell
[for o in var.list : o.id]
```

This is equivalent to the following <font color=#EBAC25><i>splat expression:</i></font> 

```shell
var.list[*].id
```

{{< alert "circle-info" >}}
The special `[*]` symbol iterates over all of the elements of the list given to its left and accesses from each one the attribute name given on its right. A splat expression can also be used to access attributes and indexes from lists of complex types by extending the sequence of operations to the right of the symbol:

```shell
var.list[*].interfaces[0].name
```
{{< /alert >}}

<font color=#EBAC25><i>More info:</i></font> [Splat Expressions](https://developer.hashicorp.com/terraform/language/expressions/splat)
## Dynamic Blocks

A way to create multiple repeatable nested blocks within a resource or other construct. 

Within top-level block constructs like resources, expressions can usually be used only when assigning a value to an argument using the `name = expression` form. This covers many uses, but some resource types include repeatable _nested blocks_ in their arguments, which typically represent separate objects that are related to (or embedded within) the containing object:

```shell
resource "aws_elastic_beanstalk_environment" "tfenvtest" {
  name = "tf-test-name" # can use expressions here

  setting {
    # but the "setting" block is always a literal block
  }
}
```

You can dynamically construct repeatable nested blocks like `setting` using a special `dynamic` block type, which is supported inside `resource`, `data`, `provider`, and `provisioner` blocks:

```shell
resource "aws_elastic_beanstalk_environment" "tfenvtest" {
  name                = "tf-test-name"
  application         = aws_elastic_beanstalk_application.tftest.name
  solution_stack_name = "64bit Amazon Linux 2018.03 v2.11.4 running Go 1.12.6"

  dynamic "setting" {
    for_each = var.settings
    content {
      namespace = setting.value["namespace"]
      name = setting.value["name"]
      value = setting.value["value"]
    }
  }
}
```

A `dynamic` block acts much like a [`for` expression](https://developer.hashicorp.com/terraform/language/expressions/for), but produces nested blocks instead of a complex typed value. It iterates over a given complex value, and generates a nested block for each element of that complex value.

{{< alert "circle-info" >}}
Overuse of `dynamic` blocks <font color=#EB4925>can make configuration hard to read and maintain, so we recommend using them only when you need to hide details in order to build a clean user interface for a re-usable module</font>.

Always write nested blocks out literally where possible.
{{< /alert >}}

<font color=#EBAC25><i>More info:</i></font> [Dynamic Blocks](https://developer.hashicorp.com/terraform/language/expressions/dynamic-blocks)
## Validate your configuration

To verify variable conditions, check blocks, and resource preconditions and postconditions.    

{{< alert "circle-info" >}}
Validate your configuration to improve your module consumer's troubleshooting, make your runs more predictable, and help your maintainers understand your configuration's intent.
{{< /alert >}}
### Input variable validation

Use input variable validation to perform the following tasks:

- Verify input variables meet specific format requirements.
- Verify input values fall within acceptable ranges.
- Prevent Terraform operations if a variable is misconfigured.

For example, you can validate whether a variable value has valid AMI ID syntax.

```shell
variable "image_id" {
  type        = string
  description = "The id of the machine image (AMI) to use for the server."

  validation {
    condition     = length(var.image_id) > 4 && substr(var.image_id, 0, 4) == "ami-"
    error_message = "The image_id value must be a valid AMI id, starting with \"ami-\"."
  }
}
```

If you set the value of the `image_id` variable to a string without AMI ID syntax, the condition evaluates to `false`. When a variable validation fails, Terraform errors, displays the configured `error_message`, and stops the operation from proceeding.

<font color=#EBAC25><i>More info:</i></font> [Validate your configuration](https://developer.hashicorp.com/terraform/language/validate)
## Type Constraints

Syntax for referring to a type, rather than a value of that type. Input variables expect this syntax in their `type` argument.    

<font color=#EBAC25><i>More info:</i></font> [Type Constraints](https://developer.hashicorp.com/terraform/language/expressions/type-constraints)
## Version Constraints

Syntax of special strings that define a set of allowed software versions. Terraform uses version constraints in several places.

Use the following syntax to specify version constraints:

```shell
version = "<operator> <version>"
```

In the following example, Terraform installs a versions `1.2.0` and newer, as well as version older than `2.0.0`:

```shell
version = ">= 1.2.0, < 2.0.0"
```

The following table describes the operators you can use to configure version constraints:

|Operator|Description|
|---|---|
|`=`,  <br>no operator|Allows only one exact version number. Cannot be combined with other conditions.|
|`!=`|Excludes an exact version number.|
|`>`,  <br>`>=`,  <br>`<`,  <br>`<=`|Compares to a specified version. Terraform allows versions that resolve to `true`. The `>` and `>=` operators request newer versions. The `<` and `<=` operators request older versions.|
|`~>`|Allows only the right-most version component to increment. Examples:<br><br>- `~> 1.0.4`: Allows Terraform to install `1.0.5` and `1.0.10` but not `1.1.0`.<br>- `~> 1.1`: Allows Terraform to install `1.2` and `1.10` but not `2.0`.|

<font color=#EBAC25><i>More info:</i></font> [Version Constraints](https://developer.hashicorp.com/terraform/language/expressions/version-constraints)

---
## >> Sources <<

- [Terraform Expressions](https://developer.hashicorp.com/terraform/language/expressions)
	- [Types and Values](https://developer.hashicorp.com/terraform/language/expressions/types)
	- [Strings and Templates](https://developer.hashicorp.com/terraform/language/expressions/strings)   
	- [References to Values](https://developer.hashicorp.com/terraform/language/expressions/references) 
	- [Operators](https://developer.hashicorp.com/terraform/language/expressions/operators)    
	- [Function Calls](https://developer.hashicorp.com/terraform/language/expressions/function-calls)  
	- [Conditional Expressions](https://developer.hashicorp.com/terraform/language/expressions/conditionals) 
	- [For Expressions](https://developer.hashicorp.com/terraform/language/expressions/for)  
	- [Splat Expressions](https://developer.hashicorp.com/terraform/language/expressions/splat) 
	- [Dynamic Blocks](https://developer.hashicorp.com/terraform/language/expressions/dynamic-blocks) 
	- [Validate your configuration](https://developer.hashicorp.com/terraform/language/validate)
	- [Type Constraints](https://developer.hashicorp.com/terraform/language/expressions/type-constraints).    
	- [Version Constraints](https://developer.hashicorp.com/terraform/language/expressions/version-constraints)
