// This is the third step which will tell Teamwork Desk that the file was uploaded. 
// The payload from the first step will include the file id which is required in the path of the endpoint URL.
// Once this step is completed you can add the file to a ticket > see next step for an example
// API Refernce document: https://apidocs.teamwork.com/docs/desk/v2/file/post-v2-files-ref-json
const myHeaders = new Headers();
APIKEY = "apiKeyHere"
SITENAME = "yourSiteName"
FILEID = "yourFileId"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer "+APIKEY);

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  redirect: "follow"
};

fetch("https://" + SITENAME + ".teamwork.com/desk/api/v2/files/" + FILEID + ".json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
