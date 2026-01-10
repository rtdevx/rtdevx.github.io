+++
draft = false
title = '🔰Posts'
summary = 'Welcome to my blog.'
+++

| Jump to Section                                                |                                                                                                             |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| ✨[Cheat Sheets]({{< ref "/posts/cheatsheets" >}})              | A set of useful cheat sheets...                                                                             |
| ✨[Trainings and Certifications]({{< ref "/posts/training" >}}) | Training in progress being documented at this moment and the trainings that I have completed in the past... |

<!-- DuckDuckGo Site Search -->
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