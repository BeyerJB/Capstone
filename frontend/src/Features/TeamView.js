import React, { useState, useEffect, useContext} from "react";
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
import {NotificationsContext} from './NotificationContext'

export const TeamView = () => {
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank', 'isManager']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const {comparedGuardian, setComparedGuardian} = useContext(NotificationsContext);
  const [resourceInfo, setResourceInfo ] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [eventId, setEventId] = useState(null);

  const [oldStartDateTime, setOldStartDateTime] = useState('');
  const [oldEndDateTime, setOldEndDateTime] = useState('');
  const [oldTitle, setOldTitle] = useState('');
  const [oldDescription, setOldDescription] = useState('');
  const [teamMemberIDs, setTeamMemberIDs] = useState({});
  const [userIDNotice, setUserIDNotice] = useState(null);
  const [teamIDNotice, setTeamIDNotice] = useState(null);


  useEffect(() => {
    fetch(`http://localhost:8080/api/teamview`)
      .then(result => result.json())
      .then((result) => setResourceInfo(result)

    )}, [editedEvent])


const modifyUsers = (users) => {
    return Object.groupBy(users, user => user.team_name)

}


const openModal = async (event) => {
  setSelectedEvent(event);
  setIsModalOpen(true);

  console.log(resourceInfo)
  console.log(event.event.id)

  let userId = null;
  let teamId = null;

  // Check if the event exists in userEvents
  const userEvent = resourceInfo.userEvents.find(thisEvent => thisEvent.event_id == event.event.id);
  if (userEvent) {
      userId = userEvent.user_id;
  } else {
      // Check if the event exists in teamEvents
      const teamEvent = resourceInfo.teamEvents.find(thisEvent => thisEvent.event_id == event.event.id);
      if (teamEvent) {
          teamId = teamEvent.team_id;
      }
  }

  // If user_id or team_id is found, handle it
  if (userId !== null) {
      // Handle user event
      setUserIDNotice(userId);
      console.log("User event found with user_id:", userId);
      // Handle user event with the found user_id
  } else if (teamId !== null) {
      // Handle team event
      await setTeamIDNotice(teamId);
      await handleTeamEvent(teamId); // Use teamId directly here
      console.log("Team event found with team_id:", teamId);
      // Handle team event with the found team_id
  } else {
      console.log("Event not found in userEvents or teamEvents.");
  }
};


const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleEditClick = () => {
    setIsEditing(true);
    setTitle(selectedEvent.event.title)
    setDescription(selectedEvent.event.extendedProps.description)
    setStartDateTime(selectedEvent.event.start)
    setEndDateTime(selectedEvent.event.end)
    setEventId(selectedEvent.event.id)

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
    var changes = [];

    if (oldTitle !== editedEventData.title) {
        changes.push(`Title: ${oldTitle} -> ${editedEventData.title}`);
    }

    if (oldDescription !== editedEventData.description) {
        changes.push(`Description: ${oldDescription} -> ${editedEventData.description}`);
    }

    if (oldStartDateTime !== editedEventData.startDateTime) {
        changes.push(`Start Date and Time: ${oldStartDateTime} -> ${editedEventData.startDateTime}`);
    }

    if (oldEndDateTime !== editedEventData.endDateTime) {
        changes.push(`End Date and Time: ${oldEndDateTime} -> ${editedEventData.endDateTime}`);
    }

    let newBody = `Event '${oldTitle}' has been updated.\n\nChanges:\n\n${changes.join('\n')}`;

    // If the event does not have a user_id assigned, send new notices
    if (teamIDNotice) {
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
    } else {
      const noticeData = {
        submitter_id: cookies.userID,
        body: newBody,
        notice_type: 4,
        event_id: null,
        recipient_id: userIDNotice
      };
      sendNewNotice(noticeData);
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
      console.log('Edit Successful:', data, editedEventData);
      setIsEditing(false);
      window.location.reload();
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



// console.log('outsidefunction', comparedGuardian)

  // const handleGuardianClick = (info) => {
  //   const guardianIndex = comparedGuardian.findIndex(guardian => guardian.id === info.resource.id )
  //   console.log('insidefunction', comparedGuardian)
  //   console.log(info.resource.id)

  //   console.log(guardianIndex)
  //   if ((info.resource.id).length > 4 && guardianIndex === -1) {
  //       setComparedGuardian(comparedGuardian => [...comparedGuardian, {id: info.resource.id, title: info.fieldValue}])
  //     } else {
  //       setComparedGuardian(comparedGuardian => comparedGuardian.filter(guardian =>!(guardian.id === info.resource.id)));
  //     }
  //  }


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
        //contentHeight= 'auto' ---> this changes the scrollibility
        scrollTime="00:00"
        aspectRatio={2}
        nowIndicator = {true}
        editable={false}
        eventClick={openModal}
        resourceAreaHeaderContent="Guardians"
        resourceAreaWidth = "10vw"
        resources={
          // {
          //   id : "01. ComparedGuardians",
          //   title: 'Compared Guardians',
          //   children: comparedGuardian.map(guardian => ({
          //     id: guardian.id,
          //     title:guardian.title
          //   }))
          // },
          resourceInfo.teams.map(team => ({
             id: team.team_id,
             title: team.name,
                children: (resourceInfo.users.filter(user => user.team_id === team.team_id)).map(user => ({
                  id: `${user.team_name}${user.user_id}`,
                  title: `${user.rank} ${user.first_name} ${user.last_name}`
             }))

          }))


        }
        events={[
              ...resourceInfo.teamEvents.map(event => ({
                resourceId:event.team_id,
                id:event.event_id,
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
              id:event.event_id,
              title:event.title,
              start: event.start_datetime,
              end:event.end_datetime,
              description:event.description,
              allDay: event.all_day,
              backgroundColor:`#${event.color_code}`,
              borderColor: `#${event.color_code}`
            }))
          ]}
          // resourceLabelDidMount={(info) => {
          //   info.el.addEventListener("click", () => {
          //     console.log(info)
          //     handleGuardianClick(info)
          //   }
          //   )}}
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
              {isModalOpen ?
                  <>
                   {selectedEvent.event.allDay != null ?
                    <>
                    <h4>Event Times:</h4>
                    <p>All Day</p>

                    <h4>Description:</h4>
                    <p> {selectedEvent ? selectedEvent.event.extendedProps.description : ''}</p>
                    </>
                  :
                    <>
                      <h4>Event Times:</h4>
                      <p>Start: {selectedEvent ? `${selectedEvent.event.start}` : ''}</p>
                      <p>End: {selectedEvent ? `${selectedEvent.event.end}` : ''}</p>
                      <h4>Description:</h4>
                      <p> {selectedEvent ? selectedEvent.event.extendedProps.description : ''}</p>
                    </>
                  }
                  </>
                :
                  <>
                  </>

              }
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

