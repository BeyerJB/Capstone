import React, {useContext, useState, useEffect } from 'react';
// import { AuthContext } from './AugtContext'; #change to eventual authority context

function UserHome() {
  //const { userID, supervisorID, isSupervisor } = useContext(AuthContext);

  // Begin dummy states to test out notices

  const [isSupervisor, setIsSupervisor] = useState(false);
  const [userID, setUserID] = useState();
  const [supervisorID, setSupervisorID] = useState();


  useEffect(() => {
    if (!isSupervisor){
      setUserID(20);
      setSupervisorID(3);
      setIsSupervisor(true);
    } else {
      setUserID(3);
      setSupervisorID(null);
      setIsSupervisor(false);
    }
  }, []);

  // End dummy states to test out notices

  const [submittedNotices, setSubmittedNotices] = useState([]);
  const [supervisorNotices, setSupervisorNotices] = useState([]);
  const [newNoticeData, setNewNoticeData] = useState({ submitter_id: userID, supervisor_id: supervisorID, body: '', notice_type: '' });
  const [noticeUpdateData, setNoticeUpdateData] = useState( { request_id: '', choice: '' } );

  useEffect(() => {
    if (supervisorID !== undefined) {
      fetch(`http://localhost:8080/api/notices/supervisor/${supervisorID}`)
        .then(response => response.json())
        .then(data => {
          setSupervisorNotices(data);
        })
        .catch(error => console.error('Error fetching supervisor notices:', error));
    }
  }, [supervisorID]);

  useEffect(() => {
    if (userID !== undefined) {
      fetch(`http://localhost:8080/api/notices/submitter/${userID}`)
        .then(response => response.json())
        .then(data => {
          setSubmittedNotices(data);
        })
        .catch(error => console.error('Error fetching submitted notices:', error));
    }
  }, [userID]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewNoticeData(prevData => ({
      ...prevData,
      [name]: value
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
      setNewNoticeData({ body: '', notice_type: '' });
    })
    .catch(error => {
      console.error('Error adding new notice:', error);
      alert('Error adding new notice. Please try again.');
    });
  }

  const handleUpdateNotice = (event) => {
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
      setNoticeUpdateData({ request_id: '', choice: '' });
    })
    .catch(error => {
      console.error('Error updating notice:', error);
      alert('Error updating notice. Please try again.');
    });
  }

  const handleAcceptNotice = (noticeId) => {
    setNoticeUpdateData({ request_id: noticeId, choice: 2 });
    handleUpdateNotice();
  };

  const handleRejectNotice = (noticeId) => {
    setNoticeUpdateData({ request_id: noticeId, choice: 3 });
    handleUpdateNotice();
  };

  const handleArchiveNotice = (noticeId) => {
    setNoticeUpdateData({ request_id: noticeId, choice: 4 });
    handleUpdateNotice();
  };

  return (
    <div>
      <h1>User Home</h1>

      <h2>Submitted Notices</h2>
      <ul>
        {submittedNotices.map(notice => (
          <li key={notice.id}>{notice.body}</li>
        ))}
      </ul>

      <h2>Supervisor Notices</h2>
      <ul>
        {supervisorNotices.map(notice => (
          <li key={notice.id}>
            {notice.body}
            {isSupervisor ? (
              <div>
                <button onClick={() => handleAcceptNotice(notice.id)}>Accept</button>
                <button onClick={() => handleRejectNotice(notice.id)}>Reject</button>
              </div>
            ) : (
              <button onClick={() => handleArchiveNotice(notice.id)}>Archive</button>
            )}
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
          <input type="text" name="notice_type" value={newNoticeData.notice_type} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );

}

export default UserHome;