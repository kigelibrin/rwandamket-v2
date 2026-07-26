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
