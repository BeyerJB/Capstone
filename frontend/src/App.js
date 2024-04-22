import './App.css';
import { useContext } from "react"
import { Routes, Route, Link } from "react-router-dom";
import { Home } from './Features/Home'
import Login from './Features/Login'
import { Calendar } from './Features/Calendar'
import { AuthContext } from './Features/AuthContext';
import { useCookies } from 'react-cookie'
import { UserNotices } from './Features/UserNotices';
import { TeamView } from './Features/TeamView'

function App() {
  const { logout } = useContext(AuthContext)
  const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank']);


  return (
    <>
    <div className="App">
      <h1>Welcome!</h1>
      <nav>
    <div className = 'navbarcontainer'>
        <ul className = 'navbar' style={{ listStyleType: "none" }} >
          <li style={{marginRight: '10px'}} ><Link to="/">Home</Link></li>
          {!cookies.userID ?
          <li style={{marginRight: '10px' }} ><Link to="/Login">Login</Link></li>
          :
          <>
            <li style={{marginRight: '10px' }} ><Link to="/mycalendar">My Calendar</Link></li>
            <li style={{marginRight: '10px' }} ><Link to="/TeamView">Team View</Link></li>
            <li style={{marginRight: '10px' }} ><Link to="/notices">Notices</Link></li>
            <button onClick={() => logout()} >Log out</button>
          </>

          }

      </ul>
      </div>
    </nav>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/mycalendar' element={<Calendar />} />
      <Route path='/TeamView' element={<TeamView /> } />
      <Route path='/notices' element={<UserNotices />} />
    </Routes>
  </div>
  </>
  );
}

export default App;
