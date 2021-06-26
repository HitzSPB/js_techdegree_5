let fetchedData;

// Adding the template code rom index.html.
document.querySelector('.search-container').innerHTML = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`



// Fetch data from random user api
var result = fetch('https://randomuser.me/api/?results=12&nat=us')
.then(CheckResponse)
.then(data => data.json())
.then(data => fetchedData = data)
.then(data => PasteDataIntoGallaryElement(data))


// Checking if the response status from the randomuser api get correct data and resolves the promise that fetch creates.
function CheckResponse(data){
    if (data.ok) {
        return Promise.resolve(data)
    } else{
        return Promise.reject(new Error(data.statusText));
    }
}

// Creates the elements from the fetch response with the HTML structure from the index.html page
function PasteDataIntoGallaryElement(data){
    // Clear the current gallary content
    document.querySelector('#gallery').innerHTML = "";
let count = 0;
data.results.forEach(element => {
    // Creates a div that contains a profile card with the information from the fetch api
    var profileCardDiv = document.createElement('div');
    // Sets the data into the html structure
    profileCardDiv.classList.add("card");
    profileCardDiv.id = `${count}`;
    profileCardDiv.innerHTML = `<div class="card-img-container">
        <img class="card-img" src="${element.picture.large}" alt="profile picture">
    </div>
    <div class="card-info-container">
        <h3 id="name" class="card-name cap">${element.name.first} ${element.name.last}</h3>
        <p class="card-text">${element.email}</p>
        <p class="card-text cap">${element.location.city}, ${element.location.state}</p>
    </div>`

    // Add event listner to card element
    profileCardDiv.addEventListener('click', (event) => {
        ShowModal(parseInt(event.target.closest(".card").id));
    });

    // Append our profileCardDiv to the gallary
    document.querySelector('#gallery').appendChild(profileCardDiv);
    count++;
});
}

// Function to pop out the modal
function ShowModal(currentId)
{
    let data = fetchedData.results[currentId]
    document.body.innerHTML = document.body.innerHTML + `<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${data.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="modal-text">${data.email}</p>
            <p class="modal-text cap">${data.location.city}</p>
            <hr>
            <p class="modal-text">${data.cell.replace("-", " ")}</p>
            <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state}, ${data.location.postcode}</p>
            <p class="modal-text">Birthday: ${new Date(data.dob.date).toLocaleString("en-US").replaceAll("/","-").split(',')[0]}</p>
        </div>
    </div>
    
    // IMPORTANT: Below is only for exceeds tasks 
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
    </div>`

    document.querySelector("#modal-close-btn").addEventListener("click", (event) => 
    {
        document.body.removeChild(document.querySelector(".modal-container"));
    })
}