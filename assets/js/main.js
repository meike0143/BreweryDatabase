import { getBreweryTypes, getOne, getListBasedOnPaginationPage } from './api.js';

// dom elements
// global variables

// api root
let apiRoot = 'https://api.openbrewerydb.org/v1/';
let selectedCollection = 'breweries';
let chosenType = 'micro'

/**
 * Displays an error message on the page
 * @param error - Contains the message to display
 */
function displayError(error) {
    const errorElement = document.createElement('p');
    errorElement.textContent = `Failed to load data: ${error.message}`;
    errorElement.className = 'text-red-500 text-xl';
    document.body.appendChild(errorElement);
}

/**
 * Function to handle the request from the API
 */
async function handleListRequest() {
  const breweries = await getListBasedOnPaginationPage(selectedCollection, 7, apiRoot);
  console.log(breweries);
  updateBreweryList(breweries);
}

async function handleBreweryRequest(breweryId) {
  const brewery = await getOne(selectedCollection, apiRoot, breweryId);
  console.log(brewery);
  updateBrewery(brewery);
}

async function handleBreweryTypeRequest() {
  const breweryType = await getBreweryTypes(selectedCollection, apiRoot, chosenType);
  console.log(breweryType);
  updateBreweryTypes(breweryType);
}

/**
 * Function to display the list of breweries by updating the DOM
 */
function updateBreweryList(data) {
  const breweries = data.data; // Assuming the data is returned as an array with a single object
  const breweriesList = document.getElementById('breweries');
  breweriesList.innerHTML = ''; // Clear any existing content

  // Create a new div to display the brewery details
  if (Array.isArray(breweries)) {
    breweries.forEach(brewery => {
      const breweryDiv = document.createElement('section');
      breweryDiv.className = 'bg-[#FFC567] h-auto w-[90%] text-left p-2 m-3 font-bold text-xs';
      breweryDiv.innerHTML = 
      `<section class="flex flex-row">
        <div class="basis-7/12">
          <h2 class=" text-xs lg:text-3xl font-bold m-2 lg:m-0">${brewery.name}</h2>
        </div>
        <div class="basis-5/12">
          <button class="bg-[#FF9D00] rounded-2xl w-32 h-6 p-2 lg:m-4 flex items-center justify-center">
            <a class="text-center text-xs font-bold text-white" href="details.html?breweryId=${brewery.id}">More Information</a>
          </button>
        </div>
        </section>`;
      breweriesList.appendChild(breweryDiv);
    });
  } else {
    displayError('Expected an array of breweries, got none');
  }
}

/**
 * Function to display the list of breweries by updating the DOM
 */
function updateBreweryTypes(data) {
  const breweryTypes = data.data; // Assuming the data is returned as an array with a single object
  const breweryTypeList = document.getElementById('breweryTypes');
  breweryTypeList.innerHTML = ''; // Clear any existing content

  // Create a new div to display the brewery details
  if (Array.isArray(breweryTypes)) {
    breweryTypes.forEach(breweryType => {
      const breweryTypeDiv = document.createElement('section');
      breweryTypeDiv.className = 'bg-[#FFC567] h-auto w-[90%] text-left p-2 m-3 font-bold text-xs';
      breweryTypeDiv.innerHTML = 
      `<section class="flex flex-row">
        <div class="basis-7/12">
          <h2 class=" text-xs lg:text-3xl font-bold m-2 lg:m-0">${breweryType.name}</h2>
        </div>
        <div class="basis-5/12">
          <button class="bg-[#FF9D00] rounded-2xl w-32 h-6 p-2 lg:m-4 flex items-center justify-center">
            <a class="text-center text-xs font-bold text-white" href="details.html?breweryId=${breweryType.id}">More Information</a>
          </button>
        </div>
        </section>`;
      breweryTypeList.appendChild(breweryTypeDiv);
    });
  } else {
    displayError('Expected an array of breweries, got none');
  }
}

/**
 * Function to display the list of breweries by updating the DOM
 */
function updateBrewery(data) {
  const brewery = data.data; // Assuming the data is returned as an array with a single object
  const breweryInfo = document.getElementById('brewery');
  breweryInfo.innerHTML = ''; // Clear any existing content

  // Create a new div to display the brewery details
  const breweryDiv = document.createElement('section');
  breweryDiv.className = 'bg-[#FFC567] h-auto w-[90%] text-left p-2 m-3 font-bold text-xs';
  breweryDiv.innerHTML = 
  `<section>
    <div>
      <h2 class=" text-xs lg:text-3xl font-bold m-2 lg:m-0">${brewery.name}</h2>
      <p> Country: ${brewery.country}<p>
    </div>
    </section>`;
  breweryInfo.appendChild(breweryDiv);

}

document.addEventListener('DOMContentLoaded', async () => {
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    try {
        if (path.includes('index.html') || path.includes('/')) {
            handleListRequest();
        } else if (path.includes('details.html')) {
            const breweryId = urlParams.get('breweryId');
            console.log(breweryId)
            handleBreweryRequest(breweryId);
        } else if (path.includes('breweryTypes.html')) {
            const breweryType = urlParams.get('type');
            console.log(breweryType)
            handleBreweryTypeRequest(breweryType);
        }
    } catch (error) {
      displayError(error);
    }
});
