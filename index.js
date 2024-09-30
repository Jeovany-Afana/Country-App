// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)
//Ok

const inputSearch = document.getElementById('inputSearch');
const minToMax = document.getElementById('minToMax');
const maxToMin = document.getElementById('maxToMin');
const alpha = document.getElementById('alpha');
const inputRange = document.getElementById('inputRange');
const countriesContainer = document.querySelector('.countries-container');
const rangeValue = document.getElementById('rangeValue');
let selectElement = document.querySelector('select');
let selectedOption = "1";
let countries = [];
// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.

async function getCountries() {
  await
     fetch('countries.json')
    .then((res) => res.json())
    .then((data) => countries = data);
    
}

function showCountries(numberOfCountries, filter_result, searchValue) 
{

  //console.log(countries);

  if (filter_result === null) {

    countriesContainer.innerHTML = countries
    .sort((a, b) => {
       switch (searchValue) {
        case "0":
          return a.name.common.toUpperCase().localeCompare(b.name.common.toUpperCase());
        
          case "1": 
         return b.name.common.toUpperCase().localeCompare(a.name.common.toUpperCase());


          case "2":
           return a.population - b.population;


          case "3":
           return b.population - a.population;


          case "4":
           return a.area - b.area;

          
          case "5":
           return b.area - a.area;


        default:
          alert('Méthode de trie indisponible');
          return 0;
       }
      })
    .map((country) => 
      `
       <li class="card">
        <img src="${country.flags.svg}">
        <h3>${country.name.common}</h3>
        <h4>Capitale: ${country.capital}</h4>
        <h4>Continent: ${country.continents}</h4>
        <h4>Superficie: ${country.area} Km²</h4>
        <h4>Indépendant: ${country.independent ? "Oui" : "Non"}</h4>
        <h4>Population: ${country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h4>
        </li>

      `
    ).join('');
    
  } else {
    
    countries.length = numberOfCountries;
    
    countriesContainer.innerHTML = countries
    .filter((country) => country.name.common.toUpperCase().includes(filter_result.toUpperCase()))
    .sort((a, b) => {
      switch (searchValue) {
       case "1":
         return a.name.common.toUpperCase().localeCompare(b.name.common.toUpperCase());
       
         case "2": 
        return b.name.common.toUpperCase().localeCompare(a.name.common.toUpperCase());


         case "3":
          return a.population - b.population;


         case "4":
          return b.population - a.population;


         case "5":
          return a.area - b.area;

         
         case "6":
          return b.area - a.area;
        


       default:
         alert('Méthode de trie indisponible');
         return 0;
      }
     })
    .map((country) =>
      
      
      `
      <li class="card">
      <img src="${country.flags.svg}">
      <h3>${country.name.common}</h3>
      <h4>Capitale: ${country.capital}</h4>
      <h4>Continent: ${country.continents}</h4>
      <h4>Superficie: ${country.area} Km²</h4>
      <h4>Fuso horaire: ${country.timezones.join('  ,')}</h4>
      <h4>Indépendant: ${country.independent ? "Oui" : "Non"}</h4>
      <h4>Population: ${country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h4>
      </li>
      `
    ).join("");
  }
  }
  
  

inputRange.addEventListener('input', (event)=>{
  if (parseInt(rangeValue.innerHTML) === 0) {

    countriesContainer.innerHTML = `<h2 style="text-align: center;">Aucun résultat</h2>`
    
  } else {
    
    showCountries(event.target.value, inputSearch.value, selectedOption);
  }
  });
  
inputSearch.addEventListener('input', (event) =>{
  
showCountries(inputRange.value, event.target.value, selectedOption);

});




selectElement.addEventListener('change', () => {
  selectedOption = selectElement.options[selectElement.selectedIndex].value;
  
  showCountries(inputRange.value, inputSearch.value, selectedOption);
});




getCountries().then(() => showCountries(inputRange.value, inputSearch.value, selectedOption));


   // 2. Ensuite, enregistre le Service Worker pour la fonctionnalité hors ligne
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//       navigator.serviceWorker
//           .register('./service-worker.js')
//           .then(registration => {
//               console.log('Service Worker enregistré avec succès', registration);
//           })
//           .catch(error => {
//               console.log('Service Worker échec de l\'enregistrement:', error);
//           });
//   });
// }

// 3 - Passer les données à une variable

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données

//coutry.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pay