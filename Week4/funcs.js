// Validate Full Name
function validateName() {
    let name = document.getElementById("fullname").value;

    if (name.trim() === "") {
        alert("Full Name is required.");
        return false;
    }
    return true;
}

// Validate Email
function validateEmail() {
    let email = document.getElementById("email").value;

    if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        return false;
    }
    return true;
}

// Validate Phone
function validatePhone() {
    let phone = document.getElementById("phone").value;

    if (phone.length < 7) {
        alert("Phone number seems too short.");
        return false;
    }
    return true;
}

// Validate Birthdate
function validateBirthdate() {
    let birthdate = document.getElementById("birthdate").value;

    if (birthdate === "") {
        alert("Please select your birthdate.");
        return false;
    }
    return true;
}

// Validate Gender
function validateGender() {
    let gender = document.getElementById("gender").value;

    if (gender === "") {
        alert("Please select your gender.");
        return false;
    }
    return true;
}

// Validate Country
function validateCountry() {
    let country = document.getElementById("country").value;

    if (country.trim() === "") {
        alert("Country is required.");
        return false;
    }
    return true;
}

// Validate Message
function validateMessage() {
    let message = document.getElementById("message").value;

    if (message.trim() === "") {
        alert("Please enter a message.");
        return false;
    }
    return true;
}

// Final Form Validation
function validateForm() {

    if (
        !validateName() ||
        !validateEmail() ||
        !validatePhone() ||
        !validateBirthdate() ||
        !validateGender() ||
        !validateCountry() ||
        !validateMessage()
    ) {
        return false; // stops form submission
    }

    alert("Form submitted successfully!");
    return true;
}