(() => {
  const detectWorkType = window.detectWorkType;
  const saveJobData = window.saveJobData;
  const observeDomChanges = window.observeDomChanges;

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
    return job;
  }

  const initialJob = extractJobData();
  saveJobData(initialJob);


  observeDomChanges(() => {
    const job = extractJobData();
    saveJobData(job);
  });
})();
