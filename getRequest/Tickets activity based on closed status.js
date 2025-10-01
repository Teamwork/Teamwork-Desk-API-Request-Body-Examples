// This code sample will loop through the first page of the get all tickets endpoint and capture all tickets with a closed status and provide information about the status on the ticket
const myHeaders = new Headers();
APIKEY = "apiKeyHere"
siteName = "yourSiteName"
ticketId = "" // Leave this blank if you want to search through multiple tickets - If you want to search based on a ticket id make sure you add a lkeading forward slash IE: "/16693484"
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
    //console.log(ticketStatuses)

    var index = 0
    var statusRow = index;
    ticketStatuses.forEach((status, index) => {

        if(status.name == "Closed"){
            statusRow = index;
            console.log(statusRow)
        }
        index++
    });

    let ticketsUrl = `https://${siteName}.teamwork.com/desk/api/v2/tickets${ticketId}.json?includes=ticketactivities,users,ticketstatuses`;
    const response = await fetch(ticketsUrl, requestOptions)
    let data = await response.json()
    //console.log(data)
  
    let activities = data.included.ticketactivities
    let users = data.included.users
    //console.log(activities)
    //console.log(data.included.ticketactivities)
  
    activities.forEach((activity, index) => {
        if (activity.eventType == "status") {
            if (activity.status.id == 6) {
              if (activity.createdBy.type == "users") {
                    users.forEach((user, index) => {
                        if (`${activity.createdBy.id}` == user.id) {
                            console.log(`User changed status: ${user.firstName} ${user.lastName}\n`);
                        }
                    });
                } else if (activity.createdBy.type == "customers") {
                    customers.forEach((customer, index) => {
                        if (`${activity.createdBy.id}` == customer.id) {
                            console.log(`Customer changed status: ${customer.firstName} ${customer.lastName}\n`);
                        }
                    });
                    console.log(`Activity Id: ${activity.id}`);
                    console.log(`Activity Type: ${activity.eventType}`);
                    console.log(`Status Id: ${activity.status.id}`);
                    console.log(`Status Name: ${ticketStatuses[statusRow].name}`)
                    console.log(`Activity Date: ${activity.createdAt}`);
                    console.log(`Status Icon: ${activity.icon}`);
                    console.log(`ticket Id: ${activity.ticket.id}`);    
            }            
        }
    });
}

fetchTicketActivities();
