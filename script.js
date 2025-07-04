document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const modeToggle = document.getElementById("mode-toggle");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navLinkItems = document.querySelectorAll(".nav-links a");

  // Load mode from localStorage
  const savedMode = localStorage.getItem("theme");
  if (savedMode === "light") {
    body.classList.add("light");
  }

  // Toggle light/dark mode
  modeToggle.addEventListener("click", () => {
    body.classList.toggle("light");
    const currentMode = body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", currentMode);
  });

  // Toggle mobile menu
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  // Close menu when a link is clicked (mobile)
  navLinkItems.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });

  // Optional: Highlight current section link on scroll
  const sections = document.querySelectorAll("section");
  const highlightNavLink = () => {
    let scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 100;
      const sectionHeight = sec.offsetHeight;
      const sectionId = sec.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinkItems.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", highlightNavLink);
});
