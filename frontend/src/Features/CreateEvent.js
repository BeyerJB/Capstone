import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { useCookies } from 'react-cookie'

export const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    team_id: '',
    description: '',
    event_type: ''
  });
  const [teamFormData, setTeamFormData] = useState({ team_id: '' });
  const [teamOptions, setTeamOptions] = useState([]);
  const [eventTypeData, setEventTypeData] = useState({ event_type: '' });
  const [eventTypeOptions, setEventTypeOptions] = useState([]);
  const [checkedBox, setCheckedBox] = useState(false);
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank', 'supervisorID']);
  const [newNoticeData, setNewNoticeData] = useState({ submitter_id: cookies.userID, body: '', notice_type: 4, event_id: 0, recipient_id: cookies.supervisorID });

  const handleCheckbox = () =>
    setCheckedBox(!checkedBox);
  //console.log('All day event checked?', checkedBox);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setTeamFormData({
      ...teamFormData,
      [name]: value
    });
    setEventTypeData({
      ...eventTypeData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //CHECK TO SEE IF CRITICAL VALUES HAVE BEEN LEFT BLANK, IF SO, RETURN WITH AN ALERT

    //IF THE TIME IS EMPTY, CONCAT ZEROS INTO THE DATETIME
    var startDateTime;
    var endDateTime;
    if (formData.start_time == "") {
      startDateTime = `${formData.start_date}T06:00:00`;
      endDateTime = `${formData.end_date}T06:00:00`;

    } else {
      startDateTime = `${formData.start_date}T${formData.start_time}:00`;
      endDateTime = `${formData.end_date}T${formData.end_time}:00`;
    }

    var UTCDATESTART = new Date(startDateTime);
    var UTCDATEEND = new Date(endDateTime);

    //UTCDATESTART.toISOString()
    //UTCDATEEND.toISOString()


    //console.log("DATE LOOKS LIKE: ", UTCDATE);
    //console.log("DATATYPE IS: ", typeof UTCDATE);
    //console.log("ISOString CONVERSION: ", UTCDATE.toISOString());

    //console.log(`CURRENT TIME STRINGS ARE ${formData.start_date} AND ${formData.start_time}`);



    //DIAGNOSTIC LOGGING TO CHECK USER INPUT VARIABLES
    // console.log('USING THE FOLLOWING DATA FOR SUBMISSION:', formData);
    // console.log("CONCAT START STRING: ",startDateTime);
    // console.log("CONCAT END STRING: ",endDateTime);
    // console.log("ALLDAY FLAG: ", checkedBox);

    //PUSH USER VALUES TO API
    async function sendData() {
      //console.log("TEAM DATA IS: ", teamFormData);
      //console.log("EVENT TYPE DATA IS: ", eventTypeData);

      //NULLIFY teamFormData.team_id IF SELECTED FEILD IS "Just Me"
      //console.log("TEAM ID: ", teamFormData.team_id);
      if (teamFormData.team_id == "Just Me") {
        setTeamFormData({
          ...teamFormData.team_id = null
        });
        //console.log("NULLIFIED VALUE: ", teamFormData.team_id);
      }

      try {
        const res = await fetch("http://localhost:8080/create_event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            //start_datetime: startDateTime,
            //end_datetime: endDateTime,
            start_datetime: UTCDATESTART.toISOString(),
            end_datetime: UTCDATEEND.toISOString(),
            all_day: checkedBox,
            team_id: teamFormData.team_id,
            user_id: cookies.userID,
            event_type: eventTypeData.event_id,
            creator_id: cookies.userID
          }),
        });
        const eventData = await res.json();
        console.log(eventData);
        await setNewNoticeData({ submitter_id: cookies.userID, body: `Event Request: ${formData.title}`, notice_type: 4, event_id: eventData.new_event_id.event_id });
        window.location.href = "http://localhost:3000/mycalendar";
      } catch (error) {
        console.error("Error submitting event:", error);
      }
    };
  sendData();
};

