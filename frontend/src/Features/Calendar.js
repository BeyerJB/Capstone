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
import '../CSS/calendar.css'

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
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [eventId, setEventId] = useState(null);
  // const [color, setColor] = useState(null)
  const [oldStartDateTime, setOldStartDateTime] = useState('');
  const [oldEndDateTime, setOldEndDateTime] = useState('');
  const [oldTitle, setOldTitle] = useState('');
  const [oldDescription, setOldDescription] = useState('');
  const [teamMemberIDs, setTeamMemberIDs] = useState({});


  useEffect(() => {
    fetch(`http://localhost:8080/mycalendar?userId=${userId}&teamId=${cookies.teamID}`)
      .then(response => response.json())
      .then(data => {
        setAllData(data);
        const formattedEvents = data.map(event => ({
          title: event.title,
          start: new Date(event.start_datetime),
          end: new Date(event.end_datetime),
          description: event.description,
          id: event.event_id,
          color: event.color_code,
          team_id: event.team_id
        }));
        setEvents(formattedEvents);
        //console.log(data);
        // setDescription(formattedEvents.description)
      })
      .catch(error => console.error('Error fetching events: ', error));
  }, [editedEvent]);
 //console.log('all data: ', allData)

 const openModal = async (event) => {
  try {
    setSelectedEvent(event);
    setIsModalOpen(true);

    let modalEvent = events.find((thisEvent) => thisEvent.id == event.event.id);

    // Check if the selected event has a user_id assigned
    if (modalEvent && modalEvent.team_id !== null) {
      await handleTeamEvent(modalEvent.team_id);
    }

    //console.log('event: ', event);
    //console.log('event id: ', event.event.id);
    //console.log(selectedEvent);
  } catch (error) {
    console.error('Error opening modal:', error);
    // Handle error
  }
}

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
    setEventId( selectedEvent.event.id)
    // setColor(selectedEvent.event.backgroundColor)
    setOldTitle(selectedEvent.event.title);
    setOldDescription(selectedEvent.event.extendedProps.description);
    setOldStartDateTime(selectedEvent.event.start);
    setOldEndDateTime(selectedEvent.event.end);

  };

  const handleSaveClick = () => {
    const editedEventData = {
      id: eventId,
      title: title,
      start: startDateTime,
      end: endDateTime,
      description: description
    };

    if (
      oldTitle !== editedEventData.title ||
      oldDescription !== editedEventData.description ||
      oldStartDateTime !== editedEventData.startDateTime ||
      oldEndDateTime !== editedEventData.endDateTime
    ) {
      // Update newNoticeData
      var newBody = `Event '${oldTitle}' has been updated.\n\nChanges:\n\nTitle: ${oldTitle} -> ${title}\nDescription: ${oldDescription} -> ${description}\nStart Date and Time: ${oldStartDateTime} -> ${startDateTime}\nEnd Date and Time: ${oldEndDateTime} -> ${endDateTime}`;
    }

    // If the event does not have a user_id assigned, send new notices
    if (!selectedEvent.user_id) {
      // Loop through each team member ID and trigger sendNewNotice function
      Object.values(teamMemberIDs).forEach(teamMemberId => {
        const noticeData = {
          submitter_id: cookies.userID,
          body: newBody,
          notice_type: 4,
          event_id: null,
          recipient_id: teamMemberId.user_id
        };
        sendNewNotice(noticeData);
      });
    }

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
      //console.log('Edit Successful:', data, editedEventData);
      setIsEditing(false);
      //window.location.reload();
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
    //console.log('button 2 clicked');
  };

  const handleStartDateChange = (date) => {
    //console.log(date)
    const utcStartDate = date.toISOString();
    //console.log('utc time: ', utcStartDate)
    setStartDateTime(date);
    //console.log('start date time: ',startDateTime)
  };

  const handleEndDateChange = (date) => {
    setEndDateTime(date);
  };

  const sendNewNotice = (noticeData) => {
    fetch('http://localhost:8080/api/notices/auto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noticeData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .catch(error => {
        console.error('Error adding new notice:', error);
        alert('Error adding new notice. Please try again.');
      });
  };

  const handleTeamEvent = async (teamId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/teammembers/${teamId}`)
      const data = await response.json();
      setTeamMemberIDs(data);
    } catch (error) {
      console.error('Error fetching team member user IDs:', error);
    }
  };

  return (
    <>
      <div className="calendar" style={{ paddingInline: '50px' }}>
        <h1 style={{ color: '#c1c1c1' }}> {cookies.firstName} {cookies.lastName}'s Calendar</h1>
        <Fullcalendar
          plugins={[dayGridPlugin, timeGridPlugin, multiMonthPlugin, interactionPlugin, bootstrap5Plugin]}
          initialView={'dayGridMonth'}
          headerToolbar={{
            start: "today prev,next",
            center: 'title',
            end: 'timeGridWeek,dayGridMonth,multiMonthYear'
          }}
          views = {{
            timeGridWeek: {
              buttonText: 'Week',
              slotDuration: '01:00',
              expandRows: true
            },
            dayGridMonth: {
              buttonText: 'Month',
              // duration: {days: 35}
              fixedWeekCount: false,
              showNonCurrentDates: false
            },
            multiMonthYear: {
              buttonText: 'Year',
            }
          }}
          // fixedWeekCount = 'false'
          // showNonCurrentDates = 'false'
          themeSystem= 'bootstrap5'
          eventClick={openModal}
          nowIndicator='true'
          dayMaxEvents='true'
          selectable='true'
          handleWindowResize='true'
          aspectRatio='2'
          // multiMonthMaxColumns='12'
          events={events}
          eventContent={(eventInfo) => {
            return (
              <div style={{ backgroundColor: `#${eventInfo.event.backgroundColor}`}}>
                {eventInfo.timeText} - {eventInfo.event.title}
              </div>
            );
          }}
          // eventContent={(eventInfo) => {
          //   return {
          //     ...eventInfo,
          //     backgroundColor: eventInfo.event.backgroundColor
          //   }
          // }}


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

