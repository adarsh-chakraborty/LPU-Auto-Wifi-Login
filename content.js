document.addEventListener("DOMContentLoaded", function () {
  console.log("LPUAWL");

  // Function to get query parameters from the URL
  function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  // Check if the current page matches your criteria (e.g., specific URL)
  if (!window.location.href.includes("internet.lpu.in/24online/webpages")) {
    return;
  }
  // Check if disableAutoLogin query parameter is present and true
  const autoLoginDisabled = getQueryParam("disableAutoLogin");
  if (autoLoginDisabled && autoLoginDisabled.toLowerCase() === "true") {
    console.log("Auto login is disabled.");
    return; // Do not proceed with auto-login
  }

  // Check if forgetcreds query parameter is present and true
  const forgetCreds = getQueryParam("forgetcreds");
  if (forgetCreds && forgetCreds.toLowerCase() === "true") {
    // Remove stored credentials from Chrome storage
    chrome.storage.sync.remove(["username", "password"], function () {
      console.log("Stored credentials removed.");
    });
    return;
  }
  // Retrieve stored credentials from Chrome storage
  chrome.storage.sync.get(["username", "password"], function (result) {
    const storedUsername = result.username;
    const storedPassword = result.password;
  
    // Check if stored credentials are available
    if (storedUsername && storedPassword) {
      performLoginAction(storedUsername, storedPassword);
    } else {
      // If no stored credentials, prompt the user for credentials
      const { username, password } = promptForCredentials();
  
      // Check if the user provided valid credentials
      if (username.trim() && password.trim()) {
        performLoginAction(username, password);
        chrome.storage.sync.set({ username, password });
      }
    }
  });
});

// Function to prompt the user for username and password
function promptForCredentials() {
  const username = prompt("(Auto Wifi Login) Enter your wifi username:");
  const password = prompt("(Auto Wifi Login) Enter your wifi password:");

  return { username, password };
}


function performLoginAction(username, password) {
  const usernameInput = document.querySelector("input[name='username']");
  const passwordInput = document.querySelector("input[name='password']");
  const loginbtn = document.querySelector("#loginbtn");
  const checkbox = document.querySelector("#agreepolicy");

  // Set the values of the username and password fields
  usernameInput.value = username;
  passwordInput.value = password;

  // Perform the login action
  checkbox.click();
  loginbtn.click();
}