document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const pageMatch = window.location.href.includes("internet.lpu.in/24online/webpages");
  const autoLoginDisabled = urlParams.get("disableAutoLogin") === "true";
  const forgetCreds = urlParams.get("forgetcreds") === "true";

  if (!pageMatch || autoLoginDisabled) return;

  if (forgetCreds) {
    chrome.storage.sync.remove(["username", "password"], () => console.log("Stored credentials removed."));
    return;
  }

  chrome.storage.sync.get(["username", "password"], function (result) {
    const { username, password } = result.username && result.password ? result : promptForCredentials();
    if (username && password) {
      performLoginAction(username, password);
      if (!result.username || !result.password) chrome.storage.sync.set({ username, password });
    }
  });
});

function promptForCredentials() {
  return {
    username: prompt("(Auto Wifi Login) Enter your wifi username:"),
    password: prompt("(Auto Wifi Login) Enter your wifi password:")
  };
}

function performLoginAction(username, password) {
  document.querySelector("input[name='username']").value = username;
  document.querySelector("input[name='password']").value = password;
  document.querySelector("#agreepolicy").click();
  document.querySelector("#loginbtn").click();
}
