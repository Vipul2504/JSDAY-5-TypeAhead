
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const city = [];
fetch(endpoint).then(blob =>  blob.json()).then(data => city.push(...data));

function findmatch(WordTomatch, city){
    return city.filter(place => {
        const regx = new RegExp(WordTomatch, 'gi');
        return place.city.match(regx) || place.state.match(regx);
    })
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

function DisplayMatches(){
    const matchArray = findmatch(this.value, city);
    const html = matchArray.map(place => {
        const regx = new RegExp(this.value, 'gi');
        const cityname = place.city.replace(regx,`<span class ="hl">${this.value}</span>`);
        const statename = place.state.replace(regx,`<span class ="hl">${this.value}</span>`);
        return `
            <li>
            <span class="name">${cityname}, ${statename}</span>
            <span class="population">${numberWithCommas(place.population)}</span>
            </li>
        `;
    }).join('')
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', DisplayMatches);
searchInput.addEventListener('keyup', DisplayMatches);