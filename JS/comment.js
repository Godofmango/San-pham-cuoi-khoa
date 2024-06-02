document.addEventListener("DOMContentLoaded", function () {
  const postId = localStorage.getItem("postId");
  const postContainer = document.getElementById("post-container");
  const commentsContainer = document.getElementById("comments-container");
  const commentForm = document.getElementById("comment-form");

  async function loadPost() {
    const postDoc = await db.collection("posts").doc(postId).get();
    const post = postDoc.data();
    postContainer.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p>Posted by: ${post.username} at ${new Date(
      post.timestamp.toDate()
    ).toLocaleString()}</p>
      `;
  }

  async function loadComments() {
    commentsContainer.innerHTML = "";
    const commentsSnapshot = await db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .get();
    commentsSnapshot.forEach((doc) => {
      const comment = doc.data();
      const commentElement = document.createElement("div");
      commentElement.className = "comment";
      commentElement.innerHTML = `
          <p>${comment.content}</p>
          <p>Commented by: ${comment.username} at ${new Date(
        comment.timestamp.toDate()
      ).toLocaleString()}</p>
        `;
      commentsContainer.appendChild(commentElement);
    });
  }

  commentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const content = commentForm.comment.value;
    const username = localStorage.getItem("username");

    function validate() {
      if (content === "") {
        alert("Vui lòng điền nội dung bình luận!");
        return false;
      }
      return true;
    }

    if (validate()) {
      async function postComment() {
        try {
          await db.collection("posts").doc(postId).collection("comments").add({
            content,
            username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
          alert("Bình luận thành công!");
          commentForm.comment.value = "";
          loadComments();
        } catch (err) {
          alert("Đã xảy ra lỗi: " + err.message);
        }
      }
      postComment();
    }
  });

  loadPost();
  loadComments();
});
