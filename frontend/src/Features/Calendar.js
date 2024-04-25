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
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Calendar = () => {
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank']);
  const [events, setEvents] = useState([]);
  const [allData, setAllData] = useState([]);
  const userId = cookies.userID;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  ///
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null)
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  ///

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
        // setDescription(formattedEvents.description)
      })
      .catch(error => console.error('Error fetching events: ', error));
  }, [userId, editedEvent]);


  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
  };


  const handleEditClick = () => {
    setIsEditing(true);
    setTitle(selectedEvent.event.title)
    setDescription(selectedEvent.event.extendedProps.description)
    setStartDateTime(selectedEvent.event.start)
    setEndDateTime(selectedEvent.event.end)
  };

  const handleSaveClick = () => {
    const editedEventData = {
      // event_id: 
      title: title,
      start: startDateTime,
      end: endDateTime,
      description: description
    };

    fetch('http://localhost:8080/edit_event', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedEventData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to edit event');
      }
      return response.json();
    })
    .then(data => {
      console.log('Edit Successful:', data, editedEventData);
      setIsEditing(false);
    })
    .catch(error => {
      console.error('Error editing event:', error);
      // Handle error
    });
  };


  const handleCancelClick = () => {
    setIsEditing(false);
  };

  //stretch goal
  const handleCancelEventClick = () => {
    setIsEditing(false);
    //Send cancel notice for someone to approve or deny for deletion function useEffect
  };

  const handleButton2Click = () => {
    console.log('button 2 clicked');
  };

  // const handleStartDateChange = (date) => {
  //   setStartDateTime(date);
  // };

  // const handleEndDateChange = (date) => {
  //   setEndDateTime(date);
  // };

  const handleStartDateChange = (date) => {
    // Convert the selected date to UTC
    const utcStartDate = date.toISOString();
    setStartDateTime(utcStartDate);
    console.log(utcStartDate)
  };

  const handleEndDateChange = (date) => {
    // Convert the selected date to UTC
    const utcEndDate = date.toISOString();
    setEndDateTime(utcEndDate);
  };

  return (
    <>
      <div className="calendar" style={{ paddingInline: '50px' }}>
        <h1> {cookies.firstName} {cookies.lastName}'s Calendar</h1>
        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin, bootstrap5Plugin]}
          initialView={'dayGridMonth'}
          headerToolbar={{
            start: "today prev,next",
            center: 'title',
            end: 'timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear'
          }}
          themeSystem= 'bootstrap5'
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
      <div style={{ position: 'absolute', visibility: 'hidden', zIndex: 12001, width: '158px', padding: '2px 0 0 0',  textDecoration: 'none' }}>
      <Modal show={isModalOpen} onHide={closeModal} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Header closeButton>
          <Modal.Title>Event: {selectedEvent ? selectedEvent.event.title : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEditing ? (
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder={selectedEvent.event.title} value={title} onChange={(e) => setTitle(e.target.value)}/>
              </Form.Group>
              <Form.Group controlId="formStart">
                <Form.Label>Start</Form.Label>
                <DatePicker
                  selected={startDateTime}
                  onChange={handleStartDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  placeholderText="Select start date and time"
                />
              </Form.Group>
              <Form.Group controlId="formEnd">
                <Form.Label>End</Form.Label>
                <DatePicker
                  selected={endDateTime}
                  onChange={handleEndDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  placeholderText="Select end date and time"
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder={selectedEvent.event.extendedProps.description} value={description} onChange={(e) => setDescription(e.target.value)}/>
              </Form.Group>
            </Form>
          ) : (
            <>
              <p>Start: {selectedEvent ? selectedEvent.event.start.toString() : ''}</p>
              <p>End: {selectedEvent ? selectedEvent.event.end.toString() : ''}</p>
              <p>Description: {selectedEvent ? selectedEvent.event.extendedProps.description : ''}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            {isEditing ? (
              <>
                <Button variant="success" onClick={handleSaveClick}>Save</Button>
                <Button variant="secondary" onClick={handleCancelClick}>Cancel</Button>
                <Button variant="danger" onClick={handleCancelEventClick}>Send Cancel Notice</Button>
              </>
            ) : (
              <>
                <Button variant="secondary" onClick={handleEditClick}>Edit event</Button>
              </>
            )}
            <Button variant="danger" onClick={closeModal}>Close</Button>
          </div>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
};

