// ========================================
// RWANDAMKET
// Supabase Database Service
// ========================================

const db = window._supabase;

// ========================================
// ERROR HANDLER
// ========================================

function handleError(error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
}

// ========================================
// MARKETS
// ========================================

async function getMarkets() {
    const { data, error } = await db
        .from("markets")
        .select(`
            id,
            name,
            description,
            category,
            image_url,
            cover_image,
            location,
            whatsapp_number,
            momo_number,
            featured,
            rating,
            total_reviews,
            verified,
            is_open,
            opening_time,
            closing_time,
            delivery_time,
            delivery_fee,
            minimum_order
        `)
        .order("created_at", { ascending: false });

    if (error) handleError(error);

    return data;
}

async function getFeaturedMarkets() {
    const { data, error } = await db
        .from("markets")
        .select(`
            id,
            name,
            description,
            category,
            image_url,
            cover_image,
            location,
            whatsapp_number,
            momo_number,
            featured,
            rating,
            total_reviews,
            verified,
            is_open,
            opening_time,
            closing_time,
            delivery_time,
            delivery_fee,
            minimum_order
        `)
        .eq("featured", true)
        .order("rating", { ascending: false });

    if (error) handleError(error);

    return data;
}

async function getMarket(id) {
    const { data, error } = await db
        .from("markets")
        .select("*")
        .eq("id", id)
        .single();

    if (error) handleError(error);

    return data;
}

// ========================================
// PRODUCTS
// ========================================

async function getProducts(marketId) {
    const { data, error } = await db
        .from("products")
        .select(`
            id,
            market_id,
            name,
            description,
            price,
            image_url,
            featured,
            stock_quantity,
            discount_percentage,
            is_available,
            category_id,
            sku,
            unit
        `)
        .eq("market_id", marketId)
        .eq("is_available", true)
        .order("name");

    if (error) handleError(error);

    return data;
}

async function getFeaturedProducts() {
    const { data, error } = await db
        .from("products")
        .select(`
            id,
            market_id,
            name,
            description,
            price,
            image_url,
            featured,
            stock_quantity,
            discount_percentage,
            is_available,
            category_id,
            sku,
            unit
        `)
        .eq("featured", true)
        .eq("is_available", true);

    if (error) handleError(error);

    return data;
}

// ========================================
// CATEGORIES
// ========================================

async function getCategories() {
    const { data, error } = await db
        .from("categories")
        .select(`
            id,
            name,
            icon,
            description,
            featured,
            display_order
        `)
        .order("display_order");

    if (error) handleError(error);

    return data;
}

// ========================================
// REVIEWS
// ========================================

async function getMarketReviews(marketId) {
    const { data, error } = await db
        .from("reviews")
        .select("*")
        .eq("market_id", marketId)
        .order("created_at", { ascending: false });

    if (error) handleError(error);

    return data;
}

// ========================================
// SEARCH
// ========================================

async function searchMarkets(searchTerm) {
    const { data, error } = await db
        .from("markets")
        .select("*")
        .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);

    if (error) handleError(error);

    return data;
}

// ========================================
// CREATE ORDER
// ========================================

async function createOrder(order) {

    const { data, error } = await db

        .from("orders")

        .insert([order])

        .select()

        .single();

    if (error) handleError(error);

    return data;

}

// ========================================
// NOTIFICATIONS
// ========================================

async function getNotifications(userId) {
    const { data, error } = await db
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) handleError(error);

    return data;
}

// ========================================
// MARKET IMAGES
// ========================================

async function getMarketImages(marketId) {
    const { data, error } = await db
        .from("market_images")
        .select("*")
        .eq("market_id", marketId)
        .order("display_order");

    if (error) handleError(error);

    return data;
}

// ========================================
// FAVOURITES
// ========================================

async function getUserFavourites(userId) {
    const { data, error } = await db
        .from("favorites")
        .select("*")
        .eq("user_id", userId);

    if (error) handleError(error);

    return data;
}
// ========================================
// GET SINGLE PRODUCT
// ========================================

async function getProduct(productId) {

    const { data, error } = await db
        .from("products")
        .select(`
            id,
            market_id,
            name,
            description,
            price,
            image_url,
            featured,
            stock_quantity,
            discount_percentage,
            is_available,
            category_id,
            sku,
            unit
        `)
        .eq("id", productId)
        .single();

    if (error) handleError(error);

    return data;

}
// ========================================
// UPDATE PAYMENT STATUS
// ========================================

async function updatePaymentStatus(orderId, status) {

    const { data, error } = await db
        .from("orders")
        .update({
            payment_status: status
        })
        .eq("id", orderId)
        .select()
        .single();

    if (error) handleError(error);

    return data;

}
// ========================================
// REGISTER USER
// ========================================

async function register(
fullName,
email,
phone,
password
){

const {data,error}=await db.auth.signUp({

email,

password

});

if(error) handleError(error);

await db
.from("profiles")
.insert({

id:data.user.id,

full_name:fullName,

phone:phone

});

return data;

}

// ========================================
// LOGIN USER
// ========================================

async function login(
email,
password
){

const {data,error}=await db.auth.signInWithPassword({

email,

password

});

if(error) handleError(error);

return data;

}

// ========================================
// LOGOUT USER
// ========================================

async function logout(){

const {error}=await db.auth.signOut();

if(error) handleError(error);

}
