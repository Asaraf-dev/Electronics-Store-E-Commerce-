/* =========================================
   ADMIN PROFILE MANAGEMENT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    const getStorage = function (keys, fallback = "") {

        for (const key of keys) {

            const value = localStorage.getItem(key);

            if (value !== null && value.trim() !== "") {
                return value;
            }

        }

        return fallback;

    };


    /* =========================================
       GET STORED DATA
    ========================================= */

    let profileName = getStorage(
        ["profileName", "registeredName"],
        "Not Available"
    );

    let profileEmail = getStorage(
        ["profileEmail", "registeredEmail", "loggedInEmail"],
        "Not Available"
    );

    let profilePhone = getStorage(
        ["profilePhone", "registeredPhone"],
        "Not Available"
    );

    let profileRole = getStorage(
        ["loggedInRole", "registeredRole"],
        "Admin"
    );


    const formattedRole =
        profileRole.charAt(0).toUpperCase() +
        profileRole.slice(1);


    /* =========================================
       DISPLAY PROFILE
    ========================================= */

    function displayProfile() {

        const elements = {

            profileDisplayName: profileName,
            profileDisplayRole: formattedRole,
            profileName: profileName,
            profileEmail: profileEmail,
            profilePhone: profilePhone,
            profileRole: formattedRole,
            profileStatus: "Active",
            overviewRole: formattedRole,
            overviewEmail: profileEmail

        };


        Object.keys(elements).forEach(function (id) {

            const element = document.getElementById(id);

            if (!element) return;

            if ("value" in element) {
                element.value = elements[id];
            } else {
                element.textContent = elements[id];
            }

        });

    }

    displayProfile();


    /* =========================================
       BOOTSTRAP MODALS
    ========================================= */

    const editModalElement =
        document.getElementById("editProfileModal");

    const passwordModalElement =
        document.getElementById("changePasswordModal");

    const editModal =
        editModalElement
            ? new bootstrap.Modal(editModalElement)
            : null;

    const passwordModal =
        passwordModalElement
            ? new bootstrap.Modal(passwordModalElement)
            : null;


    /* =========================================
       EDIT PROFILE
    ========================================= */

    const editProfileBtn =
        document.getElementById("editProfileBtn");

    const editProfileForm =
        document.getElementById("editProfileForm");

    const editProfileName =
        document.getElementById("editProfileName");

    const editProfilePhone =
        document.getElementById("editProfilePhone");


    if (editProfileBtn) {

        editProfileBtn.addEventListener("click", function () {

            editProfileName.value = profileName;
            editProfilePhone.value = profilePhone;

            editModal.show();

        });

    }


    if (editProfileForm) {

        editProfileForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const newName = editProfileName.value.trim();
            const newPhone = editProfilePhone.value.trim();

            const namePattern = /^[A-Za-z ]+$/;
            const phonePattern = /^[0-9]{10}$/;


            if (!namePattern.test(newName)) {

                editProfileName.setCustomValidity(
                    "Please enter a valid name using alphabets only."
                );

                editProfileName.reportValidity();

                return;

            }

            editProfileName.setCustomValidity("");


            if (!phonePattern.test(newPhone)) {

                editProfilePhone.setCustomValidity(
                    "Phone number must contain exactly 10 digits."
                );

                editProfilePhone.reportValidity();

                return;

            }

            editProfilePhone.setCustomValidity("");


            profileName = newName;
            profilePhone = newPhone;


            localStorage.setItem("profileName", profileName);
            localStorage.setItem("profilePhone", profilePhone);


            displayProfile();

            editModal.hide();

            alert("Profile updated successfully.");

        });

    }


    /* =========================================
       CHANGE PASSWORD MODAL
    ========================================= */

    const passwordButtons = [

        document.getElementById("changePasswordBtn"),
        document.getElementById("securityPasswordBtn")

    ];


    passwordButtons.forEach(function (button) {

        if (!button) return;

        button.addEventListener("click", function () {

            passwordModal.show();

        });

    });


    /* =========================================
       CHANGE PASSWORD VALIDATION
    ========================================= */

    const changePasswordForm =
        document.getElementById("changePasswordForm");

    const currentPassword =
        document.getElementById("currentPassword");

    const newPassword =
        document.getElementById("newPassword");

    const confirmNewPassword =
        document.getElementById("confirmNewPassword");


    if (changePasswordForm) {

        changePasswordForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const passwordPattern =
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;


            if (!passwordPattern.test(newPassword.value)) {

                newPassword.setCustomValidity(
                    "Password must contain uppercase, lowercase, number, special character and at least 8 characters."
                );

                newPassword.reportValidity();

                return;

            }

            newPassword.setCustomValidity("");


            if (newPassword.value !== confirmNewPassword.value) {

                confirmNewPassword.setCustomValidity(
                    "Passwords do not match."
                );

                confirmNewPassword.reportValidity();

                return;

            }

            confirmNewPassword.setCustomValidity("");


            /*
             * Demo only:
             * Do not store passwords in localStorage
             * in a real production application.
             */

            passwordModal.hide();

            changePasswordForm.reset();

            alert(
                "Password validation completed. Connect this form to your backend to update the password securely."
            );

        });

    }

});


document.addEventListener("DOMContentLoaded", function () {

    const actionButtons = document.querySelectorAll(".es-secondary-btn ,.es-primary-btn ,.es-outline-btn");

    actionButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            window.location.href = "404.html";

        });

    });

});