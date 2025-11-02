class CurriculumModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
            <style>
                /* Estilização CSS Isolada para o Modal */

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
                    max-height: 90vh;
                    overflow-y: auto; 
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                    
                    /* Animação de entrada */
                    transform: scale(0.95); 
                    transition: transform 0.3s ease-in-out;
                }

                .modal__overlay.active .modal__content {
                    transform: scale(1);
                }

                .modal__header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 15px;
                    margin-bottom: 20px;
                }

                .close__button {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #333;
                }
                
                /* Estilos do Botão de Download */
                .download__btn {
                    display: inline-block;
                    padding: 8px 15px;
                    background-color: #007bff; /* Cor primária do seu site */
                    color: white;
                    text-decoration: none;
                    border-radius: 4px;
                    margin-top: 10px;
                }

                /* Garante que o conteúdo injetado do slot seja exibido corretamente */
                .modal__body::slotted(*) {
                    margin: 0;
                }
            </style>

            <div id="modal-container" class="modal__overlay">
                <div class="modal__content">

                    <div class="modal__header">
                    </div>

                    <div class="modal__body">
                        <slot></slot> 
                    </div>
                </div>
            </div>
        `;

    const modal = this.shadowRoot.getElementById("modal-container");
    const btnClose = this.shadowRoot.getElementById("close-modal");

    this.open = () => {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
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

customElements.define("curriculum-modal", CurriculumModal);
