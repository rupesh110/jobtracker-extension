(function () {
  function extractLinkedInData() {
    const titleEl = document.querySelector('.job-details-jobs-unified-top-card__job-title');
    const companyAnchor = document.querySelector('.job-details-jobs-unified-top-card__company-name a');
    const companySpanFallback = document.querySelector('.job-details-jobs-unified-top-card__company-name');
    const companyFallbackSpan = document.querySelector('.job-details-jobs-unified-top-card__primary-description span span');
    const locationEl = document.querySelector('.job-details-jobs-unified-top-card__tertiary-description-container span.tvm__text--low-emphasis');
    const fullText = document.body.innerText.toLowerCase();

    return {
      title: titleEl?.innerText?.trim() || 'N/A',
      company:
        companyAnchor?.innerText?.trim() ||
        companyFallbackSpan?.innerText?.trim() ||
        companySpanFallback?.innerText?.trim() ||
        'N/A',
      location: locationEl?.innerText?.trim() || 'N/A',
      platform: 'LinkedIn',
      url: window.location.href,
      workType: window.detectWorkType(fullText)
    };
  }

  let debounceTimeout;
  function debouncedSaveJob() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      const job = extractLinkedInData();

      if (job.title !== 'N/A' && job.company !== 'N/A') {
        window.saveJobData(job);
        console.log("Job data updated and saved:", job);
      } else {
        console.log("Waiting for job data to load...");
      }
    }, 4000);
  }

  setTimeout(debouncedSaveJob, 4000);
  window.observeDomChanges(debouncedSaveJob);
})();
