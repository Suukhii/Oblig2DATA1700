package org.example.oblig2;

import org.example.oblig2.Ticket;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/tickets") // Base mapping for all endpoints in this controller
public class TicketController {

    private final List<Ticket> tickets = new ArrayList<>();

    @PostMapping("/buy") // Endpoint for buying a ticket
    public void buyTicket(@RequestBody Ticket ticket) {
        // Add logic to process the ticket (e.g., save it to a database)
        tickets.add(ticket);
    }

    @GetMapping("/all") // Endpoint to retrieve all tickets
    public List<Ticket> getAllTickets() {
        return tickets;
    }

    @DeleteMapping("/deleteAll") // Endpoint to delete all tickets
    public void deleteAllTickets() {
        tickets.clear();
    }
}

