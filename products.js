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
// RENDER PRODUCTS
// ========================================

function renderProducts(products) {

    if (!productsGrid) return;

    if (products.length === 0) {

        productsGrid.innerHTML = emptyProducts();

        return;

    }

    productsGrid.innerHTML = products
        .map(createProductCard)
        .join("");

}

// ========================================
// PRODUCT CARD
// ========================================

function createProductCard(product) {

    const discount =
        product.discount_percentage > 0;

    const finalPrice = discount
        ? product.price -
          (product.price * product.discount_percentage / 100)
        : product.price;

    return `

    <article class="product-card">

        <img
            src="${product.image_url || "assets/images/placeholder-product.jpg"}"
            alt="${product.name}"
            loading="lazy">

        ${discount
            ? `<span class="discount-badge">
                    -${product.discount_percentage}%
               </span>`
            : ""
        }

        <h3>

            ${product.name}

        </h3>

        <p>

            ${product.description ?? ""}

        </p>

        <div class="product-meta">

            <span>

                Unit:
                ${product.unit ?? "Item"}

            </span>

            <span>

                Stock:
                ${product.stock_quantity ?? 0}

            </span>

        </div>

        ${
            discount
            ? `
            <div class="price-box">

                <del>

                    ${product.price} RWF

                </del>

                <strong>

                    ${finalPrice} RWF

                </strong>

            </div>
            `
            : `
            <div class="price-box">

                <strong>

                    ${product.price} RWF

                </strong>

            </div>
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
// ERROR STATE
// ========================================

function showProductsError() {

    if (!productsGrid) return;

    productsGrid.innerHTML =

        emptyProducts();

}
