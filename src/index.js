window.scrollTo({ top: 0, behavior: "smooth" });

const rootElement = document.documentElement;
const dropdownSun = document.getElementById('dropdown-sun')
const dropdownWater = document.getElementById('dropdown-water')
const dropdownPets = document.getElementById('dropdown-pets')
const carousel = document.getElementById('cards')
const scrollToTopBtn = document.getElementById("scroll-to-top-btn");
const loadingEl = document.getElementById('loading')
const buttonScrollToForm = document.getElementById('button-scroll-to-form')

const scrollToTop = () => {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const scrollToForm = () => {
  const form = document.querySelector('form')
  form.scrollIntoView({ behavior: 'smooth' });
}

const setLoading = (value) => loadingEl.setAttribute('class', value === true ? '' : 'hidden')

const getResults = () => {
  const sunValue = dropdownSun.getAttribute('value')
  const waterValue = dropdownWater.getAttribute('value')
  const petsValue = dropdownPets.getAttribute('value')
  
  const values = [sunValue, waterValue, petsValue];
  const isAnEmptyField = values.some(value => value === "default" || value === null);

  const resultsContainer = document.querySelector('.results-container')
  const resultsContent = document.getElementById('results-content')
  const noResultsContent = document.getElementById('no-results-content')
  
  if (!isAnEmptyField) {
    setLoading(true);
    const url = `https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sunValue}&water=${waterValue}&pets=${petsValue}`

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        if (data.length) {

          noResultsContent.setAttribute('class', 'hidden')
          resultsContent.setAttribute('class', 'results-content')
          
          carousel.innerHTML = `${data.map((item, index) => `
            <card-component
              data='${JSON.stringify(item)}'
              class='item item-${index + 1}'
              ${window.innerWidth < 768 ? 'mobile' : ''}
            ></card-component>`).join('')}`
        }
      })
      .catch(() => {
        alert('Ocorreu um erro ao buscar os resultados. Tente novamente.')
      })
      .finally(() => {
        setLoading(false);
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
      });
  } else {
    noResultsContent.removeAttribute('class', 'hidden')
    resultsContent.setAttribute('class', 'results-content hidden')
    carousel.innerHTML = ''
  }

}

const setWidthCarousel = () => {
  const resultsContentWidth = document.querySelector('.content').offsetWidth;
  const smallerWidth = resultsContentWidth < window.innerWidth ? resultsContentWidth : window.innerWidth

  carousel.setAttribute('style', `width: ${smallerWidth - 45}px`)
}

window.onload = setWidthCarousel
window.addEventListener('resize', setWidthCarousel)

buttonScrollToForm.addEventListener('click', scrollToForm);
scrollToTopBtn.addEventListener("click", scrollToTop);
dropdownSun.addEventListener('value', getResults);
dropdownWater.addEventListener('value', getResults);
dropdownPets.addEventListener('value', getResults);