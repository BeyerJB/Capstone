import logo from './timeweave-transparent.png'
import icon from './spacetime-curvature.png'
import './App.css';
import './CSS/UserNoticeModal.css';
import { useContext, useState } from "react"
import { Routes, Route, Link } from "react-router-dom";
import SlidingPane from "react-sliding-pane";
import { Home } from './Features/Home'
import Login from './Features/Login'
import { Calendar } from './Features/Calendar'
import { CreateEvent } from './Features/CreateEvent'
import { AuthContext } from './Features/AuthContext';
import { useCookies } from 'react-cookie'
import { UserNotices } from './Features/UserNotices';
import { TeamView } from './Features/TeamView'

function App() {
  const { logout } = useContext(AuthContext)
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank', 'isManager']);
  const [noticePaneOpened, setNoticePaneOpened] = useState(false);
  const [eventPaneOpened, setEventPaneOpened] = useState(false);


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
          <img src={icon} className="app-logo" alt="spacetime" width={'50vw'}/>
          <img src={logo} className="app-logo" alt="TIMEWEAVE" width={ '100vw' } height={ ' 25vw '} />
            <ul className="navbar">
              {/* <li><Link to="/">Home</Link></li> */}
              {!cookies.userID ? (
                <li><Link to="/Login">Login</Link></li>
              ) : (
                <>
                  <li><Link to="/mycalendar">My Calendar</Link></li>
                  <li><Link to="/TeamView">Team View</Link></li>
                  <li><a onClick={handleOpenNotices}>Notices</a></li>
                  <li><a onClick={handleOpenEvents}>Create Event</a></li>
                  <li><a onClick={() => logout()}>Log out</a></li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/mycalendar' element={<Calendar />} />
          <Route path='/TeamView' element={<TeamView /> } />
          <Route path='/createevent' element={<CreateEvent />} />
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
