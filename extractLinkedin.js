

function extractLinkedInJobData() {
  const titleEl = document.querySelector('.topcard__title') || document.querySelector('h1');
  console.log(titleEl);
  alert(titleEl)

  if (titleEl) {
    console.log("Job Title:", titleEl.innerText.trim());
  } else {
    console.log("Job title element not found.");
  }
}


setTimeout(extractLinkedInJobData, 2000);