// AIM: Define message counts based on ticket event types
// Endpoint: https://${siteName}.teamwork.com/desk/api/v2/tickets/${ticketId}.json?includes=users,messages
// Endpoint document: https://apidocs.teamwork.com/docs/desk/v2/tickets/get-v2-tickets-id-json
const myHeaders = new Headers();
const APIKEY = "apiTokenHere";
const siteName = "yourSiteName"
const ticketId = "ticketIdhere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${APIKEY});

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/desk/api/v2/tickets/${ticketId}.json?includes=users,messages`, requestOptions)
    .then((response) => response.text())
    .then((result) => getResult(JSON.parse(result)))
    .catch((error) => console.error(error));

function getResult(result) {

    var customerCount = 0;
    var eventInfoCount = 0;
    var completedTaskCount = 0;
    var forwardCount = 0;
    var noteCount = 0;
    var mergedCount = 0;
    //console.log(result["ticket"])
    //console.log(result["included"]["messages"])
    var scores = result["included"]["messages"]
    for (i in scores) {
        if (scores[i]["threadType"] == "message") {
            if (scores[i]["createdBy"]["type"] == "customers") {
                customerCount++
            }
        } else if (scores[i]["threadType"] == "note") {
            noteCount++
        } else if (scores[i]["threadType"] == "completedTask") {
            completedTaskCount++
        } else if (scores[i]["threadType"] == "forward") {
            forwardCount++
        } else {
            if (scores[i]["textBody"].includes("merged")) {
                console.log("\n",scores[i]["textBody"]);
                mergedCount++
            }
            eventInfoCount++
        }

    }
    console.log("\n--- Message count Breakdown ---");
    console.log("Total message count: " + result["ticket"]["messageCount"]);
    console.log("Customer replies: " + customerCount);
    console.log("Agent replies: " + (result["ticket"]["messageCount"] - customerCount));
    console.log("Note count: " + noteCount + " (Notes on tickets do not count towards the message total) ");
    console.log("Completed tasks count: " + completedTaskCount);
    console.log("Forwarded messages count: " + forwardCount);
    console.log("Merged ticket count: " + mergedCount);
    console.log("Event info count: " + eventInfoCount + " (Ticket activity: timelogs, trigger info, status change info, etc) \n");
}
