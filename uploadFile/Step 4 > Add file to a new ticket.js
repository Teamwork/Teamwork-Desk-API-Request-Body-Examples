// This step can be used once the first three steps for uploading a file have been completed. 
// The file id aquired from step one of the porcess can be used in the files array
// API Refernce document: https://apidocs.teamwork.com/docs/desk/v2/tickets/post-v2-tickets-json
const myHeaders = new Headers();
APIKEY = "apiKeyHere"
SITENAME = "yourSiteName"
FILEID = "yourFileId"
AGENTID = "yourAgentId"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer "+APIKEY);

const raw = JSON.stringify({
  "files": [
    {
      "id": FILEID
    }
  ],
  "bcc": [
    "sample@sample.com"
  ],
  "cc": [
    "example@example.com"
  ],
  "status": { // Replace id with a status id from your site > https://apidocs.teamwork.com/docs/desk/v2/ticket-statuses/get-v2-ticketstatuses-json
    "id": 3
  },
  "agent": {
    "id": AGENTID
  },
  "editMethod": "markdown",
  "priority": { // Replace id with a priority id from your site > https://apidocs.teamwork.com/docs/desk/v2/ticket-priorities/get-v2-ticketpriorities-json
    "id": 20346
  },
  "tags": [ // Replace with tag ids from your site or remove array > https://apidocs.teamwork.com/docs/desk/v2/tags/get-v2-tags-json
    {
      "id": 369976
    },
    {
      "id": 510002
    }
  ],
  "subject": "Adding a file with create a ticket endpoint",
  "source": {
    "id": 2
  },
  "type": {
    "id": 143616 // Replace id with a type id from your site > https://apidocs.teamwork.com/docs/desk/v2/ticket-types/get-v2-tickettypes-json
  },
  "inbox": {
    "id": 10140 // Replace id with an inbox id from your site > https://apidocs.teamwork.com/docs/desk/v2/inboxes/get-v2-inboxes-json
  },
  "customer": {
    "id": 550214, // Replace id with a customer id from your site > https://apidocs.teamwork.com/docs/desk/v2/customers/get-v2-customers-json
    "email": "api@teamwork.com"
  },
  "message": "Hey Marc,\n\nThe best way to test how to add payload information to a new ticket is to open your browser dev tool > network tab and then create a ticket via the UI with all of the information you would like to add via APi in the future. \nFind the ticket POST endpoint > copy the URL and they copy the payload sent with the post.\n\nAll the best.\nMarc<br>--  \n{%user.fullName%}  \n{%mailbox.email%}",
  "notifyCustomer": true,
  "showCC": true
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://" + SITENAME + ".teamwork.com/desk/api/v2/tickets.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
