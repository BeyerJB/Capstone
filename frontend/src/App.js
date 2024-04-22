import './App.css';
import { useContext } from "react"
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Home } from './Features/Home'
import Login from './Features/Login'
import { Calendar } from './Features/Calendar'
import { AuthContext } from './Features/AuthContext';
import {useCookies} from 'react-cookie'
import { UserHome } from './Features/UserHome';


function App() {
  const { logout } = useContext(AuthContext)
  const [cookies, setCookie, removeCookie] = useCookies(['userID', 'firstName', 'lastName', 'rank']);
  const navigate = useNavigate()
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
            <li style={{marginRight: '10px' }} ><Link to="/mycalendar">My Calendar</Link></li>
          }

      </ul>
      </div>
    </nav>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/mycalendar' element={<Calendar />} />
      <Route path='/userhome' element={<UserHome />} />
    </Routes>
  </div>
  <footer>
    {cookies.userID ?
    <button onClick={() => logout()} >Log out</button>
  :
  []
  }
  </footer>
  </>
  );
}

export default App;
