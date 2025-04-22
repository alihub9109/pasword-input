
const passInput = document.getElementById("passwordInput");
const passBtn = document.querySelector(".toggle-btn");
const passLength = document.getElementById("length");
const letterUpper = document.getElementById("uppercase");
const letterLower = document.getElementById("lowercase");
const hasNumber = document.getElementById("number");
const specialChar = document.getElementById("special");

passBtn.addEventListener("click", () => {
    if (passInput.hasAttribute("type") &&
        passInput.getAttribute("type") == "password") {
        passInput.setAttribute("type", "text");
        passBtn.textContent = "👁️‍🗨️";
    }
    else {
        passInput.setAttribute("type", "password");
        passBtn.textContent = "👁️";
    }
})


function updateValidationState(condition, element) {
    if (condition) {
        element.classList.remove("invalid");
        element.classList.add("valid");
    } else {
        element.classList.add("invalid");
        element.classList.remove("valid");
    }
}

passInput.addEventListener("input", () => {
    updateValidationState(/[A-Z]/.test(passInput.value), letterUpper);
    updateValidationState(/[a-z]/.test(passInput.value), letterLower);
    updateValidationState(/[0-9]/.test(passInput.value), hasNumber);
    updateValidationState(/[\W_]/.test(passInput.value), specialChar);
    updateValidationState(passInput.value.length >= 8, passLength);

})





