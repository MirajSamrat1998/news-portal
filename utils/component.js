const nb_nab = document.getElementById("nb_nab");
const userInfo = JSON.parse(window.localStorage.getItem("userInfo")) || [];
// Check if user is logged in
const loginInfo = JSON.parse(window.localStorage.getItem("loginInfo"));

const url = "http://127.0.0.1:5500"

// Check if user is admin
if ( window.location.href === `${url}/pages/post.html`) {
  if (loginInfo?.role !== "admin" || loginInfo === null ) {
    alert("Access Denied: Admins only");
    window.location.href = url; // Redirect to homepage or another page
  }
}

const postArray = JSON.parse(window.localStorage.getItem("postArray")) || [];

// Dynamically generate navbar items
const navItems = postArray
  .map(
    (navItem) => `<li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">${navItem.newsType.text}</a>
                </li>
  `
  )
  .join("");

// Add the generated items to the navbar
nb_nab.innerHTML = `
  <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div class="container">
      <a class="navbar-brand" href="/">NewsBuzz</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          ${navItems}
        </ul>

        <!-- dashboard -->
        <div class="dashboard_icon_box">
          <i class="bi bi-grid-3x3-gap-fill" id="das_btn"></i>

          <!-- Dashboard sections -->
          <div id="das_sec">
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                alt=""
              />
            </div>

            <div class="menus">
              <ul>
                <a href="/pages/profile.html" style="color: white">
                  <li>Profile</li>
                </a>
                ${
                  loginInfo?.role === "admin"
                    ? `<a href="/pages/post.html" style="color: white">
                        <li>Posts</li>
                      </a>`
                    : ""
                }
                <a href="/pages/setting.html" style="color: white">
                  <li>Setting</li>
                </a>
              </ul>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                class="btn btn-primary m-2"
                id="loginBtn"
              >Login</button>

              <button class="btn btn-danger m-2" id="logOutBtn">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Login</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form onsubmit="loginFunc(event)">
            <div>
              <label for="userID">User ID</label>
              <input class="form-control" type="text" id="userID" />
            </div>
            <div>
              <label for="userPass">Password</label>
              <input class="form-control" type="password" id="userPass" />
            </div>
            <button type="submit" class="btn btn-primary mt-2">Login</button>
          </form>
        </div>
        <div class="modal-footer">
          <a class="btn btn-secondary" href="/signup.html"> Sign UP </a>
        </div>
      </div>
    </div>
  </div>
`;

const logOutBtn = document.getElementById("logOutBtn");
const das_sec = document.getElementById("das_sec");

das_sec.style.display = "none";
das_btn.addEventListener("click", () => {
  if (das_sec.style.display === "none") {
    das_sec.style.display = "block";
  } else {
    das_sec.style.display = "none";
  }
});

const loginBtn = document.getElementById("loginBtn");

// Login button text
loginBtn.innerHTML = "Login";

console.log(loginInfo);

if (loginInfo?.isLoggedIn) {
  loginBtn.style.display = "none";
} else if (loginInfo === null) {
  logOutBtn.style.display = "none";
}

// Login function
function loginFunc(event) {
  event.preventDefault();

  const userID = document.getElementById("userID");
  const userPass = document.getElementById("userPass");

  // Corrected the find function with the return statement
  const loginInfo = userInfo.find((user) => {
    return (
      user.singUpUserID.toLowerCase() === userID.value.toLowerCase() &&
      user.singUpUserPass === userPass.value
    );
  });

  if (loginInfo) {
    loginInfo.isLoggedIn = true;
    window.localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
    window.location.replace("/");
  } else {
    alert("Invalid login credentials.");
  }
}

// Logout function

logOutBtn.addEventListener("click", () => {
  window.localStorage.removeItem("loginInfo");
  window.location.replace("/");
});
