const myHeaders = new Headers();
APIKEY = "apiKeyHere"
siteName = "yourSiteName"
taskId = "taskIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer "+APIKEY);

const raw = JSON.stringify({
  "trigger": {
    "agentHasAccess": true,
    "description": "Add me as a follower if the following customers create a ticket",
    "inboxes": [
      {
        "id": 8025
      },
      {
        "id": 9760
      },
      {
        "id": 10064
      }
    ],// Inboxes to include trigger
    "name": "Email domain conditions",
    "state": "active",
    "type": "Automatic"// Can also be set to Manual
  },
  "included": {
    "triggeractions": [
      {
        "id": null,
        "type": 5,
        "tags": [
          {
            "id": 369977
          },
          {
            "id": 395590
          }
        ]
      },// Action that add tags by id
      {
        "id": null,
        "type": 11,
        "user": {
          "id": 238860
        }
      }// Action which added a user as a follower by user id
    ],
    "conditions": [
      {
        "id": null,
        "field": 2,
        "operator": 1,
        "value": "@customer.com",
        "matchRequirement": "ANY"
      },// Meet any condition - customer email contains text
      {
        "id": null,
        "field": 2,
        "operator": 1,
        "value": "@teamwork.com",
        "matchRequirement": "ANY"
      },// Meet any condition - customer email contains text
      {
        "id": null,
        "field": 9,
        "operator": 17,
        "value": "369975",
        "matchRequirement": "ALL"
      },// Meet all Condition - tag > contains > selected tag by id
      {
        "id": null,
        "field": 4,
        "operator": 3,
        "value": "143617",
        "matchRequirement": "ALL"
      }// Meet all Condition - ticket type > equals > selected type by id
    ]
  },
  "applyToExistingTickets": false
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://"+siteName+".teamwork.com/desk/api/v2/triggers.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
