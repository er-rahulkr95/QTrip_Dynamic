
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const urlSearchParameters = new URLSearchParams(search);
  return urlSearchParameters.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const fetchAdventuresResponse = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    const adventuresData = await fetchAdventuresResponse.json();
    return adventuresData;
  } catch(error){
    console.log(error);
    return null;
  }
  
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let rowElement = document.getElementById("data");
  rowElement.innerHTML = "";
  rowElement.classList.add("row-cols-2", "row-cols-sm-2", "row-cols-lg-4");
  for(let adventureItem of adventures){
    rowElement.innerHTML += `
                                <div class="col mb-4" style = "position:relative;">
                                <a href="detail/?adventure=${adventureItem.id}" id="${adventureItem.id}">
                                <div class = "category-banner">${adventureItem.category}</div>
                                  <div class="activity-card">
                                    <img src="${adventureItem.image}" class="card-img-top" alt="${adventureItem.name}" />
                                    <div class = " p-3 text-center text-lg-start w-100">
                                      <div class="d-lg-flex justify-content-between">
                                        <h6 class="card-title">${adventureItem.name}</h6>
                                        <p class="card-text">₹${adventureItem.costPerHead}</p>
                                      </div>
                                      <div class="d-lg-flex justify-content-between mt-2">
                                        <h6 class="card-title">Duration</h6>
                                        <p class="card-text">${adventureItem.duration} Hours</p>
                                      </div>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            `
  }

}

/*Implementation of Add New Adventure Button to add new adventures for the given city by clicking
 and sending Post request to fetch new adventure data from backend automatically */
function addNewAdventure(city){
  // TODO: MODULE_ADVENTURES - optional
  let addNewActivityButton = document.getElementById("activity-button");
  addNewActivityButton.addEventListener("click", async (event)=>{
    event.preventDefault();
    if(confirm("Are You Sure You Want To Create And Add A New Adventure ?")){
      fetch(`${config.backendEndpoint}/adventures/new`, {
        method: "POST",
        body: JSON.stringify({ "city":`${city}`}),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
          }
       }).then(res=> {
        return res.json();
        }).then(data=>{
        alert("Success - New Adventure Successfully Added! Look out at the end of adeventure cards for newly added adventure.");
        window.location.reload();
        }).catch(error=>{alert("Error - Server Response Error!")})
    }else {
      alert ("Cancelled - You Have Cancelled To Add New Adventure, New Adventure Not Added");
    }   
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
 let filtereAdventureByDuration = list.filter(adventures=>{
  return (adventures.duration >Number(low)) && (adventures.duration <= Number(high));
 });
 return filtereAdventureByDuration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  let filterAdventureByCategory =[];
  for (let selectedCategories of categoryList){
    for(let i=0; i<list.length; i++){
      if(list[i].category === selectedCategories){
        filterAdventureByCategory.push(list[i]);
      }
    }
  }

  //Another approach to filter adventure by category
  // let filterAdventureByCategory = list.filter((adventures)=> categoryList.includes(adventures.category));
  //Another one more approach to filter adventure by category
  // let filterAdventureByCategory = list.filter((adventures)=> categoryList.indexOf(adventures.category)>-1);
  return filterAdventureByCategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  const categoryList = filters.category;
  const durationRange = filters.duration;
  const durationRangeArray = durationRange.split("-");
  if(categoryList.length !== 0 && durationRange === ""){
    return filterByCategory(list, categoryList);
  }
  if(durationRange !== "" && categoryList.length === 0){
    const [low,high] = durationRangeArray;
    return filterByDuration(list, low, high);
  }
  
  if(categoryList.length !== 0 && durationRange !== ""){
    const [low,high] = durationRangeArray;
    let durationResult = filterByDuration(list, low, high);
    let categoryResult = filterByCategory(durationResult, categoryList);
    return categoryResult;

    //Another approach to filter the adventures when both duration and category is selected
    // let [low,high] = durationRangeArray;
    // let filterResult =[];
    // let durationResult = filterByDuration(list, low, high);
    //  let categoryResult = filterByCategory(list, categoryList);
    // for(let categoryAdventure of categoryResult){
    //   for(let durationAdventure of durationResult){
    //     if(categoryAdventure.category === durationAdventure.category && categoryAdventure.duration === durationAdventure.duration){
    //       filterResult.push(durationAdventure);
    //     }
    //   }
    // }
    // return filterResult;
  }
  
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  
    return JSON.parse(localStorage.getItem("filters"));
 
  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let durationValueElement = document.getElementById("duration-select");
  if(filters.duration!==""){
    durationValueElement.value = filters.duration;
  }

  //Another approach to update the duration filter value
  // let optionsElement = durationValueElement.options;
  // for(let index = 0; index < optionsElement.length; index++){
  //   if(optionsElement[index].value == filters.duration){
  //     optionsElement.selectedIndex = index;
  //   }
  // }

  let pillsDisplay =  document.getElementById("category-list");
  for( let pillsCategory of filters.category){
    pillsDisplay.innerHTML +=  `
                                  <div style="position:relative">
                                  <div class="category-filter">${pillsCategory}</div>
                                  <img src="https://cdn-icons-png.flaticon.com/512/8816/8816685.png" onclick="removePills(event)" data-pillcategory="${pillsCategory}" height = "25px" width="25px" style="position:absolute; top:0; right:0">
                                  </div>
                                  `
  }
}
// Implementation of removing of individual category pills filter clicking on the cross button 
function removeIndividualPillFilter(adventures, filters, event){
      let closeTargetPillIndex= filters.category.indexOf(event.target.dataset.pillcategory);
      filters.category.splice(closeTargetPillIndex,1);
      event.target.parentElement.remove();
      let filteredAdventures = filterFunction(adventures, filters);
      addAdventureToDOM(filteredAdventures); 
      saveFiltersToLocalStorage(filters);
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
  addNewAdventure,
  removeIndividualPillFilter
};
