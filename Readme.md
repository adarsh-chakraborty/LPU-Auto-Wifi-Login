
# LPU Auto Wifi Login
This extension saves your wifi credentials and automatically submits them for you on the wifi login page.

## Overview

The LPU Wifi Auto Login Chrome Extension simplifies the process of logging in to the LPU Wifi portal by automatically filling in the username and password fields.

## Features

- (New) Calculates Weekly Total Working Hours on UMS Page.
- Automatic filling of username and password fields.
- Option to disable automatic login using a query parameter.
- Option to forget stored credentials using a query parameter.

## Disclaimer

This extension is an unofficial tool created for personal benefit and is not affiliated with or endorsed by LPU. Any use of this extension is at the user's own risk, and the creators are not responsible for any consequences resulting from its use. The extension is not intended for commercial use or distribution.

---

# How to Install

### Steps:

1. **Clone the Git Repository:**
   - Open a terminal or command prompt.
   - Navigate to the directory where you want to download the extension.
   - Run the following command to clone the Git repository:

     ```bash
     git clone https://github.com/adarsh-chakraborty/LPU-Auto-Wifi-Login.git
     ```

   This command downloads the extension files from the specified Git repository.

   Alternatively, You can just download the repository as zip and extract it somewhere on your computer.

2. **Open Google Chrome:**
   - Open the Google Chrome browser on your computer.

3. **Access Extensions Page:**
   - Type `chrome://extensions/` in the address bar and press Enter. Alternatively, you can go to the Chrome menu (three dots at the top-right corner) -> More tools -> Extensions.

4. **Enable Developer Mode:**
   - In the top-right corner of the extensions page, toggle the "Developer mode" switch to the ON position. This enables the developer features for extensions.

5. **Load Unpacked Extension:**
   - Click the "Load unpacked" button that appears after enabling Developer mode.
   - In the file dialog that opens, navigate to the directory where you cloned the Git repository and select the extension folder. Click "Select Folder."

6. **Verify Installation and Connect to LPU Network:**
   - You should see the extension listed on the extensions page with a unique ID.
   - Connect to LPU Wifi Network.

7. **Test the Extension:**
   - Navigate to the specific URL where you want the extension to run. For this extension, visit "https://internet.lpu.in/24online/webpages/client.jsp".
   - Ensure that the extension is working as expected and you're connected to LPU Wifi Network.


## How to Disable Auto Login

To Temporarly disable automatic login, append the following query parameter to the URL:

- **disableAutoLogin=true:** Disable automatic login. Example: `https://internet.lpu.in/24online/webpages/client.jsp?disableAutoLogin=true`

Or, just remove the extension from chrome.

## How to Remove Stored Credentials

To remove stored credentials, append the following query parameter to the URL:

- **forgetcreds=true:** Remove stored credentials. Example: `https://internet.lpu.in/24online/webpages/client.jsp?forgetcreds=true`

### Notes:

- **Developer Mode Warning:** When you enable developer mode, a warning message appears. This is normal for developer extensions. Be cautious when installing extensions in developer mode, especially if they are from untrusted sources.

- **Update the Extension:** If you make changes to the extension code, you can click the "Reload" button next to the extension on the extensions page to apply the changes.

- **Remove the Extension:** To uninstall the extension, simply go to the extensions page (`chrome://extensions/`), find the extension, and click the "Remove" button.

By following these steps, you should be able to download the extension from the Git repository, enable developer mode, and load the extension unpacked in Google Chrome.

## Licence

This extension is provided under the terms of the [MIT License](https://opensource.org/licenses/MIT).

**MIT License**

