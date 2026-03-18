document.addEventListener("DOMContentLoaded", () => {
  const categoryLinks = document.querySelectorAll(".shop-category-link");

  console.log("JS cargado correctamente");
  console.log("Links encontrados:", categoryLinks.length);

  categoryLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      console.log("Click en:", targetId);
      console.log("Sección encontrada:", targetSection);

      if (!targetSection) {
        console.log("No se encontró la sección:", targetId);
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




