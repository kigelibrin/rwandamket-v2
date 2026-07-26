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
  if(

booking.assigned_driver_id

){

const driver=

await getDriver(

booking.assigned_driver_id

);

document

.getElementById(

"bookingDetails"

)

.innerHTML+=`

<hr>

<h3>

Assigned Driver

</h3>

<p>

${driver.full_name}

</p>

<p>

${driver.phone}

</p>

<p>

${driver.vehicle_plate}

</p>

`;

}
  renderTimeline(booking.booking_status);

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
function renderTimeline(status){

const steps=[

"pending",

"accepted",

"driver_assigned",

"en_route",

"picked_up",

"completed"

];

const names={

pending:"Booking Received",

accepted:"Accepted",

driver_assigned:"Driver Assigned",

en_route:"Driver En Route",

picked_up:"Passenger Picked Up",

completed:"Trip Completed"

};

const current=

steps.indexOf(status);

document.getElementById(

"bookingTimeline"

).innerHTML=

steps.map(

(step,index)=>`

<div class="timeline-step ${index<=current?"active":""}">

<div class="timeline-dot"></div>

<div>

${names[step]}

</div>

</div>

`

).join("");

}
