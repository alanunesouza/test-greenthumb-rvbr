import capitalize from "../utils/capitalize";
import currency from "../utils/currency";

class Card extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  addClassesOfCard(containerEl) {
    containerEl.getElementsByClassName('staff-favorite')[0].classList.add('bigger')
    containerEl.getElementsByClassName('image-container')[0].classList.add('bigger')
    containerEl.getElementsByClassName('card-details')[0].classList.add('row')
    containerEl.getElementsByClassName('content')[0].classList.add('column-left')
    containerEl.getElementsByClassName('name')[0].classList.add('bigger')
    containerEl.getElementsByClassName('value')[0].classList.add('bigger')
    containerEl.getElementsByClassName('attributes')[0].classList.add('bigger')
  }

  removeClassesOfCard(containerEl) {
    containerEl.getElementsByClassName('staff-favorite')[0].classList.remove('bigger')
    containerEl.getElementsByClassName('image-container')[0].classList.remove('bigger')
    containerEl.getElementsByClassName('card-details')[0].classList.remove('row')
    containerEl.getElementsByClassName('content')[0].classList.remove('column-left')
    containerEl.getElementsByClassName('name')[0].classList.remove('bigger')
    containerEl.getElementsByClassName('value')[0].classList.remove('bigger')
    containerEl.getElementsByClassName('attributes')[0].classList.remove('bigger')
  }


  checkSizeCard() {
    const isMobile = window.innerWidth < 768;
    const cardsEl = document.querySelectorAll("#cards > card-component.item");

    for (let i=0; i < cardsEl.length; i++) {
      if (!cardsEl[i].shadowRoot) { return }

      const container = cardsEl[i].shadowRoot.querySelector("div")

      if (!isMobile) {
        container.setAttribute('class', `card-container desktop`)

        if (i === 0) {
          this.addClassesOfCard(container)
        } else {
          this.removeClassesOfCard(container)
        }
      } else {
        container.setAttribute('class', `card-container`)
        this.removeClassesOfCard(container)
      }
    }
  }

  connectedCallback() {
    this.data = JSON.parse(this.getAttribute('data'));
    this.class = this.getAttribute('class');
    window.addEventListener('resize', this.checkSizeCard);
    this.render();
    this.checkSizeCard();
  }

  render() {    
    this.shadow.innerHTML = `
      <style>
        .card-container {
          position: relative;
          display: inline-block;
          background: #FFFFFF;
          box-shadow: 0px 28px 38px rgba(0, 0, 0, 0.0925754);
          border-radius: 5px;
          overflow: hidden;
          padding: 18px;
          text-align: center;
          margin-right: 12px;
          width: 250px;
          height: 320px;
          cursor: pointer;
        }
        .card-container:hover {
          box-shadow: 0 14px 28px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
          transition: box-shadow 0.5s ease-in-out;
        }
        .desktop {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;
          flex-direction: column;
        }
        .card-container .image-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
        }
        .card-container .image-container img {
          width: 180px;
          height: 220px;
          object-fit: contain;
          margin: 1rem 0;
        }
        .card-container .image-container.bigger img {
          max-width: 300px;
          width: 300px;
          height: 350px;
        }
        .card-details {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
        .card-details span {
          color: #1E6B4E;
          font-weight: bold;
        }
        .card-details .attributes img {
          width: 20px;
          height: 25px;
          object-fit: scale-down;
        }
        .card-details .attributes.bigger img {
          width: 35px;
          height: 25px;
          object-fit: contain;
          margin-left: 2px;
        }
        .card-details .content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .card-details .content.column-left {
          flex-direction: column;
          align-items: flex-end;
        }
        .card-details .name {
          width: 100%;
          text-align: left;
          font-size: 1rem;
        }
        .card-details .name.bigger {
          font-size: 2.1875rem;
        }
        .card-details .value {
          font-size: 1rem;
        }
        .card-details .value.bigger {
          font-size: 1.5rem;
          margin-bottom: 12px;
        }

        .card-container .staff-favorite {
          position: absolute;
          background: #75BC97;
          border-radius: 0 10px 10px 0;
          width: 130px;
          padding: 6px 12px;
          margin-left: -18px;
          box-shadow: 0px 10px 28px rgba(0, 0, 0, 0.181163);
        }
        .card-container .staff-favorite.bigger {
          width: 189px;
          height: 43px;
          border-radius: 0 20px 20px 0;
          align-items: center;
          display: flex;
        }
        .card-container .staff-favorite strong {
          color: #FFFFFF;
          font-size: 0.8rem;
        }
        .card-container .staff-favorite.bigger strong {
          font-size: 1.125rem;
        }

        .row {
          flex-direction: row;
        }
        .hidden {
          display: none !important;
        }
      </style>

      <div class="card-container ${this.class}"></div>
    `

    const card = this.shadow.querySelector('.card-container');

    card.innerHTML = `
      <div class="staff-favorite ${!this.data.staff_favorite ? 'hidden' : ''}"><strong>✨ Staff favorite</strong></div>
      <div class="image-container">
        <img src="${this.data.url}" alt="${this.data.name}" />
      </div>
      <div class="card-details">
        <span class="name">${capitalize(this.data.name)}</span>
        <div class="content">
          <span class="value">${currency(this.data.price)}</span>
          <span class="attributes">
            <img src="/images/icons/${this.data.toxicity ? 'toxic' : 'pet'}.svg" alt="sun" />
            ${this.data.sun && `<img src="/images/icons/${this.data.sun}-sun.svg" alt="sun" />`}
            <img src="/images/icons/${this.data.water}-water.svg" alt="water" />
          </span>
        </div>
      </div>
    `;
  }
}

customElements.define('card-component', Card);