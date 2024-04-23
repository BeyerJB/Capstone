import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const UserNotices = () => {
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank']);
  const [submittedNotices, setSubmittedNotices] = useState([]);
  const [supervisorNotices, setSupervisorNotices] = useState([]);
  const [newNoticeData, setNewNoticeData] = useState({ submitter_id: cookies.userID, recipient_id: cookies.supervisorID, body: '', notice_type: 1 });
  const [noticeUpdateData, setNoticeUpdateData] = useState({});
  const [showArchived, setShowArchived] = useState(false);

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
        })
        .catch(error => console.error('Error fetching submitted notices:', error));
    }
  };

  useEffect(() => {
    fetchSupervisorNotices();
  }, []);

  useEffect(() => {
    fetchSubmittedNotices();
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
  };

  const handleRejectNotice = (noticeId) => {
    setNoticeUpdateData({ request_id: noticeId, choice: 3 });
    fetchSupervisorNotices();
  };

  useEffect(() => {
    if (noticeUpdateData.request_id !== undefined && noticeUpdateData.choice !== undefined) {
      handleUpdateNotice();
      fetchSupervisorNotices();
    }
  }, [noticeUpdateData]);

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

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>User Home</h1>

        <h2>Notices</h2>
        <button onClick={() => setShowArchived(!showArchived)}>
          {showArchived ? "View Current Notices" : "View Archived Notices"}
        </button>
        <ul>
          {showArchived ? (
            submittedNotices.filter(notice => notice.archived === true).map(notice => (
              <li key={notice.user_notice_id}>
                {notice.name}
                {notice.body}
              </li>
            ))
          ) : (
            submittedNotices.filter(notice => notice.archived === false).map(notice => (
              <li key={notice.user_notice_id}>
                {notice.name}
                {notice.body}
                <button onClick={() => handleArchiveNotice(notice.user_notice_id)}>Archive</button>
              </li>
            ))
          )}
        </ul>

        <h2>Supervisor Notices</h2>
        <ul>
          {supervisorNotices.map(notice => (
            <li key={notice.user_notice_id}>
              {notice.body}
              <div>
                <button onClick={() => handleAcceptNotice(notice.user_notice_id)}>Accept</button>
                <button onClick={() => handleRejectNotice(notice.user_notice_id)}>Reject</button>
              </div>
            </li>
          ))}
        </ul>

        <h2>Create New Notice</h2>
        <form onSubmit={handleNewNotice}>
          <label>
            Body:
            <input type="text" name="body" value={newNoticeData.body} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Notice Type:
            <select name="notice_type" value={newNoticeData.notice_type} onChange={handleInputChange}>
              {noticeTypeOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
