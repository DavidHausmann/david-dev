document.addEventListener("DOMContentLoaded", () => {
  const btnOpen = document.getElementById("open-curriculum");
  const modalElement = document.querySelector("curriculum-modal");

  if (btnOpen && modalElement) {
    btnOpen.addEventListener("click", (e) => {
      e.preventDefault();

      modalElement.open();
    });
  }
});
