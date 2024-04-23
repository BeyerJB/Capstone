import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from 'react-modal'
// import Popup from 'reactjs-popup';
// import "../App.css";

export const Calendar = () => {
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank']);
  const [events, setEvents] = useState([]);
  const [allData, setAllData] = useState([]);
  const userId = cookies.userID;
  //Modal stuff
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
          start: event.start_datetime,
          end: event.end_datetime,
          description: event.description
        }));
        setEvents(formattedEvents);
      })
      .catch(error => console.error('Error fetching events: ', error));
  }, [userId]);

  //handle open modal
  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  //handle close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(selectedEvent)
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

          eventClick={openModal}

          nowIndicator='true'
          dayMaxEvents='true'
          selectable='true'
          handleWindowResize='true'
          aspectRatio='2'
          multiMonthMaxColumns='12'
          events={events}
        />
      </div>
      <div style={{ position: 'absolute', visibility: 'hidden', zIndex: 12001, width: '158px', padding: '2px 0 0 0' }}>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={{ overlay: { backgroundColor: 'rgba(255, 255, 255, .9)', zIndex: 9999 }, content: { backgroundColor: 'white', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', overflow: 'auto', maxHeight: '80vh', maxWidth: '80vw', zIndex: 10000, padding: '15px'} }}>
        <h2>Event: {selectedEvent ? selectedEvent.event.title : ''}</h2>
        <p>Start: {selectedEvent ? selectedEvent.event.start.toString() : ''}</p>
        <p>End: {selectedEvent ? selectedEvent.event.end.toString() : ''}</p>
        <p>Description: {selectedEvent ? selectedEvent.event.extendedProps.description : ''}</p>
        <div style={{ marginTop: '370px'}}>
          <button style={{ marginRight: '20px' }}>Button 1</button>
          <button style={{ marginRight: '20px' }}>Button 2</button>
          <button style={{ float: 'right' }} onClick={closeModal}>Close</button>
        </div>
      </Modal>
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

// eventClick={function(info){
//   console.log('Test', info.event)
//   alert('Event: ' + info.event.title + `\n` + 'Start: ' + info.event.start + `\n` + 'End: ' + info.event.end + `\n` + 'Details: ' + info.event.extendedProps.description)
// }}
