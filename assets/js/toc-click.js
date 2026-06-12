document.addEventListener("DOMContentLoaded", () => {
  const tocLinks = document.querySelectorAll(".toc-link");

  tocLinks.forEach(link => {
    link.addEventListener("click", () => {
      tocLinks.forEach(l => l.classList.remove("toc-link-active"));
      link.classList.add("toc-link-active");
    });
  });
});
