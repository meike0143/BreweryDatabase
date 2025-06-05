import { getList, getOne, getListBasedOnPaginationPage } from './api.js';

// dom elements
// global variables

// api root
let apiRoot = 'https://www.fruityvice.com/api/';
let selectedCollection = 'fruit';

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
  const fruits = await getList(selectedCollection, apiRoot);
  // console.log(fruit);
  console.log(fruits);
  update(fruits);
}

/**
 * Function to update the DOM
 */
function update(data) {
  const breweries = data.data; // Assuming the data is returned as an array with a single object
  const breweriesList = document.getElementById('fruits');
  breweriesList.innerHTML = ''; // Clear any existing content

  // Create a new div to display the brewery details
  if (Array.isArray(fruits)) {
    breweries.forEach(brewery => {
      const fruitDiv = document.createElement('div');
      fruitDiv.className = 'bg-[#D9EDC0] w-[90] lg:w-[70%] h-14 p-3 pl-7 font-bold text-lg';
      fruitDiv.innerHTML = `
          <h2>${fruit.name}</h2>`;
      breweriesList.appendChild(fruitDiv);
    });
  } else {
    console.error('Expected an array of fruits, got none');
  }
}

init();
