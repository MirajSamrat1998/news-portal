// Assuming allPost is already stored in localStorage and retrieved correctly
let allPost = JSON.parse(window.localStorage.getItem("postArray")) || [];

// Grab form inputs and DOM elements
const exampleFormControlInput1 = document.getElementById("exampleFormControlInput1");
const exampleFormControlTextarea1 = document.getElementById("exampleFormControlTextarea1");
const exampleFormControlInput2 = document.getElementById("exampleFormControlInput2");
const newsType = document.getElementById("newsType");
const showPost = document.getElementById("showPost");

// Function to render posts
function renderPosts() {
  showPost.innerHTML = ""; // Clear previous posts
  allPost.forEach((post, index) => {
    showPost.innerHTML += `
      <div class="col">
        <div class="card mb-3" style="width: 18rem;">
          <div class="card-body">
             <img src="${post.imageLink ? post.imageLink : ""}" class="card-img-top" alt="..."/>
            <h5 class="card-title">${post.title ? post.title : ""}</h5>
            <p class="card-text">
              ${post.description ? post.description.slice(0, 50) : ""}...
            </p>
            <button class="btn btn-danger" onclick="deletePost(${index})">Delete</button>
            <button class="btn btn-info" onclick="editPost(${index})">Edit</button>
          </div>
        </div>
      </div>
      `;
  });
}

// Variable to track if we are editing
let isEditing = false;
let editIndex = null; // Store the index of the post being edited

// EDIT POST
function editPost(index) {
  const post = allPost[index];

  // Populate the modal fields with the existing post data
  exampleFormControlInput1.value = post.title;
  exampleFormControlTextarea1.value = post.description;
  newsType.value = post.newsType.id;
  exampleFormControlInput2.value = post.imageLink;

  // Mark as editing
  isEditing = true;
  editIndex = index;

  // Show the modal
  let myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"), {
    keyboard: false,
  });
  myModal.show();
}

// UPDATE POST
function updatePost() {
  // Update the post object in the array
  allPost[editIndex] = {
    title: exampleFormControlInput1.value,
    description: exampleFormControlTextarea1.value,
    imageLink: exampleFormControlInput2.value,
    newsType: {
      id: newsType.value,
      text: newsType.options[newsType.selectedIndex].text,
    },
  };

  // Update localStorage
  window.localStorage.setItem("postArray", JSON.stringify(allPost));

  // Close the modal
  let myModalEl = document.getElementById("staticBackdrop");
  let modal = bootstrap.Modal.getInstance(myModalEl);
  modal.hide();

  // Re-render the posts and reset editing
  renderPosts();
  resetForm();
}

// DELETE POST
function deletePost(index) {
  allPost.splice(index, 1); // Remove the post from array
  window.localStorage.setItem("postArray", JSON.stringify(allPost)); // Update localStorage
  renderPosts(); // Re-render the posts
}

// CREATE NEW POST
function postSubmit(event) {

  if (isEditing) {
    updatePost(); // If we are editing, call updatePost instead
  } else {
    // Create a new post
    const post = {
      title: exampleFormControlInput1.value,
      description: exampleFormControlTextarea1.value,
      imageLink: exampleFormControlInput2.value,
      newsType: {
        id: newsType.value,
        text: newsType.options[newsType.selectedIndex].text,
      },
    };

    allPost.push(post);

    window.localStorage.setItem("postArray", JSON.stringify(allPost)); // Save new post
    renderPosts(); // Re-render posts after adding new one
    resetForm(); // Reset the form
  }
}

// Reset the form for new post creation
function resetForm() {
  // Reset input fields
  exampleFormControlInput1.value = "";
  exampleFormControlTextarea1.value = "";
  exampleFormControlInput2.value = "";
  newsType.value = "News"; // Default to News or any other default

  // Reset the editing flags
  isEditing = false;
  editIndex = null;

  // Set form's onsubmit back to create mode
  document.querySelector("form").onsubmit = postSubmit;
}

// Initial render of posts
renderPosts();

// Set form's onsubmit to postSubmit initially
document.querySelector("form").onsubmit = postSubmit;