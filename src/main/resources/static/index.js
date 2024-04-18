function buyTicket() {
    // Retrieve values from input fields
    const film = getValue('film');
    const quantity = getValue('quantity');
    const firstName = getValue('firstName');
    const lastName = getValue('lastName');
    const telephone = getValue('telephone');
    const email = getValue('email');

    // Check if any required fields are empty or if telephone/email is invalid
    if (!film || !quantity || !firstName || !lastName || !isValidTelephone(telephone) || !isValidEmail(email)) {
        let errorMessage = 'Please fill out all fields correctly.';
        // Add specific error messages for invalid telephone and email
        if (!isValidTelephone(telephone)) {
            errorMessage += ' Telephone number is invalid.';
        }
        if (!isValidEmail(email)) {
            errorMessage += ' Email address is invalid.';
        }
        // Display the error message in an alert
        alert(errorMessage);
        return;
    }

    // Create a ticket object
    const ticket = {
        film,
        quantity: parseInt(quantity), // Convert quantity to integer
        firstName,
        lastName,
        telephone,
        email
    };

    // Send a POST request to the backend endpoint
    fetch('/api/tickets/buy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticket)
    })
        .then(response => {
            if (response.ok) {
                // If the response is OK, retrieve all tickets and display them
                fetch('/api/tickets/all')
                    .then(response => response.json())
                    .then(tickets => {
                        displayTickets(tickets);
                        resetForm();
                    })
                    .catch(error => {
                        console.error('Error fetching tickets:', error);
                    });
            } else {
                // If there is an error response, display the error message
                return response.text().then(text => Promise.reject(text));
            }
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            alert('Error: ' + error);
        });
}

// Function to retrieve value from input field by id
function getValue(id) {
    return document.getElementById(id).value.trim();
}

// Function to reset the input fields in the form
function resetForm() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => input.value = '');
}

// Function to validate telephone number format
function isValidTelephone(telephone) {
    return /^\d{8}$/.test(telephone);
}

// Function to validate email format
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Function to remove all tickets
function removeAllTickets() {
    fetch('/api/tickets/deleteAll', {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                // If tickets are successfully deleted, clear the ticket list
                const ticketList = document.getElementById('ticketList');
                ticketList.innerHTML = '';
            } else {
                // If there is an error response, display the error message
                return response.text().then(text => Promise.reject(text));
            }
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            alert('Error: ' + error);
        });
}

function displayTickets(tickets) {
    const ticketList = document.getElementById('ticketList');
    ticketList.innerHTML = ''; // Clear the existing list

    tickets.forEach(ticket => {
        const listItem = document.createElement('li');
        listItem.textContent = `Film: ${ticket.film}, Quantity: ${ticket.quantity}, Name: ${ticket.firstName} ${ticket.lastName}, Telephone: ${ticket.telephone}, Email: ${ticket.email}`;
        ticketList.appendChild(listItem);
    });
}
