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
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank']);

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


      const res = await fetch("http://localhost:8080/create_event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          start_datetime: startDateTime,
          end_datetime: endDateTime,
          all_day: checkedBox,
          team_id: teamFormData.team_id,
          user_id: cookies.userID,
          event_type: eventTypeData.event_id,
          creator_id: cookies.userID
        }),
      });
      window.location.href = "http://localhost:3000/mycalendar"

    }
    sendData();

  };

  useEffect(() => {
    async function fetchData() {
      try {
        const user_id = 3;
        const res = await fetch("http://localhost:8080/calendar_team/userid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: user_id }),
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
        const user_id = 3;
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

  return (
    <Form onSubmit={handleSubmit} style={{ marginTop: '15px' }}>

      <Row className="mb-2">
        <Col xs={{ span: 1, offset: 3 }}>
          <Form.Label style={{ marginTop: '10px' }}> Event Title & Type</Form.Label>
        </Col>
        <Col xs={{ span: 2, offset: 0 }}>
          <Form.Control
            type="text"
            placeholder="Enter event title"
            name="title"
            value={formData.title}
            onChange={handleInputChange} />
        </Col>

        <Col xs={2}>
          <Form.Select
            value={eventTypeData.event_id}
            onChange={handleInputChange}
            name="event_id">

            <option>Event type</option>
            {eventTypeOptions}
          </Form.Select>
        </Col>
      </Row>

      <Row className = "mb-2">
        <Col xs={{ span: 1, offset: 3 }}>
          <Form.Label style={{ marginTop: '10px' }}>Start Date & Time</Form.Label>
        </Col>
        <Col xs={{ span: 2, offset: 0 }}>
          <Form.Control
            type="date"
            placeholder="start"
            name="start_date"
            value={formData.start_date}
            onChange={handleInputChange} />
        </Col>

        <Col xs={2}>
          <Form.Control
            type="time"
            placeholder="Start Time"
            name="start_time"
            value={formData.start_time}
            onChange={handleInputChange} />
        </Col>
      </Row>

      <Row className = "mb-2">
        <Col xs={{ span: 1, offset: 3 }}>
          <Form.Label style={{ marginTop: '10px' }}>End Date & Time</Form.Label>
        </Col>
        <Col xs={{ span: 2, offset: 0 }}>
          <Form.Control
            type="date"
            placeholder="YYYY-MM-DD"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange} />
        </Col>

        <Col xs={2}>
          <Form.Control
            type="time"
            placeholder="End Time"
            name="end_time"
            value={formData.end_time}
            onChange={handleInputChange} />
        </Col>
      </Row>

      <Row>
        <Col xs={{span:1, offset:3}}>   
        <Form.Label style={{ marginTop: '10px' }}> Team </Form.Label>
        </Col>
        <Col xs={{ span: 2, offset: 0 }}>
          <Form.Select
            value={teamFormData.team_id}
            onChange={handleInputChange}
            name="team_id">

            <option>Select a Team</option>
            <option>Just Me</option>
            {teamOptions}
          </Form.Select>
        </Col>

        <Col xs={1}>
          <Form.Check
            type="checkbox"
            label="All Day"
            name="all_day"
            checked={checkedBox}
            onChange={handleCheckbox} />
        </Col>
      </Row>

      <Row>
      <Col xs={{ span: 1, offset: 3 }}>
        <Button style={{ marginTop: '50px' }} type="submit" className="mb-2">
          Submit
        </Button>
      </Col>
      <Col xs={{ span: 4, offset: 0 }}>
        <Form.Label>Description</Form.Label>
        <br />
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleInputChange} />
      </Col>
      </Row>


      
    </Form>
  );
}
