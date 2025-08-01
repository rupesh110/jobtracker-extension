# Job Tracker Chrome Extension

A custom Chrome extension to automate and simplify tracking job applications across LinkedIn and Seek by scraping job data and saving it to Google Sheets via a Google Apps Script backend.

---

## Features

- Automatically extract job details (title, company, location, URL, work type) from LinkedIn and Seek job pages  
- Save job applications directly into a Google Sheet with a single click  
- Backend powered by Google Apps Script (no server required) serving as a lightweight API  
- Supports data validation for application status in Google Sheets  
- Ready for future integration with Trello and Notion for enhanced workflow management  
- Open source and easily customizable  

---

## Demo

![Demo screenshot or GIF here — optional]

---

## Getting Started

### Prerequisites

- Google Account with access to Google Sheets and Google Apps Script  
- Chrome Browser (supports Manifest V3 extensions)  

### Setup

1. **Copy the Google Sheet Template**  
   Use the provided Google Sheets template or create your own with these columns:  
   `Title | Company | Location | Platform | URL | Status | WorkType | Date`  

2. **Deploy Google Apps Script Backend**  
   - Open the Google Sheet  
   - Go to Extensions > Apps Script  
   - Paste the backend code from `backend.js` (see `/scripts`)  
   - Deploy as Web App with access to "Anyone, even anonymous"  
   - Copy the Web App URL  

3. **Configure the Chrome Extension**  
   - Clone this repo  
   - Replace the placeholder in `config.js` with your Web App URL  
   - Load the extension unpacked in Chrome (chrome://extensions) with Developer mode enabled  
   - Test the extension on LinkedIn or Seek job pages  

---

## Usage

- Navigate to a LinkedIn or Seek job listing page  
- Click the extension icon  
- Review the extracted job details  
- Click "Save to Sheet" to store the job in your Google Sheet  

---

## Technical Details

- **Chrome Extension**: Uses Manifest V3, content scripts scrape data, popup UI for confirmation  
- **Backend**: Google Apps Script handles POST requests and appends rows to the Google Sheet  
- **Storage**: Chrome local storage temporarily holds scraped job data before submission  
- **Data Validation**: Enforces job status options in the sheet (`Just Applied`, `Shortlisted`, `Interviewed`, `Rejected`)  

---

## Contribution

Contributions, suggestions, and bug reports are welcome! Feel free to fork the repo and submit a pull request.



---

## Ack
