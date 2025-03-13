const loginInfo2 = JSON.parse(window.localStorage.getItem("loginInfo"));

const userProfileName = document.getElementById("userProfileName");

userProfileName.innerHTML = loginInfo2.firstName + " " + loginInfo2.lastName;
