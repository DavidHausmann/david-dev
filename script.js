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
      anchor.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
  const experienceElement = document.getElementById("experience-years");
  if (experienceElement) {
    experienceElement.textContent = getFrontEndExperienceYears();
  }
});

function getFrontEndExperienceYears() {
  const startDate = new Date("2021-08-09");
  const currentDate = new Date();
  let years = currentDate.getFullYear() - startDate.getFullYear();
  const monthDiff = currentDate.getMonth() - startDate.getMonth();
  return years + (monthDiff >= 0 ? 0 : -1);
}
