//==============================NAVBAR CONTROL - CODE START==============================//
var menulist = document.getElementById("menulist");
menulist.style.maxHeight = "0px";

// control code for navbar menulist on smaller screen device
function menutoggle() {
  if (menulist.style.maxHeight == "0px") {
    menulist.style.maxHeight = "100vh";
  } else {
    menulist.style.maxHeight = "0px";
  }
}

// fixed navbar when "scroll top" exceeds 50px
$(window).on("scroll", function () {
  if ($(window).scrollTop() > 50) {
    $(".top-header").addClass("fixed-navbar");
  } else {
    $(".top-header").removeClass("fixed-navbar");
  }
});
//==============================NAVBAR CONTROL - CODE END==============================//

//===========================SCROLL TO ROOM SECTION ON "BOOK NOW" BUTTON CLICK - CODE START===========================//
// When "Book Now" button on "Navbar" or "Home page" is clicked
function scrollToRooms() {
  const roomsSection = document.getElementById("rooms");
  roomsSection.scrollIntoView();
}
//===========================SCROLL TO ROOM SECTION ON "BOOK NOW" BUTTON CLICK - CODE END===========================//

//===========================ROOM CARD HIGHLIGHT EFFECT ON MOUSE/CURSER HOVER - CODE START===========================//
const roomCards = document.querySelectorAll(".room-card");
roomCards.forEach(function (roomCard) {
  roomCard.addEventListener("mouseenter", function addHighlight(event) {
    roomCard.classList.add("room-card-effect");
  });

  roomCard.addEventListener("mouseleave", function removeHighlight(event) {
    roomCard.classList.remove("room-card-effect");
  });
});
//===========================SHADOW EFFECT ON MOUSE/CURSER HOVER ON ROOM CARD - CODE END===========================//

//=======================================OPEN BOOKING ENGINE IN MODAL - CODE START========================================//
// get the booking engine modal to be opened
const bookingEngineModal = document.querySelector(".booking-engine-modal");
// get the buttons that should trigger the opening of the booking engine modal
const bookRoomButtons = document.querySelectorAll(".primary-btn-rooms");
// get the button that closes the booking engine modal
const closeBookingEngineBtn = document.querySelector(".close");

// when user clicks on "book room" button, open booking engine
bookRoomButtons.forEach(function (bookRoomButton) {
  bookRoomButton.onclick = function () {
    bookingEngineModal.style.display = "block";
  };
});

// when user clicks on "close" button, close booking engine
closeBookingEngineBtn.onclick = function () {
  bookingEngineModal.style.display = "none";
};

// when user clicks anywhere outside of the booking engine, "close" button, close booking engine
// window.onclick = function (event) {
//   if (event.target === bookingEngineModal) {
//     bookingEngineModal.style.display = "none";
//     console.log("booking engine off");
//   }
// };

// disable past date, so that only current & future date can be selected
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const day = today.getDate();
console.log(year);

// automatically select room the user clicked on
const rooms = document.querySelectorAll(".primary-btn-rooms");
const roomType = document.getElementById("room-type");

rooms.forEach(function (room) {
  room.addEventListener("click", function () {
    if (room.value === "deluxe") {
      roomType.value = "Deluxe";
    } else if (room.value === "super-deluxe") {
      roomType.value = "Super Deluxe";
    } else if (room.value === "executive") {
      roomType.value = "Executive";
    } else if (room.value === "suite") {
      roomType.value = "Suite";
    } else if (room.value === "executive-suite") {
      roomType.value = "Executive Suite";
    }
  });
});
//=======================================OPEN BOOKING ENGINE IN MODAL - CODE END========================================//

//=======================================PROCESSING OF THE BOOKING ENGINE FORM - CODE START========================================//

window.addEventListener("DOMContentLoaded", function () {
  // get the form elements defined in your form HTML above
  var form = document.getElementById("booking-form");
  // get empty HTML form status
  var status = document.getElementById("status");

  // Success function for after the form is submitted successfully.
  function success() {
    form.reset();
    status.classList.add("success");
    status.innerHTML =
      "<p>Thanks! Availability to be emailed to you within 24hrs.</p>";
  }

  // Error function, where form was not successfully processed/submitted.
  function error() {
    status.classList.add("error");
    status.innerHTML =
      "<p>Oops! An error occured. Reload page & try again.</p>";
  }

  // handle the form submission event
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    // store or capture user input in the form of key-value pair, so that it can be sent using the ajax method
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request
function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}
//=======================================PROCESSING OF THE BOOKING ENGINE FORM - CODE END========================================//
