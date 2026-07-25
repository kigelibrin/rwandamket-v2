// ========================================
// RWANDAMKET
// Products Module
// ========================================

const productsGrid = document.getElementById("productsGrid");

// ========================================
// LOAD PRODUCTS
// ========================================

async function loadProducts(marketId) {

    try {

        const products = await getProducts(marketId);

        renderProducts(products);

    } catch (error) {

        console.error(error);

        showProductsError();

    }

}

// ========================================
// LOAD FEATURED PRODUCTS
// ========================================

async function loadFeaturedProducts() {

    try {

        const products = await getFeaturedProducts();

        renderProducts(products);

    } catch (error) {

        console.error(error);

        showProductsError();

    }

}

// ========================================
// RENDER PRODUCTS
// ========================================

function renderProducts(products) {

    if (!productsGrid) return;

    if (!products.length) {

        productsGrid.innerHTML = emptyProducts();

        return;

    }

    productsGrid.innerHTML =
        products.map(createProductCard).join("");

}

// ========================================
// PRODUCT CARD
// ========================================

function createProductCard(product) {

    const discount =
        product.discount_percentage > 0;

    const finalPrice =
        discount
            ? product.price -
              (product.price * product.discount_percentage / 100)
            : product.price;

    return `

    <article class="product-card">

        <img
            src="${product.image_url || 'assets/images/placeholder-product.jpg'}"
            alt="${product.name}"
            loading="lazy"
        >

        <h3>${product.name}</h3>

        <p>${product.description ?? ""}</p>

        <p>

            Unit:
            ${product.unit ?? "item"}

        </p>

        <p>

            Stock:
            ${product.stock_quantity ?? 0}

        </p>

        ${
            discount
            ? `
                <p>

                    <del>${product.price} RWF</del>

                    <strong>${finalPrice} RWF</strong>

                </p>
              `
            : `
                <strong>${product.price} RWF</strong>
              `
        }

        <button
            class="btn-primary"
            onclick="addToCart(${product.id})">

            Add to Cart

        </button>

    </article>

    `;

}

// ========================================
// EMPTY STATE
// ========================================

function emptyProducts() {

    return `

        <div class="state-message">

            No products available.

        </div>

    `;

}

// ========================================
// ERROR
// ========================================

function showProductsError() {

    if (!productsGrid) return;

    productsGrid.innerHTML =

        emptyProducts();

}
