import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  const cities = await fetchCities();
  //Updates the DOM with the cities
  let rowElement = document.getElementById("data");
  rowElement.classList.add("row-cols-1","row-cols-sm-2", "row-cols-lg-4")
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const fetchCitiesResponse = await fetch(`${config.backendEndpoint}/cities`);
    const citiesData = await fetchCitiesResponse.json();
    return citiesData;
  }catch(error){
    console.log(error);
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let rowElement = document.getElementById("data");
 rowElement.innerHTML += `
                            <div class="col mb-4" >
                              <a href="pages/adventures/?city=${id}" id="${id}">
                                <div class="tile">
                                  <div class="tile-text text-center">
                                    <h5>${city}</h5>
                                    <p>${description}</p>
                                  </div>
                                <img src="${image}" alt="${description}">
                                </div>
                              </a>
                            </div>
                          `

}

export { init, fetchCities, addCityToDOM };
