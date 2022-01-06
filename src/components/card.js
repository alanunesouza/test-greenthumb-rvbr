import capitalize from "../utils/capitalize";
import currencyPtBr from "../utils/currencyPtBr";

class Card extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.data = JSON.parse(this.getAttribute('data'));
    this.render();
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
          width: 250px;
          height: 320px;
          overflow: hidden;
          padding: 18px;
          text-align: center;
          margin-right: 12px;
        }
        .card-container img {
          width: 187px;
          height: 221px;
          object-fit: contain;
          margin: 1rem 0;
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
        .card-details img {
          width: 20px;
          height: 25px;
          object-fit: scale-down;
        }
        .card-details div {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .name {
          width: 100%;
          text-align: left;
          font-size: 1rem;
        }

        .staff-favorite {
          position: absolute;
          background: #75BC97;
          border-radius: 0 10px 10px 0;
          width: 130px;
          padding: 6px 12px;
          margin-left: -18px;
        }
        .staff-favorite strong {
          color: #FFFFFF;
          font-size: 0.8rem;
        }
        .hidden {
          display: none;
        }
      </style>

      <div class="card-container"></div>
    `

    const card = this.shadow.querySelector('.card-container');

    card.innerHTML = `
      <div class="staff-favorite ${!this.data.staff_favorite && 'hidden'}"><strong>✨ Staff favorite</strong></div>
      <img src="${this.data.url}" alt="${this.data.name}" class="image" />
      <div class="card-details">
        <span class="name">${capitalize(this.data.name)}</span>
        <div>
          <span>${currencyPtBr(this.data.price)}</span>
          <span>
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