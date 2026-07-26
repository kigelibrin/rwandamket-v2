// ========================================
// RWANDAMKET
// Vendor Module
// ========================================

const vendorLoginForm =
document.getElementById("vendorLoginForm");

if (vendorLoginForm) {

    vendorLoginForm.addEventListener(
        "submit",
        loginVendor
    );

}

async function loginVendor(event) {

    event.preventDefault();

    const email =
        document.getElementById("vendorEmail").value;

    const password =
        document.getElementById("vendorPassword").value;

    try {

        await login(email, password);

        window.location.href =
            "vendor-dashboard.html";

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}
// ========================================
// LOAD DASHBOARD
// ========================================

document.addEventListener("DOMContentLoaded", async () => {

    if (!window.location.pathname.includes("vendor-dashboard")) {

        return;

    }

    await loadVendorDashboard();

});

// ========================================
// LOAD VENDOR
// ========================================

async function loadVendorDashboard() {

    try {

        const {
            data: { user }
        } = await db.auth.getUser();

        if (!user) {

            window.location.href = "vendor-login.html";

            return;

        }

        const vendor =
            await getVendorProfile(user.id);

        displayVendor(vendor);

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}

// ========================================
// DISPLAY VENDOR
// ========================================

function displayVendor(vendor) {

    document.getElementById("businessName").textContent =
        vendor.business_name;

    document.getElementById("walletBalance").textContent =
        `${vendor.wallet_balance} RWF`;

    document.getElementById("escrowBalance").textContent =
        `${vendor.escrow_balance} RWF`;

    document.getElementById("serviceType").textContent =
        vendor.service_type;

}

// ========================================
// LOGOUT
// ========================================

const logoutButton =
document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async () => {

            await logout();

            window.location.href =
                "vendor-login.html";

        }
    );

}
