//****************************************************************************************
// Filename: eventService.js
// Date: 1 August 2026
// Author: Kyle McColgan
// Description: This file contains the frontend event service for ShowMOEvents.
//****************************************************************************************

const API_URL = "http://localhost:8080/api/events";

async function request(url, token, options = {})
{
	console.log("REQUEST:", { 
		  url,
		  token,
		  options,
	    });
	const response = await fetch(url, {
		...options,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...(token && {
				Authorization: `Bearer ${token}`,
			}),
			...(options.headers ?? {}),
		},
	});
	
	console.log("RESPONSE:", response.status);
	
	if (!response.ok)
	{
		throw new Error(`Request failed (${response.status})`);
	}
	
	if (response.status === 204)
	{
		return null;
	}
	
	return response.json();
}

export const eventService = {
	getAll(token) {
		return request(API_URL, token);
	},
	
	getById(id, token) {
		return request(`${API_URL}/${id}`, token);
	},
	
	create(event, token) {
		console.log("eventService.create called:", {
			event,
			token,
		});
		return request(API_URL, token, {
			method: "POST",
			body: JSON.stringify(event),
		});
	},
	
	update(id, event, token) {
		return request(`${API_URL}/${id}`, token, {
			method: "PUT",
			body: JSON.stringify(event),
		});
	},
	
	remove(id, token) {
		return request(`${API_URL}/${id}`, token, {
			method: "DELETE",
		});
	},
};