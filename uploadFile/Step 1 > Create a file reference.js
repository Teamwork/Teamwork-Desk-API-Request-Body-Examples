// This is the first step which creates the file reference. 
// The payload returned from this request is required for the second step
// API Refernce document: https://apidocs.teamwork.com/docs/desk/v2/file/post-v2-files-ref-json
const myHeaders = new Headers();
APIKEY = "apiKeyHere"
SITENAME = "yourSiteName"
FILENAME = "yourFileName"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer "+APIKEY);

const raw = JSON.stringify({
  "type": "attachment",
  "filename": FILENAME,
  "mimeType": "image/png",
  "disposition": "attachment"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+SITENAME+".teamwork.com/desk/api/v2/files/ref.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
