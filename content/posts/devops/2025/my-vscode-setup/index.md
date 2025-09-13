---
title: My VSCode setup
date: 2025-09-13
description: My Visual Studio Code setup
summary: My Visual Studio Code setup
draft: false
tags:
  - vscode
  - devops
  - tools
  - github
categories: DevOps Tools
---
{{< lead >}}
### The open source AI code editor

`Visual Studio Code` is a free and versatile code editor that supports almost every major programming language and integrates with GitHub Copilot, an AI model that suggests code edits and completions.

{{< /lead >}}

## 📺 YouTube Tutorial

{{< youtube lxRAj1Gijic >}}

💡One of many {{< icon "youtube" >}} `VSCode Setup Tutorials`
## Manual Settings

1. Enable minimap
2. Add theme extension 
	- One Dark Pro
	- Dark Horizon
	- Tokyo Night
	- Night Owl
3. Change cursor blinking (set to "expand")

![](./assets/gh_settings_blink.png)

4. Cursor Smooth Caret Animation

![](./assets/gh_settings_cursor_smooth.png)

5. Enable Word Wrap in Settings (set to "on")
6. Ensure Bracket Pair Colorization: Enabled
## My VSCode Extensions

- powershell
- remote-ssh
- remote-server
- remote-wsl
- remote-extensionpack
- yaml
- copilot
- copilot-chat
- peacock
- vscode-docker
- prettier-vscode
- gitlens
- code-runner
- vsliveshare
- material-icon-theme
- pdf
- rainbow-csv
- better-comments

<video id="vscode_copilot" autoplay loop>  
  <source src="./assets/vscode-copilot.webm" type="video/webm">  
Your browser does not support the video tag.  
</video>
### Installing (above) VSCode extensions with PowerShell

```PowerShell
Write-Host `n"Installing VSCode extensions."`n -ForegroundColor Green

start-process code -windowstyle Hidden -ArgumentList "--install-extension ms-vscode.powershell --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension ms-vscode-remote.remote-ssh --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension ms-vscode.remote-server --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension ms-vscode-remote.remote-wsl --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension ms-vscode-remote.vscode-remote-extensionpack --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension redhat.vscode-yaml --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension github.copilot --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension github.copilot-chat --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension johnpapa.vscode-peacock --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension ms-azuretools.vscode-docker --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension esbenp.prettier-vscode --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension eamodio.gitlens --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension formulahendry.code-runner --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension ms-vsliveshare.vsliveshare --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension pkief.material-icon-theme --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension tomoki1207.pdf --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension mechatroner.rainbow-csv --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension aaron-bond.better-comments --force" -PassThru -Wait

start-process code -windowstyle Hidden -ArgumentList "--install-extension hnw.vscode-auto-open-markdown-preview --force" -PassThru -Wait
```

---
## >> Sources <<

- VSCode main site: https://code.visualstudio.com/
