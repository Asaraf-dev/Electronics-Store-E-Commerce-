/* =========================================
   LOGIN FUNCTIONALITY
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");
    const loginEmail = document.getElementById("loginEmail");
    const loginPassword = document.getElementById("loginPassword");
    const passwordToggle = document.getElementById("passwordToggle");

    const roleInputs = document.querySelectorAll(
        'input[name="loginRole"]'
    );

    /* =========================================
       ELEMENT CHECK
    ========================================= */

    if (
        !loginForm ||
        !loginEmail ||
        !loginPassword ||
        !passwordToggle ||
        roleInputs.length === 0
    ) {
        console.error("Login elements are missing.");
        return;
    }

    /* =========================================
       PASSWORD SHOW / HIDE
    ========================================= */

    passwordToggle.addEventListener("click", function () {

        const icon = this.querySelector("i");

        if (loginPassword.type === "password") {

            loginPassword.type = "text";

            icon.classList.remove("bi-eye");
            icon.classList.add("bi-eye-slash");

            this.setAttribute("aria-label", "Hide password");

        } else {

            loginPassword.type = "password";

            icon.classList.remove("bi-eye-slash");
            icon.classList.add("bi-eye");

            this.setAttribute("aria-label", "Show password");

        }

    });

    /* =========================================
       EMAIL VALIDATION
    ========================================= */

    loginEmail.addEventListener("input", function () {

        this.setCustomValidity("");

        if (this.value.trim() !== "" && !this.validity.valid) {

            this.setCustomValidity(
                "Please enter a valid email address."
            );

        }

    });

    /* =========================================
       PASSWORD VALIDATION
    ========================================= */

    loginPassword.addEventListener("input", function () {

        this.setCustomValidity("");

    });

    /* =========================================
       ROLE VALIDATION
    ========================================= */

    roleInputs.forEach(function (roleInput) {

        roleInput.addEventListener("change", function () {

            roleInputs.forEach(function (input) {
                input.setCustomValidity("");
            });

        });

    });

    /* =========================================
       FORM SUBMIT
    ========================================= */

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        /* Clear previous custom errors */
        loginEmail.setCustomValidity("");
        loginPassword.setCustomValidity("");

        roleInputs.forEach(function (input) {
            input.setCustomValidity("");
        });

        /* Browser default validation */

        if (!loginForm.checkValidity()) {

            loginForm.reportValidity();

            return;

        }

        /* Get form values */

        const email = loginEmail.value.trim().toLowerCase();
        const password = loginPassword.value;

        const selectedRole = document.querySelector(
            'input[name="loginRole"]:checked'
        );

        /* =========================================
           EMAIL VALIDATION
        ========================================= */

        const emailPattern =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailPattern.test(email)) {

            loginEmail.setCustomValidity(
                "Please enter a valid email address."
            );

            loginEmail.reportValidity();

            return;

        }

        /* =========================================
           PASSWORD VALIDATION
        ========================================= */

        if (password.trim() === "") {

            loginPassword.setCustomValidity(
                "Please enter your password."
            );

            loginPassword.reportValidity();

            return;

        }

        /* =========================================
           ROLE VALIDATION
        ========================================= */

        if (!selectedRole) {

            roleInputs[0].setCustomValidity(
                "Please select User or Admin."
            );

            roleInputs[0].reportValidity();

            return;

        }

        const role = selectedRole.value;

        /* =========================================
           STORE LOGIN INFORMATION
        ========================================= */

        localStorage.setItem("loggedInEmail", email);

        localStorage.setItem("loggedInRole", role);

        localStorage.setItem("isLoggedIn", "true");

        /* =========================================
           REDIRECT BASED ON ROLE
        ========================================= */

        if (role === "admin") {

            window.location.href = "admin-dashboard.html";

        } else if (role === "client") {

            window.location.href = "client-dashboard.html";

        }

    });

});


