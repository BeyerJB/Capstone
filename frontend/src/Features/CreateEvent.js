import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from "react-bootstrap";

export const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    start_date: '',
    end_date: '',
    start_time: '',
    end_time: '',
    team_id: '',
    description: '',
    event_type: '',
  });
  const [teamFormData, setTeamFormData] = useState({ team_id: '' });
  const [teamOptions, setTeamOptions] = useState([]);

  const [eventTypeData, setEventTypeData] = useState ({ event_type: ''});
  const [eventTypeOptions, setEventTypeOptions] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setTeamFormData({ ...formData, [e.target.name]: e.target.value });
    setEventTypeData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  //BEYERS STUFF

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
        console.log("RETRIEVED TEAMS ARE: ", userTeams);

        //GENERATE DROPDOWN BOX OPTIONS BASED ON RETRIEVED TEAMS
        const additionalOptions = userTeams.map((team, index) => (
          <option key={index} value={team.event_id}>{team.name}</option>
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
        console.log("RETRIEVED EVENTS ARE: ", eventType);

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

  //END OF BEYERS STUFF
  return (
  <Form onSubmit={handleSubmit}> 
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm ="2"> Event Title</Form.Label>
      <Col sm="10">
        <Form.Control 
          type="text"
          placeholder="Enter event title"
          name="title"
          value={formData.title}
          onChange={handleInputChange} />
      </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm ="2">Start Date</Form.Label>
      <Col sm="10">
        <Form.Control 
          type="date" 
          placeholder="YYYY-MM-DD"
          name="start_date"
          value={formData.start_date}
          onChange={handleInputChange} />
      </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm ="2">End Date</Form.Label>
      <Col sm="10">
        <Form.Control 
          type="date" 
          placeholder="YYYY-MM-DD"
          name="end_date"
          value={formData.end_date}
          onChange={handleInputChange} />
      </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm ="2">Start Time</Form.Label>
      <Col sm="10">
        <Form.Control 
          type="time" 
          placeholder="Start Time"
          name="start_time"
          value={formData.start_time}
          onChange={handleInputChange} />
      </Col>
    </Form.Group>

    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm ="2">End Time</Form.Label>
      <Col sm="10">
        <Form.Control 
          type="time" 
          placeholder="End Time"
          name="end_time"
          valie={formData.end_time}
          onChange={handleInputChange} />
      </Col>
    </Form.Group>

    {/* <Form.Group as={Row} className="mb-3">
      <Form.Label column sm ="2"> Team </Form.Label>
      <Col sm="10">
        <Form.Select
          value={formData.team_id}
          onChange={handleInputChange}
          name="team_id">

         <option>Select a Team</option>
         <option value ="Team A"> Team A </option>
         <option value ="Team B"> Team B </option>
        </Form.Select>
      </Col>
    </Form.Group> */}

{/* BEYERS MEDDLING */}
<Form.Group as={Row} className="mb-3">
      <Form.Label column sm="2"> Team </Form.Label>
      <Col sm="10">
        <Form.Select
          value={teamFormData.team_id}
          onChange={handleInputChange}
          name="team_id">

          <option>Select a Team</option>
          {teamOptions}
        </Form.Select>
      </Col>
    </Form.Group>
{/* END OF BEYERS MEDDLING */}

    <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <br />
        <Form.Control 
        as="textarea" 
        rows={3}
        name="description"
        value={formData.description}
        onChange={handleInputChange} />
    </Form.Group>

  {/* Paola MEDDLING */ }
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm="2"> Event Type </Form.Label>
      <Col sm="10">
        <Form.Select
          value={eventTypeData.event_id}
          onChange={handleInputChange}
          name="event_id">

          <option>Select an Event</option>
          {eventTypeOptions}
        </Form.Select>
      </Col>
    </Form.Group> 
{/* END OF PAOLA MEDDLING */}

    {/* <Form.Group as={Row} className="mb-3">
      <Form.Label column sm ="2"> Event Type</Form.Label>
      <Col sm="10">
        <Form.Select
          value={formData.event_type}
          onChange={handleInputChange}
          name="event_type">

         <option>Select an Event </option>
         <option value ="Meeting"> Meeting</option>
         <option value ="Training"> Training</option>
         <option value ="Holiday"> Holiday</option>
         <option value ="Leave"> Leave</option>
         <option value ="Other"> Other</option>
        </Form.Select>
      </Col>
    </Form.Group> */}

    <Col xs="auto">
      <Button type="submit" className="mb-2">
        Submit
      </Button>
    </Col>


  </Form>
  );
}
