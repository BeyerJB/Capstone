import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { useCookies } from 'react-cookie'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


export const TeamView = () => {
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank']);
  const [ teamEvents, setTeamEvents ] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);


  useEffect(() => {
    console.log("cookie id", `http://localhost:8080/api/teamview/${cookies.userID}`)
    fetch(`http://localhost:8080/api/teamview/${cookies.userID}`)
      .then(res => res.json())
      .then(jsonRes => setTeamEvents(jsonRes))
  }, [cookies.userID])

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="calendar">
      <h1>Team Calendar</h1>
      <FullCalendar

        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          resourceTimelinePlugin,
        ]}
        initialView="resourceTimelineDay"
        headerToolbar={{
          left: "today prev,next",
          center: "title",
          right:
            "resourceTimelineDay,TenDay,resourceTimelineMonth,resourceTimelineYear",
        }}
        views = {{
          resourceTimelineDay: {
            buttonText: 'Day',
            slotLabelFormat :{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
              },
            slotDuration: '00:30'
          },
          TenDay: {
            type: 'resourceTimeline',
            duration: { days: 10 },
            buttonText: '10 days',
            slotDuration: '06:00',
            slotLabelFormat:[
              {
              weekday: 'short',
              day: 'numeric',
              },{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
              }
            ]

          }
        }}
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        timeZone="UTC"
        height="60vh"
        scrollTime="00:00"
        aspectRatio={2}
        nowIndicator = {true}
        editable={false}
        eventClick={openModal}
        resourceAreaHeaderContent="Guardians"
        resourceAreaWidth = "15vw"
        resourceGroupField= 'team_name'
        resources={
            teamEvents.map(user => {
              return ({
                id: user.user_id,
                title: `${user.rank} ${user.first_name} ${user.last_name}`,
                team_name : user.team_name
              })
            })
        }
        events={
          teamEvents.map(user => {
            return ({
              resourceId: user.user_id,
              title: user.title,
              start: user.start_datetime,
              end: user.end_datetime,
              allDay: user.all_day,
              description: user.description,
              event_type: user.event_type,

            })
          })
      }
      />
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
    </div>
  );
};

/*
{
    "id": "a",
    "title": "1st Squad",
    "children": [
      {
        "id": "a1",
        "title": "Room D1"
      },
      {
        "id": "a2",
        "title": "Room D2"
        "eventColor": "orange"
      }
    ]
  },


  const teams = {
    teamname: knex(calendar_teams)
    .select('name')
    members: {
      knex(calendar_users)
      .select("name rank kdalkkjld")
      .where("")
    }
  }

*/