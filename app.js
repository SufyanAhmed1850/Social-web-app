let toDashboard = JSON.parse(localStorage.getItem("loginUser"));
if (toDashboard) {
    window.location.replace("./dashboard.html");
}

const toggleForm = () => {
    let signInForm = document.getElementById("signInForm");
    let signUpForm = document.getElementById("signUpForm");
    let signInText = document.getElementById("signInText");
    let haveAccountText = document.getElementById("haveAccountText");
    if (!signInForm.classList.contains("d-none")) {
        signInForm.classList.add("d-none");
        signUpForm.classList.remove("d-none");
        signInText.textContent = "Sign Up";
        haveAccountText.textContent = "already";
        regOrLogText.textContent = "Login here !";
    } else {
        signInForm.classList.remove("d-none");
        signUpForm.classList.add("d-none");
        signInText.textContent = "Sign In";
        haveAccountText.textContent = "don’t";
        regOrLogText.textContent = "Register here !";
    }
};
let regOrLogText = document.getElementById("regOrLogText");
regOrLogText.addEventListener("click", toggleForm);

const togglePass = (event) => {
    let eye = event.target;
    let input = eye.previousElementSibling;
    if (input.type == "password") {
        input.type = "text";
        eye.src = "./assets/visible.svg";
    } else {
        input.type = "password";
        eye.src = "./assets/invisible 1.svg";
    }
};
let passwordInput = document.querySelectorAll(
    'input.form-input[type="password"]'
);
passwordInput.forEach(function (input) {
    input.nextElementSibling.addEventListener("click", togglePass);
});

const registerUser = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let newFullName = document.getElementById("newFullName");
    let newEmail = document.getElementById("newEmail");
    let newUserName = document.getElementById("newUserName");
    let newPassword = document.getElementById("newPassword");
    let newConfirmPassword = document.getElementById("newConfirmPassword");
    let newNameSpacesError = document.getElementById("newNameSpacesError");
    let invalidEmailError = document.getElementById("invalidEmailError");
    let alreadyExistError = document.getElementById("emailExistError");
    let usernameExistError = document.getElementById("usernameExistError");
    let newPassSpacesError = document.getElementById("newPassSpacesError");
    let newPassMatchError = document.getElementById("newPassMatchError");
    let isValidnewFullName = false;
    let isValidnewEmail = false;
    let isValidnewUserName = false;
    let isValidnewPassword = false;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let spacesPattern = /^\s|\s$/;
    // Handles Name
    if (newFullName.value.trim() !== "") {
        newFullName.classList.remove("red-bg");
        if (spacesPattern.test(newFullName.value)) {
            newNameSpacesError.classList.remove("v-hidden");
            newFullName.classList.add("red-bg");
        } else {
            isValidnewFullName = true;
            newNameSpacesError.classList.add("v-hidden");
            newFullName.classList.remove("red-bg");
        }
    } else {
        newFullName.classList.add("red-bg");
    }
    // Handles Email
    if (newEmail.value.trim() !== "") {
        alreadyExistError.classList.add("d-none");
        newEmail.classList.remove("red-bg");
        if (emailPattern.test(newEmail.value)) {
            newEmail.classList.remove("red-bg");
            invalidEmailError.classList.add("v-hidden");
            isValidnewEmail = true;
            let user = users.find((value) => {
                if (newEmail.value === value.email) {
                    isValidnewEmail = false;
                    return true;
                }
            });
            if (user) {
                newEmail.classList.add("red-bg");
                alreadyExistError.classList.remove("d-none");
            }
        } else {
            newEmail.classList.add("red-bg");
            invalidEmailError.classList.remove("v-hidden");
        }
    } else {
        newEmail.classList.add("red-bg");
    }
    // Handles UserName
    if (newUserName.value.trim() !== "") {
        newUserName.classList.remove("red-bg");
        isValidnewUserName = true;
        let user = users.find((value) => {
            if (newUserName.value === value.userName) {
                isValidnewUserName = false;
                return true;
            }
        });
        if (user) {
            newUserName.classList.add("red-bg");
            usernameExistError.classList.remove("v-hidden");
        } else {
            usernameExistError.classList.add("v-hidden");
        }
    } else {
        newUserName.classList.add("red-bg");
    }
    // Handles Password
    if (newPassword.value.trim() !== "") {
        if (spacesPattern.test(newPassword.value)) {
            newPassSpacesError.classList.remove("v-hidden");
            newPassword.classList.add("red-bg");
            if (!newPassMatchError.classList.contains("v-hidden")) {
                newPassword.classList.remove("red-bg");
                newPassMatchError.classList.add("v-hidden");
            }
        } else {
            newPassSpacesError.classList.add("v-hidden");
            if (newPassword.value !== newConfirmPassword.value) {
                newPassword.classList.add("red-bg");
                newConfirmPassword.classList.add("red-bg");
                newPassMatchError.classList.remove("v-hidden");
            } else {
                isValidnewPassword = true;
                newPassword.classList.remove("red-bg");
                newConfirmPassword.classList.remove("red-bg");
                newPassMatchError.classList.add("v-hidden");
            }
        }
    } else {
        newPassword.classList.add("red-bg");
        newConfirmPassword.classList.add("red-bg");
    }
    if (
        isValidnewFullName &&
        isValidnewEmail &&
        isValidnewUserName &&
        isValidnewPassword
    ) {
        let userObj = {
            fullName: newFullName.value,
            email: newEmail.value,
            userName: newUserName.value,
            password: newPassword.value,
        };
        users.push(userObj);
        newFullName.value = "";
        newEmail.value = "";
        newUserName.value = "";
        newPassword.value = "";
        newConfirmPassword.value = "";
        showEmailWindow("registered");
    } else {
        console.log("User Already Exist");
        return;
    }
    console.log(users);
    localStorage.setItem("users", JSON.stringify(users));
};

