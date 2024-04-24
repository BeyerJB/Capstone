import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const Calendar = () => {
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank']);
  const [events, setEvents] = useState([]);
  const [allData, setAllData] = useState([]);
  const userId = cookies.userID;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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

  const handleButton1Click = () => {
    console.log('button 1 clicked');
  };

  const handleButton2Click = () => {
    console.log('button 2 clicked');
  };

  return (
    <>
      <div className="calendar">
        <h1>My Calendar</h1>
        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin, bootstrap5Plugin]}
          initialView={'dayGridMonth'}
          headerToolbar={{
            start: "today prev,next",
            center: 'title',
            end: 'timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear'
          }}
          // textDecoration= 'none'
          themeSystem= 'bootstrap5'
          eventClick={openModal}
          backgroundColor= '#646567'
          nowIndicator='true'
          dayMaxEvents='true'
          selectable='true'
          handleWindowResize='true'
          aspectRatio='2'
          multiMonthMaxColumns='12'
          events={events}
        />
      </div>
      <div style={{ position: 'absolute', visibility: 'hidden', zIndex: 12001, width: '158px', padding: '2px 0 0 0',  textDecoration: 'none' }}>
      <Modal show={isModalOpen} onHide={closeModal} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Header closeButton>
          <Modal.Title>Event: {selectedEvent ? selectedEvent.event.title : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Start: {selectedEvent ? selectedEvent.event.start.toString() : ''}</p>
          <p>End: {selectedEvent ? selectedEvent.event.end.toString() : ''}</p>
          <p>Description: {selectedEvent ? selectedEvent.event.extendedProps.description : ''}</p>
        </Modal.Body>
        <Modal.Footer>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div>
            <Button variant="primary">Button 1</Button>
            <Button variant="secondary" style={{ marginLeft: '10px' }}>Button 2</Button>
          </div>
          <Button variant="danger" onClick={closeModal}>Close</Button>
        </div>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
};

