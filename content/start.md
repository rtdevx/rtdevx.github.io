+++
draft = false
title = '🧭Start'
summary = 'Start Page.'
date = 'Start Page.'
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

|   {{< button href="../categories/aws" target="_self" >}}  <br>AWS<br>{{< /button >}}   |             {{< button href="../categories/iac" target="_self" >}}  <br>IaC<br>{{< /button >}}              |  {{< button href="../tags/ansible" target="_self" >}}  <br>Ansible<br>{{< /button >}}  |   {{< button href="../tags/terraform" target="_self" >}}  <br>Terraform<br>{{< /button >}}    |
| :------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
| {{< button href="../categories/ci/cd" target="_self" >}}  <br>CI/CD<br>{{< /button >}} |      {{< button href="../categories/containers" target="_self" >}}  <br>Containers<br>{{< /button >}}       | {{< button href="../categories/linux" target="_self" >}}  <br>Linux<br>{{< /button >}} | {{< button href="../categories/networking" target="_self" >}}  <br>Network<br>{{< /button >}} |


