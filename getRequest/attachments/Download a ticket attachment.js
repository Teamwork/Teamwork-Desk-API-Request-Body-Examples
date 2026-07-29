// AIM: Download a single attachement from a ticket
// Endpoint: https://${siteName}.teamwork.com/desk/api/v2/tickets/${ticketId}/files/${fileId}/download
// Endpoint document: https://apidocs.teamwork.com/docs/desk/v2/tickets/get-v2-tickets-ticket-id-files-id-download
const myHeaders = new Headers();
APIKEY = "apiKeyHere"
siteName = "yourSiteName"
ticketId = "ticketIdHere" 
fileId = "fileIdHere"
myHeaders.append("Content-Type", `application/json`);
myHeaders.append("Authorization", `Bearer ${APIKEY}`);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/desk/api/v2/tickets/${ticketId}/files/${fileId}/download`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
