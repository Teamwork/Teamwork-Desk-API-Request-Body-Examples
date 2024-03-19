const myHeaders = new Headers();
APIKEY = "apiKeyHere"
siteName = "yourSiteName"
inboxId = inboxIdHere//integer
agentId = agentIdHere//integer
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer "+APIKEY);

const raw = JSON.stringify({
  "message": "Content created via API",
  "subject": "Ticket created via API",
  "inbox": {
    "id": inboxId
  },
  "customer": {
    "email": "marc.cashman@teamwork.com"
  },
  "agent": {
    "id": agentId
  },//Remove agent object to leave ticket unassigned
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/desk/api/v2/tickets.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
