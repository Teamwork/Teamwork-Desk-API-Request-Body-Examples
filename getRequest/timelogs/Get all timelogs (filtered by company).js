// This code sample will make a request to get all timelogs for a specified company on Teamwork Desk
// Additional filters include a date range and the order of the data by ticket id in descending order
const myHeaders = new Headers();
const APIKEY = "apiKeyHere"
const siteName = "yourSiteName" 
var companyId = "companyIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer "+APIKEY);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/desk/api/v2/timelogs.json?pageSize=100&page=1&orderBy=tickets_id&orderMode=DESC&filter={\"$and\":[{\"companies.id\":{\"$in\":[\"${companyId}\"]}},{\"date\":{\"$gte\":\"2025-02-01T00:00:00.000Z\"}},{\"date\":{\"$lte\":\"2026-01-31T23:59:59.999Z\"}}]}`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
