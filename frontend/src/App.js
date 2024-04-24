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
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank']);
  const [noticePaneOpened, setNoticePaneOpened] = useState(false);

  const handleOpenNotices = () => {
    setNoticePaneOpened(!noticePaneOpened);
  }

  return (
    <>
      <div className="App">
        <h1>Welcome!</h1>
        <nav>
          <div className="navbarcontainer">
            <ul className="navbar">
              <li><Link to="/">Home</Link></li>
              {!cookies.userID ? (
                <li><Link to="/Login">Login</Link></li>
              ) : (
                <>
                  <li><Link to="/mycalendar">My Calendar</Link></li>
                  <li><Link to="/TeamView">Team View</Link></li>
                  <li><Link to="/createevent">Create Event</Link></li>
                  <li><a onClick={handleOpenNotices}>Notices</a></li>
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
        <SlidingPane isOpen={noticePaneOpened} onRequestClose={handleOpenNotices} width="1000px" title="User Notices">
          <UserNotices />
        </SlidingPane>
      </div>
    </>
  );
}

export default App;
