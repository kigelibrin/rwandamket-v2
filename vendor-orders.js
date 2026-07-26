// ========================================
// RWANDAMKET
// Vendor Orders
// ========================================

const ordersGrid =
document.getElementById("ordersGrid");

document.addEventListener(
"DOMContentLoaded",
loadVendorOrders
);

async function loadVendorOrders(){

try{

const {

data:{user}

}=await db.auth.getUser();

if(!user){

window.location.href=
"vendor-login.html";

return;

}

const vendor=
await getVendorProfile(user.id);

const orders=
await getVendorOrders(vendor.id);

renderOrders(orders);

}

catch(error){

console.error(error);

ordersGrid.innerHTML=

"<div class='state-message'>Unable to load orders.</div>";

}

}

function renderOrders(orders){

if(!orders.length){

ordersGrid.innerHTML=

"<div class='state-message'>No orders yet.</div>";

return;

}

ordersGrid.innerHTML=

orders.map(createOrderCard).join("");

}

function createOrderCard(order){

return`

<article class="order-card">

<h3>

${order.customer_name}

</h3>

<p>

📍 ${order.delivery_address}

</p>

<p>

📞 ${order.phone_number}

</p>

<p>

💰 ${order.total_amount} RWF

</p>

<p>

Payment:
<strong>

${order.payment_status}

</strong>

</p>

<p>

Status:
<strong>

${order.order_status}

</strong>

</p>

<div class="order-actions">

<button
class="btn-primary"
onclick="openOrder('${order.id}')">

View

</button>

</div>

</article>

`;

}

function openOrder(orderId){

window.location.href=

`vendor-order-details.html?id=${orderId}`;

}
