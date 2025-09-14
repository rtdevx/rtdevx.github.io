---
title: Post Title
date: 2025-07-17
description: POST DESCRIPTION
summary: POST SUMMARY...
draft: true
tags:
  - TAG
categories: TEMPLATE_DRAFT
---
{{< lead >}}
### The world’s fastest framework for building websites.

Hugo is one of the most popular open-source static site generators. With its amazing speed and flexibility, Hugo makes building websites fun again.

{{< /lead >}}

## 📺 YouTube Tutorial

{{< youtube 6BRZ-yHjYwo >}}

💡Extensive but exceptionally good {{< icon "youtube" >}} `Hugo Static Site Generation Tutorial`
## Create site with Hugo

```PowerShell
cd "C:\Git"
hugo new site rtdevx.github.io
```

👨🏻‍💻`Hugo framework` and `Git` must be installed on the local system. For more details, visit: [gohugo.io/installation](https://gohugo.io/installation/) and [official Hugo website](https://gohugo.io/) for more information.

ℹ️ Other options available, check: https://jpanther.github.io/congo/docs/installation/#installation
## Post Template

[Hugo Post Template]({{< ref "post-template" >}})
## Code

📄 `.\config\_default\hugo.toml`

{{< highlight html "linenos=table,hl_lines=5 7" >}}

# -- Site Configuration --
# Refer to the theme docs for more details about each of these parameters.
# https://jpanther.github.io/congo/docs/getting-started/

theme = "congo"

baseURL = "https://rtdevx.github.io/"
defaultContentLanguage = "en"

enableRobotsTXT = false
summaryLength = 0

[pagination]
  pagerSize = 10

[outputs]
  home = ["HTML", "RSS", "JSON"]

[privacy]
  [privacy.vimeo]
    enableDNT = true
  [privacy.x]
    enableDNT = true
  [privacy.youTube]
    privacyEnhanced = true

[services]
  [services.x]
    disableInlineCSS = true

{{< /highlight >}}


📄 `.github/workflows/hugo.yml`

```YAML
# .github/workflows/hugo.yml

name: GitHub Pages

on:
  push:
    branches:
      - main
permissions:
  contents: write

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    concurrency:
      group: ${{ github.workflow }}-${{ github.ref }}
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          submodules: true
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: "latest"
          extended: true

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        if: ${{ github.ref == 'refs/heads/main' }}
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_branch: gh-pages
          publish_dir: ./public

```

_Source:_ https://jpanther.github.io/congo/docs/hosting-deployment/#github-pages


---
## >> Sources <<

- Source1: 
- Source2:
## >> References <<

- [Hugo Post Template]({{< ref "post-template" >}})
## >> Issues <<

### 🚩Issue1

1. What is the issue?
2. 

Following original instructions comes back with an error:

>remote: Permission to rtdevx/rtdevx.github.io.git denied to github-actions[bot].
>
>fatal: unable to access '[https://github.com/rtdevx/rtdevx.github.io.git/](https://github.com/rtdevx/rtdevx.github.io.git/)': The requested URL returned error: 403
>
>Error: Action failed with "The process '/usr/bin/git' failed with exit code 128"
#### ✅Solution

1. What is the Solution?