let registerBtn = document.getElementById("registerBtn");
registerBtn.addEventListener("click", registerUser);
let signUpForm = document.getElementById("signUpForm");
signUpForm.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        registerUser();
    }
});

const loginUser = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let isEmail = true;
    let isPass = true;
    if (!email.value) {
        email.classList.add("red-bg");
        isEmail = false;
    } else {
        email.classList.remove("red-bg");
    }
    if (!password.value) {
        password.classList.add("red-bg");
        isPass = false;
    } else {
        password.classList.remove("red-bg");
    }
    if (!isEmail || !isPass) {
        return;
    }
    let user = users.find((value) => {
        if (
            (email.value === value.email || email.value === value.userName) &&
            password.value === value.password
        ) {
            return true;
        }
    });
    if (user) {
        email.value = "";
        password.value = "";
        localStorage.setItem("loginUser", JSON.stringify(user));
        window.location.replace("./dashboard.html");
    } else {
        showEmailWindow("wrong pass");
    }
};

let logInBtn = document.getElementById("logInBtn");
logInBtn.addEventListener("click", loginUser);
let signInForm = document.getElementById("signInForm");
signInForm.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        loginUser();
    }
});

const showEmailWindow = (desc) => {
    let emailWindow = document.getElementById("emailWindow");
    let windowIcon = document.getElementById("windowIcon");
    let emailErrorDesc = document.getElementById("emailErrorDesc");
    let loginErrorDesc = document.getElementById("loginErrorDesc");
    let passError = document.getElementById("passError");
    let accCreated = document.getElementById("accCreated");
    windowIcon.src = "./assets/danger.png";
    passError.style.display = "none";
    accCreated.style.display = "none";
    emailWindow.style.display = "flex";
    gsap.fromTo(
        "#emailWindow",
        {
            y: -50,
            opacity: 0,
        },
        {
            y: 0,
            opacity: 1,
            ease: "power1.out",
            duration: 0.4,
        }
    );
    console.log(desc);
    if (desc === "emailErrorDesc") {
        emailErrorDesc.style.display = "block";
        loginErrorDesc.style.display = "none";
    } else if (desc === "wrong pass") {
        emailErrorDesc.style.display = "none";
        loginErrorDesc.style.display = "none";
        passError.style.display = "block";
    } else if (desc === "registered") {
        windowIcon.src = "./assets/check.svg";
        accCreated.style.display = "block";
        emailErrorDesc.style.display = "none";
        loginErrorDesc.style.display = "none";
    } else {
        emailErrorDesc.style.display = "none";
        loginErrorDesc.style.display = "block";
    }
    setTimeout(() => {
        gsap.fromTo(
            "#emailWindow",
            {
                y: 0,
                opacity: 1,
            },
            {
                y: -50,
                opacity: 0,
                ease: "power1.out",
                duration: 0.4,
                onComplete: function () {
                    emailWindow.style.display = "none";
                },
            }
        );
    }, 3500);
};
