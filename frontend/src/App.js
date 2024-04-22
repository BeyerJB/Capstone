import './App.css';
import { useContext } from "react"
import { Routes, Route, Link } from "react-router-dom";
import { Home } from './Features/Home'
import Login from './Features/Login'
import { Calendar } from './Features/Calendar'
import { AuthContext } from './Features/AuthContext';
import {useCookies} from 'react-cookie'
import { SubordinateView } from './Features/SubordinateView'


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
            <li style={{marginRight: '10px' }} ><Link to="/Subordinateview">Subordinate Calendar</Link></li>
          </>
          }

      </ul>
      </div>
    </nav>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/mycalendar' element={<Calendar />} />
      <Route path='/SubordinateView' element={<SubordinateView/>} />
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
