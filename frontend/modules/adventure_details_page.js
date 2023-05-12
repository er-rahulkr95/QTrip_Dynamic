import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlSearchParameters = new URLSearchParams(search)
  return urlSearchParameters.get("adventure")
  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const fetchAdventureDetailsResponse = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    const adventureDetailsData = await fetchAdventureDetailsResponse.json();
    return adventureDetailsData;
  }catch(error){
    console.log(error);
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureHeadingElement = document.getElementById("adventure-name");
  adventureHeadingElement.textContent = adventure.name;

  let adventureSubtitleElement = document.getElementById("adventure-subtitle");
  adventureSubtitleElement.textContent = adventure.subtitle;

  let adventureGalleryElement = document.getElementById("photo-gallery");
  adventure.images.forEach(src=>{
    adventureGalleryElement.innerHTML += `<div>
                                            <img src="${src}" class="activity-card-image" alt="${adventure.name}"/>
                                          </div>
                                        `
  })

  let adventureContentElement = document.getElementById("adventure-content");
  adventureContentElement.textContent = adventure.content;


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let adventureGalleryElement = document.getElementById("photo-gallery");
  adventureGalleryElement.innerHTML = `
                                          <div id="adventureCarousel" class="carousel slide" data-bs-ride="carousel">
                                            <div class="carousel-indicators" id="carouselIndicatorButton">
                                            </div>
                                            <div class="carousel-inner" id="carouselInner">
                                            </div>
                                            <button class="carousel-control-prev" type="button" data-bs-target="#adventureCarousel" data-bs-slide="prev">
                                              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                              <span class="visually-hidden">Previous</span>
                                            </button>
                                            <button class="carousel-control-next" type="button" data-bs-target="#adventureCarousel" data-bs-slide="next">
                                              <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                              <span class="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                      `
   let carouselIndicaterElement = document.getElementById("carouselIndicatorButton")
   let carouselInnerElement = document.getElementById("carouselInner")
   images.forEach((imageSrc,index)=>{
    carouselIndicaterElement.innerHTML += `
                                          <button type="button" data-bs-target="#adventureCarousel" data-bs-slide-to="${index}" ${index===0? "class='active' aria-current='true'":""} aria-label="Slide ${index+1}"></button>
                                          `
    carouselInnerElement.innerHTML += ` <div class="carousel-item ${index===0? "active":""}">
                                          <img src="${imageSrc}" class="d-block activity-card-image w-100" alt="Image ${index+1}">
                                        </div>
                                      `
   });

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let reservationSoldOutPanelElement = document.getElementById("reservation-panel-sold-out");
  let reservationAvailablePanelElement = document.getElementById("reservation-panel-available");
  let reservationCostPerHeadElement = document.getElementById("reservation-person-cost");
  if(adventure.available === true){
    reservationSoldOutPanelElement.style.display = "none";
    reservationAvailablePanelElement.style.display ="block";
    reservationCostPerHeadElement.textContent = adventure.costPerHead;
  }else{
    reservationAvailablePanelElement.style.display ="none";
    reservationSoldOutPanelElement.style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let reservationTotalCostElement = document.getElementById("reservation-cost");
  reservationTotalCostElement.textContent = adventure.costPerHead*(persons);
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
   let reservationForm = document.getElementById("myForm");
   reservationForm.addEventListener("submit", async (event)=>{
    event.preventDefault();
    const personeName = reservationForm.elements["name"].value;
    const dateReserved = reservationForm.elements["date"].value;
    const numberOfPerson = reservationForm.elements["person"].value;
    const adventureId = adventure.id;
    const url = `${config.backendEndpoint}/reservations/new`;
    try {
      let postReservationData = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          "name":personeName,
          "date":dateReserved,
          "person":numberOfPerson,
          "adventure":adventureId
        }),
        headers: { "Content-type": "application/json;charset=UTF-8" }
      });
    
        if(postReservationData.ok){
          alert("Success!");
          window.location.reload();
        }else{
          alert("Failed!")
        }  
    }catch(error) {
      console.log(error);
      alert(error); 
    }
   });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved === true){
    document.getElementById("reserved-banner").style.display = "block";
  }else{
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
