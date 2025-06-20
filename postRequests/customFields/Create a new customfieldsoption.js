// This code sample will add a new option to an existing drop down custom field based on the custom fields Id
const myHeaders = new Headers();
const APIKEY = "apiKeyHere"
const siteName = "yourSiteName"
const customFieldId = customFieldIdHere //integer
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + APIKEY);

const raw = JSON.stringify({
  "customfieldoption": {
    "customfield": {
      "id": customFieldId
    },
    "name": "Option 3"
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/desk/api/v2/customfieldoptions.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
