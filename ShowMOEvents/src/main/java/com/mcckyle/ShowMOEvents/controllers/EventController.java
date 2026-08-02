//***************************************************************************************
//
//     Filename: EventController.java
//     Author: Kyle McColgan
//     Date: 1 August 2026
//     Description: This file contains event-related routing for ShowMOEvents.
//
//***************************************************************************************

package com.mcckyle.ShowMOEvents.controllers;

import com.mcckyle.ShowMOEvents.models.Event;
import com.mcckyle.ShowMOEvents.data.EventRepository;
import com.mcckyle.ShowMOEvents.models.Post;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController
{
    @Autowired
    private EventRepository eventRepository;

    // Handles requests to retrieve all events from the database
    // and responds with the events in JSON format.
//    Response entity wraps the response data and status code which makes it easier for thr frontend to unwrap and use.
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok((List<Event>) eventRepository.findAll());
    }

    //Read a single event...
    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Integer id)
    {
        Optional<Event> event = eventRepository.findById(id);

        if (event.isPresent())
        {
            return new ResponseEntity<>(event.get(), HttpStatus.OK);
        }
        else
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Handles requests to create a new event and saves it to the database.
    @PostMapping
    public ResponseEntity<Event> createEvent(@Valid @RequestBody Event event)
    {
        Event savedEvent = eventRepository.save(event);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEvent);
    }

    // Handles requests to update an existing event by its ID.
    @PutMapping("/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Integer id, @RequestBody Event eventDetails) {
        Optional<Event> eventOpt = eventRepository.findById(id);

        if (eventOpt.isPresent()) {
            Event event = eventOpt.get();
            event.setTitle(eventDetails.getTitle());
            event.setDate(eventDetails.getDate());
            event.setTime(eventDetails.getTime());
            event.setDetails(eventDetails.getDetails());
            Event updatedEvent = eventRepository.save(event);
            return new ResponseEntity<>(updatedEvent, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Handles requests to delete an event by its ID.
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Integer id) {
        if (eventRepository.existsById(id)) {
            eventRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
