class CurriculumModal extends HTMLElement {
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

                .modal__overlay.active .modal__content {
                    transform: scale(1);
                }

                .modal__header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 32px;
                    gap: 24px;
                }
                .modal__header .modal__header__left {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 4px;
                    & .modal__header__subtitle {
                      display: none;
                    }
                }
                .modal__header .modal__header__right {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    align-items: flex-end;
                    max-width: 30%;
                    width: 100%;
                    & .download__btn {
                      display: none;
                    }
                }
                .modal__header__subarea {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 24px;
                    justify-content: space-between;
                    margin-bottom: 32px;
                    & p {
                      font-size: 14px;
                      line-height: 1.33;
                      color: var(--secondary-color);
                      text-align: center;
                    }
                }
                .modal__header .modal__header__title {
                    font-size: 18px;
                    line-height: 1.42;
                    font-weight: 600;
                    color: var(--primary-color);
                }
                .modal__header .modal__header__subtitle {
                    font-size: 14px;
                    line-height: 1.33;
                    color: var(--secondary-color);
                }
                
                

                .close__button {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: var(--primary-color);
                }
                
                /* Estilos do Botão de Download */
                .download__btn {
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    color: var(--primary-color);
                    cursor: pointer;
                    padding: 4px 12px;
                    font-weight: 600;
                    min-height: 32px;
                    height: fit-content;
                    background-color: transparent;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .download__btn:hover {
                    background-color: var(--hover-color);
                    box-shadow: none;
                }

                
                .custom__scroll {
                  overflow-y: auto;
                  flex: 1;
                  min-height: 0;
                  &::-webkit-scrollbar {
                    width: 10px;
                    height: 10px;
                  }

                  &::-webkit-scrollbar-button {
                    display: none !important;
                  }

                  &::-webkit-scrollbar-track {
                    background: #f5f5f5;
                    border-radius: 10px;
                  }

                  &::-webkit-scrollbar-thumb {
                    background: #a2a2a2;
                    border-radius: 10px;
                  }

                  &::-webkit-scrollbar-thumb:hover {
                    background: #888888;
                  }

                  * {
                    scrollbar-color: #a2a2a2 #f5f5f5;
                    scrollbar-width: thin;
                  }

                  &::-webkit-scrollbar {
                    width: 10px;
                    height: 10px;
                    background-color: transparent;
                  }
                }

                /* Garante que o conteúdo injetado do slot seja exibido corretamente */
                .modal__body::slotted(*) {
                    margin: 0;
                }
                .modal__body {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                    padding-right: 8px;
                }
                .modal__body__header {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    padding-bottom: 24px;
                    border-bottom: 1px solid var(--border-color);
                }
                .modal__body__header__title {
                    font-size: 30px;
                    color: var(--primary-color);
                }
                .modal__body__header__subtitle {
                    font-size: 18px;
                    color: var(--secondary-color);
                }
                .modal__body__header__contact {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    & img {
                        width: 16px;
                        height: 16px;
                    }
                    & a {
                        font-size: 14px;
                        color: var(--primary-color);
                    }
                }
                .modal__body__about,
                .modal__body__experience,
                .modal__body__education,
                .modal__body__habilities {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    & h4 {
                        font-size: 20px;
                        color: var(--primary-color);
                    }
                    & p {
                        font-size: 14px;
                        color: var(--tertiary-color);
                        line-height: 1.42;
                    }
                }
                .modal__body__header__contact .modal__body__header__contact__link:hover:not(.modal__body__header__contact__link--location) {
                    color: var(--tertiary-color);
                }
                .work__experience {
                  display: flex;
                  flex-direction: column;
                  gap: 8px;
                }
                  .work__experience
                  .work__experience__header {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  gap: 8px;
                }
                  .work__experience
                  .work__experience__header
                  .work__experience__title__header__title {
                  font-size: 16px;
                  line-height: 1.42rem;
                  color: var(--primary-color);
                }
                  .work__experience
                  .work__experience__header
                  .work__experience__title__header__date {
                  display: flex;
                  align-items: center;
                  gap: 4px;
                  font-size: 12px;
                  line-height: 1rem;
                  color: var(--tertiary-color);
                }
                  .work__experience
                  .work__experience__header
                  .work__experience__title__header__date
                  .work__experience__title__header__date__icon {
                  width: 16px;
                  height: 16px;
                }
                  .work__experience
                  .work__experience__local {
                  display: flex;
                  align-items: center;
                  gap: 4px;
                  font-size: 12px;
                  line-height: 1rem;
                  color: var(--tertiary-color);
                }
                  .work__experience
                  .work__experience__local
                  .work__experience__local__icon {
                  width: 16px;
                  height: 16px;
                }
                  .work__experience
                  .work__experience__list {
                  padding-left: 32px;
                  margin-top: 16px;
                }
                  .work__experience
                  .work__experience__list
                  .work__experience__list__item {
                  font-size: 12px;
                  line-height: 1.33rem;
                  color: var(--tertiary-color);
                }
                .modal__body__others__experience {
                  display: flex;
                  flex-direction: column;
                  gap: 16px;
                  & h4 {
                    font-size: 16px;
                    color: var(--primary-color);
                    font-weight: 500;
                  }
                  & p {
                    font-size: 14px;
                    color: var(--tertiary-color);
                    line-height: 1.42;
                  }
                }
                .modal__body__education {
                  display: flex;
                  flex-direction: column;
                  gap: 16px;
                  & .modal__body__education__item {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    & .modal__body__education__item__title {
                      display: flex;
                      align-items: center;
                      gap: 16px;
                      justify-content: space-between;
                      & h5 {
                        font-size: 14px;
                        color: var(--primary-color);
                      }
                      & p {
                        font-size: 12px;
                        color: var(--tertiary-color);
                        line-height: 14px;
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        & img {
                          width: 16px;
                          height: 16px;
                        }
                      }
                    }
                    & .modal__body__education__item__institution {
                      display: flex;
                      align-items: center;
                      gap: 8px;
                      font-size: 12px;
                      color: var(--tertiary-color);
                      line-height: 14px;
                      & img {
                        width: 16px;
                        height: 16px;
                      }
                    }                     
                  }
                }
                .modal__body__habilities {
                  & ul {
                    list-style: none;
                    padding-left: 0;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                  }
                  & li {
                    width: calc(50% - 6px);
                    max-width: calc(50% - 6px);
                    min-width: fit-content;
                    position: relative;
                    padding-left: 28px;
                    font-size: 14px;
                    color: var(--primary-color);
                    line-height: 1.42;
                    &::before {
                      content: "";
                      position: absolute;
                      top: 50%;
                      left: 0;
                      width: 16px;
                      height: 16px;
                      background: url('./assets/images/check-green.svg') no-repeat center;
                      background-size: contain;
                      transform: translateY(-50%);
                    }
                  }
                }
                @media only screen and (min-width: 680px) {
                    .modal__content {
                        max-width: 600px;
                    }
                    .modal__header__subarea {
                      display: none;
                    }
                    .modal__header .modal__header__left .modal__header__subtitle {
                      display: block;
                    }
                    .modal__header .modal__header__right .download__btn {
                      display: flex;
                    }
                }
            </style>

            <div id="modal-container" class="modal__overlay">
                <div class="modal__content">

                    <div class="modal__header">
                        <div class="modal__header__left">
                            <p class="modal__header__title">Currículo</p>
                            <p class="modal__header__subtitle">Informações detalhadas sobre minhas experiências e qualificações</p>
                        </div>
                        <div class="modal__header__right">
                            <button id="close-modal" class="close__button" aria-label="Fechar Modal">&times;</button>
                            <button id="download-cv" class="download__btn" aria-label="Baixar currículo em PDF">
                                <img src="./assets/images/download.svg" alt="Ícone de download"> 
                                Download PDF
                            </button>
                        </div>
                    </div>
                    <div class="modal__header__subarea">
                        <p class="modal__header__subtitle">Informações detalhadas sobre minhas experiências e qualificações</p>
                        <button id="download-cv-bottom" class="download__btn" aria-label="Baixar currículo em PDF">
                          <img src="./assets/images/download.svg" alt="Ícone de download"> 
                          Download PDF
                        </button>
                    </div>
                    <div class="custom__scroll">
                      <div class="modal__body">
                          <div class="modal__body__header">
                              <h2 class="modal__body__header__title">David Hausmann</h2>
                              <h3 class="modal__body__header__subtitle">Desenvolvedor Front-End</h3>
                              <div class="modal__body__header__contact">
                                <img src="../assets/images/keep.svg" alt="Minha localização">
                                <a class="modal__body__header__contact__link modal__body__header__contact__link--location">Santa Catarina, Brasil</a>
                              </div>
                              <div class="modal__body__header__contact">
                                <img src="../assets/images/mail.svg" alt="Meu email de contato">
                                <a
                                    href="mailto:davidwilliamhausmann@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Enviar email para davidwilliamhausmann@gmail.com (abre em nova aba)"
                                    class="modal__body__header__contact__link"
                                  >
                                    davidwilliamhausmann@gmail.com
                                </a>
                              </div>
                              <div class="modal__body__header__contact">
                                <img src="../assets/images/mobile.svg" alt="Meu contato telefônico">
                                <a
                                    href="https://wa.me/5548996670688"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Enviar mensagem para +55 (48) 99667-0688 (abre em nova aba)"
                                    class="modal__body__header__contact__link"
                                  >
                                    +55 (48) 99667-0688
                                </a>
                              </div>
                              <div class="modal__body__header__contact">
                                <img src="../assets/images/link.svg" alt="Meu Linkedin">
                                <a
                                    href="https://www.linkedin.com/in/davidwilliamhausmann/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn - David Hausmann (abre em nova aba)"
                                    class="modal__body__header__contact__link"
                                  >
                                  LinkedIn
                                </a>
                              </div>
                          </div>
                          <div class="modal__body__about">
                              <h4>Sobre mim</h4>
                              <p>Sou um Desenvolvedor Front-End com experiência em criar interfaces de usuário responsivas e acessíveis. 
                              Tenho paixão por aprender novas tecnologias e melhorar minhas habilidades. 
                              Atualmente estou me aprofundando em linguagens voltadas para o Back-End com intuito de me tornar um 
                              desenvolvedor Full-Stack capaz de apoiar o time em momentos de necessidade (A princípio utilizando Python e Java). 
                              Tenho buscado conhecimento em outros frameworks e bibliotecas para expandir meu conjunto de habilidades, 
                              iniciando a construção de alguns projetos implementados em React utilizando o TailWind.</p>
                          </div>
                          <div class="modal__body__experience">
                              <h4>Experiência Profissional</h4>
                              <div class="work__experience">
                                <div class="work__experience__header">
                                  <p class="work__experience__title__header__title">
                                    Desenvolvedor Front-End
                                  </p>
                                  <p class="work__experience__title__header__date">
                                    <img
                                      class="work__experience__title__header__date__icon"
                                      src="./assets/images/calendar.svg"
                                      alt="Data de início e fim da experiência"
                                    />
                                    Ago 2021 - Out 2025
                                  </p>
                                </div>
                                <p class="work__experience__local">
                                  <img
                                    class="work__experience__local__icon"
                                    src="./assets/images/keep.svg"
                                    alt="Empresa da experiência"
                                  />
                                  Grupo Nexxees | NIX
                                </p>
                                <ul class="work__experience__list">
                                  <li class="work__experience__list__item">
                                    Desenvolvimento de funcionalidades para a plataforma NIX
                                    Empresa, utilizando Angular, HTML, CSS e TypeScript.
                                  </li>
                                  <li class="work__experience__list__item">
                                    Participação na criação e manutenção do Design System da
                                    plataforma, garantindo consistência visual e reutilização
                                    de componentes.
                                  </li>
                                  <li class="work__experience__list__item">
                                    Implementação de testes unitários para garantir a
                                    qualidade do código e o funcionamento correto das
                                    funcionalidades.
                                  </li>
                                  <li class="work__experience__list__item">
                                    Colaboração com equipes multidisciplinares em um ambiente
                                    ágil, participando de reuniões diárias, planejamento de
                                    sprints e revisões de código.
                                  </li>
                                </ul>
                              </div>
                          </div>
                          <div class="modal__body__others__experience">
                              <h4>Outras Experiências</h4>
                              <p>
                                Além da minha experiência principal como Desenvolvedor Front-End 
                                no Grupo Nexxees | NIX, atuei em outras organizações na área de 
                                tecnologia como Analista de TI, tendo a possibilidade de atuar em 
                                pequenas manutenções de aplicações web que criaram uma base para 
                                meu interesse em desenvolvimento. Essas experiências me proporcionaram 
                                uma visão mais ampla do setor de tecnologia e reforçaram minha paixão 
                                pelo desenvolvimento web.
                              </p>
                          </div>
                          <div class="modal__body__education">
                              <h4>Formação Acadêmica</h4>
                              <div class="modal__body__education__item">
                                  <div class="modal__body__education__item__title">
                                    <h5>
                                      Graduação | Gestão da Tecnologia da Informação
                                    </h5>
                                    <p class="work__experience__title__header__date">
                                      <img
                                        class="work__experience__title__header__date__icon"
                                        src="../assets/images/calendar.svg"
                                        alt="Data de início e fim da experiência"
                                      />
                                      Jan 2017 - Ago 2022
                                    </p>
                                  </div>
                                  <p class="modal__body__education__item__institution">
                                    <img
                                      src="./assets/images/keep.svg"
                                      alt="Universidade em que conclui minha graduação"
                                    />
                                    IFSC - Instituto Federal de Santa Catarina
                                  </p>
                              </div>
                          </div>
                          <div class="modal__body__habilities">
                            <h4>Habilidades</h4>
                            <ul>
                              <li>JavaScript</li>
                              <li>TypeScript</li>
                              <li>Angular</li>
                              <li>React</li>
                              <li>HTML5</li>
                              <li>CSS3</li>
                              <li>SCSS/Sass</li>
                              <li>Git & GitHub</li>
                              <li>Testes Unitários</li>
                              <li>Design Systems</li>
                              <li>Responsividade</li>
                              <li>Acessibilidade Web</li>
                            </ul>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
        `;

    const modal = this.shadowRoot.getElementById("modal-container");
    const btnClose = this.shadowRoot.getElementById("close-modal");
    const btnDownload = this.shadowRoot.getElementById("download-cv")
      ? this.shadowRoot.getElementById("download-cv")
      : this.shadowRoot.getElementById("download-cv-bottom");

    this.downloadCV = () => {
      const link = document.createElement("a");
      link.href = "./assets/files/cv-davidhausmann.pdf";
      link.download = "CV-David-Hausmann.pdf";
      link.target = "_blank";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    this.open = () => {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
      this.calculateScrollHeight();
    };

    this.close = () => {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    };

    this.calculateScrollHeight = () => {
      const modalContent = this.shadowRoot.querySelector(".modal__content");
      const modalHeader = this.shadowRoot.querySelector(".modal__header");
      const customScroll = this.shadowRoot.querySelector(".custom__scroll");

      if (modalContent && modalHeader && customScroll) {
        const modalContentHeight = modalContent.offsetHeight;
        const modalHeaderHeight = modalHeader.offsetHeight;
        const modalContentPadding = 60;
        const gap = 32;

        const availableHeight =
          modalContentHeight - modalHeaderHeight - modalContentPadding - gap;
        customScroll.style.height = `${availableHeight}px`;
        customScroll.style.maxHeight = `${availableHeight}px`;
      }
    };

    window.addEventListener("resize", () => {
      if (modal.classList.contains("active")) {
        setTimeout(() => this.calculateScrollHeight(), 100);
      }
    });

    if (btnClose) {
      btnClose.addEventListener("click", this.close);
    }

    if (btnDownload) {
      btnDownload.addEventListener("click", this.downloadCV);
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
