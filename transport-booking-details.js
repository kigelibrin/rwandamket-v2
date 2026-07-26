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
async function updateBookingStatus(status){

await updateTransportBooking(

bookingId,

{

booking_status:status

}

);

location.reload();

}
async function loadTransportStaff(){

const {

data:{user}

}=await db.auth.getUser();

const company=

await getVendorProfile(user.id);

const drivers=

await getDrivers(company.id);

const select=

document.getElementById(

"staffSelect"

);

select.innerHTML=

'<option value="">Choose Driver</option>';

drivers.forEach(driver=>{

select.innerHTML+=`

<option value="${driver.id}">

${driver.full_name}

(${driver.vehicle_plate})

</option>

`;

});

}
document

.getElementById(

"assignButton"

)

.addEventListener(

"click",

async()=>{

const driver=

document.getElementById(

"staffSelect"

).value;

if(!driver){

alert(

"Select a driver."

);

return;

}

await assignDriver(

bookingId,

driver

);

alert(

"Driver assigned."

);

location.reload();

});

