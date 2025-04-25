// this code sample will create an inbox with basicx information
// Inbox name, inbox email address and user access based on the user id
const myHeaders = new Headers();
APIKEY = "apiKeyHere"
siteName = "yourSiteName"
inboxName = "inboxNameHere"
inboxLocalPart = "inboxLocalPartHere"// the local part is a code name created based on the inbox name with out spaces and capatilization
inboxEmail = "inboxEmailHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${APIKEY}`);

const raw = JSON.stringify({
  "inbox": {
    "name": inboxName,
    "localPart": inboxLocalPart,
    "email": inboxEmail,
    "users": [
      {
        "id": 238860
      },
      {
        "id": 247628
      },
      {
        "id": 250388
      }
    ]
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`https://{siteName}.teamwork.com/desk/api/v2/inboxes.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
