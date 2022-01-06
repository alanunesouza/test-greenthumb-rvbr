class Header extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
      <img src=\"../../public/images/icons/logo-white.svg\" alt="Greenthumb" />
    `
  }
}

customElements.define('header-component', Header);