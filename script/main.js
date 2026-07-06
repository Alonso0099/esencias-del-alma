// Wrapping everything in this function keeps these helpers out of the
// global scope, so they can't clash with other scripts added later.
(() => {
  document.addEventListener("DOMContentLoaded", initPage);

  function initPage() {
    initMobileMenu();
    initShopCategoryNav();
    initContactForm();
    setFooterYear();
  }

  // ---------- Menú hamburguesa (mobile) ----------
  function initMobileMenu() {
    const menuButton = document.getElementById("menu-toggle");
    const menuPanel = document.getElementById("mobile-menu");

    if (!menuButton || !menuPanel) {
      return;
    }

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      setMobileMenuOpen(menuButton, menuPanel, !isOpen);
    });

    menuPanel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setMobileMenuOpen(menuButton, menuPanel, false);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(menuButton, menuPanel, false);
      }
    });
  }

  function setMobileMenuOpen(button, panel, shouldOpen) {
    panel.classList.toggle("hidden", !shouldOpen);
    panel.classList.toggle("flex", shouldOpen);
    button.setAttribute("aria-expanded", String(shouldOpen));
  }

  // ---------- Categorías de la tienda (shop.html) ----------
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
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function setActiveCategoryLink(activeLink, allLinks) {
    allLinks.forEach((link) => {
      link.classList.remove("ring-2", "ring-sage", "bg-sage/10");
    });

    activeLink.classList.add("ring-2", "ring-sage", "bg-sage/10");
  }

  // ---------- Formulario de contacto (contact.html) ----------
  function initContactForm() {
    const form = document.getElementById("contact-form");

    if (!form) {
      return;
    }

    form.addEventListener("submit", handleContactFormSubmit);
  }

  function handleContactFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.elements.name.value.trim();
    const reason = form.elements.reason.value.trim();
    const message = form.elements.message.value.trim();

    const isNameValid = validateField(name, "contact-name-error", "Escribe tu nombre.");
    const isReasonValid = validateField(reason, "contact-reason-error", "Selecciona un motivo de contacto.");
    const isMessageValid = validateField(message, "contact-message-error", "Escribe tu mensaje.");

    if (!isNameValid || !isReasonValid || !isMessageValid) {
      return;
    }

    const whatsappUrl = buildWhatsappContactUrl(name, reason, message);
    window.open(whatsappUrl, "_blank");

    form.reset();
    showContactFormSuccess();
  }

  function validateField(value, errorElementId, errorMessage) {
    const errorElement = document.getElementById(errorElementId);
    errorElement.textContent = value ? "" : errorMessage;
    return Boolean(value);
  }

  function buildWhatsappContactUrl(name, reason, message) {
    const text = `Hola, mi nombre es ${name}. Motivo de contacto: ${reason}. Mensaje: ${message}`;
    return `https://wa.me/50683772263?text=${encodeURIComponent(text)}`;
  }

  function showContactFormSuccess() {
    const successMessage = document.getElementById("contact-form-success");
    successMessage.hidden = false;
  }

  // ---------- Año dinámico en el footer ----------
  function setFooterYear() {
    const yearElement = document.getElementById("current-year");

    if (!yearElement) {
      return;
    }

    yearElement.textContent = new Date().getFullYear();
  }
})();
