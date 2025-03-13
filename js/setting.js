// Setting
const firstName_up = document.getElementById("firstName_up");
const lastName_up = document.getElementById("lastName_up");
const email_up = document.getElementById("email_up");
const userID_up = document.getElementById("userID_up");
const userPass_up = document.getElementById("userPass_up");
const showUsers = document.getElementById("showUsers");

const user = JSON.parse(window.localStorage.getItem("userInfo")) || [];

const seLoginInfo = JSON.parse(window.localStorage.getItem("loginInfo"));

const loginUser = user.find((dt) => dt.userID === seLoginInfo.userID);

firstName_up.value = loginUser.firstName;
lastName_up.value = loginUser.lastName;
email_up.value = loginUser.email;
userID_up.value = loginUser.singUpUserID;
userPass_up.value = loginUser.singUpUserPass;

const updateUser = (event) => {


  // Find the index of the logged-in user in the array
  const userIndex = user.findIndex(
    (dt) => dt.singUpUserID === loginUser.singUpUserID
  );

  console.log(userIndex, "userIndex__=-=-");

  // Create an object with the updated user info
  const updatedInfo = {
    firstName: firstName_up.value,
    lastName: lastName_up.value,
    email: email_up.value,
    singUpUserID: userID_up.value,
    singUpUserPass: userPass_up.value,
  };

  // Update the existing user info in the array
  if (userIndex !== -1) {
    user[userIndex] = updatedInfo;

    window.location.replace("/");
  }

  // Save the updated user array back to localStorage
  window.localStorage.setItem("userInfo", JSON.stringify(user));
};

if (seLoginInfo.role === "admin") {
  // Assuming `showUsers` is your target container
  showUsers.innerHTML = `
<h1>All users</h1>
<hr />
<div class="row" id="userCards"></div>
`;

  // Get the `userCards` div where we will append individual user cards
  const userCards = document.getElementById("userCards");

  user.forEach((user) => {
    if (user) {
      userCards.innerHTML += `
    <div class="col-sm-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Name: ${
            user.firstName + " " + user.lastName
          }</h5>
          <h6 class="card-subtitle mb-2 text-muted">Role: ${user.role}</h6>
          <p class="card-text"></p>
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>
    </div>
  `;
    }
  });
}
