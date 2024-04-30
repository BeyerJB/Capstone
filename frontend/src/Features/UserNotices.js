import React, { useState, useEffect, useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-tabs/style/react-tabs.css';
import '../CSS/UserNoticeModal.css';
import Button from 'react-bootstrap/Button';
import { useCookies } from 'react-cookie';
import { NotificationsContext } from './NotificationContext';

export const UserNotices = () => {
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank', 'isSupervisor', 'isManager']);
  const [submittedNotices, setSubmittedNotices] = useState([]);
  const [supervisorNotices, setSupervisorNotices] = useState([]);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [pendingAccounts, setPendingAccounts] = useState([]);
  const [newNoticeData, setNewNoticeData] = useState({ submitter_id: cookies.userID, recipient_id: cookies.supervisorID, body: '', notice_type: 1 });
  const [noticeUpdateData, setNoticeUpdateData] = useState({});
  const [eventUpdateData, setEventUpdateData] = useState({});
  const [accountUpdateData, setAccountUpdateData] = useState({});
  const [supervisorNoticeData, setSupervisorNoticeData] = useState([]);
  const { updateCount } = useContext(NotificationsContext);

  const [noticeTypeOptions] = useState([
    { value: 1, label: 'General' },
    { value: 2, label: 'Urgent' },
    { value: 3, label: 'Reminder' },
  ]);

  const fetchSupervisorNotices = () => {
    if (cookies.userID !== undefined) {
      fetch(`http://localhost:8080/api/notices/supervisor/${cookies.userID}`)
        .then(response => response.json())
        .then(data => {
          setSupervisorNotices(data);
          // setNoticeCount(prevCount => prevCount + data.length)
        })
        .catch(error => console.error('Error fetching supervisor notices:', error));
    }
  };

  const fetchSubmittedNotices = () => {
    if (cookies.userID !== undefined) {
      fetch(`http://localhost:8080/api/notices/submitter/${cookies.userID}`)
        .then(response => response.json())
        .then(data => {
          setSubmittedNotices(data);
          // setNoticeCount(prevCount => prevCount + data.length)
        })
        .catch(error => console.error('Error fetching submitted notices:', error));
    }
  };

  const fetchPendingEvents = async () => {
    if (cookies.userID !== undefined) {
      try {
        const response = await fetch(`http://localhost:8080/api/events/pending`);
        const data = await response.json();

        setPendingEvents(data);

        if (Array.isArray(data)) {
          const filteredData = data.filter(notice => notice.recipient_id === cookies.userID);
          setSupervisorNoticeData(filteredData);
          // setNoticeCount(prevCount => prevCount + data.length)
        } else {
          setSupervisorNoticeData([]);
        }
      } catch (error) {
        console.error('Error fetching submitted notices:', error);
      }
    }
  };

  const fetchPendingAccounts = () => {
    if (cookies.userID !== undefined) {
      fetch(`http://localhost:8080/api/accounts/pending`)
        .then(response => response.json())
        .then(data => {
          setPendingAccounts(data);
          // setNoticeCount(prevCount => prevCount + data.length)
        })
        .catch(error => console.error('Error fetching submitted notices:', error));
    }
    console.log(pendingAccounts)
  };

  useEffect(() => {
    fetchSupervisorNotices();
  }, []);

  useEffect(() => {
    fetchSubmittedNotices();
  }, []);

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  useEffect(() => {
    fetchPendingAccounts();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newValue = name === 'notice_type' ? parseInt(value, 10) : value;
    setNewNoticeData(prevData => ({
      ...prevData,
      [name]: newValue
    }));
  };

  const handleNewNotice = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/api/notices', {
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
        setNewNoticeData({ submitter_id: cookies.userID, recipient_id: cookies.supervisorID, body: '', notice_type: 1 });
        fetchSubmittedNotices();
      })
      .catch(error => {
        console.error('Error adding new notice:', error);
        alert('Error adding new notice. Please try again.');
      });
  };

  const handleAcceptNotice = (noticeId) => {
    setNoticeUpdateData({ request_id: noticeId, choice: 2 });
    fetchSupervisorNotices();
    updateCount()
  };

  const handleRejectNotice = (noticeId) => {
    setNoticeUpdateData({ request_id: noticeId, choice: 3 });
    fetchSupervisorNotices();
    updateCount()
  };

  const handleRejectEvent = (eventId) => {
    setEventUpdateData({ event_id: eventId, choice: false });
    fetchPendingEvents();
    updateCount()
  };

  const handleAcceptEvent = (eventId) => {
    setEventUpdateData({ event_id: eventId, choice: true });
    fetchPendingEvents();
    updateCount()
  };

  const handleRejectAccount = (userId) => {
    setAccountUpdateData({ user_id: userId, approved: false, pending: false });
    fetchPendingAccounts();
    updateCount()
  };

  const handleAcceptAccount = (userId) => {
    setAccountUpdateData({ user_id: userId, approved: true, pending: false });
    fetchPendingAccounts();
    updateCount()
  };

  useEffect(() => {
    if (noticeUpdateData.request_id !== undefined && noticeUpdateData.choice !== undefined) {
      handleUpdateNotice();
      fetchSupervisorNotices();
    }
  }, [noticeUpdateData]);

  useEffect(() => {
    if (eventUpdateData.event_id !== undefined && eventUpdateData.choice !== undefined) {
      handleUpdateEvent()
        .then(() => {
          if (eventUpdateData.choice) {
            handleAcceptNotice(eventUpdateData.event_id);
          } else {
            handleRejectNotice(eventUpdateData.event_id);
          }

          fetchPendingEvents();
        })
        .catch(error => {
          console.error('Error handling event action:', error);
          alert('Error handling event action. Please try again.');
        });
    }
  }, [eventUpdateData]);

  useEffect(() => {
    if (accountUpdateData.user_id !== undefined && accountUpdateData.choice !== undefined) {
      handleUpdateAccount()
        .then(() => {
          if (accountUpdateData.choice) {
            handleAcceptAccount(accountUpdateData.event_id);
          } else {
            handleRejectAccount(accountUpdateData.event_id);
          }

          fetchPendingEvents();
        })
        .catch(error => {
          console.error('Error handling event action:', error);
          alert('Error handling event action. Please try again.');
        });
    }
  }, [accountUpdateData]);

  const handleUpdateNotice = () => {
    fetch('http://localhost:8080/api/notices', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noticeUpdateData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setNoticeUpdateData({});
      })
      .catch(error => {
        console.error('Error updating notice:', error);
        alert('Error updating notice. Please try again.');
      });
  };

  const handleUpdateEvent = () => {
    return fetch('http://localhost:8080/api/events/choice', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventUpdateData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setEventUpdateData({});
      })
      .catch(error => {
        console.error('Error updating event:', error);
        alert('Error updating event. Please try again.');
      });
  };

  const handleArchiveNotice = (noticeID) => {
    fetch(`http://localhost:8080/api/notices/${noticeID}`, {
      method: 'PUT',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchSubmittedNotices();
      })
      .catch(error => {
        console.error('Error archiving notice:', error);
        alert('Error archiving notice. Please try again.');
      });
  };

  const handleUpdateAccount = () => {
    return fetch('http://localhost:8080/api/accounts/choice', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accountUpdateData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setAccountUpdateData({});
      })
      .catch(error => {
        console.error('Error updating account:', error);
        alert('Error updating account. Please try again.');
      });
  };

  // console.log('notice count: ', noticeCount)

  return (
    <>
      {cookies.isManager && (
        <>
          <h2>Pending Request</h2>
          <div className="notice-form"  style={{ marginBottom: '20px' }}>
            <Tabs>
              <TabList>
                <Tab>Calendar Request</Tab>
                <Tab>Account Request</Tab>
              </TabList>

              <TabPanel>
                {pendingEvents.length === 0 ? (
                  <p>No Pending Calendar Request</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Request</th>
                        <th>Type</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingEvents.map(notice => (
                        <tr key={notice.user_notice_id}>
                          <td>{notice.rank_name} {notice.first_name} {notice.last_name}</td>
                          <td>
                            Description: {notice.description} <br/>
                            Start: {notice.start_datetime} <br/>
                            End:  {notice.end_datetime}
                          </td>
                          <td>{notice.event_type_name}</td>
                          <td>
                            <div className="button-container text-center">
                              <Button
                                variant="dark"
                                style={{ margin: '5px' }}
                                onClick={() => {
                                  handleAcceptNotice(notice.user_notice_id);
                                    handleAcceptEvent(notice.event_id);
                                  }}
                                  className="btn btn-primary"
                                >
                                  Approve
                              </Button>
                              <Button
                                variant="dark"
                                style={{ margin: '5px' }}
                                onClick={() => {
                                  handleRejectNotice(notice.user_notice_id);
                                  handleRejectEvent(notice.event_id);
                                }}
                                className="btn btn-primary"
                              >
                                Deny
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </TabPanel>

              <TabPanel>
                {pendingAccounts.length === 0 ? (
                  <p>No Pending Account Request</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>User Details</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingAccounts.map(notice => (
                        <tr key={notice.user_id}>
                          <td>
                            Rank: {notice.rank_name} <br/>
                            Name: {notice.first_name} {notice.last_name}<br/>
                            Type: {notice.user_type_name}
                          </td>
                          <td>
                            <div className="button-container text-center">
                              <Button
                                variant="dark"
                                style={{ margin: '5px' }}
                                onClick={() => {handleAcceptAccount(notice.user_id);}}
                                  className="btn btn-primary"
                                >
                                  Approve
                              </Button>
                              <Button
                                variant="dark"
                                style={{ margin: '5px' }}
                                onClick={() => {handleRejectAccount(notice.user_id);}}
                                className="btn btn-primary"
                              >
                                Deny
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </TabPanel>
            </Tabs>
          </div>
        </>
      )}

      <>
        <h2>User Notices</h2>
        <div className="notice-form"  style={{ marginBottom: '20px' }}>
        <Tabs>
          {(cookies.isSupervisor || cookies.isManager) ? (
            <TabList>
              <Tab>User Notices</Tab>
              <Tab>Calendar Request</Tab>
            </TabList>
          ) : (
            <TabList>
              <Tab>User Notices</Tab>
            </TabList>
          )}
            <TabPanel>
              {supervisorNotices.length === 0 ? (
                <p>No Pending Notices</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Request</th>
                        <th>Type</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supervisorNotices.map(notice => (
                        <tr key={notice.user_notice_id}>
                          <td>{notice.rank_name} {notice.first_name} {notice.last_name}</td>
                          <td>{notice.body}</td>
                          <td>{notice.notice_name}</td>
                          <td>
                            {notice.notice_type === 4 && notice.event_id === null ? (
                              <div className="button-container text-center">
                                <Button variant="dark" style={{ margin: '5px' }} onClick={() => handleAcceptNotice(notice.user_notice_id)} class="btn btn-primary">Acknowledge</Button>
                              </div>
                            ) : (
                              <div className="button-container text-center">
                              <Button variant="dark" style={{ margin: '5px' }} onClick={() => handleAcceptNotice(notice.user_notice_id)} class="btn btn-primary">Approve</Button>
                              <Button variant="dark" style={{ margin: '5px' }} onClick={() => handleRejectNotice(notice.user_notice_id)} class="btn btn-primary">Deny</Button>
                            </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              )}
            </TabPanel>
            {(cookies.isSupervisor || cookies.isManager) && (
            <TabPanel>
              {(supervisorNoticeData.length === 0 || cookies.isManager) && (
                  <p>No Pending Calendar Request</p>
              )}
              {(supervisorNoticeData.length > 0 && !cookies.isManager) && (
                <table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Request</th>
                      <th>Type</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supervisorNoticeData.map(notice => (
                      <tr key={notice.user_notice_id}>
                        <td>{notice.rank_name} {notice.first_name} {notice.last_name}</td>
                        <td>
                          Description: {notice.description} <br/>
                          Start: {notice.start_datetime} <br/>
                          End:  {notice.end_datetime}
                        </td>
                        <td>{notice.event_type_name}</td>
                        <td>
                          <div className="button-container text-center">
                            <Button
                              variant="dark"
                              style={{ margin: '5px' }}
                              onClick={() => {
                                handleAcceptNotice(notice.user_notice_id);
                                handleAcceptEvent(notice.event_id);
                              }}
                              className="btn btn-primary"
                              >
                                Approve
                            </Button>
                            <Button
                              variant="dark"
                              style={{ margin: '5px' }}
                              onClick={() => {
                                handleRejectNotice(notice.user_notice_id);
                                handleRejectEvent(notice.event_id);
                              }}
                              className="btn btn-primary"
                            >
                              Deny
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </TabPanel>
            )}
        </Tabs>

        </div>
      </>

      <h2>Submitted Notices</h2>
      <div className="notice-form" style={{ marginBottom: '20px' }}>
        <Tabs>
          <TabList>
            <Tab>Current</Tab>
            <Tab>Archived</Tab>
          </TabList>

          <TabPanel>
            {submittedNotices.filter(notice => notice.archived === false).length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Request</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedNotices.filter(notice => notice.archived === false).map(notice => (
                    <tr key={notice.user_notice_id}>
                      <td>{notice.name}</td>
                      <td>{notice.body}</td>
                      <td>
                        <div className="button-container text-center">
                          <Button variant="secondary" onClick={() => handleArchiveNotice(notice.user_notice_id)} class="btn btn-primary">Archive</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {submittedNotices.filter(notice => notice.archived === false).length === 0 && (
              <p>No Pending Notices</p>
            )}
          </TabPanel>

          <TabPanel>
            {submittedNotices.filter(notice => notice.archived === true).length > 0 && (
              <table>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Request</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedNotices.filter(notice => notice.archived === true).map(notice => (
                    <tr key={notice.user_notice_id}>
                      <td>Archived</td>
                      <td>{notice.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {submittedNotices.filter(notice => notice.archived === true).length === 0 && (
              <p>No Archived Notices</p>
            )}
          </TabPanel>
        </Tabs>
      </div>

      <h2>Create New Notice</h2>
      <form className="notice-form" onSubmit={handleNewNotice}  style={{ marginBottom: '20px' }}>
        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            name="body"
            value={newNoticeData.body}
            onChange={handleInputChange}
            className="form-control"
            rows="4"
            required="true"
            style={{ backgroundColor: '#282828', color: '#c1c1c1' }}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="notice_type">Notice Type:</label>
          <select
            data-bs-theme="secondary"
            id="notice_type"
            name="notice_type"
            value={newNoticeData.notice_type}
            onChange={handleInputChange}
            className="form-control"
            style={{ backgroundColor: '#282828', color: '#c1c1c1' }}
          >
            {noticeTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <Button variant="secondary" type="submit" className="btn btn-primary">Submit</Button>
      </form>
    </>
  );
};



/*


const [newNoticeData, setNewNoticeData] = useState({ submitter_id: cookies.userID, body: '', notice_type: 4, event_id: 0, recipient_id: 0 });
const [oldStartDateTime, setOldStartDateTime] = useState('');
const [oldEndDateTime, setOldEndDateTime] = useState('');
const [oldTitle, setOldTitle] = useState('');
const [oldDescription, setOldDescription] = useState('');
const [teamMemberIDs, setTeamMemberIDs] = useState({});


setOldTitle(selectedEvent.event.title);
setOldDescription(selectedEvent.event.extendedProps.description);
setOldStartDateTime(selectedEvent.event.start);
setOldEndDateTime(selectedEvent.event.end);


if (
        oldTitle !== editedEventData.title ||
        oldDescription !== editedEventData.description ||
        oldStartDateTime !== editedEventData.startDateTime ||
        oldEndDateTime !== editedEventData.endDateTime
      ) {
        // Update newNoticeData
        const newBody = `Event "${oldTitle}" has been updated.\n\nChanges:\n\nTitle: ${oldTitle} -> ${title}\nDescription: ${oldDescription} -> ${description}\nStart Date and Time: ${oldStartDateTime} -> ${startDateTime}\nEnd Date and Time: ${oldEndDateTime} -> ${endDateTime}`;

        setNewNoticeData(prevData => ({
          ...prevData,
          body: newBody,
          recipient_id: selectedEvent.event.creator_id
        }));
      }




const handleNewNotice = async () => {
    try {
      if (!selectedEvent.event.user_id) {
        await handleTeamEvent(selectedEvent.event.team_id);
        Object.values(teamMemberIDs).forEach(teamMemberId => {
          const noticeData = {
            submitter_id: cookies.userID,
            body: '',
            notice_type: 4,
            event_id: selectedEvent.event.id,
            recipient_id: teamMemberId
          };
          sendNewNotice(noticeData);
        });
      } else {
        const noticeData = {
          submitter_id: cookies.userID,
          body: '',
          notice_type: 4,
          event_id: selectedEvent.event.id,
          recipient_id: selectedEvent.event.user_id
        };
        sendNewNotice(noticeData);
      }
    } catch (error) {
      console.error('Error sending new notice:', error);
      alert('Error sending new notice. Please try again.');
    }
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
        setNewNoticeData({ submitter_id: cookies.userID, body: '', notice_type: 4, event_id: 0, recipient_id: 0 });
      })
      .catch(error => {
        console.error('Error adding new notice:', error);
        alert('Error adding new notice. Please try again.');
      });
  };

  useEffect(() => {
    if (newNoticeData.event_id !== 0 && newNoticeData.body !== '') {
      handleNewNotice();
    }
  }, [newNoticeData]);

  const handleTeamEvent = async (teamId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/notices/${teamId}`)
      const data = await response.json();
      setTeamMemberIDs(data);
    } catch (error) {
      console.error('Error fetching team member user IDs:', error);
    }
  };



*/