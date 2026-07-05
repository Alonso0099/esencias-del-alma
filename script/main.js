document.addEventListener("DOMContentLoaded", () => {
  const categoryLinks = document.querySelectorAll(".shop-category-link");

  categoryLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (!targetSection) {
        return;
      }

      categoryLinks.forEach((item) => {
        item.classList.remove("shop-category-link--active");
      });

      link.classList.add("shop-category-link--active");

      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
});
