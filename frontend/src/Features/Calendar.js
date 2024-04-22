import React from 'react';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import interactionPlugin from "@fullcalendar/interaction";

export const Calendar = () => {

  return(
    <>
    <div className="calendar">
    <h1>My Calendar</h1>
    <Fullcalendar
      plugins = {[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin]}
      initialView = {('dayGridMonth')}
      headerToolbar = {{
        start: "today prev,next",
        center: 'title',
        end: 'timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear'
      }}
      handleWindowResize = 'true'
      aspectRatio = '2'
      multiMonthMaxColumns= '12'
    />
    </div>
    </>
  )

}