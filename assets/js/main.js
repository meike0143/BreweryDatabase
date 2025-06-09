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
  // const brewery = await getOne(id,selectedCollection, apiRoot);
  const breweries = await getList(selectedCollection, apiRoot);
  // console.log(brewery);
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
      const breweryDiv = document.createElement('section');
      breweryDiv.className = 'bg-[#FFC567] h-auto w-[90%] text-left p-2 m-3 font-bold text-xs';
      breweryDiv.innerHTML = 
      `<section class="flex flex-row">
        <div class="basis-7/12">
          <h2 class=" text-xs lg:text-3xl font-bold m-2 lg:m-0">${brewery.name}</h2>
        </div>
        <div class="basis-5/12">
          <button class="bg-[#FF9D00] rounded-2xl w-32 h-6 p-2 lg:m-4 flex items-center justify-center">
            <a class="text-center text-xs font-bold text-white" href="details.html">More Information</a>
          </button>
        </div>
        </section>`;
      breweriesList.appendChild(breweryDiv);
    });
  } else {
    console.error('Expected an array of fruits, got none');
  }
}

init();
