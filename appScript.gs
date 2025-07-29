function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  const data = JSON.parse(e.postData.contents);

  const allowedStatuses = ["Just Applied", "Shortlisted", "Interviewed", "Rejected"];
  const status = allowedStatuses.includes(data.status) ? data.status : "Just Applied";

  // Append row data
  const newRow = sheet.appendRow([
    data.title,
    data.company,
    data.location,
    data.platform,
    data.url,
    status,
    data.workType,
    new Date()
  ]);

  // Get the row number of the last appended row
  const lastRow = sheet.getLastRow();

  // Apply dropdown to the "Status" column (assume it's column F => 6)
  const statusCell = sheet.getRange(lastRow, 6); // Column F
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(allowedStatuses)
    .setAllowInvalid(false)
    .build();
  statusCell.setDataValidation(rule);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}


