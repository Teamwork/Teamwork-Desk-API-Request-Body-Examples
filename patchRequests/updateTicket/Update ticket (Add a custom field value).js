// This code sample is an example of how to add a value to a custom field with the update ticket endpoint. 
// This scenario is set for a dropdown custom field which requires the option ids as the value. The value will be populated based on the id added
// If you are adding a value to a string based custom field, then string content should be added as the value
// Endpoint doc: https://apidocs.teamwork.com/docs/desk/v2/tickets/patch-v2-tickets-id-json
const myHeaders = new Headers();
APIKEY = "apiKeyHere";
siteName = "yourSiteName";
ticketId = "13392781";
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + APIKEY);

const raw = JSON.stringify({
  "ticket": {
    "customfields": [
      {
        "id": 272, // Id of the custom field - this is a global id
        "meta": {
          "value": 1613 // Option id for a dropdown custom field - If the custom field is for a srting then add the respective value here instead of an id
        }
      }
    ]
  }
});

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/desk/api/v2/tickets/${ticketId}.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
