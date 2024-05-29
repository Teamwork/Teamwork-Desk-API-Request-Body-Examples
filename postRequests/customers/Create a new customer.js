const myHeaders = new Headers();
APIKEY = "apiKeyHere"
siteName = "yourSiteName"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer "+APIKEY);

const raw = JSON.stringify({
  "customer": {
    "firstName": "Joe",
    "lastName": "Soap",
    "jobTitle": "Software Developer",
    "phone": "123456789",
    "mobile": "987654321",
    "address": "Teamwork Campus One, Blackpool Retail Park, Blackpool, Cork, T23 F902, Ireland",
    "avatarURL": "",
    "alternativeEmails": [
      "sales@teamwork.com"
    ]
  },
  "included": {
    "companies": [
      {
        "id": 16,
        "delete": false
      }
    ],
    "contacts": [
      {
        "value": "support12345@teamwork.com",
        "type": "email",
        "isMain": true
      },
      {
        "value": "@teamwork",
        "type": "twitter",
        "isMain": false
      },
      {
        "value": "https://www.facebook.com/TeamworkHQ/",
        "type": "facebook",
        "isMain": false
      },
      {
        "value": "https://www.linkedin.com/company/teamwork-com/about/",
        "type": "linkedin",
        "isMain": false
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

fetch("https://"+siteName+".teamwork.com/desk/api/v2/customers.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
