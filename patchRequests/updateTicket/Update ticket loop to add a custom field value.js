// This code sample is an example of how to add a value to a dropdown custom field with the update ticket endpoint. 
// This scenario is set for a dropdown custom field which requires the option ids as the value for the request body. The value will be populated in the UI based on the id applied
// If you are adding a value to a string based custom field, then string content should be added as the value in the request body which will populate the same value in the UI.
// For the loop functionality of this dropdown custom field value scenario: 
// - an array of ticket Ids that need to be updated will be required
// - an array of value Ids to represent the option value will be required 
// Endpoint doc: https://apidocs.teamwork.com/docs/desk/v2/tickets/patch-v2-tickets-id-json
// Endpoint doc to get all custom fields: https://apidocs.teamwork.com/docs/desk/v2/custom-fields/get-v2-customfields-json
// Endpoint doc to capture dropdown custom field option ids: https://apidocs.teamwork.com/docs/desk/v2/custom-fields/get-v2-customfields-id-json

// PLEASE TEST THIS SCRIPT ON A SMALL COHORT OF TICKETS BEFORE EXPANDING TO A LARGER COHORT

const myHeaders = new Headers();
APIKEY = "apiKeyHere";
siteName = "yourSiteName";
ticketIds = ["13391507","15471490"]; // Array list of ticket ids that need to be updated
valueIds = [1613, 1626]; // Array list of dropdown option value ids - the value ids are required for the request body
// Note that this code sample will update a single ticket with the option value for a single custom field and then move to the next ticket id and resective valueId mathcing the current index
// ie: ticket Id: 13391507 will use the following valueId: 1613 and ticket id: 15471490 will use the following valueId: 1626
var customfieldId = 0, // Id of the custom field - this is a global id - use https://apidocs.teamwork.com/docs/desk/v2/custom-fields/get-v2-customfields-json to get the id
var ticketId = 0;
var valueId = 0; // Option id for a dropdown custom field - use https://apidocs.teamwork.com/docs/desk/v2/custom-fields/get-v2-customfields-id-json to get the option ids
var currentIndex = 0;
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + APIKEY);

ticketIds.forEach(ticket => {
    ticketId = ticket;
    //console.log(`Ticket Id: ${ticketId} and value Id: ${valueIds[currentIndex]}`)
    valueId = valueIds[currentIndex]
    currentIndex++

const raw = JSON.stringify({
  "ticket": {
    "customfields": [
      {
        "id": customfieldId,
        "meta": {
          "value": valueId 
        }
      }
    ]
  }
});

  const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
//console.log(requestOptions)

fetch(`https://${siteName}.teamwork.com/desk/api/v2/tickets/${ticketId}.json`, requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
});
