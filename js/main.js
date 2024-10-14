
const password = document.getElementById("password");
const toggle = document.getElementById("toggle");

function showhide() {
    if (password.type === 'password') {
        password.setAttribute('type', 'text');
        toggle.classList.add("hide")
    } else {
        password.setAttribute('type', 'password');
        toggle.classList.remove("hide")
    }
}

function addData() {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const emailerror = document.getElementById('emailerror');
    const nameerror = document.getElementById('nameerror');
    const passwordError = document.getElementById('passwordError');
    const show = document.getElementById('show');

    const name = nameField.value;
    const email = emailField.value;
    const password = passwordField.value;

    // Validation patterns
    let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let lowerChar = /^(?=.*[a-z])/;
    let upperChar = /^(?=.*[A-Z])/;
    let number = /^(?=.*[0-9])/;
    let specil = /^(?=.*[!@#$%^&*])/;
    let minMax = /^(?=.{8,})/;

    // Email validation
    if (email === '') {
        emailerror.innerText = "Email is required!";
        return;
    } else {
        emailerror.innerText = '';
    }

    // Name validation
    if (name === '') {
        nameerror.innerText = "Name is required!";
        return;
    } else {
        nameerror.innerText = '';
    }

    // Password validation
    if (password === '') {
        passwordError.innerText = "Password is required!";
        return;
    } else if (!lowerChar.test(password)) {
        passwordError.innerText = "Lowercase letter is required!";
        return;
    } else if (!upperChar.test(password)) {
        passwordError.innerText = "Uppercase letter is required!";
        return;
    } else if (!number.test(password)) {
        passwordError.innerText = "Number is required!";
        return;
    } else if (!specil.test(password)) {
        passwordError.innerText = "Special character is required!";
        return;
    } else if (!minMax.test(password)) {
        passwordError.innerText = "Password must be at least 8 characters long!";
        return;
    } else {
        passwordError.innerText = '';
    }

    // If all fields are valid
    if (name && email && password) {
        let users = localStorage.getItem('userDataCollection');
        users = users ? JSON.parse(users) : [];

        // Check if email already exists
        const emailExists = users.some(user => user.email === email);
        if (emailExists) {
            emailerror.innerText = "Email already exists!";
            return;
        }

        // Add new user if email does not exist
        users.push({ name, email, password });
        localStorage.setItem('userDataCollection', JSON.stringify(users));

        // Show success message
        show.innerText = "Data saved successfully!";

        // Clear input fields and error messages
        nameField.value = '';
        emailField.value = '';
        passwordField.value = '';
        emailerror.innerText = '';
        nameerror.innerText = '';
        passwordError.innerText = '';
    } else {
        show.innerText = "Please fill in all fields.";
    }
}


function displayData() {
    let users = localStorage.getItem('userDataCollection');
    users = users ? JSON.parse(users) : [];

    const display = document.getElementById('show');
    display.innerHTML = ''; // Clear previous content

    users.forEach((user, index) => {
        display.innerHTML += `<p>User ${index + 1}: Name: ${user.name}, Email: ${user.email} , Password: ${user.password}
            <button onclick="editData(${index})">Edit</button>
            <button onclick="deleteData(${index})">Delete</button>
        </p>`;
    });

}
// ..................................
function submitData() {
    const userEmailField = document.getElementById('useremail');
    const userPasswordField = document.getElementById('userpassword');

    const userEmail = userEmailField.value;
    const userPassword = userPasswordField.value;

    let users = localStorage.getItem('userDataCollection');
    users = users ? JSON.parse(users) : [];

    // Check if any user has matching email and password
    const userFound = users.find(user => user.email === userEmail && user.password === userPassword);

    if (userFound) {
        document.getElementById('showData').innerText = "Login successful! Welcome, " + userFound.name;
    } else {
        document.getElementById('showData').innerText = "Invalid email or password.";
    }

    // Clear the input fields after attempting to log in
    userEmailField.value = '';
    userPasswordField.value = '';
}
