import logo from './timeweave-transparent.png'
import icon from './spacetime-curvature.png'
import './App.css';
import './CSS/UserNoticeModal.css';
import { useContext, useState } from "react"
import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";
import SlidingPane from "react-sliding-pane";
import { Home } from './Features/Home'
import Login from './Features/Login'
import { Calendar } from './Features/Calendar'
import { CreateEvent } from './Features/CreateEvent'
import { AuthContext } from './Features/AuthContext';
import { useCookies } from 'react-cookie'
import { UserNotices } from './Features/UserNotices';
import { TeamView } from './Features/TeamView';
import { TeamEditor } from './Features/TeamEditor'


import { NotificationsContext } from './Features/NotificationContext';


import { MyProfile } from './Features/User_Profile';
import {PrivateRoutes} from './Features/PrivateRoutes'


function App() {
  const { logout } = useContext(AuthContext)
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank', 'isManager']);
  const [noticePaneOpened, setNoticePaneOpened] = useState(false);
  const [eventPaneOpened, setEventPaneOpened] = useState(false);
  const { totalNoticeCount, calendarRequestsCount, supervisorNoticesCount, accountRequestsCount, userNoticesCount, setTotalNoticeCount, setCalendarRequestsCount, setSupervisorNoticesCount, setAccountRequestsCount, setUserNoticesCount } = useContext(NotificationsContext);



  //const totalNotifications = notificationContext

  // console.log( "total notice count: ", totalNoticeCount)
  // console.log("calendar request count: ", calendarRequestsCount)
  // console.log("supervisor Notice count: ", supervisorNoticesCount)
  // console.log("account request count: ", accountRequestsCount)
  // console.log("user notice count: ", userNoticesCount)


  const handleOpenNotices = () => {
    setNoticePaneOpened(!noticePaneOpened);
  }

  const handleOpenEvents = () => {
    setEventPaneOpened(!eventPaneOpened);
  }

  return (
    <>
      <div className="App">
        <nav>
          <div className="navbarcontainer">

          <img src={icon} className="app-logo" alt="spacetime" style={{ width: '5vw', height: ' 3vw ', backgroundColor: 'Gray'}}/>
          {/* <img src={logo} className="app-logo" alt="TIMEWEAVE" style={{ width: '4vw', height: ' 3vw ', backgroundColor: 'Gray'}} /> */}
            <ul className="navbar">
              {/* <li><Link to="/">Home</Link></li> */}

              {!cookies.userID ? (
                <li><Link to="/Login">Login</Link></li>
              ) : (
                <>

                  <li><Link to="/mycalendar">My Calendar</Link></li>
                  <li><Link to="/TeamView">Team View</Link></li>
                  <li>
                    <a onClick={handleOpenNotices}style={{ position: 'relative' }}>Notices</a>
                    {totalNoticeCount > 0 && (
                      <span className="translate-middle badge rounded-pill bg-danger">
                        {totalNoticeCount}
                      </span>
                    )}
                  </li>
                  <li><a onClick={handleOpenEvents}>Create Event</a></li>
                  <li><Link to="/teameditor">Team Editor</Link></li>
                  <li><a onClick={() => {
                    logout();
                    setCalendarRequestsCount(0);
                    setSupervisorNoticesCount(0);
                    setAccountRequestsCount(0);
                    setUserNoticesCount(0);
                    setTotalNoticeCount(0);
                    }}>Log out</a></li>
                      <Link to="/userprofile">Profile</Link>

                </>
              )}
              </ul>
            </div>

        </nav>

        <Routes>
          <Route element={<PrivateRoutes/>}>
            <Route path='/mycalendar' element={<Calendar />} />
            <Route path='/TeamView' element={<TeamView /> } />
            <Route path='/createevent' element={<CreateEvent />} />
            <Route path='/userprofile' element={<MyProfile />} />
          </Route>
          {!cookies.userID ? <Route path='/' element={<Login/>} /> : <Route path='/' element={<Calendar />} />}
          <Route path="*" element={<Navigate to="/" />} />
          <Route path='/teameditor' element={<TeamEditor/>} />
        </Routes>

        <SlidingPane isOpen={noticePaneOpened} onRequestClose={handleOpenNotices} width="1000px" title="User Notices">
          <UserNotices />
        </SlidingPane>
        <SlidingPane isOpen={eventPaneOpened} onRequestClose={handleOpenEvents} width="1000px" title="Create Event">
          <CreateEvent />
        </SlidingPane>
      </div>
    </>
  );
}

export default App;
