const rootElement = document.documentElement;
const dropdownSun = document.getElementById('dropdown-sun')
const dropdownWater = document.getElementById('dropdown-water')
const dropdownPets = document.getElementById('dropdown-pets')
const carousel = document.getElementById('cards')
const scrollToTopBtn = document.getElementById("scroll-to-top-btn");

const scrollToTop = () => {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

const getResults = () => {
  const sunValue = dropdownSun.getAttribute('value')
  const waterValue = dropdownWater.getAttribute('value')
  const petsValue = dropdownPets.getAttribute('value')
  
  const values = [sunValue, waterValue, petsValue];
  const isAnEmptyField = values.some(value => value === "default" || value === null);

  const resultsContainer = document.getElementById('results-content')
  const noResultsContainer = document.getElementById('no-results-content')
  
  if (!isAnEmptyField) {
    const url = `https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sunValue}&water=${waterValue}&pets=${petsValue}`

    fetch(url).then(function(response) {
      return response.json();
    }).then(function(data) {
      noResultsContainer.setAttribute('class', 'hidden')
      resultsContainer.setAttribute('class', 'results-content')

      carousel.innerHTML = `${data.map(item => `<card-component data='${JSON.stringify(item)}'></card-component>`).join('')}`

    }).catch(function() {
      alert('Ocorreu um erro ao buscar os resultados. Tente novamente mais tarde.')
    });
  } else {
    noResultsContainer.removeAttribute('class', 'hidden')
    resultsContainer.setAttribute('class', 'results-content hidden')
    carousel.innerHTML = ''
  }

}

const setWidthCarousel = () => {
  carousel.setAttribute('style', `width: ${window.innerWidth - 45}px`)
}

window.onload = setWidthCarousel
window.addEventListener('resize', setWidthCarousel)

scrollToTopBtn.addEventListener("click", scrollToTop);
dropdownSun.addEventListener('value', getResults)
dropdownWater.addEventListener('value', getResults)
dropdownPets.addEventListener('value', getResults)