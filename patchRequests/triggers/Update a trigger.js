const myHeaders = new Headers();
APIKEY = "apiKeyHere"
siteName = "yourSiteName"
triggerId = "triggerIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer "+APIKEY);

const raw = JSON.stringify({
  "trigger": {
    "agentHasAccess": true,
    "description": "Assign to user if the following customers create a ticket\nAdd new tags to ticket",
    "isShared": true,
    "name": "Email domain conditions - Revised!",
    "state": "active",
    "type": "Automatic",
    "addToNewInboxes": false
  },
  "included": {//The included object will be empty if there is no change to conditions
    "triggeractions": [
      {
        "id": 29389,
        "type": 5,
        "tags": [
          {
            "id": 361059
          }
        ]
      },// Action to add new tag by id
      {
        "id": 29390,
        "type": 4,
        "priority": null,
        "user": {
          "id": 328568
        }
      }// Action to assign to user by id
    ],//Actions array to be empty if there are no updates
    "conditions": [
      {
        "id": 45206,
        "field": 2,
        "operator": 2,
        "value": "@customer.com",
        "matchRequirement": "ANY"
      },// Meet any condition - customer email does not contain text
      {
        "id": 45208,
        "field": 9,
        "operator": 18,
        "value": "369975",
        "matchRequirement": "ALL"
      },// Meet all Condition - tag > does not contain > selected tag by id
      {
        "id": 45209,
        "field": 4,
        "operator": 4,
        "value": "143617",
        "matchRequirement": "ALL"
      }// Meet all Condition - ticket type > not equal > selected type by id
    ]//Conditions array to be empty if there are no updates
  },
  "applyToExistingTickets": false
});

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/desk/api/v2/triggers/"+triggerId+".json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
