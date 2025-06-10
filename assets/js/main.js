import { getOne, getListBasedOnPaginationPage } from './api.js';

// dom elements
// global variables

// api root
let apiRoot = 'https://api.openbrewerydb.org/v1/';
let selectedCollection = 'breweries';

async function init() {
  // Logic to initialize the application upon starting
  console.info('Initializing the application');
  handleListRequest();
}

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
          <button class="bg-[#FF9D00] rounded-2xl w-32 h-6 p-2 lg:m-4 flex items-center justify-center font-bold text-white" 
          onclick="window.location.href='details.html?breweryId=${brewery.id}';">
            More Information
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
function updateBrewery(data) {
  const brewery = data.data; // Assuming the data is returned as an array with a single object
  const breweryInfo = document.getElementById('brewery');
  breweryInfo.innerHTML = ''; // Clear any existing content

  // Create a new div to display the brewery details
  const breweryDiv = document.createElement('section');
  breweryDiv.className = 'bg-[#FFC567] h-auto w-[90%] text-left p-2 m-3 text-xs';
  breweryDiv.innerHTML = 
  `<section>
    <div>
      <h2 class="text-sm lg:text-3xl font-bold lg:m-0">${brewery.name}</h2>
      <br>
      <p class="text-xs"> <strong>Country:</strong> ${brewery.country}<p>
      <p class="text-xs"> <strong>State:</strong> ${brewery.state}<p>
      <p class="text-xs"> <strong>State Province:</strong> ${brewery.state_province}<p>
      <p class="text-xs"> <strong>City:</strong> ${brewery.city}<p>
      <p class="text-xs"> <strong>Street:</strong> ${brewery.street}<p>
      <br>
      <p class="text-xs"> <strong>Brewery type:</strong> ${brewery.brewery_type}<p>
      <p class="text-xs"> <strong>Postal Code:</strong> ${brewery.postal_code}<p>
    </div>
    </section>`;
  breweryInfo.appendChild(breweryDiv);

}

document.addEventListener('DOMContentLoaded', async () => {
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    try {
        if (path.includes('index.html')) {
            handleListRequest();
        } else if (path.includes('details.html')) {
            const breweryId = urlParams.get('breweryId');
            console.log(breweryId)
            handleBreweryRequest(breweryId);
        } 
    } catch (error) {
      displayError(error);
    }
});

init();
