const container = document.querySelector('.container');

// selectorAll for more classes
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


// update total seats and ticket price
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    //copy selected seats into arr
    //map through array
    // return new array
    // spread operator converts node list to array
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    // json stringigy converts array to string
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    console.log(seatsIndex);

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localstorage and populate UI
function populateUI() {
    // json parse, converts string to array
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

     if (selectedSeats !== null && selectedSeats.length >0) {
         seats.forEach((seat, index) => {
             if (selectedSeats.indexOf(index) > -1 ) {
                 seat.classList.add('selected');
             }
         });
     }

     const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

     if (selectedMovieIndex !== null) {
         movieSelect.selectedIndex = selectedMovieIndex;
     }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// seat click event
container.addEventListener('click', e => {
    // occupied not clickable
    if (e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')) 
    {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// Initial count and total set
updateSelectedCount();