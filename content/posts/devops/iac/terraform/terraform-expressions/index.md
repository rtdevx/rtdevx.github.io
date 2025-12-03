---
title: Terraform Expressions 🔥
date: 2025-10-25
description: Terraform expressions are used to compute values within Terraform configurations, allowing for dynamic and flexible infrastructure management.
summary: Terraform expressions are used to compute values within Terraform configurations, allowing for dynamic and flexible infrastructure management.
draft: false
tags:
  - Assoc003
categories:
  - Terraform
  - DevOps
  - IaC
---
{{< lead >}}
`Terraform expressions` are used to <font color=#EBAC25>compute values within Terraform configurations</font>, allowing for <font color=#EBAC25>dynamic and flexible infrastructure management</font>. They can include simple literals, complex references, and various built-in functions to manipulate data types and structures.

_More:_ [Terraform Expressions](https://developer.hashicorp.com/terraform/language/expressions)
{{< /lead >}}
## Types and Values

Data types that Terraform expressions can resolve to, and the literal syntaxes for values of those types.
### Types

#### Privimitive types
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

{{< alert "circle-info" >}}
`Strings`, `numbers`, and `bools` are sometimes called <font color=#EB4925>primitive types</font>. `Lists`/`tuples` and `maps`/`objects` are sometimes called <font color=#EB4925>complex types</font>, <font color=#EB4925>structural types</font>, or <font color=#EB4925>collection types</font>.
{{< /alert >}}

_More:_ [Types and Values](https://developer.hashicorp.com/terraform/language/expressions/types)
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

_More:_ [Strings and Templates](https://developer.hashicorp.com/terraform/language/expressions/strings)
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

_More:_ [References to Values](https://developer.hashicorp.com/terraform/language/expressions/references)
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

_More:_ [Operators](https://developer.hashicorp.com/terraform/language/expressions/operators)
## Function Calls

Syntax for calling Terraform's built-in functions.    

_More:_ [Function Calls](https://developer.hashicorp.com/terraform/language/expressions/function-calls)
## Conditional Expressions

`<CONDITION> ? <TRUE VAL> : <FALSE VAL>` expression, which chooses between two values based on a bool condition.    

_More:_ [Conditional Expressions](https://developer.hashicorp.com/terraform/language/expressions/conditionals)
## For Expressions

Expressions like `[for s in var.list : upper(s)]`, which can transform a complex type value into another complex type value.    

_More:_ [For Expressions](https://developer.hashicorp.com/terraform/language/expressions/for)
## Splat Expressions

Expressions like `var.list[*].id`, which can extract simpler collections from more complicated expressions.    

_More:_ [Splat Expressions](https://developer.hashicorp.com/terraform/language/expressions/splat)
## Dynamic Blocks

A way to create multiple repeatable nested blocks within a resource or other construct. 

_More:_ [Dynamic Blocks](https://developer.hashicorp.com/terraform/language/expressions/dynamic-blocks)
## Validate your configuration

To verify variable conditions, check blocks, and resource preconditions and postconditions.    

_More:_ [Validate your configuration](https://developer.hashicorp.com/terraform/language/validate)
## Type Constraints

Syntax for referring to a type, rather than a value of that type. Input variables expect this syntax in their `type` argument.    

_More:_ [Type Constraints](https://developer.hashicorp.com/terraform/language/expressions/type-constraints)
## Version Constraints

Syntax of special strings that define a set of allowed software versions. Terraform uses version constraints in several places.

_More:_ [Version Constraints](https://developer.hashicorp.com/terraform/language/expressions/version-constraints)

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
