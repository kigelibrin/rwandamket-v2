// ========================================
// RWANDAMKET
// Transport Bookings
// ========================================

const bookingsGrid =
document.getElementById(
"transportBookingsGrid"
);

document.addEventListener(
"DOMContentLoaded",
loadBookings
);

async function loadBookings(){

try{

const {

data:{user}

}=await db.auth.getUser();

if(!user){

window.location.href=
"vendor-login.html";

return;

}

const company=
await getVendorProfile(user.id);

const bookings=
await getTransportBookings(company.id);

renderBookings(bookings);

}

catch(error){

console.error(error);

}

}

function renderBookings(bookings){

if(bookings.length===0){

bookingsGrid.innerHTML=

"<div class='state-message'>No bookings available.</div>";

return;

}

bookingsGrid.innerHTML=

bookings.map(createBookingCard).join("");

}

function createBookingCard(booking){

return`

<article class="order-card">

<h3>

${booking.passenger_name}

</h3>

<p>

📞 ${booking.passenger_phone}

</p>

<p>

📍 ${booking.pickup_location}

</p>

<p>

🏁 ${booking.dropoff_location}

</p>

<p>

🕒 ${booking.pickup_datetime}

</p>

<p>

💰 ${booking.trip_price} RWF

</p>

<p>

Status:
<strong>

${booking.booking_status}

</strong>

</p>

<button

class="btn-primary"

onclick="openBooking('${booking.id}')">

View Booking

</button>

</article>

`;

}

function openBooking(id){

window.location.href=

`transport-booking-details.html?id=${id}`;

}
