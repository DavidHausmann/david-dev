document.addEventListener("DOMContentLoaded", () => {
  const btnOpen = document.getElementById("open-curriculum");
  const modalElement = document.querySelector("curriculum-modal");

  if (btnOpen && modalElement) {
    btnOpen.addEventListener("click", (e) => {
      e.preventDefault();

      modalElement.open();
    });
  }
  document
    .querySelectorAll('nav a[href^="#"], .header a[href^="#"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
});