useEffect(() => {
  async function fetchData() {
    try {
      const res = await fetch(`http://localhost:8080/calendar_team/userid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: cookies.userID }),
      });
      const userTeams = await res.json();
      console.log("RETRIEVED TEAMS ARE: ", await userTeams);

      //GENERATE DROPDOWN BOX OPTIONS BASED ON RETRIEVED TEAMS
      const additionalOptions = userTeams.map((team, index) => (
        <option key={index} value={team.team_id}>{team.name}</option>
      ));
      setTeamOptions(additionalOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  fetchData();
}, []);

useEffect(() => {
  async function fetchData() {
    try {
      //const user_id = 3;
      const res = await fetch("http://localhost:8080/event_type");
      const eventType = await res.json();
      //console.log("RETRIEVED EVENTS ARE: ", eventType);

      //GENERATE DROPDOWN BOX OPTIONS BASED ON RETRIEVED EVENTS
      const additionalOptions = eventType.map((event, index) => (
        <option key={index} value={event.event_id}>{event.name}</option>
      ));
      setEventTypeOptions(additionalOptions);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  fetchData();
}, []);

useEffect(() => {
  if (newNoticeData.event_id !== 0 && newNoticeData.body !== '') {
    handleNewNotice();
  }
}, [newNoticeData]);

const handleNewNotice = () => {
  fetch('http://localhost:8080/api/notices/auto', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newNoticeData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNewNoticeData({ submitter_id: cookies.userID, body: '', notice_type: 4, event_id: 0, recipient_id: cookies.supervisorID });
    })
    .catch(error => {
      console.error('Error adding new notice:', error);
      alert('Error adding new notice. Please try again.');
    });
};

return (
  <Form onSubmit={handleSubmit} >
    <h2>Create Event Request</h2>
    <Row>
      <h6 style={{ marginTop: '15px' }}>Event Title & Type </h6>
      <Col xs={{ span: 4, offset: 0 }}>
        <Form.Control
          type="text"
          placeholder="Enter event title"
          name="title"
          value={formData.title}
          onChange={handleInputChange} />
      </Col>

      <Col xs={4}>
        <Form.Select
          value={eventTypeData.event_id}
          onChange={handleInputChange}
          name="event_id">
          <option>Event type</option>
          {eventTypeOptions}
        </Form.Select>
      </Col>
    </Row>

    <Row>
      <h6 style={{ marginTop: '15px' }}>Start Date & Time</h6>
      <Col xs={{ span: 4, offset: 0 }}>
        <Form.Control
          type="date"
          placeholder="start"
          name="start_date"
          value={formData.start_date}
          onChange={handleInputChange} />
      </Col>

      <Col xs={4}>
        <Form.Control
          type="time"
          placeholder="Start Time"
          name="start_time"
          value={formData.start_time}
          onChange={handleInputChange} />
      </Col>
    </Row>

    <Row>
      <h6 style={{ marginTop: '15px' }}>End Date & Time </h6>
      <Col xs={{ span: 4, offset: 0 }}>
        <Form.Control
          type="date"
          placeholder="YYYY-MM-DD"
          name="end_date"
          value={formData.end_date}
          onChange={handleInputChange} />
      </Col>

      <Col xs={4}>
        <Form.Control
          type="time"
          placeholder="End Time"
          name="end_time"
          value={formData.end_time}
          onChange={handleInputChange} />
      </Col>
    </Row>

    <Row>
      <h6 style={{ marginTop: '15px' }}>Team </h6>
      <Col xs={{ span: 4, offset: 0 }}>
        <Form.Select
          value={teamFormData.team_id}
          onChange={handleInputChange}
          name="team_id">
          <option>Select a Team</option>
          <option>Just Me</option>
          {teamOptions}
        </Form.Select>
      </Col>

      <Col>
        <Form.Check
          type="checkbox"
          label="All Day"
          name="all_day"
          checked={checkedBox}
          onChange={handleCheckbox} />
      </Col>
    </Row>

    <Row>
      <h6 style={{ marginTop: '15px' }}>Description </h6>
      <Col xs={{ span: 8, offset: 0 }} >
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleInputChange} />
      </Col>
    </Row>

    <Row>
      <Col xs={{ span: 1, offset: 0 }}>
        <Button style={{ marginTop: '20px' }} variant="dark" type="submit">
          Submit
        </Button>
      </Col>
    </Row>
  </Form>
);
}
