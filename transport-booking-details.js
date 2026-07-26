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
