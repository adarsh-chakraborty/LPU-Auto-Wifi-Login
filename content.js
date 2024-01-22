// content.js
document.addEventListener("DOMContentLoaded", function () {
  console.log("LPUAWL");
  // Check if the current page matches your criteria (e.g., specific URL)
  if (window.location.href.includes("internet.lpu.in/24online/webpages")) {
    // Find input boxes and remove "@lpu.co.in"
    const username = document.querySelector("input[name='username']");
    const password = document.querySelector("input[name='password']");
    const loginbtn = document.querySelector("#loginbtn");
    const checkbox = document.querySelector("#agreepolicy");

    username.value = ""; // Username
    password.value = ""; // Password

    checkbox.click();
    loginbtn.click();
  }
});
