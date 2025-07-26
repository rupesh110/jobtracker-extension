let currentJob = null;

document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get("currentJob", (result) => {
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

    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxgCJpRN9nH6MOGTGLs0ora1Kgv_sxojF5OhiWpPzGKyOUqFjnkEZ3APB80OOl0y1na/exec";

    console.log("Before fetch", JSON.stringify(currentJob));

    fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentJob)
    })
      .then(res => res.json())  
      .then(data => {
        console.log("Received from API:", data);

        if (data.result === "success") {
          alert("Job saved successfully!");
        } else {
          alert("Saving job failed!");
        }
      })
      .catch(err => {
        console.error("Error calling API:", err);
      });
  });
});

function displayJob(job) {
  const jobDetailsHtml = `
    <p><strong>Title:</strong> ${job.title}</p>
    <p><strong>Company:</strong> ${job.company}</p>
    <p><strong>Location:</strong> ${job.location}</p>
    <p><strong>Platform:</strong> ${job.platform}</p>
    <p><strong>URL:</strong> <a href="${job.url}" target="_blank">${job.url}</a></p>
  `;
  document.getElementById("job-details").innerHTML = jobDetailsHtml;
}
