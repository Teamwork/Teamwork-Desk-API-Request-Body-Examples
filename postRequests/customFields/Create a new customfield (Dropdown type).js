// This code sample will add a new custom field > Dropdown type in this case
const myHeaders = new Headers();
APIKEY = "apiKeyHere"
siteName = "yourSiteName"
customFieldName = customFieldNameHere
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + APIKEY);

const raw = JSON.stringify({
  "agentLabel": customFieldName,
  "kind": "dropdown",
  "options": [
    {
      "name": "Option 1",
      "displayOrder": 0
    },
    {
      "name": "Option 2",
      "displayOrder": 1
    }
  ],
  "agentRequired": true,
  "enabled": true,
  "apps": [
    {
      "name": "portal",
      "canViewData": true,
      "canEditData": true
    },
    {
      "name": "contact form",
      "canViewData": true,
      "canEditData": true
    },
    {
      "name": "helpdocs",
      "canViewData": true,
      "canEditData": true
    }
  ],
  "description": "Paint color for car",
  "inboxes": [
    36018,
    36029
  ],
  "customerLabel": "Paint Color",
  "addToNewInboxes": true,
  "customerRequired": true
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/desk/v1/customfields.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
