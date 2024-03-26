document.addEventListener("DOMContentLoaded", function () {
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap';
  document.head.appendChild(link);
  document.body.style.fontFamily = 'Poppins, sans-serif';
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
    appendTotalHours();
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

function calculateWorkingHours(inTime, outTime) {
  if (inTime === 'X') return 0;
  const inDate = new Date('2000-01-01 ' + inTime);
  let outDate;
  
  if (outTime === 'X') {
    outDate = new Date('2000-01-01 17:00');
  } else {
    outDate = new Date('2000-01-01 ' + outTime);
  }

  // Working hours starts at 9AM
  if (inDate.getHours() < 9) {
    inDate.setHours(9, 0, 0); 
  }

  const diff = outDate - inDate; 
  const hours = diff / (1000 * 60 * 60); 
  return hours;
}

function convertHoursToHoursAndMinutes(hours) {
  let totalMinutes = hours * 60;
  let hoursComponent = Math.floor(totalMinutes / 60);
  let minutesComponent = Math.round(totalMinutes % 60);

  let str1 = `${hoursComponent} ${hoursComponent === 1 ? 'hour' : 'hours'} and ${minutesComponent} ${minutesComponent === 1 ? 'minute' : 'minutes'}`;
  return str1
}


function appendTotalHours() {
  const table = document.getElementById('ctl00_ContentPlaceHolder1_gvAttendance');
  if (!table) return; // Table not found, exit function

  let weekTotal = 0;
  let currentWeek = 0;
  let sundayFound = false;

  // Iterate through rows
  for (let i = 1; i < table.rows.length; i++) { 
    const row = table.rows[i];
    if (!row || row.cells.length < 4) continue; 

    const status = row.cells[1].textContent.trim(); 
    const inTime = row.cells[2].textContent.trim(); 
    const outTime = row.cells[3].textContent.trim(); 
    
    if (status && inTime && outTime) {
      if (inTime !== 'X') {
        const hoursWorked = calculateWorkingHours(inTime, outTime); 
        weekTotal += hoursWorked; 
      }

      if (status === 'Sunday') {
        sundayFound = true;
      }

      if (sundayFound || i === table.rows.length - 1) { 
        currentWeek++;
        const formatHour = convertHoursToHoursAndMinutes(weekTotal);
        row.insertAdjacentHTML('afterend', `<tr style="font-weight: 700; background-color: #f7d291; border: 2px solid #ff6b6b; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 10px; text-align: center; font-family: 'Poppins', sans-serif; color: #333;"><td colspan="8">Total Working Hours for Week ${currentWeek}:- ${formatHour}</td></tr>`);
        weekTotal = 0; 
        sundayFound = false; 
      }
    } else {
      console.error(`Missing data in row ${i}`);
    }
  }
}



