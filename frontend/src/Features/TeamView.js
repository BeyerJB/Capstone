import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { useCookies } from 'react-cookie'

export const TeamView = () => {
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank']);
  const [ teamEvents, setTeamEvents ] = useState([])

  useEffect(() => {
    console.log("cookie id", `http://localhost:8080/api/teamview${cookies.userID}`)
    fetch(`http://localhost:8080/api/teamview${cookies.userID}`)
      .then(res => res.json())
      .then(jsonRes => setTeamEvents(jsonRes))
  }, [cookies.userID])

  console.log(teamEvents)

  return (
    <div className="calendar">
      <h1>My Calendar</h1>
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
            slotDuration: {days : 1},
            slotLabelFormat:{
              weekday: 'short',
              day: 'numeric',
            }
          }
        }}
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        timeZone="UTC"
        height="60vh"
        scrollTime="00:00"
        aspectRatio={2}

        editable={true}
        resourceAreaHeaderContent="Guardians"
        resourceAreaWidth = "10vw"
        resources={
            teamEvents.map(user => {
              return ({
                id: user.user_id,
                title: `${user.rank} ${user.first_name} ${user.last_name}`
              })
            })
        }
        events={
          teamEvents.map(user => {
            return ({
              resourceId: user.user_id,
              title: `${user.title}`,
              start: `${user.start_datetime}`,
              end: `${user.end_datetime}`,
              allDay: user.all_day,
              description: `${user.description}`,
              event_type: `${user.event_type}`
            })
          })
      }
      />
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