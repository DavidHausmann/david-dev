class ProjectsModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
            <style>
                /* Estilização CSS Isolada para o Modal */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: "Roboto", sans-serif;
                    font-size: 16px;
                    font-weight: 400;
                }
                a {
                    text-decoration: none;
                    color: var(--primary-color);
                    font-weight: 400;
                }
                .modal__overlay {
                    display: none; 
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.7); 
                    z-index: 2000;
                    width: 100vw;
                    height: 100vh;
                    
                    /* Centralização */
                    justify-content: center;
                    align-items: center;
                    
                    opacity: 0; 
                    transition: opacity 0.3s ease-in-out;
                }

                /* Classe para tornar o modal visível */
                .modal__overlay.active {
                    display: flex;
                    opacity: 1;
                }

                .modal__content {
                    background-color: white;
                    padding: 30px;
                    border-radius: 8px;
                    max-width: 100%;
                    width: 100%;
                    max-width: 90vw;
                    max-height: 90vh;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                    display: flex;
                    flex-direction: column;
                    
                    /* Animação de entrada */
                    transform: scale(0.95); 
                    transition: transform 0.3s ease-in-out;
                }

                .modal__header {
                    display: flex;
                    justify-content: flex-end;
                }
                
                .close__button {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: var(--primary-color);
                }

                .modal__overlay.active .modal__content {
                    transform: scale(1);
                }
                @media only screen and (min-width: 680px) {
                    .modal__content {
                        max-width: 600px;
                    }
                }
            </style>

            <div id="modal-container" class="modal__overlay">
                <div class="modal__content">
                    <div class="modal__header">
                        <button id="close-modal" class="close__button" aria-label="Fechar Modal">&times;</button>
                    </div>
                    <slot></slot>
                </div>
            </div>
        `;

    const modal = this.shadowRoot.getElementById("modal-container");
    const btnClose = this.shadowRoot.getElementById("close-modal");

    this.open = () => {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
      this.calculateScrollHeight();
    };

    this.close = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    };

    if (btnClose) {
      btnClose.addEventListener("click", this.close);
    }

    modal.addEventListener("click", (e) => {
      if (e.target.id === "modal-container") {
        this.close();
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        this.close();
      }
    });
  }
}

customElements.define("projects-modal", ProjectsModal);
