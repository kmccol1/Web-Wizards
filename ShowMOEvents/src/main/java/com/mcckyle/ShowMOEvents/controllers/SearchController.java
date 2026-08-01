//***************************************************************************************
//
//   Filename: SearchController.java
//   Author: Kyle McColgan
//   Date: 29 July 2026
//   Description: This file provides Search functionality for the ShowMOEvents project.
//
//***************************************************************************************

package com.mcckyle.ShowMOEvents.controllers;

import com.mcckyle.ShowMOEvents.services.EventService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/search")
public class SearchController
{
    private final EventService eventService;

    public SearchController(EventService eventService)
    {
        this.eventService = eventService;
    }

    @GetMapping("/find-events")
    public ResponseEntity<String> getNearbyEvents()
    {
        String events = eventService.fetchEvents();

        return ResponseEntity
                .ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(events);
    }
}