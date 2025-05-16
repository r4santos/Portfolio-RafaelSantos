// Main JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Initialize particles background
  const particlesBackground = new ParticlesBackground("particles-canvas");

  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear();

  // Header scroll effect
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    const isOpen = mobileMenu.classList.contains("active");
    menuToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  // Smooth scrolling for navigation links
  const scrollLinks = document.querySelectorAll("[data-scroll]");
  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("data-scroll");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Close mobile menu if open
        mobileMenu.classList.remove("active");
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';

        // Scroll to target
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Language switcher
  let currentLanguage = "pt";
  const languageToggle = document.getElementById("language-toggle");
  const languageToggleMobile = document.getElementById("language-toggle-mobile");

  function updateLanguage(lang) {
    currentLanguage = lang;

    // Update toggle button text
    languageToggle.textContent = currentLanguage === "pt" ? "EN" : "PT";
    languageToggleMobile.textContent = currentLanguage === "pt" ? "EN" : "PT";

    // Update all translatable elements
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (translations[currentLanguage][key]) {
        element.textContent = translations[currentLanguage][key];
      }
    });
  }

  languageToggle.addEventListener("click", () => {
    updateLanguage(currentLanguage === "pt" ? "en" : "pt");
  });

  languageToggleMobile.addEventListener("click", () => {
    updateLanguage(currentLanguage === "pt" ? "en" : "pt");
  });

  // Contact form handling
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    // Simulate form submission
    formStatus.className = "form-status";
    formStatus.style.display = "block";
    formStatus.textContent = "Enviando...";

    setTimeout(() => {
      // Simulate successful submission
      formStatus.className = "form-status success";
      formStatus.textContent = currentLanguage === "pt" ? "Mensagem enviada com sucesso!" : "Message sent successfully!";

      // Reset form
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        formStatus.style.display = "none";
      }, 5000);
    }, 1500);
  });

  // Copy code functionality
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const codeBlock = this.closest(".code-block").querySelector("code");
      const textToCopy = codeBlock.textContent;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = this.textContent;
        this.textContent = "Copied!";

        setTimeout(() => {
          this.textContent = originalText;
        }, 2000);
      });
    });
  });
});