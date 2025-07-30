
function detectWorkType(text) {
  if (text.includes("remote") || text.includes("work from home") || text.includes("wfh")) {
    return "Remote";
  } else if (
    text.includes("hybrid") ||
    text.includes("2 days office") ||
    text.includes("3 days remote") ||
    text.includes("split week")
  ) {
    return "Hybrid";
  } else if (
    text.includes("onsite") ||
    text.includes("in-office") ||
    text.includes("at our office") ||
    text.includes("office-based")
  ) {
    return "In-office";
  } else {
    return "Unknown";
  }
}

let saveTimeout;
let lastSavedJob = null;

function saveJobData(job) {
  if (!job) return;

  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    if (JSON.stringify(lastSavedJob) === JSON.stringify(job)) {
      return;
    }

    chrome.storage.local.get("currentJob", (result) => {
      if (JSON.stringify(result.currentJob) !== JSON.stringify(job)) {
        chrome.storage.local.set({ currentJob: job }, () => {
          lastSavedJob = job;
          console.log("Job data updated and saved:", job);
        });
      }
    });
  }, 1000); 
}

function storeSpreadsheetIdOnce(id) {
  chrome.storage.local.get("spreadsheetId", (result) => {
    if (!result.spreadsheetId) {
      chrome.storage.local.set({ spreadsheetId: id }, () => {
        console.log("Spreadsheet ID stored:", id);
      });
    }
  });
}


function observeDomChanges(callback) {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

window.detectWorkType = detectWorkType;
window.saveJobData = saveJobData;
window.observeDomChanges = observeDomChanges;
