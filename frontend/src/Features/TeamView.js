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
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const TeamView = () => {
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([])
  const [resourceInfo, setResourceInfo ] = useState([])
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null)
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [eventId, setEventId] = useState(null);


  useEffect(() => {
    fetch(`http://localhost:8080/api/teamview`)
      .then(result => result.json())
      .then((result) => setResourceInfo(result)

    )}, [editedEvent])


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
  const handleEditClick = () => {
    setIsEditing(true);
    setTitle(selectedEvent.event.title)
    setDescription(selectedEvent.event.extendedProps.description)
    setStartDateTime(selectedEvent.event.start)
    setEndDateTime(selectedEvent.event.end)
    setEventId(selectedEvent.event.eventId)

  };

  const handleSaveClick = () => {
    const editedEventData = {
      id: eventId,
      title: title,
      start: startDateTime,
      end: endDateTime,
      description: description
    };
    console.log(editedEventData)
    // fetch('http://localhost:8080/edit_event', {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json' cx
    //   },
    //   body: JSON.stringify(editedEventData)
    // })
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error('Failed to edit event');
    //   }
    //   return response.json();
    // })
    // .then(data => {
    //   console.log('Edit Successful:', data, editedEventData);
    //   setIsEditing(false);
    //   window.location.reload();
    // })
    // .catch(error => {
    //   console.error('Error editing event:', error);
    //   // Handle error
    // });

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

  const handleStartDateChange = (date) => {
    console.log(date)
    const utcStartDate = date.toISOString();
    console.log('utc time: ', utcStartDate)
    setStartDateTime(date);
    console.log('start date time: ',startDateTime)
  };

  const handleEndDateChange = (date) => {
    setEndDateTime(date);
  };



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
        timeZone="local"
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
                eventId:event.event_id,
                title:event.title,
                start: event.start_datetime,
                end:event.end_datetime,
                description:event.description,
                allDay: event.all_day,
                backgroundColor: `#${event.color_code}`,
                borderColor: `#${event.color_code}`
            })),
              ...resourceInfo.userEvents.map(event => ({
              resourceId: `${event.name}${event.user_id}`,
              eventId:event.event_id,
              title:event.title,
              start: event.start_datetime,
              end:event.end_datetime,
              description:event.description,
              allDay: event.all_day,
              backgroundColor:`#${event.color_code}`,
              borderColor: `#${event.color_code}`
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

