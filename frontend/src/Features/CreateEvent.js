import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import DatePicker from "react-datepicker";
import { useCookies } from 'react-cookie';
import '../CSS/CreateEvent.css'

export const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    team_id: '',
    description: '',
    event_type: ''
  });

  const [teamFormData, setTeamFormData] = useState({ team_id: '' });
  const [teamOptions, setTeamOptions] = useState([]);
  const [eventTypeData, setEventTypeData] = useState({ event_type: '' });
  const [eventTypeOptions, setEventTypeOptions] = useState([]);
  const [checkedBox, setCheckedBox] = useState(false);
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank', 'isManager']);
  const [newNoticeData, setNewNoticeData] = useState({ submitter_id: cookies.userID, body: '', notice_type: 4, event_id: 0 });
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const handleCheckbox = () =>
    setCheckedBox(!checkedBox);

  const handleStartDateChange = (date) => {
    setStartDate(date)
  }

  const handleEndDateChange = (date) => {
    setEndDate(date)
  }

  const handleInputChange = (e) => {
    //console.log('Test: ', e)
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

    // console.log('Team Form Data: ', teamFormData)
    // console.log('Team Options: ', teamOptions)
    // console.log('Event Type: ', eventTypeData)
    // console.log('Event Type Options: ', eventTypeOptions)
    // console.log('Checkbox: ', checkedBox)
    // console.log('Cookies: ', cookies)
    // console.log('Notice: ', newNoticeData)


    if ((startDate < endDate) == false) {
      alert("Please select a beginning date that is earlier than the end date.");
      return;
    }

    // console.log('All form Data: formData: ', formData)
    // console.log('Start Date: ', startDate);
    // console.log('End Date: ', endDate)

    //PUSH USER VALUES TO API
    async function sendData() {
      //NULLIFY teamFormData.team_id IF SELECTED FEILD IS "Just Me"
      if (teamFormData.team_id == "Just Me") {
        setTeamFormData({
          ...teamFormData.team_id = null
        });
      }

      try {
        const res = await fetch("http://localhost:8080/create_event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            start_datetime: startDate,
            end_datetime: endDate,
            all_day: checkedBox,
            team_id: teamFormData.team_id,
            user_id: cookies.userID,
            event_type: eventTypeData.event_id,
            creator_id: cookies.userID,
            approved: (cookies.isManager ? true : false),
            pending: (cookies.isManager ? false : true)
          }),
        });
        const eventData = await res.json();
        console.log(eventData);
        if (!cookies.isManager) {
          await setNewNoticeData({ submitter_id: cookies.userID, body: `Event Request: ${formData.title}`, notice_type: 4, event_id: eventData.new_event_id.event_id });
        }
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
        //console.log("RETRIEVED TEAMS ARE: ", await userTeams);

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
        const res = await fetch("http://localhost:8080/event_type");
        const eventType = await res.json();

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
        setNewNoticeData({ submitter_id: cookies.userID, body: '', notice_type: 4, event_id: 0 });
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
            required
            type="text"
            placeholder="Enter event title"
            name="title"
            value={formData.title}
            onChange={handleInputChange} />
        </Col>

        <Col xs={4}>
          <Form.Select
            required
            value={eventTypeData.event_id}
            onChange={handleInputChange}
            name="event_id">
            <option value="">Event type</option>
            {eventTypeOptions}
          </Form.Select>
        </Col>
      </Row>

      <Row>
        <Col xs={{ span: 4, offset: 0 }}>
        <h6 style={{ marginTop: '15px' }}>Start Date & Time</h6>
        <DatePicker
            className="datepicker"
            selected={startDate}
            onChange={handleStartDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm"
            placeholderText="  Select Start"
            value={startDate}
            required 
          />
        </Col>
        
        <Col xs={4}>
        <h6 style={{ marginTop: '15px' }}>End Date & Time</h6>
        <DatePicker
            className="datepicker"
            selected={endDate}
            onChange={handleEndDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm"
            placeholderText="  Select End"
            value={endDate}
            required 
          />
        </Col>
      </Row>

      <Row>
        <h6 style={{ marginTop: '15px' }}>Team </h6>
        <Col xs={{ span: 4, offset: 0 }}>
          <Form.Select
            required
            value={teamFormData.team_id}
            onChange={handleInputChange}
            name="team_id">
            <option value="">Select A Team</option>
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
            required
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