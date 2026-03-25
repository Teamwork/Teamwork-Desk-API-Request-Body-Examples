/**
 * Teamwork Desk Ticket Message Exporter
 * * This Node.js script extracts ticket messages from the Teamwork Desk API 
 * and compiles it into an Excel CSV file. 
 * * Key Features:
 * - Connects to the Teamwork Desk v2 API using native fetch requests.
 * - Implements automatic pagination to seamlessly pull the entire history of tickets.
 * - Cross-references ticket message references with the detailed 'included.messages' payload.
 * - Filters out automated system events, extracting only genuine human replies (`threadType: "message"`).
 * - Sanitizes complex text bodies (escaping quotes and line breaks) to ensure perfect CSV formatting.
 * - Outputs a clean `teamwork_ticket_messages.csv` file directly to the local file system.
 * * Requirements: Node.js v18+ (for native fetch API support).
 */

const fs = require('fs'); // Required to write the CSV file

const myHeaders = new Headers();
APIKEY = "apiKeyHere"
siteName = "yourSiteName"
archivedTickets = false // Set this to true if you want to filter by archived tickets only
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + APIKEY);

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};


async function fetchTicketMessages() {
    try {
        console.log("Starting Teamwork API export...");
        
        // 1. SET UP CSV HEADERS OUTSIDE THE LOOP
        // We do this out here so we only write the header row once.
        const rows = [
            ["Ticket ID", "Ticket Subject", "Message ID", "Message Text"]
        ];

        let currentPage = 1;
        let hasMorePages = true;

        // 2. THE PAGINATION LOOP
        while (hasMorePages) {
            console.log(`Fetching page ${currentPage}...`);
            
            // Notice we added &page=${currentPage} to the URL
            let ticketsUrl = `https://${siteName}.teamwork.com/desk/api/v2/tickets.json?archived=archivedTickets&includes=messages&pageSize=50&page=${currentPage}`;
            
            const ticketsResponse = await fetch(ticketsUrl, requestOptions);
            
            if (!ticketsResponse.ok) {
                throw new Error(`API call failed with HTTP status ${ticketsResponse.status}`);
            }
            
            const ticketsData = await ticketsResponse.json();
            const tickets = ticketsData.tickets || [];
            const includedMessages = (ticketsData.included && ticketsData.included.messages) ? ticketsData.included.messages : [];

            // Process the tickets on the current page
            tickets.forEach(ticket => {
                if (ticket.messages && ticket.messages.length > 0) {
                    ticket.messages.forEach(msgRef => {
                        const matchedMessage = includedMessages.find(m => m.id === msgRef.id);
                        
                        // Check if it exists AND is a real message
                        if (matchedMessage && matchedMessage.threadType === "message") {
                            let text = matchedMessage.textBody || "[No text body content]";
                            let subject = ticket.subject || "No Subject";
                            
                            // Excel safe formatting
                            text = `"${text.replace(/"/g, '""')}"`;
                            subject = `"${subject.replace(/"/g, '""')}"`; 
                            
                            rows.push([ticket.id, subject, matchedMessage.id, text]);
                        }
                    });
                }
            });

            // 3. CHECK IF WE NEED TO KEEP GOING
            // Teamwork provides a 'hasMore' boolean in their meta data.
            hasMorePages = ticketsData.meta.page.hasMore;
            
            // Increment the page counter for the next loop
            currentPage++;
        }

        // 4. WE FINISHED THE LOOP, NOW SAVE THE FILE
        console.log("All pages fetched! Building the CSV file...");
        const csvContent = rows.map(rowArray => rowArray.join(",")).join("\n");
        fs.writeFileSync('teamwork_ticket_messages.csv', csvContent, 'utf8');
        
        console.log('Success! The complete dataset has been saved to "teamwork_ticket_messages.csv".');

    } catch (error) {
        console.error("An error occurred during the export:", error.message);
    }
}

fetchTicketMessages();
