document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const pageMatch = window.location.href.includes("internet.lpu.in/24online/webpages");
  
  if(pageMatch){
    const autoLoginDisabled = urlParams.get("disableAutoLogin") === "true";
    const forgetCreds = urlParams.get("forgetcreds") === "true";

    if (autoLoginDisabled) return;

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
  }

  const ums = window.location.href.includes("ums.lpu.in/lpuums/empattend.aspx");

  if(ums){
    // Function to calculate working hours from 'in' and 'out' times
function calculateWorkingHours(inTime, outTime) {
  if (inTime === 'X' || outTime === 'X') return 0; // If either in or out time is 'X', return 0
  const inDate = new Date('2000-01-01 ' + inTime); // Assuming year, month, day doesn't matter
  const outDate = new Date('2000-01-01 ' + outTime); // Assuming year, month, day doesn't matter
  const diff = outDate - inDate; // Difference in milliseconds
  const hours = diff / (1000 * 60 * 60); // Convert milliseconds to hours
  return hours;
}

// Function to append total working hours to the table
function appendTotalHours() {
  const table = document.getElementById('ctl00_ContentPlaceHolder1_gvAttendance');
  if (!table) return; // Table not found, exit function

  let weekTotal = 0;
  let currentWeek = 0;
  let sundayFound = false;

  // Iterate through rows
  for (let i = 1; i < table.rows.length; i++) { // Start from index 1 to skip header row
    const row = table.rows[i];
    if (!row || row.cells.length < 4) continue; // Skip if row or cells are undefined

    const status = row.cells[1].textContent.trim(); // Get status of the day
    const inTime = row.cells[2].textContent.trim(); // Get 'in' time
    const outTime = row.cells[3].textContent.trim(); // Get 'out' time

    // Check if all necessary data is available
    if (status && inTime && outTime) {
      if (status === 'Working Day') {
        const hoursWorked = calculateWorkingHours(inTime, outTime); // Calculate working hours
        weekTotal += hoursWorked; // Add to weekly total
      }

      if (status === 'Sunday') {
        sundayFound = true;
      }

      if (sundayFound || i === table.rows.length - 1) { // If Sunday is found or end of table is reached
        currentWeek++;
        row.insertAdjacentHTML('afterend', `<tr style="font-weight: 700; background-color: #f7d291; border: 2px solid #ff6b6b; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 10px; text-align: center; font-family: 'Poppins', sans-serif; color: #333;"><td colspan="8">Total Working Hours for Week ${currentWeek}:- ${weekTotal.toFixed(2)} Hours</td></tr>`);
        weekTotal = 0; // Reset weekly total
        sundayFound = false; // Reset Sunday flag
      }
    } else {
      console.error(`Missing data in row ${i}`);
    }
  }
}


  appendTotalHours();
// Append the <link> element to the <head> of the document to load the font
document.head.appendChild(link);
document.body.style.fontFamily = 'Poppins, sans-serif';
  }
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



var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';

