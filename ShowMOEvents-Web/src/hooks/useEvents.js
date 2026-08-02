//****************************************************************************************
// Filename: useEvents.js
// Date: 1 August 2026
// Author: Kyle McColgan
// Description: This file contains a custom events hook for ShowMOEvents.
//****************************************************************************************

import { useCallback, useEffect, useState, useContext } from "react";
import { eventService } from "../services/eventService";
import { AuthContext } from "../context/AuthContext";

export default function useEvents()
{
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { accessToken } = useContext(AuthContext);
	
	//console.log("useEvents accessToken:", accessToken);
	
	const refresh = useCallback(async () => {
		try
		{
			setLoading(true);
			
			const data = await eventService.getAll(accessToken);
			
			setEvents(data);
			setError(null);
		}
		catch (error)
		{
			console.error(error);
			setError(error);
		}
		finally
		{
			setLoading(false);
		}
	}, [accessToken]);
	
	useEffect(() => {
		refresh();
	}, [refresh]);
	
	const createEvent = async (event) => {
		console.log("usePosts.createEvent called:", event);
		console.log("JWT:", accessToken);
		const created = await eventService.create(event, accessToken);
		
		setEvents((previous) => [created, ...previous]);
		
		return created;
	};
	
	const updateEvent = async (id, updatedValues) => {
		const updated = await eventService.update(id, updatedValues, accessToken);
		
		setEvents((previous) =>
		  previous.map((event) =>
		    event.id === id ? updated : event
		  )
		);
		
		return updated;
	};
	
	const deleteEvent = async (id) => {
		await eventService.remove(id, accessToken);
		
		setEvents((previous) =>
		  previous.filter((event) => event.id !== id)
		);
	};
	
	return {
		events,
		loading,
		error,
		refresh,
		createEvent,
		updateEvent,
		deleteEvent,
	};
}