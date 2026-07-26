// ========================================
// RWANDAMKET
// Authentication
// ========================================

// LOGIN

const loginForm =
document.getElementById("loginForm");

if (loginForm) {

loginForm.addEventListener(
"submit",
async (e)=>{

e.preventDefault();

const email =
document.getElementById("loginEmail").value;

const password =
document.getElementById("loginPassword").value;

try{

await login(email,password);

alert("Welcome back!");

window.location.href="index.html";

}catch(error){

console.error(error);

alert(error.message);

}

});

}

// REGISTER

const registerForm =
document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const fullName=
document.getElementById("fullName").value;

const email=
document.getElementById("registerEmail").value;

const phone=
document.getElementById("phone").value;

const password=
document.getElementById("registerPassword").value;

try{

await register(
fullName,
email,
phone,
password
);

alert(
"Account created successfully."
);

window.location.href="login.html";

}catch(error){

console.error(error);

alert(error.message);

}

});

}
