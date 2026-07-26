//***************************************************************************************
//
//     Filename: EventService.java
//     Author: Kyle McColgan
//     Date: 25 July 2026
//     Description: This file provides abstracted event functionality.
//
//***************************************************************************************

package com.mcckyle.ShowMOEvents.services;

import com.mcckyle.ShowMOEvents.exceptions.EventServiceException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
public class EventService
{
    private static final String TICKETMASTER_API_URL = "https://app.ticketmaster.com/discovery/v2/events.json";

    @Value("${ticketmaster.api-key}")
    private String ticketmasterApiKey;

    private static final String DEFAULT_CITY = "St. Louis";
    private static final String COUNTRY_CODE = "US";

    private final RestTemplate restTemplate = new RestTemplate();

    public String fetchEvents()
    {
        System.out.println("Ticketmaster API key configured: " +
                (ticketmasterApiKey != null && !ticketmasterApiKey.isBlank())
        );
        System.out.println("Ticketmaster API key length: " +
                (ticketmasterApiKey == null ? 0 : ticketmasterApiKey.length())
        );
        if ((ticketmasterApiKey == null) || (ticketmasterApiKey.isBlank()))
        {
            throw new EventServiceException("TicketMaster API key is not configured.");
        }

        URI ticketmasterUri = UriComponentsBuilder
                .fromUriString(TICKETMASTER_API_URL)
                .queryParam("apikey", ticketmasterApiKey)
                .queryParam("city", DEFAULT_CITY)
                .queryParam("countryCode", COUNTRY_CODE)
                .build()
                .encode()
                .toUri();

        try
        {
            return restTemplate.getForObject(ticketmasterUri, String.class);
        }
        catch (HttpClientErrorException e)
        {
            System.err.println("Ticketmaster status: " + e.getStatusCode());
            System.err.println("Ticketmaster response: " + e.getResponseBodyAsString());
            throw new EventServiceException("Ticketmaster API returned client error: " + e.getStatusCode(), e);
        }
        catch (HttpServerErrorException e)
        {
            throw new EventServiceException("Ticketmaster API returned server error: " + e.getStatusCode(), e);
        }
        catch (ResourceAccessException e)
        {
            throw new EventServiceException("Unable to connect to Ticketmaster API. Please try again later. ", e);
        }
        catch (Exception e)
        {
            throw new EventServiceException("An unexpected error occurred while fetching events.", e);
        }
    }
}
