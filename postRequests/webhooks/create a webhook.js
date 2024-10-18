const myHeaders = new Headers();
APIKEY = "apiKeyHere"
siteName = "yourSiteName"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer "+APIKEY);

const raw = JSON.stringify({
  "webhookendpoint": {
    "url": "https://sampleurl/dev",
    "token": "redacted",
    "allInboxes": false,// Setting true here will override the webhookendpointinboxes array
    "allEvents": false,// Setting true here will override the webhookendpointevents array
    "contentType": "application/json",
    "state": "active"
  },
  "included": {
    "webhookendpointevents": [
      {
        "code": "ticket.created"
      },
      {
        "code": "ticket.customer.reply"
      }
    ],// Add and remove events as required from the array
    "webhookendpointinboxes": [
      {
        "inbox": {
          "id": 10140
        }
    
      },
      {
        "inbox": {
          "id": 10064
        }
    
      }
    ]// Add and remove inboxes as required from the array
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/desk/api/v2/webhookendpoints.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
