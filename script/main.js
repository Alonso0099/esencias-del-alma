// Wrapping everything in this function keeps these helpers out of the
// global scope, so they can't clash with other scripts added later.
(() => {
  document.addEventListener("DOMContentLoaded", initShopCategoryNav);

  function initShopCategoryNav() {
    const categoryLinks = document.querySelectorAll(".shop-category-link");

    categoryLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        handleCategoryLinkClick(event, link, categoryLinks);
      });
    });
  }

  function handleCategoryLinkClick(event, clickedLink, allLinks) {
    event.preventDefault();

    const targetId = clickedLink.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (!targetSection) {
      return;
    }

    setActiveCategoryLink(clickedLink, allLinks);
    scrollToSection(targetSection);
  }

  function setActiveCategoryLink(activeLink, allLinks) {
    allLinks.forEach((link) => {
      link.classList.remove("shop-category-link--active");
    });

    activeLink.classList.add("shop-category-link--active");
  }

  function scrollToSection(section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
})();
