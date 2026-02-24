// This code sample will make a reqest to the users endpoint and filter by users email address specified
// The filter operators list is included based on https://apidocs.teamwork.com/guides/desk/filtering-api-results
const myHeaders = new Headers();
APIKEY = "apiKeyHere"
siteName = "yourSiteName"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + APIKEY);

/* Available operators for filtering
Eq Operator = "$eq"
Ne Operator = "$ne"
Lt Operator = "$lt"
Lte Operator = "$lte"
Gt Operator = "$gt"
Gte Operator = "$gte"
In Operator = "$in"
Nin Operator = "$nin"
And Operator = "$and"
Or Operator = "$or"
Contains Operator = "$contains" */

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};
var usersEmail = "api@teamwork.com"
var filterOperator = "$eq"

fetch(`https://${siteName}.teamwork.com/desk/api/v2/users.json?filter={"email":{"${filterOperator}":"${usersEmail}"}}`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
