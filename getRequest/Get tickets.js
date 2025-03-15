// This code sample will make a reqest to the tickets endpoint and loop through tickets until pages have exausted
// There is addional logic to monitor the response headers for rate limit numbers
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

async function fetchTickets() {

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
    console.log(`\nHeaders below ----------------`)
    console.log(response.headers)
    console.log(`\nPagination information -------`)
    console.log(`Total records for request: ${data.pagination.records}`)
    console.log(`Total pages: ${data.pagination.pages}`)
    console.log(`Current page: ${data.pagination.page}`)
    console.log(`Has morePages: ${data.pagination.hasMorePages}`)
    console.log(`\nRate limit -------------------`)
    console.log(`x-ratelimit-limit: ${response.headers.get("x-rate-limit-limit")}`)
    console.log(`x-ratelimit-remaining: ${response.headers.get("X-Rate-Limit-Remaining")}`)
    console.log(`x-ratelimit-reset: ${response.headers.get("x-rate-limit-reset")}\n`)

}

fetchTickets();
