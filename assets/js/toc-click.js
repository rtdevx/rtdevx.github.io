document.addEventListener("DOMContentLoaded", () => {
  const tocLinks = document.querySelectorAll(".toc a");

  tocLinks.forEach(link => {
    link.addEventListener("click", () => {
      tocLinks.forEach(l => l.classList.remove("toc-active"));
      link.classList.add("toc-active");
    });
  });
});
