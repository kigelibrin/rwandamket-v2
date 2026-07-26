const params =
new URLSearchParams(
window.location.search
);

const bookingId =
params.get("id");

document.addEventListener(
"DOMContentLoaded",
initBooking
);

async function initBooking(){

await loadBooking();

await loadTransportStaff();

}
async function loadBooking(){

const booking=

await getTransportBooking(
bookingId
);

document.getElementById(
"bookingDetails"
).innerHTML=`

<h2>

${booking.passenger_name}

</h2>

<p>

Phone:
${booking.passenger_phone}

</p>

<p>

Pickup:
${booking.pickup_location}

</p>

<p>

Destination:
${booking.dropoff_location}

</p>

<p>

Passengers:
${booking.passenger_count}

</p>

<p>

Price:
${booking.trip_price} RWF

</p>

<p>

Status:
${booking.booking_status}

</p>

`;

}
