const myHeaders = new Headers();
APIKEY = "apiKeyHere"
siteName = "yourSiteName"
ticketId = "ticketIdHere"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + APIKEY);

let page = 1

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

async function fetchTicketActivities() {
    let ticketStatusesUrl = `https:///${siteName}.teamwork.com/desk/api/v2/ticketstatuses.json`;
    const ticketStatusesResponse = await fetch(ticketStatusesUrl, requestOptions)
    let ticketStatusesData = await ticketStatusesResponse.json()
    let ticketStatuses = ticketStatusesData.ticketstatuses
  
    let ticketsUrl = `https://${siteName}.teamwork.com/desk/api/v2/tickets/${ticketId}.json?includes=ticketactivities,users,ticketstatuses`;
    const response = await fetch(ticketsUrl, requestOptions)
    let data = await response.json()
  
    let activities = data.included.ticketactivities
    let users = data.included.users

    //console.log(activities) // Remove this comment block to see all of the ticket activites
    
    activities.forEach((activity, index) => {
        if (activity.eventType == "status" && activity.createdBy.type == "users") {
            console.log(`Activity Id: ${activity.id}`);
            console.log(`Activity Type: ${activity.eventType}`);
            console.log(`Activity Date: ${activity.createdAt}`);
            console.log(`Status Icon: ${activity.icon}`);
            ticketStatuses.forEach((status, index) => {
                if (`${activity.status.id}` == status.id) {
                    console.log(`Status Name: ${status.name}`);
                }
            });
            console.log(`User Id: ${activity.createdBy.id}`);
            users.forEach((user, index) => {
                if (`${activity.createdBy.id}` == user.id) {
                    console.log(`User Name: ${user.firstName} ${user.lastName}\n`);
                }
            });
        }
    });
}

fetchTicketActivities();
