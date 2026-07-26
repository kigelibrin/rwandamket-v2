// ========================================
// RWANDAMKET
// Add Product
// ========================================

document.addEventListener("DOMContentLoaded", async () => {

    await loadVendorMarkets();

    await loadCategories();

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

await createProduct(product);

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
