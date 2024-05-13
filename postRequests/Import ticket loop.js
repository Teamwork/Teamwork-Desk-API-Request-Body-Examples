// MIT License Copyright (c) 2024 Teamwork.com

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 

//This sample code is an example of how to use the Import tickets into Teamwork Desk. Use the code sample first with your own static data.
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const V1_APIKEY = "V1ApiKeyHere";// This must be a V1 ApiKey - https://support.teamwork.com/desk/profile-settings/generating-an-api-key
const pass = "x";//Leave this as is
myHeaders.append("Authorization", "Basic "+btoa(V1_APIKEY+":"+pass));
const siteName = "yourSiteName"
const ticketId = ["ticketId1","ticketId1"];//Static list of existing ticket Id's that will be used to make sure that tickets are not duplicated in Teamwork Desk
const ticketMetaData = ["agentEmailHere","agentFirstName","agentLastName","userTypeHere","customerEmailHere","customerFirstName","customerLastName","userTypeHere","customerEmailHere","Question","ticketPriorityHere","subjectTitleHere","tag1Here","tag2Here","ticketCreatedDate","ticketUpdatedDate"];//List of ticket meta data for the current ticket - change the agent and customer information as per your ticket data
//Example: const ticketMetaData = ["agent.smith@example.com","Agent","Smith","user","john@example.com","John","Doe","customer","support@example.com","Question","Low","This is an example ticket","tag1","tag2","2015-11-20T14:03:18Z","2015-11-25T14:16:03Z"];//List of ticket meta data for the current ticket - change the agent and customer information as per your ticket data
const ticketTreads = ["bodyOfMesasgeHere","messageTypeHere","bccEmailAddress","ccEmailAddress","fileNameHere(ifRequired)","fileUrlHere(ifRequired)","customerEmailHere","customerFirstName","customerLastName","userTypeHere","ticketCreatedDate","ticketUpdatedDate","bodyOfMesasgeHere","messageTypeHere","bccEmailAddress","ccEmailAddress","fileNameHere(ifRequired)","fileUrlHere(ifRequired)","agentEmailHere","agentFirstName","agentLastName","userTypeHere","replyCreatedDate","replyUpdatedDate","bodyOfMesasgeHere","messageTypeHere","bccEmailAddress","ccEmailAddress","fileNameHere(ifRequired)","fileUrlHere(ifRequired)","agentEmailHere","agentFirstName","agentLastName","userTypeHere","replyCreatedDate","replyUpdatedDate"];//List of ticket thread data for current ticket - this example has a customer query, note on ticket by agent and last thread is a reply for the agent in Desk. Null items will be ignored in loop
// Example: const ticketTreads = ["Hi, I am having issues with foo....","message",null,null,"Category Template.png","https://twk.pm/5ejx3jeph7","john@example.com","John","Doe","customer","2015-11-20T14:03:18Z","2015-11-20T14:03:18Z","this is a note added by an agent","note",null,null,null,null,"agent.smith@example.com","Agent","Smith","user","2015-11-21T14:03:18Z","2015-11-21T14:03:18Z","Hi, Another reply here....","message",null,null,"Screenshot 2024-05-07 at 17.20.39.png","https://twk.pm/ge8zufmsra","john@example.com","John","Doe","customer","2015-11-24T14:03:18Z","2015-11-24T14:03:18Z"];//List of ticket thread data for current ticket - this example has a customer query, note on ticket by agent and last thread is a reply for the agent in Desk. Null items will be ignored in loop

// Define the structure of each thread
const threadStructure = {
  body: null,
  type: null,
  bcc: null,
  cc: null,
  attachments:[
    {
       filename:null,
       downloadurl:null
    }
 ],
  createdBy: {
    email: null,
    firstName: null,
    lastName: null,
    type: null
  },
  createdAt: null,
  updatedAt: null
};

for (let u = 0; u < ticketId.length; u++) {// Ticket loop
  const threads = [];
for (let i = 0; i < ticketTreads.length; i += 12) {// Thread loop for current ticket
  const thread = {
    body: ticketTreads[i],
    type: ticketTreads[i + 1],
    bcc: ticketTreads[i + 2],
    cc: ticketTreads[i + 3],
    attachments:[
      {
         filename:ticketTreads[i + 4],// Name for the file that will be added.
         downloadurl:ticketTreads[i + 5]// This URL needs to be a live browser URL for the existing file.
      }
   ],
    createdBy: {
      email: ticketTreads[i + 6],
      firstName: ticketTreads[i + 7],
      lastName: ticketTreads[i + 8],
      type: ticketTreads[i + 9]
    },
    createdAt: ticketTreads[i + 10],// Date original ticket was created in your previous platform
    updatedAt: ticketTreads[i + 11]// Most recent date of the ticket in your previous platform
  };
  threads.push(thread);
}

console.log(threads);

const raw = JSON.stringify({
  "source": "Example Import",//Create your own ticket source in Teamwork Desk for where you want the ticket to be reference - this is a required field - https://support.teamwork.com/desk/tickets/ticket-sources
  "fallbackInboxId": 9760,//Inbox Id from Teamwork Desk for where you want the ticket to be added - this is a required field
  "tickets": [
    {
      "id": ticketId[u],// Existing ticket Id from previous platform - note that a new ticket id will be created for your new ticket in Teamwork Desk - this is a required field
      "assignedTo": {
        "email": ticketMetaData[0],
        "firstName": ticketMetaData[1],
        "lastName": ticketMetaData[2],
        "type": ticketMetaData[3]
      },
      "customer": {
        "email": ticketMetaData[4],
        "firstName": ticketMetaData[5],
        "lastName": ticketMetaData[6],
        "type": ticketMetaData[7]
      },
      "emailSource": ticketMetaData[8],
      "type": ticketMetaData[9],
      "priority": ticketMetaData[10],
      "subject": ticketMetaData[11],
      "tags": [
        ticketMetaData[12],
        ticketMetaData[13]
      ],// Sample code is showing two tags - If more are required based on the ticket data above add more values in this struct - Leave null if there are none
      "threads": threads,
      "createdAt": ticketMetaData[14],
      "updatedAt": ticketMetaData[15]
    }
  ]
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
//console.log(count);

fetch("https://" + siteName + ".teamwork.com/desk/v1/import/tickets.json", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}
