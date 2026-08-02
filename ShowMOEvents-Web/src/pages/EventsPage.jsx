//****************************************************************************************
// Filename: EventsPage.jsx
// Date: 1 August 2026
// Author: Kyle McColgan
// Description: This file contains the events page for ShowMOEvents.
//****************************************************************************************

import EventForm from "./EventForm";
import EventManager from "./EventManager";
import useEvents from "../hooks/useEvents";

const EventsPage = () => {
	const {
		events,
		loading,
		error,
		createEvent,
		updateEvent,
		deleteEvent,
		refresh,
	} = useEvents();
	
	return (
	  <>
	    <EventForm createEvent={createEvent} />
		
		<EventManager
		  events={events}
		  loading={loading}
		  error={error}
		  updateEvent={updateEvent}
		  deleteEvent={deleteEvent}
		  refresh={refresh}
		/>
	</>
  );
};

export default EventsPage;