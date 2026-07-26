// ========================================
// RWANDAMKET
// Vendor Products
// ========================================

const vendorProductsGrid =
document.getElementById("vendorProductsGrid");

document.addEventListener(
"DOMContentLoaded",
loadVendorProducts
);

async function loadVendorProducts() {

    try {

        const {
            data:{user}
        } = await db.auth.getUser();

        if(!user){

            window.location.href =
            "vendor-login.html";

            return;

        }

        const vendor =
        await getVendorProfile(user.id);

        const products =
        await getVendorProducts(vendor.id);

        renderVendorProducts(products);

    }

    catch(error){

        console.error(error);

    }

}

function renderVendorProducts(products){

    if(products.length===0){

        vendorProductsGrid.innerHTML=

        "<div class='state-message'>No products found.</div>";

        return;

    }

    vendorProductsGrid.innerHTML=

    products.map(createVendorProductCard).join("");

}

function createVendorProductCard(product){

return `

<article class="product-card">

<img
src="${product.image_url}"
alt="${product.name}">

<h3>

${product.name}

</h3>

<p>

${product.price} RWF

</p>

<div class="vendor-product-actions">

<button
class="btn-primary"
onclick="editProduct(${product.id})">

Edit

</button>

<button
class="btn-danger"
onclick="deleteProduct(${product.id})">

Delete

</button>

</div>

</article>

`;

}

function editProduct(productId) {

    window.location.href =
        `add-product.html?id=${productId}`;

}

async function deleteProduct(productId){

if(!confirm(
"Delete this product?"
)) return;

await removeProduct(productId);

loadVendorProducts();

}
