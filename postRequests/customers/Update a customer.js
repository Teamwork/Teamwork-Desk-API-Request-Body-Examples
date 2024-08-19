// https://apidocs.teamwork.com/docs/desk/v2/customers/patch-v2-customers-id-json
const myHeaders = new Headers();
APIKEY = "apiKeyHere"
siteName = "yourSiteName;
customerId = "customerIdHere"; // Customer is the top level entity for your customer
contactId = "contactIdHere"; / Contact is a subset of the customer as a contact method
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer "+APIKEY);

const raw = JSON.stringify({
    "customer": {
        "isReady": true,
        "error": null,
        "firstName": "Joe",
        "lastName": "soap",
        "organization": "",
        "extraData": "",
        "notes": "My notes here",
        "verifiedEmail": false,
        "permission": "own",
        "addMethod": "auto",
        "jobTitle": "Software Dev",
        "phone": "",
        "mobile": "",
        "address": "",
        "externalId": "",
        "avatarURL": "https://" + siteName + ".teamwork.com/desk/images/avatars/animals/cat.png",
        "trusted": false,
        "state": "active",
        "organisationName": "Teamwork",
        "alternativeEmails": []
    },
    "included": {
        "companies": [
            {
                "id": 16
            }
        ],
        "contacts": [
            {
                "value": "support@example.com",
                "isMain": true,
                "type": "email",
                "id": contactId,
                "delete": false
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

fetch("https://" + siteName + ".teamwork.com/desk/api/v2/customers/" + customerId + ".json", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
