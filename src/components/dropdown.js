import capitalize from "../utils/capitalize";

class Dropdown extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: 'open'});
  }

  setValue(value) {
    this.shadow.querySelector(`#${value}`).checked = true;
    this.setAttribute('value', value);
  }

  expand(e) {
    e.preventDefault();
    e.stopPropagation();
    const actualValue = this.getAttribute('value');

    const dropDownEl = this.shadow.querySelector('.dropdown-el');
    dropDownEl.classList.toggle('expanded');
    
    if (actualValue === e.target.htmlFor) { return }

    this.setValue(e.target.htmlFor);
    this.dispatchEvent(new CustomEvent('value', { detail: e.target.htmlFor }));
  }

  close() {
    const dropDownEl = this.shadow.querySelector('.dropdown-el');
    dropDownEl.classList.remove('expanded');
  }

  connectedCallback() {
    this.data = JSON.parse(this.getAttribute('data'));
    this.name = this.getAttribute('name');
    this.render();

    const dropDownEl = this.shadow.querySelector('.dropdown-el');
    dropDownEl.addEventListener('click', this.expand.bind(this))
    document.addEventListener('click', this.close.bind(this))

    const urlParams = new URLSearchParams(window.location.search);
    const valueInUrl = urlParams.get(this.name);

    if (valueInUrl) {
      this.setValue(valueInUrl);
    }
  }

  render() {    
    this.shadow.innerHTML = `
      <style>
        .dropdown-el {
          min-width: 15.625rem;
          position: relative;
          display: inline-block;
          margin-right: 1rem;
          min-height: 2rem;
          max-height: 2rem;
          overflow: hidden;
          top: 0.5rem;
          cursor: pointer;
          text-align: left;
          white-space: nowrap;
          color: #444;
          outline: none;
          border: 0.06em solid #d9d9d9;
          border-radius: 1rem;
          background-color: #FFFFFF;
          transition: 0.3s all ease-in-out;
        }
          .dropdown-el input:focus + label {
            background: #FFFFFF;
        }
          .dropdown-el input {
            width: 1px;
            height: 1px;
            display: inline-block;
            position: absolute;
            opacity: 0.01;
        }
          .dropdown-el label {
            border-top: 0.06em solid #d9d9d9;
            display: block;
            height: 2rem;
            line-height: 2rem;
            padding-left: 1rem;
            padding-right: 3rem;
            cursor: pointer;
            position: relative;
            transition: 0.3s color ease-in-out;
        }
          .dropdown-el label:nth-child(2) {
            margin-top: 2rem;
            border-top: 0.06em solid #d9d9d9;
        }
          .dropdown-el input:checked + label {
            display: block;
            border-top: none;
            position: absolute;
            top: 0;
            width: 100%;
        }
          .dropdown-el input:checked + label:nth-child(2) {
            margin-top: 0;
            position: relative;
        }
          .dropdown-el::after {
            content: "";
            position: absolute;
            right: 0.8rem;
            top: 0.9rem;
            border: 0.3em solid #A8A8A8;
            border-color: #A8A8A8 transparent transparent transparent;
            transition: 0.4s all ease-in-out;
        }
          .dropdown-el.expanded {
            border: 0.06em solid #A8A8A8;
            background: #fff;
            border-radius: 0.25rem;
            padding: 0;
            box-shadow: rgba(0, 0, 0, 0.1) 3px 3px 5px 0px;
            max-height: 15rem;
        }
          .dropdown-el.expanded label {
            border-top: 0.06em solid #d9d9d9;
        }
          .dropdown-el.expanded label:hover {
            color: #A8A8A8;
        }
          .dropdown-el.expanded input:checked + label {
            color: #A8A8A8;
        }
          .dropdown-el.expanded::after {
            transform: rotate(-180deg);
            top: 0.55rem;
        }
      </style>

      <span class="dropdown-el"></span>
    `

    const dropdown = this.shadow.querySelector('.dropdown-el');
    
    const optionDefault = `
      <input type="radio" name="${this.name}" id="default" value="default" checked="checked">
        <label for="default"> Select... </label>
      </input>`;

    const options = [ 
      optionDefault,
      ...this.data.map((item) => (
        `<input type="radio" name="${this.name}" id="${item}" value="${item}">
            <label for="${item}"> ${capitalize(item)} </label>
          </input>
        `
      ))];

    dropdown.innerHTML = options.join('');
  }
}

customElements.define('dropdown-component', Dropdown);