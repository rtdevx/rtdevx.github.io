+++
draft = true
title = 'Start'
summary = 'Start Page.'
layout = 'simple'
+++


<center>
<form
id="ddg-site-search"
action="https://duckduckgo.com/"
method="get"
target="_blank"
>
<input
type="search"
name="q"
id="ddg-query"
placeholder="Search this site..."
aria-label="Search this site"
required
/>
<button type="submit">Search</button>
</form>
</center>

<script>
(function () {
const form = document.getElementById("ddg-site-search");
const input = document.getElementById("ddg-query");

form.addEventListener("submit", function () {
const domain = window.location.hostname;
input.value = "site:" + domain + " " + input.value;
});
})();
</script>

<br />

| {{< button href="https://github.com/rtdevx" target="_blank" >}}<br><span style="display:flex; align-items:center; justify-content:center; width:100%;"><br>    <img src="https://github.githubassets.com/favicons/favicon-dark.png" alt="" style="height:1em; margin-right:0.4em;"><br>    GitHub<br></span><br>{{< /button >}} | {{< button href="https://rtdevx.atlassian.net/jira/software/projects/HL/boards/1" target="_blank" >}}<br><span style="display:flex; align-items:center; justify-content:center; width:100%;"><br>    <img src="https://jira-frontend-bifrost.prod-east.frontend.public.atl-paas.net/assets/favicon-temp-family.9e1adb01.png" alt="" style="height:1em; margin-right:0.4em;"><br>    Jira<br></span><br>{{< /button >}} |               {{< button href="https://www.skool.com/kubecraft" target="_blank" >}}<br><span style="display:flex; align-items:center; justify-content:center; width:100%;"><br>    <img src="https://kubernetes.io/icons/favicon-64.png" alt="" style="height:1em; margin-right:0.4em;"><br>    Kubecraft<br></span><br>{{< /button >}}                | {{< button href="https://www.udemy.com/" target="_blank" >}}<br><span style="display:flex; align-items:center; justify-content:center; width:100%;"><br>    <img src="https://frontends.udemycdn.com/frontends-homepage/staticx/udemy/images/v8/favicon-32x32.png" alt="" style="height:1em; margin-right:0.4em;"><br>    Udemy<br></span><br>{{< /button >}} |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|    {{< button href="https://cheatsheets.zip/" target="_blank" >}}<br><span style="display:flex; align-items:center; justify-content:center; width:100%;"><br>    <img src="https://cheatsheets.zip/images/favicon.png?v=1" alt="" style="height:1em; margin-right:0.4em;"><br>    Cheat Sheets<br></span><br>{{< /button >}}    |                                             {{< button href="https://docs.ansible.com/" target="_blank" >}}<br><span style="display:flex; align-items:center; justify-content:center; width:100%;"><br>    <img src="https://docs.ansible.com/favicon/favicon-32x32.png" alt="" style="height:1em; margin-right:0.4em;"><br>    Ansible Docs<br></span><br>{{< /button >}}                                             | {{< button href="https://registry.terraform.io/" target="_blank" >}}<br><span style="display:flex; align-items:center; justify-content:center; width:100%;"><br>    <img src="https://registry.terraform.io/images/favicons/favicon-32x32.png" alt="" style="height:1em; margin-right:0.4em;"><br>    Terraform Registry<br></span><br>{{< /button >}} |                {{< button href="https://aws.amazon.com/" target="_blank" >}}<br><span style="display:flex; align-items:center; justify-content:center; width:100%;"><br>    <img src="https://a0.awsstatic.com/libra-css/images/site/fav/favicon.ico" alt="" style="height:1em; margin-right:0.4em;"><br>    AWS<br></span><br>{{< /button >}}                |


