//****************************************************************************************
// Filename: PostService.js
// Date: 29 July 2026
// Author: Kyle McColgan
// Description: This file contains the frontend PostService for ShowMOEvents.
//****************************************************************************************

const API_URL = "http://localhost:8080/api/posts";

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

export const postService = {
	getAll(token) {
		return request(API_URL, token);
	},
	
	getById(id, token) {
		return request(`${API_URL}/${id}`, token);
	},
	
	create(post, token) {
		console.log("postService.create called:", {
			post,
			token,
		});
		return request(API_URL, token, {
			method: "POST",
			body: JSON.stringify(post),
		});
	},
	
	update(id, post, token) {
		return request(`${API_URL}/${id}`, token, {
			method: "PUT",
			body: JSON.stringify(post),
		});
	},
	
	remove(id, token) {
		return request(`${API_URL}/${id}`, token, {
			method: "DELETE",
		});
	},
};