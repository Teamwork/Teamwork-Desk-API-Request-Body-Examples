const myHeaders = new Headers();
APIKEY = "apiKeyHere"
siteName = "yourSiteName"
agentId = agentIdHere//integer
ticketId = "ticketIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer "+ APIKEY);

const raw = JSON.stringify({
    "bcc": [],
    "cc": [
        "name@domain.com"
    ],
    "files": [],
    "editMethod": "markdown",
    "message": "Hey Peter,\\\n\\\nYes, it is possible to reply to a Teamwork Desk ticket with the [reply to a ticket](https://apidocs.teamwork.com/docs/desk/v2/messages/post-v2-tickets-ticket-id-messages-json) endpoint. \n\\\nIf you have any further questions, please get back to me.\n\\\nMarc\n",
    "threadType": "message",
    "status": {
        "id": 3
    },//Waiting on customer, 1 - Active, 4 - On-Hold, 5 - Solved, 6 - Closed, 7 - Spam
    "agent": {
        "id": agentId
    },
    "isDraft": false,
    "isPinned": false,
    "mentions": []
});

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/desk/api/v2/tickets/"+ticketId+"/messages.json", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
