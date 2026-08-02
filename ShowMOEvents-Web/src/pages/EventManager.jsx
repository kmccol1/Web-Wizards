//****************************************************************************************
// Filename: EventManager.jsx
// Date: 1 August 2026
// Author: Kyle McColgan
// Description: This file contains the event manager for ShowMOEvents.
//****************************************************************************************

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

const EventManager = ({ events, loading, error, updateEvent, deleteEvent }) => {
	const [editTitle, setEditTitle] = useState('');
	const [editDate, setEditDate] = useState('');
	const [editTime, setEditTime] = useState('');
	const [editDetails, setEditDetails] = useState('');
	const [editingEventId, setEditingEventId] = useState(null);
	
	const { user, accessToken } = useContext(AuthContext);
	const username = user?.username;
	const [userId, setUserId] = useState(null);
		
	const handleTitleChange = (e) => setEditTitle(e.target.value);
	const handleDateChange = (e) => setEditDate(e.target.value);
	const handleTimeChange = (e) => setEditTime(e.target.value);
	const handleDetailsChange = (e) => setEditDetails(e.target.value);

	const handleEdit = (event) => {
		setEditingEventId(event.id);
		setEditTitle(event.title);
		setEditDate(event.date);
		setEditTime(event.time);
		setEditDetails(event.details);
	};

	const handleEditSubmit = async (e, eventId) => {
		e.preventDefault(); //Prevent the default form submission behavior...
		
		await updateEvent(eventId, {
			title: editTitle,
			date: editDate,
			time: editTime,
			details: editDetails,
		});
		
		setEditingEventId(null);
		setEditTitle("");
		setEditDate("");
		setEditTime("");
		setEditDetails("");
	};
	const handleDelete = async (id) => {
		try
		{
			await deleteEvent(id);
		}
		catch(error)
		{
			console.error(error);
		}
	};
	
	// ------------------- Format Time to 12-Hour Format -------------------
    const formatTimeTo12Hour = (time24) => {
        const [hours, minutes] = time24.split(':');
        const hours12 = ((hours % 12) || 12).toString();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        return `${hours12.padStart(2, '0')}:${minutes} ${ampm}`;
    };

    // This helper function converts a 24-hour time string to a 12-hour format (e.g., "14:30" becomes "02:30 PM").
	const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
	
	if (loading)
	{
		return <p>Loading events...</p>;
	}
	if (error)
	{
		return <p>Unable to load events.</p>;
	}
	
	return (
	    <div>
		{events.map((event,index) => (
		<div key={event.id} className="event">
			{editingEventId === event.id ? (
			    <form onSubmit={(e) => handleEditSubmit(e, event.id)}>
				<input
				  type="text"
				  value={editTitle}
				  onChange={handleTitleChange}
				/>
				<input type="date" value={editDate} onChange={handleDateChange} />
				<input type="time" value={editTime} onChange={handleTimeChange} />
				<textarea value={editDetails} onChange={handleDetailsChange}> </textarea>
			<button type="submit">Save</button>
	    </form>

		) : (
		<div>
		  <h2>{event.title}</h2>
		  <p>{formatDate(event.date)}</p>
		  <p>{formatTimeTo12Hour(event.time)}</p>
		  <p>{event.details}</p>
		  <button onClick={() => handleEdit(event)}>Edit</button>
		  <button onClick={() => handleDelete(event.id)}>Delete</button>
	    </div>
	    )}
	  </div>
	))}
	</div>
	);
};

export default EventManager;

