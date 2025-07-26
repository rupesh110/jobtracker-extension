(async () => {
  const { detectWorkType, saveJobData, observeDomChanges } = await import(chrome.runtime.getURL('helper.js'));

  function extractJobData() {
    const titleEl = document.querySelector('[data-automation="job-detail-title"]');
    const companyEl = document.querySelector('[data-automation="advertiser-name"]');
    const locationEl = document.querySelector('[data-automation="job-detail-location"]');

    if (!titleEl) return null;

    const fullText = document.body.innerText.toLowerCase();

    const job = {
      platform: "Seek",
      url: window.location.href,
      title: titleEl.innerText.trim() || "",
      company: companyEl?.childNodes[0]?.nodeValue.trim() || companyEl?.innerText.trim() || "",
      location: locationEl?.innerText.trim() || "",
      workType: detectWorkType(fullText),
    };

    return job
  }

  // Initial extraction and save
  const initialJob = extractJobData();
  saveJobData(initialJob);

  // Set up MutationObserver with a callback
  observeDomChanges(() => {
    const job = extractJobData();
    saveJobData(job);
  });
})();
