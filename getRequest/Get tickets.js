const myHeaders = new Headers();
APIKEY = "apiKeyHere"
siteName = "yourSiteName"
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + APIKEY);

let loop = true
let page = 1

const requestOptions = {
  method: "GET",
  headers: myHeaders
};

async function fetchTime() {

        let ticketsUrl = "https://" + siteName + ".teamwork.com/desk/api/v2/tickets.json?page=" + page + "&pageSize=100"
        const response = await fetch(ticketsUrl, requestOptions)
        let data = await response.json()
        console.log(data)
        console.log("Page: " + data.pagination.pages)
        if (page < data) {
            page++
            loop = true;  
        } else {
            loop = false;
        }
}
    
fetchTime();
