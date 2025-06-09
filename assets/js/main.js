import { getList, getOne, getListBasedOnPaginationPage } from './api.js';

// dom elements
// global variables

// api root
let apiRoot = 'https://api.openbrewerydb.org/v1/';
let selectedCollection = 'breweries';

/**
 * Function to initialize the application
 */
async function init() {
  // Logic to initialize the application
  console.info('Initializing the application');
  handleRequest();
}

/**
 * Function to handle the request from the API
 */
async function handleRequest() {
  // const fruit = await getOne('random',selectedCollection, apiRoot);
  const breweries = await getList(selectedCollection, apiRoot);
  // console.log(fruit);
  console.log(breweries);
  update(breweries);
}

/**
 * Function to update the DOM
 */
function update(data) {
  const breweries = data.data; // Assuming the data is returned as an array with a single object
  const breweriesList = document.getElementById('breweries');
  breweriesList.innerHTML = ''; // Clear any existing content

  // Create a new div to display the brewery details
  if (Array.isArray(breweries)) {
    breweries.forEach(brewery => {
      const breweryDiv = document.createElement('div');
      breweryDiv.className = 'bg-[#FFC567] w-[90] lg:w-[70%] h-14 p-3 pl-7 font-bold text-lg';
      breweryDiv.innerHTML = `
          <h2>${brewery.name}</h2>`;
      breweriesList.appendChild(breweryDiv);
    });
  } else {
    console.error('Expected an array of fruits, got none');
  }
}

init();
