import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import "../App.css";

export const Calendar = () => {
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank']);
  const [events, setEvents] = useState([]);
  const [allData, setAllData] = useState([]);
  const userId = cookies.userID;
  // const [newEvents, setNewEvents] = useState([]);
  // const [title, setTitle] = useState('');
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');
  // const [startTime, setStartTime] = useState('');
  // const [endTime, setEndTime] = useState('');
  // const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/mycalendar?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        setAllData(data);
        const formattedEvents = data.map(event => ({
          title: event.title,
          start: event.start_date + 'T' + event.start_time,
          end: event.end_date + 'T' + event.end_time,
        }));
        setEvents(formattedEvents);
      })
      .catch(error => console.error('Error fetching events: ', error));
  }, [userId]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const eventData = {
  //     title,
  //     start: startDate + 'T' + startTime,
  //     end: endDate + 'T' + endTime,
  //   };
  //   setNewEvents([...events, eventData]);
  //   setTitle('');
  //   setStartDate('');
  //   setEndDate('');
  //   setStartTime('');
  //   setEndTime('');
  //   setIsOpen(false);
  // };

  //Add useEffect
  // useEffect(() => {

  //}

  return (
    <>
      <div className="calendar">
        <h1>My Calendar</h1>
        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin]}
          initialView={'dayGridMonth'}
          headerToolbar={{
            start: "today prev,next",
            center: 'title',
            end: 'timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear'
          }}
          handleWindowResize='true'
          aspectRatio='2'
          multiMonthMaxColumns='12'
          events={events}
        />
      </div>
      {/* <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Start Time:</label>
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div className="form-group">
            <label>End Time:</label>
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
          <button type="submit">Add Event</button>
        </form>
        <button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close Sidebar' : 'Open Sidebar'}
        </button> */}
      {/* </div> */}
    </>
  );
};
