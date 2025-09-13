---
title: Hugo Post Template
date: 2025-07-17
description: Hugo Post Template
summary: Hugo Post Template
draft: false
tags:
  - hugo
  - cheatsheets
categories: Blogging
---
{{< lead >}}
Example how a new post can be structured. Header information, highlights, etc...
{{< /lead >}}

{{< alert "lightbulb" >}}
Anything that requires attention.

Can be enhanced with [emojis]({{< ref "post-template/#emojis" >}}) or <font color=#EB4925>colors</font>...

- 👉🏻 https://emojipedia.org/
{{< /alert >}}

---

{{< youtube BszXLBKWs >}}

---
## Linking internal content

[Installing Hugo with Congo]({{< ref "installing-congo-hugo" >}})
### Folders

1. Folder location:
	- content/posts<font color=#EBAC25>/category</font><font color=#C7EB25>/YYYY</font>
2. Replace `thumb.jpg`
3. Replace `cover.jpg` (if applicable)

\*<font color=#EBAC25>use `feature.jpg` if _thumb_ and _cover_ are the same</font> (_see:_ [#feature-cover-and-thumbnail-images](https://jpanther.github.io/congo/docs/getting-started/#feature-cover-and-thumbnail-images) for more information.)
## 🟢<font color=#EB4925>Colors</font>

| Color                             | HEX       | HTML                              | Usage                                                                                             |
| --------------------------------- | --------- | --------------------------------- | ------------------------------------------------------------------------------------------------- |
| <font color=#EB4925>Red</font>    | `#EB4925` | `<font color=#EB4925>Text</font>` | Warning, Important                                                                                |
| <font color=#EBAC25>Yellow</font> | `#EBAC25` | `<font color=#EBAC25>Text</font>` | Highlights                                                                                        |
| <font color=#C7EB25>Green</font>  | `#C7EB25` | `<font color=#C7EB25>Text</font>` | Highlights, interesting, etc.                                                                     |
| <font color=#27D3F5>Blue</font>   | `#27D3F5` | `<font color=#27D3F5>Text</font>` | Color used for content to be corrected later (i.e. new links to not-yet existing content, etc...) |

_HTML Color Codes:_ https://htmlcolorcodes.com/
## 🏷️Icons

{{< icon "circle-info" >}} list of available icons: 

- https://jpanther.github.io/congo/samples/icons/
- https://jpanther.github.io/congo/docs/shortcodes/#icon
## ❤️Emojis

🫶🏻 https://emojipedia.org/
## 🔥References

If anything requires further explanation, it can be referenced[^Reference1] like that...

## Organizing content

- **Content:** https://jpanther.github.io/congo/docs/getting-started/#organising-content
- **Shortcodes:** https://jpanther.github.io/congo/docs/shortcodes
- **Content examples:** https://jpanther.github.io/congo/docs/content-examples/
### Markdown

- https://jpanther.github.io/congo/samples/markdown/
### Shortcodes

- https://jpanther.github.io/congo/samples/rich-content/
- https://gohugo.io/content-management/shortcodes/#use-hugos-built-in-shortcodes
### Buttons and Badges

| Button                                                                            | Badge                                                 |
| --------------------------------------------------------------------------------- | ----------------------------------------------------- |
| {{< button href="../../../tags" target="_self" >}}<br>🏷️ Tags<br>{{< /button >}} | {{< badge >}}<br>Badge Shortcode...<br>{{< /badge >}} |
### Congo

- [Congo Docs](https://jpanther.github.io/congo/docs/)
- [Congo Samples](https://jpanther.github.io/congo/samples/)
## 🖫 PowerShell string replace

```PowerShell
Get-ChildItem -Path "C:\Users\robk\Documents\Documents\Notes\Obsidian\Zettelkasten\4 - Content Creation\Git\rtdevx.github.io" -Recurse -Filter *.md | ForEach-Object {
    (Get-Content $_.FullName) -replace '<font color=#f4e40b>', '<font color=#EBAC25>' | Set-Content $_.FullName
}
```

## >> Sources <<

- [Congo, a powerful, lightweight theme for Hugo built with Tailwind CSS](https://jpanther.github.io/congo/)
- HTML Color Codes: https://htmlcolorcodes.com/
- Emojis: https://emojipedia.org/
## >> References <<

- [Installing Hugo with Congo]({{< ref "installing-congo-hugo" >}})
- [Categories]({{< ref "categories" >}})
- [Tags]({{< ref "tags" >}})
- [CheatSheets]({{< ref "tags/cheatsheets" >}})
## >> Table of contents <<

|                                                                         |                                                                                     |                                                                                       |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [1. What is Cloud Computing]({{< ref "1-what-is-cloud-computing" >}})   | [2. IAM]({{< ref "2-iam" >}})                                                       | [3. Budget]({{< ref "3-budget" >}})                                                   |
| [4. EC2]({{< ref "4-ec2" >}})                                           | [5. Security Groups]({{< ref "5-security-groups" >}})                               | [6. Storage]({{< ref "6-storage" >}})                                                 |
|                                                                         | [25. Preparing for AWS Practitioner exam]({{< ref "25-preparing-for-the-exam" >}})  |                                                                                       |
## >> Disclaimer <<

{{< alert "circle-info" >}}
Disclaimer: _Content for educational purposes only, no rights reserved._
{{< /alert >}}

[^Reference1]: This is the reference point number 1. 
