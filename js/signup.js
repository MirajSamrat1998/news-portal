// signup.js

// Function to handle form submission
function submitSignUp(event) {
    event.preventDefault(); // Prevent default form submission
  
    // Get form values
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const userID = document.getElementById("singUpUserID").value;
    const password = document.getElementById("singUpUserPass").value;
  
    // Define a new user object with default properties
    const newUser = {
      firstName,
      lastName,
      email,
      singUpUserID:userID,
      singUpUserPass:password,
      role: "admin",         // Default role
      isLoggedIn: false       // Default login status
    };
  
    // Retrieve existing users from localStorage, or initialize an empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check if the user ID already exists
    const existingUser = users.find(user => user.userID === userID);
    if (existingUser) {
      alert("User ID already exists. Please choose a different User ID.");
      return;
    }
  
    // Add the new user to the array and save back to localStorage
    users.push(newUser);
    localStorage.setItem("userInfo", JSON.stringify(users));
  
    // Alert success and reset the form
    alert("Signup successful! You can now log in.");
    document.getElementById("signUpForm").reset();
  }
  