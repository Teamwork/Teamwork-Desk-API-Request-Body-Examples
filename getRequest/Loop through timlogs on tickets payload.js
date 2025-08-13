// This code sample is an example of looping through the included.timelogs object to display time logged on tickets. 
// This scenario is set to 100 pageSize and a single page view - you will have to add a do while loop to capture a larger payload with pagination
// Endpoint Url: https://${siteName}.teamwork.com/desk/api/v2/search/tickets.json?pageSize=100`
// Endpoint doc: https://apidocs.teamwork.com/docs/desk/v2/tickets/get-v2-tickets-json
const myHeaders = new Headers();
APIKEY = "apiKeyHere";
siteName = "yourSiteName";
includeArchived = false; // change this to true if you want to request archived tickets
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + APIKEY);

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

fetch(`https://${siteName}.teamwork.com/desk/api/v2/search/tickets.json?pageSize=100&archived=${includeArchived}`, requestOptions)
    .then(response => response.json()) // parse JSON directly
    .then(data => {
        // Check if included.timelogs exists
        if (data.included && data.included.timelogs) {
            console.log("=== Timelogs ===");
            data.included.timelogs.forEach(timelog => {
                const seconds = timelog.seconds || 0;
                const hours = Math.floor(seconds / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                const remainingSeconds = seconds % 60;

                let timeFormatted = "";
                if (hours > 0) timeFormatted += `${hours}h `;
                if (minutes > 0) timeFormatted += `${minutes}m `;
                if (remainingSeconds > 0) timeFormatted += `${remainingSeconds}s`;

                console.log(`Ticket id: ${timelog.ticket.id}`);
                console.log(`Time id: ${timelog.id}`);
                console.log(`Description: ${timelog.description || "No description"}`);
                console.log(`Time Spent: ${timeFormatted || "N/A"}`);
                console.log(`Logged time user: ${timelog.user.id || "N/A"}`);
                console.log("--------------------");
            });
        } else {
            console.log("No timelogs found in the response.");
        }
    })
    .catch(error => console.error("Error fetching timelogs:", error));
