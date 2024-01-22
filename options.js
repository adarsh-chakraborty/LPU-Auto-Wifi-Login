// options.js
function saveOptions() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    chrome.storage.sync.set({ username, password }, function() {
      console.log('Options saved:', { username, password });
    });
  }
  