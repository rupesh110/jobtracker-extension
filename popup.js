let currentJob = null;
console.log("Popup script loaded");

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("currentJob", (result) => {
    console.log("Got currentJob from storage:", result.currentJob);

    if (result.currentJob) {
      currentJob = result.currentJob;
      displayJob(currentJob);
      
    } else {
      document.getElementById("job-details").innerText = "No job data found.";
    }
  });


  document.getElementById("save").addEventListener("click", () => {
    if (!currentJob) {
      alert("No job data available to save.");
      return;
    }

    chrome.storage.local.get("spreadsheetId", (result) => {
      const payload = {
        ...currentJob,
        spreadsheetId: result.spreadsheetId || "UNKNOWN"
      };
      alert("Payload:", JSON.stringify(payload));

      fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(res => {
            console.log("Fetch completed, status:", res.status);
            if (!res.ok) {
              throw new Error("Network response was not ok: " + res.status);
            }
            return res.json();
          })
          .then(data => {
            console.log("Response data:", data);
            alert("Job saved successfully!");
          })
          .catch(err => {
            console.error("Fetch error:", err);
            alert("Failed to save job. Check console.");
          });
    });
  });
});

function displayJob(job) {
  const jobDetailsHtml = `
    <p><strong>Title:</strong> ${job.title}</p>
    <p><strong>Company:</strong> ${job.company}</p>
    <p><strong>Location:</strong> ${job.location}</p>
    <p><strong>Platform:</strong> ${job.platform}</p>
    <p><strong>WorkType:</strong> ${job.workType}</p>
    <p><strong>URL:</strong> <a href="${job.url}" target="_blank">${job.url}</a></p>
  `;
  document.getElementById("job-details").innerHTML = jobDetailsHtml;
}
