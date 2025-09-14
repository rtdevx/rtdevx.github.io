---
title: Hugo Post Template
date: 2025-07-17
description: Hugo Post Template
summary: Hugo Post Template
draft: false
tags:
  - hugo
categories: Cheatsheets
---
{{< lead >}}
Example how a new post can be structured. Header information, highlights, etc...
### The world’s fastest framework for building websites

Hugo is one of the most popular open-source static site generators. With its amazing speed and flexibility, Hugo makes building websites fun again.
{{< /lead >}}

{{< alert "lightbulb" >}}
Anything that requires attention.

Can be enhanced with [emojis]({{< ref "post-template/#emojis" >}}) or <font color=#EB4925>colors</font>...
{{< /alert >}}

---

{{< youtube MX4yy1dTVYg >}}

---
## Linking internal content

- [Installing Hugo with Congo]({{< ref "installing-congo-hugo" >}})
- [Categories]({{< ref "categories" >}})
- [Tags]({{< ref "tags" >}})
### Folders

1. Folder location:
	- content/posts<font color=#EBAC25>/category</font><font color=#C7EB25>/YYYY</font>
2. Replace `thumb.jpg`
3. Replace `cover.jpg` (if applicable)

\*<font color=#EBAC25>use `feature.jpg` if _thumb_ and _cover_ are the same</font> (_see:_ [#feature-cover-and-thumbnail-images](https://jpanther.github.io/congo/docs/getting-started/#feature-cover-and-thumbnail-images) for more information.)
## 🟢<font color=#EB4925>Colors</font>

| Color                             | HEX       | HTML                   | Usage                                                                                             |
| --------------------------------- | --------- | ---------------------- | ------------------------------------------------------------------------------------------------- |
| <font color=#EB4925>Red</font>    | `#EB4925` | `<font color=#EB4925>` | Warning, Important                                                                                |
| <font color=#EBAC25>Yellow</font> | `#EBAC25` | `<font color=#EBAC25>` | Highlights                                                                                        |
| <font color=#C7EB25>Green</font>  | `#C7EB25` | `<font color=#C7EB25>` | Highlights, interesting, etc.                                                                     |
| <font color=#27D3F5>Blue</font>   | `#27D3F5` | `<font color=#27D3F5>` | Color used for content to be corrected later (i.e. new links to not-yet existing content, etc...) |

_HTML Color Codes:_ https://htmlcolorcodes.com/
## 🏷️Icons

{{< icon "circle-info" >}} list of available icons: 

- https://jpanther.github.io/congo/samples/icons/
- https://jpanther.github.io/congo/docs/shortcodes/#icon

Insert an icon: `{ {< icon "circle-info" >}}`
## ❤️Emojis

🫶🏻 https://emojipedia.org/

| Emoji        | Usage                |
| ------------ | -------------------- |
| ‼️           | Attention            |
| 🚩           | Issue / Problem      |
| 🚫 / ☢️ / ☣️ | Prohibited / Hazard  |
| 🔍           | Issue Investigation  |
| ✅            | Solution / Solved    |
| ℹ️           | Info                 |
| 💡           | Idea                 |
| 👨🏻‍💻      | To Do                |
| 💾           | Download             |
| 📺           | YouTube              |
| ✨/ 🔥        | Post title highlight |
| 🗂️          | Series               |
| 📄           | File / Code          |
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
## 🖰 Buttons and Badges

| Button                                                                            | Badge                                                 |
| --------------------------------------------------------------------------------- | ----------------------------------------------------- |
| {{< button href="../../../tags" target="_self" >}}<br>🏷️ Tags<br>{{< /button >}} | {{< badge >}}<br>Badge Shortcode...<br>{{< /badge >}} |
## ≥ Code Blocks

### Code block with backticks

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example HTML5 Document</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```

### Code block indented with four spaces

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Example HTML5 Document</title>
    </head>
    <body>
      <p>Test</p>
    </body>
    </html>

### Code block with Hugo's internal highlight shortcode

{{< highlight html "linenos=table,hl_lines=4 7-9" >}}

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Example HTML5 Document</title>
</head>
<body>
  <p>Test</p>
</body>
</html>
{{< /highlight >}}
## 🖫 PowerShell string replace

```PowerShell
Get-ChildItem -Path "C:\Users\robk\Documents\Documents\Notes\Obsidian\Zettelkasten\4 - Content Creation\Git\rtdevx.github.io" -Recurse -Filter *.md | ForEach-Object {
    (Get-Content $_.FullName) -replace '<font color=#f4e40b>', '<font color=#EBAC25>' | Set-Content $_.FullName
}
```

## 🪎 Other Elements - abbr, sub, sup, kbd, mark

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.
## >> Sources <<

- [Congo, a powerful, lightweight theme for Hugo built with Tailwind CSS](https://jpanther.github.io/congo/)
- [Congo Docs](https://jpanther.github.io/congo/docs/)
- [Congo Samples](https://jpanther.github.io/congo/samples/)
- HTML Color Codes: https://htmlcolorcodes.com/
- Emojis: https://emojipedia.org/
## >> References <<

- [Installing Hugo with Congo]({{< ref "installing-congo-hugo" >}})
- [Categories]({{< ref "categories" >}})
- [Tags]({{< ref "tags" >}})
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
