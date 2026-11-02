
const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");

const modal = document.getElementById("confirmModal");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");


// Show error message
function showError(input, message) {
    const error = input.parentElement.querySelector(".error");

    error.textContent = message;
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
}


// Clear error message
function clearError(input) {
    const error = input.parentElement.querySelector(".error");

    error.textContent = "";
    input.classList.remove("invalid");
    input.removeAttribute("aria-invalid");
}


// Validate individual fields
function validateField(input) {

    if (input.value.trim() === "") {
        showError(input, "This field is required.");
        return false;
    }

    if (input.id === "name" && input.value.trim().length < 3) {
        showError(input, "Name must have at least 3 characters.");
        return false;
    }

    if (input.id === "email" && !input.validity.valid) {
        showError(input, "Please enter a valid email.");
        return false;
    }

    if (input.id === "phone" && !input.validity.valid) {
        showError(input, "Enter an 11-digit phone number.");
        return false;
    }

    if (input.id === "password" && input.value.length < 8) {
        showError(input, "Password must have at least 8 characters.");
        return false;
    }

    if (input.id === "confirmPassword" &&
        input.value !== passwordInput.value) {
        showError(input, "Passwords do not match.");
        return false;
    }

    clearError(input);
    return true;
}


// Check complete form
function validateForm() {

    const inputs = [
        nameInput,
        emailInput,
        phoneInput,
        passwordInput,
        confirmPassword
    ];

    let isValid = true;

    inputs.forEach(function(input) {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    submitBtn.disabled = !isValid;

    return isValid;
}


// Live validation
const inputs = [
    nameInput,
    emailInput,
    phoneInput,
    passwordInput,
    confirmPassword
];

inputs.forEach(function(input) {

    input.addEventListener("input", function() {
        validateField(input);

        if (input === passwordInput) {
            validateField(confirmPassword);
        }

        validateForm();
    });

    input.addEventListener("blur", function() {
        validateField(input);
    });

});


// Character counter
const about = document.getElementById("about");
const charCount = document.getElementById("charCount");

about.addEventListener("input", function() {
    charCount.textContent = about.value.length;
});


// Password strength
const strength = document.getElementById("strength");

passwordInput.addEventListener("input", function() {

    const password = passwordInput.value;

    if (password.length === 0) {
        strength.textContent = "";
    }
    else if (password.length < 8) {
        strength.textContent = "Weak Password";
    }
    else if (
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
    ) {
        strength.textContent = "Strong Password";
    }
    else {
        strength.textContent = "Medium Password";
    }

});


// Dynamic selected skills
const skills = document.querySelectorAll(
    'input[name="skills"]'
);

const selectedSkills = document.getElementById("selectedSkills");

function updateSkills() {

    selectedSkills.innerHTML = "";

    skills.forEach(function(skill) {

        if (skill.checked) {

            const span = document.createElement("span");

            span.classList.add("selected-skill");
            span.textContent = skill.value;

            selectedSkills.append(span);
        }

    });

}

skills.forEach(function(skill) {
    skill.addEventListener("change", updateSkills);
});


// Event delegation for selected skills
selectedSkills.addEventListener("click", function(event) {

    if (event.target.matches(".selected-skill")) {

        const skillName = event.target.textContent;

        skills.forEach(function(skill) {
            if (skill.value === skillName) {
                skill.checked = false;
            }
        });

        updateSkills();
    }

});


// Tabs using dataset
const tabs = document.querySelector(".tabs");

tabs.addEventListener("click", function(event) {

    const clickedTab = event.target.closest("[data-tab]");

    if (!clickedTab) {
        return;
    }

    document.querySelectorAll(".tab").forEach(function(tab) {
        tab.classList.remove("active");
    });

    document.querySelectorAll(".tab-content").forEach(function(content) {
        content.classList.remove("active");
    });

    clickedTab.classList.add("active");

    const tabContent = document.getElementById(
        clickedTab.dataset.tab
    );

    tabContent.classList.add("active");

});


// Open confirmation modal
form.addEventListener("submit", function(event) {

    event.preventDefault();

    if (validateForm()) {
        modal.classList.add("show");
        modal.setAttribute("aria-hidden", "false");
        confirmBtn.focus();
    }

});


// Confirm registration
confirmBtn.addEventListener("click", function() {

    const formData = new FormData(form);

    const studentName = formData.get("name") ||
        nameInput.value.trim();

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");

    successMessage.textContent =
        "Registration successful! Welcome, " + studentName + "!";

    form.reset();

    clearFormMessages();

    // Temporary success message
    setTimeout(function() {
        successMessage.textContent = "";
    }, 5000);

});


// Cancel modal
cancelBtn.addEventListener("click", function() {

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");

});


// Reset form messages
function clearFormMessages() {

    inputs.forEach(function(input) {
        clearError(input);
    });

    strength.textContent = "";
    charCount.textContent = "0";
    selectedSkills.innerHTML = "";

    submitBtn.disabled = true;
    successMessage.textContent = "";

    document.querySelectorAll(".tab").forEach(function(tab) {
        tab.classList.remove("active");
    });

    document.querySelectorAll(".tab-content").forEach(function(content) {
        content.classList.remove("active");
    });

    document.querySelector('[data-tab="personal"]').classList.add("active");
    document.getElementById("personal").classList.add("active");

}


// Reset button
form.addEventListener("reset", function() {

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");

    setTimeout(function() {
        clearFormMessages();
    }, 0);

});


// Keyboard interaction: close modal with Escape
document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
    }

});


// Initial form state
validateForm();