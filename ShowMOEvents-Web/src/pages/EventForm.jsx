//****************************************************************************************
// Filename: EventForm.jsx
// Date: 1 August 2026
// Author: Kyle McColgan
// Description: This file contains the form for creating events for ShowMOEvents.
//****************************************************************************************

import React, { useState } from 'react';
import "../hooks/useEvents";

const EventForm = ({ createEvent }) => {
    const [title, setTitle] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [details, setDetails] = useState("");
    const [formMode, setFormMode] = useState('create');
	
	const handleSubmit = async (event) => {
		event.preventDefault();
		
		console.log("Submitting event:", { title, date, time, details });
		
		try
		{
			await createEvent({
				title,
				date,
				time,
				details
			});
			
			setTitle("");
			setDate("");
			setTime("");
			setDetails("");
		}
		catch (error)
		{
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Title: </label>
				<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
			</div>
			<div>
				<label>Date: </label>
				<input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
			</div>
			<div>
				<label>Time: </label>
				<input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
			</div>
			<div>
				<label>Details: </label>
				<textarea value={details} onChange={(e) => setDetails(e.target.value)}> </textarea>
			</div>
			<button type="submit">Create Event</button>
		</form>
	);
};

export default EventForm;