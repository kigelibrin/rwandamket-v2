const params = new URLSearchParams(window.location.search);

const editingProductId = params.get("id");
// ========================================
// RWANDAMKET
// Add Product
// ========================================

document.addEventListener("DOMContentLoaded", async () => {

    await loadVendorMarkets();

    await loadCategories();

    if (editingProductId) {

        await loadProductForEditing();

    }

});

const productForm =
document.getElementById("productForm");

productForm.addEventListener(
"submit",
saveProduct
);

async function saveProduct(event){

event.preventDefault();

const product={

market_id:Number(
marketSelect.value
),

name:productName.value,

description:
productDescription.value,

price:Number(
productPrice.value
),

image_url:
imageUrl.value,

featured:
featured.checked,

is_available:
available.checked,

category_id:
categorySelect.value || null,

stock_quantity:Number(
stockQuantity.value
),

discount_percentage:Number(
discountPercentage.value
),

sku:
productSku.value,

unit:
productUnit.value

};

try{

if (editingProductId) {

    await updateProduct(
        editingProductId,
        product
    );

} else {

    await createProduct(product);

}

alert(
"Product created successfully."
);

window.location.href=
"vendor-products.html";

}

catch(error){

console.error(error);

alert(error.message);

}

}
async function loadVendorMarkets(){

const {
data:{user}
}=await db.auth.getUser();

const vendor=
await getVendorProfile(user.id);

const markets=
await getVendorMarkets(vendor.id);

const select=
document.getElementById("marketSelect");

markets.forEach(market=>{

select.innerHTML+=`

<option value="${market.id}">

${market.name}

</option>

`;

});

}

async function loadCategories(){

const categories=
await getCategories();

const select=
document.getElementById("categorySelect");

categories.forEach(category=>{

select.innerHTML+=`

<option value="${category.id}">

${category.name}

</option>

`;

});

}
// ========================================
// LOAD PRODUCT FOR EDITING
// ========================================

async function loadProductForEditing() {

    const product =
        await getProductById(editingProductId);

    productName.value =
        product.name;

    productDescription.value =
        product.description || "";

    productPrice.value =
        product.price;

    stockQuantity.value =
        product.stock_quantity;

    discountPercentage.value =
        product.discount_percentage;

    productSku.value =
        product.sku || "";

    productUnit.value =
        product.unit || "";

    imageUrl.value =
        product.image_url || "";

    marketSelect.value =
        product.market_id;

    categorySelect.value =
        product.category_id || "";

    featured.checked =
        product.featured;

    available.checked =
        product.is_available;

}
