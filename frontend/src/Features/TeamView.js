import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

export const TeamView = () => {
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
        resources={[
            {id: "a",
            title: "Team A",
            children:[
              {
                id: "a1",
                title: "my Guardian 1",
              },
              {
                id: "a2",
                title: "my Guardian 2",
              },
              {
                id: "a3",
                title: "my Guardian 3",
              },
              {
                id: "a4",
                title: "my Guardian 4",
              },
              {
                id: "a5",
                title: "my Guardian 5",
              },
              {
                id: "a6",
                title: "my Guardian 6",
              },
              {
                id: "a7",
                title: "my Guardian 7",
              },
              {
                id: "a8",
                title: "my Guardian 8",
              },
              {
                id: "a9",
                title: "my Guardian 9",
              }
            ],
          },
          {id: "b",
          title: "Team B",
          children:[
            {
              id: "b1",
              title: "my Guardian 10",
            },
            {
              id: "b2",
              title: "my Guardian 11",
            },
            {
              id: "b3",
              title: "my Guardian 12",
            },
            {
              id: "b4",
              title: "my Guardian 13",
            },
            {
              id: "b5",
              title: "my Guardian 14",
            },
            {
              id: "b6",
              title: "my Guardian 15",
            },
            {
              id: "b7",
              title: "my Guardian 16",
            },
          ]
        }

        ]}
        events={[
          {
            title: 'Leave',
            start: '2024-04-22T10:00:00',
            end: '2024-04-25T14:00:00',
            resourceId: 'a1'
          },
          {
            title: 'SupraCoders',
            start: '2024-04-25T09:00:00',
            end: '2024-04-28T17:00:00',
            resourceId: 'a2'
          },
        ]}
      />
    </div>
  );
};
