//****************************************************************************************
// Filename: EventSearch.jsx
// Date: 25 July 2026
// Author: Kyle McColgan
// Description: This file contains the EventSearch component for ShowMOEvents.
//****************************************************************************************

import React, { useState } from 'react';
import './EventSearch.css';

const EventSearch = () =>
{
	const [events, setEvents] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	
	const handleSearch = async () =>
	{
		setError(null);
		setLoading(true);
		
		try
		{
			const response = await fetch(
			  `http://localhost:8080/search/find-events`
			);
			
			if (!response.ok)
			{
				const message = await response.text();
				throw new Error(`Search failed (${response.status}): ${message || response.statusText}`);
			}
			const data = await response.json();
			
			setEvents(data?._embedded?.events ?? []);
		}
		catch(error)
		{
			console.error("Event search failed:", error);
			setEvents([]);
			setError(error instanceof Error ? error.message : "Unable to retrieve Saint Louis events.");
		}
		finally
		{
			setLoading(false);
		}
	};
	
	return (
	  <section className="event-search page page-wide fade-in">
	    <header className="event-search-header">
		  <p className="eyebrow">Saint Louis, Missouri</p>
		  <h1 className="page-title">Discover what&apos;s happening.</h1>
		  <p className="page-subtitle">
		    Explore upcoming events, concerts, festivals, sports,
			and gatherings throughout the Saint Louis area.
		  </p>
		  <button
		    type="button"
			className="button"
			onClick={handleSearch}
			disabled={loading}
		  >
		    {loading ? "Finding events..." : "Find Saint Louis Events"}
		  </button>
		</header>
		
		{error && (
		  <div className="event-search-error" role="alert">
		    <strong>We couldn&apos;t load events.</strong>
			<span>{error}</span>
		  </div>
		)}
		{(!loading) && (!error) && (events.length === 0) && (
		  <div className="event-search-empty">
		    <h2>Ready to explore?</h2>
			<p>Find the latest events happening around Saint Louis.</p>
		  </div>
		)}
		
		{events.length > 0 && (
		  <section className="event-results" aria-labelledby="events-title">
		    <div className="event-results-header">
			  <div>
			    <p className="eyebrow">Local events</p>
				<h2 id="events-title">Coming up in Saint Louis</h2>
			  </div>
			  <span className="event-count">
			    {events.length}{" "}
				{events.length === 1 ? "event" : "events"}
			  </span>
			</div>
			
			<div className="event-table-wrapper">
			  <table className="event-table">
			    <thead>
				  <tr>
				    <th scope="col">Event</th>
					<th scope="col">Location</th>
					<th scope="col">Date</th>
					<th scope="col">Time</th>
					<th scope="col">
					  <span className="sr-only">Details</span>
					</th>
				  </tr>
				</thead>
				
				<tbody>
				  {events.map((event) => (
				    <tr key={event.id}>
					  <td><strong>{event.name}</strong></td>
					  <td>
					    {event._embedded?.venues?.[0]?.name ??
						"Location TBD"}
					  </td>
					  <td>
					    {event.dates?.start?.localDate
						  ? new Date(
						    `${event.dates.start.localDate}T00:00:00`
							).toLocaleDateString()
						  : "TBD"}
					  </td>
					  <td>
					    {event.dates?.start?.localTime
						  ? new Date(
						    `1970-01-01T${event.dates.start.localTime}`
							).toLocaleTimeString([], {
								hour: "numeric",
								minute: "2-digit",
							})
						  : "TBD"}
					  </td>
					  <td>
					    {event.url && (
						  <a href={event.url} target="_blank" rel="noopener noreferrer">View Event</a>
                        )}						  
					  </td>
					</tr>
				  ))}
				</tbody>
			  </table>
			</div>
		  </section>
		)}
	  </section>
	);
};

export default EventSearch;