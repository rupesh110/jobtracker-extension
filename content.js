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

function extractJobData() {
  const titleEl = document.querySelector('[data-automation="job-detail-title"]');
  const companyEl = document.querySelector('[data-automation="advertiser-name"]');
  const locationEl = document.querySelector('[data-automation="job-detail-location"]');
  
  if (!titleEl) return null; // no job data yet

  const fullText = document.body.innerText.toLowerCase();

  return {
    platform: "Seek",
    url: window.location.href,
    title: titleEl.innerText.trim() || "",
    company: companyEl?.childNodes[0]?.nodeValue.trim() || companyEl?.innerText.trim() || "",
    location: locationEl?.innerText.trim() || "",
    workType: detectWorkType(fullText)
  };
}

function saveJobData(job) {
  if (!job) return;
  chrome.storage.local.get("currentJob", (result) => {
    if (JSON.stringify(result.currentJob) !== JSON.stringify(job)) {
      chrome.storage.local.set({ currentJob: job }, () => {
        console.log("Job data updated and saved:", job);
      });
    }
  });
}

// Initial extraction and save
const initialJob = extractJobData();
saveJobData(initialJob);

// Set up MutationObserver to detect DOM changes and update job data
const targetNode = document.body;
const config = { childList: true, subtree: true };

const callback = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' || mutation.type === 'subtree') {
      const job = extractJobData();
      saveJobData(job);
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
