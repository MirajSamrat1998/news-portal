// DOM Elements
const m_top_news = document.getElementById("m_top_news");
const sliderBody = document.getElementById("sliderBody");

// Top news
const allPost = JSON.parse(window.localStorage.getItem("postArray")) || [];
const loginData = JSON.parse(window.localStorage.getItem("loginInfo")) || {};

// Initialize like counts, comments, and likedBy if they don’t exist
allPost.forEach((post) => {
  post.likeCount = post.likeCount || { totalLike: 0 };
  post.likedBy = post.likedBy || [];
  post.comments = post.comments || [];
});

// Display Slider Body (first three posts)
allPost.slice(0, 3).forEach((sliderPost) => {
  sliderBody.innerHTML += `
    <div class="carousel-item m_heding active" data-bs-interval="2000">
      <img src="${sliderPost.imageLink}" class="d-block w-100" alt="..."/>
      <div class="breking_news_title">
        <h1>${sliderPost.title}</h1>
        <p class="card-text text-center">${sliderPost.description.slice(0, 200)}...</p>
      </div>
    </div>`;
});

// Function to display comments for a specific post
function displayComments(postIndex) {
  const commentsContainer = document.getElementById(`commentsContainer${postIndex}`);
  commentsContainer.innerHTML = allPost[postIndex].comments
    .map(
      (comment) => `<div class="comment"><strong>${comment.userName}:</strong> ${comment.text}</div>`
    )
    .join("");
}

// Function to handle comment submission
function submitComment(event, postIndex) {
  event.preventDefault();
  const commentInput = document.getElementById(`commentInput${postIndex}`);
  const commentText = commentInput.value.trim();

  if (!loginData.singUpUserID) return alert("Please log in to comment.");
  if (!commentText) return alert("Please enter a comment.");

  const userName = `${loginData.firstName} ${loginData.lastName}`;
  allPost[postIndex].comments.push({ userName, text: commentText });
  localStorage.setItem("postArray", JSON.stringify(allPost));

  // Clear input and refresh comments display
  commentInput.value = "";
  displayComments(postIndex);

  // Update the comment count
  document.getElementById(`commentCount${postIndex}`).innerText = allPost[postIndex].comments.length;
}

// Function to toggle expanded description view
function toggleDescription(index) {
  const initDec = document.getElementById(`initDec${index}`);
  const fullDesc = document.getElementById(`navbarSupportedContent${index}`);
  const isExpanded = fullDesc.style.display === "block";

  initDec.style.maxHeight = isExpanded ? "60px" : "0";
  fullDesc.style.display = isExpanded ? "none" : "block";
  document.getElementById(`toggleButton${index}`).innerText = isExpanded
    ? "Read More"
    : "Read Less";
}

// Display top news with comments and like functionality
allPost.forEach((news, index) => {
  m_top_news.innerHTML += `
    <div class="card m_top_news_card mb-3">
      <div class="card-body">
        <img src="${news.imageLink || ""}" class="card-img-top" alt="..." />
        <h5 class="card-title">${news.title || "Title"}</h5>
        <p class="card-text collapsed-content" id="initDec${index}" style="max-height: 60px;">${news.description.slice(0, 200)}...</p>
        <div class="collapse-content" id="navbarSupportedContent${index}" style="display: none;">
          <p class="card-text expanded-content">${news.description}</p>
        </div>
        <div class="d-flex gap-3">
          <button class="btn btn-info" type="button" id="toggleButton${index}" onclick="toggleDescription(${index})">Read More</button>
          <button class="btn btn-secondary" id="postLike${index}"><i class="bi bi-hand-thumbs-up"></i> ${news.likeCount.totalLike}</button>
          <button class="btn btn-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${index}">
            <i class="bi bi-chat"></i> <span id="commentCount${index}">${news.comments.length}</span>
          </button>
        </div>
      </div>
      <div class="collapse" id="collapseExample${index}">
        <div class="card card-body mb-3">
          <form onsubmit="submitComment(event, ${index})">
            <label for="commentInput${index}" class="form-label">Comment</label>
            <div class="d-flex gap-3">
              <input type="text" class="form-control" id="commentInput${index}" placeholder="Enter your comment">
              <button class="btn btn-primary" type="submit"><i class="bi bi-send-arrow-up-fill"></i></button>
            </div>
          </form>
          <div id="commentsContainer${index}" class="comments-container mt-3"></div>
        </div>
      </div>
    </div>`;

  // Display existing comments for the post
  displayComments(index);

  // Handle like functionality
  const postLikeBtn = document.getElementById(`postLike${index}`);
  postLikeBtn.addEventListener("click", () => {
    if (!loginData.singUpUserID) return alert("Please log in to like this post.");
    
    // Check if the user has already liked the post
    if (allPost[index].likedBy.includes(loginData.singUpUserID)) {
      return alert("You can only like this post once.");
    }

    // Add the user to the likedBy array and increment like count
    allPost[index].likedBy.push(loginData.singUpUserID);
    allPost[index].likeCount.totalLike++;

    // Immediately update the like button's displayed count
    postLikeBtn.innerHTML = `<i class="bi bi-hand-thumbs-up"></i> ${allPost[index].likeCount.totalLike}`;
    
    // Persist the updated post data to localStorage
    localStorage.setItem("postArray", JSON.stringify(allPost));
  });
});