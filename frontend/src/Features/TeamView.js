import React, { useState, useEffect} from "react";
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
import '../CSS/TeamView.css'


export const TeamView = () => {
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([])
  const [resourceInfo, setResourceInfo ] = useState([])



  useEffect(() => {
    fetch(`http://localhost:8080/api/teamview`)
      .then(result => result.json())
      .then((result) => setResourceInfo(result)

    )}, [])

  // useEffect(() => {
  //   fetch(`http://localhost:8080/api/teamview`)
  //     .then(res => res.json())
  //     .then(jsonRes => setTeamEvents(jsonRes))
  // }, [])


  // useEffect(() => {
  //   fetch(`http://localhost:8080/api/teamview`)
  //     .then(res => res.json())
  //     .then(jsonRes => setTeamEvents(jsonRes))
  // }, [])


const modifyUsers = (users) => {
    return Object.groupBy(users, user => user.team_name)

}


const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);

  };

const closeModal = () => {
    setIsModalOpen(false);
  };

const handleGuardianClick = (info) => {
      const filteredGuardian = {
      resourceid: info.el.dataset.resourceId,
      title: info.fieldValue,
      team_name: 'A FilteredUsers'
      }
    setFilteredUsers([...filteredUsers, filteredGuardian])
  }




  return (
    <div className="teamview-calendar">
      {resourceInfo.users ?
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          resourceTimelinePlugin,
        ]}
        initialView="TenDay"

        headerToolbar={{
          left: "today prev,next",
          center: "",
          right:
            "resourceTimelineDay,TenDay,resourceTimelineMonth,resourceTimelineYear",
        }}
        views = {{
          //dayView
          resourceTimelineDay: {
            buttonText: 'Day',
            slotLabelFormat :[
              {weekday: 'short', day: 'numeric', month:'long', year: 'numeric'},
              {hour: '2-digit',minute: '2-digit',hour12: false}
            ],
            slotDuration: '00:30'
          },
          //TenDay View
          TenDay: {
            type: 'resourceTimeline',
            duration: { days: 10 },
            buttonText: '10 days',
            slotDuration: '06:00',
            slotLabelFormat:[
              {weekday: 'short',day: 'numeric'},
              {hour: '2-digit',minute: '2-digit',hour12: false}
            ]},
            //Year View
            resourceTimelineYear: {
              buttonText: 'Year',
              slotLabelFormat:[
                {month: 'long', year:'numeric'},
                {weekday:'short', day: 'numeric'
              }]
            },
            //MonthView
            resourceTimelineMonth: {
              buttonText: 'Month',
              slotLabelFormat: [
                {month: 'long', year:'numeric'},
                {weekday: 'short',day: 'numeric'}
              ]
            }
                  }}
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        timeZone="UTC"
        height="90vh"
        contentHeight= 'auto'
        scrollTime="00:00"
        aspectRatio={2}
        nowIndicator = {true}
        editable={false}
        eventClick={openModal}
        resourceAreaHeaderContent="Guardians"
        resourceAreaWidth = "10vw"
        resources={
          resourceInfo.teams.map(team => ({
             id: team.team_id,
             title: team.name,
                children: (resourceInfo.users.filter(user => user.team_id === team.team_id)).map(user => ({
                  id: `${user.team_name}${user.user_id}`,
                  title: `${user.rank} ${user.first_name} ${user.last_name}`
             })),
          }))
         }
        events={[
              ...resourceInfo.teamEvents.map(event => ({
                resourceId:event.team_id,
                title:event.title,
                start: event.start_datetime,
                end:event.end_datetime
            })),
              ...resourceInfo.userEvents.map(event => ({
              resourceId: `${event.name}${event.user_id}`,
              title:event.title,
              start:event.start_datetime,
              end:event.end_datetime

            }))
          ]}
          resourceLabelDidMount={(info) => {
            info.el.addEventListener("click", function() {
                // handleGuardianClick(info)
                console.log('clicked', info.fieldValue, 'id:', info.el.dataset.resourceId,'allinfo:', info )
            })}}
      />
      : <></>
        }
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
            {console.log('resourceInfo', resourceInfo)}
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


  usersByTeam.map(team => ({
    id: team.team_id,
    title: team.team_name,
    children: users.filter(user => user.team_id === team.team_id),
  }));

{
    "users": [
        {
            "team_id": 1,
            "team_name": "Team A",
            "first_name": "John",
            "last_name": "Doe",
            "rank": "SMSgt"
        }
      ],
      "userEvents": [
        {
            "user_id": 1,
            "title": "Meeting 1",
            "start_datetime": "2024-04-19T10:00:00.000Z",
            "end_datetime": "2024-04-19T11:00:00.000Z",
            "all_day": false,
            "description": "Weekly team meeting",
            "event_type": "Meeting"
        }
      ],
      ["teamEvents": [
        {
            "team_id": 1,
            "team_name": "Team A",
            "title": "Meeting 2",
            "start_datetime": "2024-04-22T11:00:00.000Z",
            "end_datetime": "2024-04-22T12:00:00.000Z",
            "all_day": false,
            "description": "Weekly team meeting",
            "event_type": "Meeting"
        }
      ]

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
*/

