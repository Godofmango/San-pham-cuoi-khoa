const postForm = document.getElementById("post-form");

postForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = postForm.title.value;
  const content = postForm.content.value;
  const username = localStorage.getItem("username");

  function validate() {
    if (title === "" || content === "") {
      alert("Vui lòng điền đủ thông tin!");
      return false;
    }
    return true;
  }

  if (validate()) {
    async function postArticle() {
      try {
        await db.collection("posts").add({
          title,
          content,
          username,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        alert("Đăng bài thành công!");
        window.location.href = "index.html";
      } catch (err) {
        alert("Đã xảy ra lỗi: " + err.message);
      }
    }
    postArticle();
  }
});
