const passInput = document.getElementById("passwordInput");
const passConfirm = document.getElementById("confirmPassword");
const passBtn = document.querySelector("#togglePassword");
const btnConfirm = document.querySelector("#toggleConfirmPassword");
const passLength = document.getElementById("length");
const letterUpper = document.getElementById("uppercase");
const letterLower = document.getElementById("lowercase");
const hasNumber = document.getElementById("number");
const specialChar = document.getElementById("special");
const btnSubmit = document.getElementById("submitBtn");
const generatePasswordBtn = document.getElementById("generatePasswordBtn");
const strengthIndicator = document.getElementById("strengthIndicator");
const confirmMessage = document.getElementById("confirmMessage");

passBtn.addEventListener("click", () => {
  togglePasswordVisibility(passInput, passBtn);
});

btnConfirm.addEventListener("click", () => {
  togglePasswordVisibility(passConfirm, btnConfirm);
});

function togglePasswordVisibility(inputField, toggleButton) {
  const type = inputField.type === "password" ? "text" : "password";
  inputField.setAttribute("type", type);
  toggleButton.textContent = type === "password" ? "👁️" : "👁️‍🗨️";
}

function emptyFields(...fields) {
  let isEmpty = false;
  fields.forEach((field) => {
    const errorId = field.id + "Error";
    let existingError = document.getElementById(errorId);
    if (field.value.trim() === "") {
      field.style.borderColor = "red";
      field.classList.add("shake");
      if (!existingError) {
        const errorMsg = document.createElement("span");
        errorMsg.id = errorId;
        errorMsg.className = "error-message";
        errorMsg.textContent = "This field is required";
        field.parentNode.appendChild(errorMsg);
      }
      isEmpty = true;
      setTimeout(() => field.classList.remove("shake"), 500);
    } else {
      setTimeout(() => {
        field.style.borderColor = "#ccc";
        if (existingError) existingError.remove();
      }, 1000);
    }
  });
  return !isEmpty;
}

function calculatePasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength += 20;
  if (/[A-Z]/.test(password)) strength += 20;
  if (/[a-z]/.test(password)) strength += 20;
  if (/[0-9]/.test(password)) strength += 20;
  if (/[\W_]/.test(password)) strength += 20;
  return strength;
}

function updateStrengthBar(strength) {
  strengthIndicator.style.width = strength + "%";
  strengthIndicator.className = ""; // reset

  if (strength < 40) strengthIndicator.classList.add("strength-weak");
  else if (strength < 70) strengthIndicator.classList.add("strength-medium");
  else strengthIndicator.classList.add("strength-strong");
}

function validatePassword() {
  const pass = passInput.value;

  const strength = calculatePasswordStrength(pass);
  updateStrengthBar(strength);

  // Validate each requirement
  passLength.classList.toggle("valid", pass.length >= 8);
  letterUpper.classList.toggle("valid", /[A-Z]/.test(pass));
  letterLower.classList.toggle("valid", /[a-z]/.test(pass));
  hasNumber.classList.toggle("valid", /[0-9]/.test(pass));
  specialChar.classList.toggle("valid", /[\W_]/.test(pass));
}

// Check password match only when user types in the confirm field
function checkPasswordMatch() {
  const pass = passInput.value;
  const confirm = passConfirm.value;

  if (!confirm) {
    confirmMessage.textContent = "";
    return;
  }

  if (pass !== confirm) {
    confirmMessage.textContent = "Passwords do NOT match!";
    confirmMessage.style.color = "red";
  } else {
    confirmMessage.textContent = "Passwords match!";
    confirmMessage.style.color = "green";
  }
}

function generateStrongPassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

generatePasswordBtn.addEventListener("click", () => {
  const generatedPassword = generateStrongPassword();
  passInput.value = generatedPassword;
  passConfirm.value = generatedPassword;
  validatePassword();
  checkPasswordMatch();
});

btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
  
    const fieldsFilled = emptyFields(passInput, passConfirm);
    validatePassword();
    checkPasswordMatch();
  
    const allValid =
      passLength.classList.contains("valid") &&
      letterUpper.classList.contains("valid") &&
      letterLower.classList.contains("valid") &&
      hasNumber.classList.contains("valid") &&
      specialChar.classList.contains("valid");
  
    const passwordsMatch = passInput.value === passConfirm.value;
  
    if (!fieldsFilled || !allValid || !passwordsMatch) {
      alert("Please ensure all password rules are met and both fields match.");
      return;
    }
  
    alert("Account Created Successfully!");
  });
  

// Live typing listeners
passInput.addEventListener("input", validatePassword);
passConfirm.addEventListener("input", checkPasswordMatch);
