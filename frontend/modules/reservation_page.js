import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const fetchReservationResponse = await fetch(`${config.backendEndpoint}/reservations/`)
    const reservationsData = await fetchReservationResponse.json();
    return reservationsData;
  }catch(error){
    console.log(error);
    return null;
  }


  // Place holder for functionality to work in the Stubs
  // return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent 
  if(reservations && reservations.length !== 0){
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  }else{
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format DD/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

      let tableBodyElement = document.getElementById("reservation-table");
      // reservations.forEach(({id,name,adventureName,person,date,price,time,adventure})=>{
        reservations.forEach(({id,name,adventureName,person,date,price,time,adventure})=>{
      const date1 = new Date(date)
      const reservedDate = date1.toLocaleDateString("en-IN");
      const date2 = new Date(time);
      const options ={dateStyle:"long",timeStyle:"medium"}
      const bookingTime = date2.toLocaleString("en-IN",options).replace(" at",",");
      tableBodyElement.innerHTML += `
                                        <tr>
                                          <th scope="row">${id}</th>
                                          <td>${name}</td>
                                          <td>${adventureName}</td>
                                          <td>${person}</td>
                                          <td>${reservedDate}</td>
                                          <td>${price}</td>
                                          <td>${bookingTime}</td>
                                          <td id="${id}"><a href="../detail/?adventure=${adventure}"><button class="reservation-visit-button">Visit Adventure</button></a></td>
                                        </tr>
                                    `
      
    });


}

export { fetchReservations, addReservationToTable };