/*--- Register ---*/
document.addEventListener("DOMContentLoaded",function(){
const form=document.querySelector("#registerForm");
const nameInput=document.querySelector("#registerName");
const emailInput=document.querySelector("#registerEmail");
const phoneInput=document.querySelector("#registerPhone");
const passwordInput=document.querySelector("#registerPassword");
const confirmPasswordInput=document.querySelector("#registerConfirmPassword");
const passwordToggle=document.querySelector("#registerPasswordToggle");
const confirmPasswordToggle=document.querySelector("#registerConfirmPasswordToggle");
if(!form)return;
/*--- Name Validation ---*/
if(nameInput){
nameInput.addEventListener("input",function(){
this.value=this.value.replace(/[^A-Za-z ]/g,"");
this.setCustomValidity("");
});
}
/*--- Phone Validation ---*/
if(phoneInput){
phoneInput.addEventListener("input",function(){
this.value=this.value.replace(/\D/g,"").slice(0,10);
this.setCustomValidity("");
});
}
/*--- Email Validation ---*/
if(emailInput){
emailInput.addEventListener("input",function(){
this.setCustomValidity("");
});
}
/*--- Password Validation ---*/
if(passwordInput){
passwordInput.addEventListener("input",function(){
this.setCustomValidity("");
if(confirmPasswordInput)confirmPasswordInput.setCustomValidity("");
});
}
/*--- Confirm Password Validation ---*/
if(confirmPasswordInput){
confirmPasswordInput.addEventListener("input",function(){
this.setCustomValidity("");
if(passwordInput&&this.value!==passwordInput.value)this.setCustomValidity("Passwords do not match.");
});
}
/*--- Password Toggle ---*/
function togglePassword(input,button){
if(!input||!button)return;
button.addEventListener("click",function(){
const icon=this.querySelector("i");
if(input.type==="password"){
input.type="text";
icon.classList.remove("bi-eye");
icon.classList.add("bi-eye-slash");
this.setAttribute("aria-label","Hide password");
}else{
input.type="password";
icon.classList.remove("bi-eye-slash");
icon.classList.add("bi-eye");
this.setAttribute("aria-label","Show password");
}
});
}
togglePassword(passwordInput,passwordToggle);
togglePassword(confirmPasswordInput,confirmPasswordToggle);
/*--- Register Submit ---*/
form.addEventListener("submit",function(event){
event.preventDefault();
nameInput.setCustomValidity("");
emailInput.setCustomValidity("");
phoneInput.setCustomValidity("");
passwordInput.setCustomValidity("");
confirmPasswordInput.setCustomValidity("");
const selectedRole=document.querySelector('input[name="registerRole"]:checked');
if(!form.checkValidity()){
form.reportValidity();
return;
}
const name=nameInput.value.trim();
const email=emailInput.value.trim().toLowerCase();
const phone=phoneInput.value.trim();
const password=passwordInput.value;
const confirmPassword=confirmPasswordInput.value;
if(!/^[A-Za-z ]+$/.test(name)){
nameInput.setCustomValidity("Name can contain letters and spaces only.");
nameInput.reportValidity();
return;
}
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
emailInput.setCustomValidity("Please enter a valid email address.");
emailInput.reportValidity();
return;
}
if(!/^\d{10}$/.test(phone)){
phoneInput.setCustomValidity("Phone number must contain exactly 10 digits.");
phoneInput.reportValidity();
return;
}
if(!/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{8,}$/.test(password)){
passwordInput.setCustomValidity("Password must contain at least 8 characters, one number, one uppercase letter, one lowercase letter and one special character.");
passwordInput.reportValidity();
return;
}
if(password!==confirmPassword){
confirmPasswordInput.setCustomValidity("Passwords do not match.");
confirmPasswordInput.reportValidity();
return;
}
if(!selectedRole){
const firstRole=document.querySelector('input[name="registerRole"]');
if(firstRole){
firstRole.setCustomValidity("Please select User or Admin.");
firstRole.reportValidity();
}
return;
}
const role=selectedRole.value;
/*--- Store Registration Information ---*/
localStorage.setItem("registeredName",name);
localStorage.setItem("registeredEmail",email);
localStorage.setItem("registeredPhone",phone);
localStorage.setItem("registeredRole",role);
/*--- Store Profile Information ---*/
localStorage.setItem("profileName",name);
localStorage.setItem("profileEmail",email);
localStorage.setItem("profilePhone",phone);
/*--- Redirect To Login ---*/
window.location.href="login.html";
});
});