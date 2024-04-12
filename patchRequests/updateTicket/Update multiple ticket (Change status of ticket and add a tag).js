const myHeaders = new Headers();
APIKEY = "apiKeyHere"
siteName = "yourSiteName"
ticketStatus = ticketStatusHere// 0 = Active, 3 - Waiting on customer, 4 = On-hold, 5 = Solved, 6 = Closed, 7 = Spam (For other statuses use https://apidocs.teamwork.com/docs/desk/v2/ticket-statuses/get-v2-ticketstatuses-json)
tagId = tagIdHere//For tag ids use https://apidocs.teamwork.com/docs/desk/v2/tags/get-v2-tags-json
ticketId(s) = "ticketIdsHere"// comman separate ticket ids if there is more than one ticket
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer "+APIKEY);

const raw = JSON.stringify({
  "filter_args": {
    "filter": {
      "id": {
        "$in": [
         ticketId(s)
        ]
      }
    },
    "bulkDryExecute": false
  },
  "status": {
    "id": ticketStatus
  }
});

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/desk/api/v2/tickets/update.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
