// ========================================
// RWANDAMKET
// Supabase Database Service
// ========================================

// Use the client created in config.js
const db = window._supabase;

// ========================================
// MARKETS
// ========================================

async function getMarkets() {
    const { data, error } = await db
        .from("markets")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw error;

    return data;
}

async function getFeaturedMarkets() {
    const { data, error } = await db
        .from("markets")
        .select("*")
        .eq("featured", true)
        .order("rating", { ascending: false });

    if (error) throw error;

    return data;
}

async function getMarket(id) {
    const { data, error } = await db
        .from("markets")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
}

// ========================================
// PRODUCTS
// ========================================

async function getProducts(marketId) {
    const { data, error } = await db
        .from("products")
        .select("*")
        .eq("market_id", marketId)
        .eq("is_available", true)
        .order("name");

    if (error) throw error;

    return data;
}

async function getFeaturedProducts() {
    const { data, error } = await db
        .from("products")
        .select("*")
        .eq("featured", true);

    if (error) throw error;

    return data;
}

// ========================================
// CATEGORIES
// ========================================

async function getCategories() {
    const { data, error } = await db
        .from("categories")
        .select("*")
        .order("display_order");

    if (error) throw error;

    return data;
}
