import React, { useState, useEffect, useContext } from 'react';
import '../components/css/eventsPage.css';
import { Container } from '@mui/system';
import { Button } from "@mui/material";
import { UserContext } from "../contexts/user.context";


// https://cs3528.azurewebsites.net/getevents
// https://cs3528.azurewebsites.net/events/${id}
// http://localhost:3001/getevents

 const Events = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(UserContext);
  
  if (!user) {
    // User is not logged in
    console.log("Please log in to access this page");
  }

  const userId = user.id;
  // Use the user ID as needed

//  console.log(`Welcome, ${user.username}!`)
 console.log(`Welcome, ${userId}!`)

  

  useEffect(() => {
    fetch('http://localhost:3001/getevents')
      .then(res => res.json())
      .then(events => setEvents(events))
      .catch(err => console.error(err));
  }, []);

  const handleSignUp = id => {
    // const eventToUpdate = events.find(event => event._id === id);
    document.getElementById(`event-button-${id}`).disabled = true;

    fetch(`https://cs3528.azurewebsites.net/events/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signedUp: events.find(event => event._id === id)}),
    })
      .then(res => res.json())
      .then(updatedEvent => {
        setEvents(events.map(event => (event._id === id ? {...event, signedUp: event.signedUp + 1} : event)));
      })
      .catch(err => console.error(err));
  };
  
   return (
    
    <Container style={{ paddingTop: '20px',display: "flex", flexDirection: "column", margin: "auto"}}>

      <div className="events-page">
        <h1>Events</h1>
        <div className="event-list">
          {events.map(event => (
          <div key={event._id} className="event">
            <h2>Type: {event.sportType}</h2>
            <h2>City: {event.city}</h2>
            <p>Address: {event.address}</p>
            <p>Date: {event.date}</p>
            <p>Time: {event.time}</p>
            <p>Signed up: {event.signedUp}</p>
            <p>Limit: {event.maxParticipants}</p>
            <Button variant="contained" color="primary" id={`event-button-${event._id}`} className="event-button" onClick={() => handleSignUp(event._id)}>Sign Up</Button>
          </div>
          ))}
        </div>
      </div>
    </Container>
  );
 };

export default Events;