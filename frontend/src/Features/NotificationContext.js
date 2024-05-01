import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';



export const NotificationsContext = createContext();

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider = ({ children }) => {
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank', 'isSupervisor', 'isManager']);
  const [calendarRequestsCount, setCalendarRequestsCount] = useState(0);
  const [supervisorNoticesCount, setSupervisorNoticesCount] = useState(0);
  const [accountRequestsCount, setAccountRequestsCount] = useState(0);
  const [userNoticesCount, setUserNoticesCount] = useState(0);
  const [totalNoticeCount, setTotalNoticeCount] = useState(0);
  const [comparedGuardian, setComparedGuardian] = useState([])



  useEffect(() => {
    updateCount()
  }, [cookies.userID])

// console.log("is manager?: ", cookies.isManager)

  const updateCount = () => {
    fetchSupervisorNoticeCount();
    // fetchSubmittedNoticeCount();

    fetchPendingEventsCount();
    fetchPendingAccountsCount();

  }


  useEffect(() => {
    const total = calendarRequestsCount + supervisorNoticesCount + accountRequestsCount + userNoticesCount;
    setTotalNoticeCount(total);
  }, [calendarRequestsCount, supervisorNoticesCount, accountRequestsCount, userNoticesCount]);

  const fetchSupervisorNoticeCount = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/notices/supervisor/${cookies.userID}`);
      const data = await response.json();
      setSupervisorNoticesCount(data.length);
    } catch (error) {
      console.error('Error fetching supervisor notices:', error);
    }
  };

  // const fetchSubmittedNoticeCount = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/notices/submitter/${cookies.userID}`);
  //     const data = await response.json();
  //     setUserNoticesCount(data.length);
  //   } catch (error) {
  //     console.error('Error fetching submitted notices:', error);
  //   }
  // };

  const fetchPendingEventsCount = async () => {
    if (cookies.isManager){
    try {
      const response = await fetch(`http://localhost:8080/api/events/pending`);
      const data = await response.json();
      setCalendarRequestsCount(data.length);
    } catch (error) {
      console.error('Error fetching pending events:', error);
    }
  }
  };

  const fetchPendingAccountsCount = async () => {
    if (cookies.isManager){
    try {
      const response = await fetch(`http://localhost:8080/api/accounts/pending`);
      const data = await response.json();
      setAccountRequestsCount(data.length);
    } catch (error) {
      console.error('Error fetching pending accounts:', error);
    }
  }
  };

  const contextValue = {
    calendarRequestsCount,
    setCalendarRequestsCount,
    supervisorNoticesCount,
    setSupervisorNoticesCount,
    accountRequestsCount,
    setAccountRequestsCount,
    userNoticesCount,
    setUserNoticesCount,
    totalNoticeCount,
    updateCount,
    totalNoticeCount,
    setTotalNoticeCount,
    comparedGuardian,
    setComparedGuardian
  };

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  );
};
