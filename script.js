const container =  document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();
let ticketPrice =  +movieSelect.value;  //+ sign change string to number



//save selected movie index and price
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex' , movieIndex);
    localStorage.setItem('selectedMoviePrice' , moviePrice);
}

//update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length; 

    //map through the selected seats and then see the index of a selected seat from the main seats array
    const seatsIndex = [...selectedSeats].map(function(seat){        
        return [...seats].indexOf(seat);
    });

    //storing in local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); 


    count.innerText = selectedSeatsCount; 
    total.innerText = selectedSeatsCount*ticketPrice;
}

//get data from local storage and update UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    

    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach(function(seat,index){ 
            if(selectedSeats.indexOf(index) > -1){    
              
             seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex != null){        
        movieSelect.selectedIndex = selectedMovieIndex;
    }
   
}


//movie select event
movieSelect.addEventListener('change', e => {    
    ticketPrice = e.target.value;
     
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// seat select event

container.addEventListener('click', e =>{
    
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))  //select seats that don't have occupied class
        e.target.classList.toggle('selected');

    updateSelectedCount();
});

updateSelectedCount();
