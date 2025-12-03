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

Terraform does not support directly accessing elements of a set by index because sets are unordered collections. To access elements in a set by index, first convert the set to a list.

1. Define a set. The following example specifies a set name `example_set`:
    
    ```
    variable "example_set" {
      type    = set(string)
      default = ["foo", "bar"]
    }
    ```
    
2. Use the `tolist` function to convert the set to a list. The following example stores the converted list as a local variable called `example_list`:
    
    ```
    locals {
      example_list = tolist(var.example_set)
    }
    ```
    
3. You can then reference an element in the list:
    
    ```
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

- `null` - a value that represents absence or omission. `null` is most useful in conditional expressions, so you can dynamically omit an argument if a condition isn't met.

{{< alert "circle-info" >}}
`Strings`, `numbers`, and `bools` are sometimes called <font color=#EB4925>primitive types</font>. `Lists`/`tuples` and `maps`/`objects` are sometimes called <font color=#EB4925>complex types</font>, <font color=#EB4925>structural types</font>, or <font color=#EB4925>collection types</font>.
{{< /alert >}}

_More:_ [Types and Values](https://developer.hashicorp.com/terraform/language/expressions/types)
## Strings and Templates

Syntaxes for string literals, including interpolation sequences and template directives. 

_More:_ [Strings and Templates](https://developer.hashicorp.com/terraform/language/expressions/strings)
## References to Values

How to refer to named values like variables and resource attributes.    

_More:_ [References to Values](https://developer.hashicorp.com/terraform/language/expressions/references)
## Operators

Arithmetic, comparison, and logical operators.    

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
