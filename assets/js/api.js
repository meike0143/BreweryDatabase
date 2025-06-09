/**
 * Async function to fetch data from an external API
 * @param url - The URL to fetch data from
 * @returns Promise | error
 */

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return { data };
    } catch (error) {
        console.error(`Unfortunately this ${error} occured`);
    }
};

/**
   * Fetches a single item from the API
   * @param id - The ID of the item
   * @param entitySlug - The entity's slug
   * @param apiRoot - The API's root URL
   * @returns Promise| Error
   */
const getOne = async (entitySlug, apiRoot, id) => {
    const url = id === 'random' ? `${apiRoot}${entitySlug}/random` : 
    `${apiRoot}${entitySlug}/${id}`;
    return await fetchData(url);
};

/**
 * Fetches a list of items from the API
 * @param entitySlug - The entity's slug
 * @param apiRoot - The API's root URL
 * @returns Promise | Error>
 */
const getBreweryTypes = async (entitySlug, apiRoot, chosenType) => {
   const url = `${apiRoot}${entitySlug}?by_type=${chosenType}`;
  return await fetchData(url);
};

/**
 * Fetches paginated data from the API based on page number
 * @param entitySlug - The entity's slug
 * @param pageNumber - The page number to fetch
 * @returns Promise | Error
 */
const getListBasedOnPaginationPage = async (entitySlug, pageNumber, apiRoot) => {
  const url = `${apiRoot}${entitySlug}?page=${pageNumber}&per_page=8`;
  return await fetchData(url);
};

export { getOne, getBreweryTypes, getListBasedOnPaginationPage };