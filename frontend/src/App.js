import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { Home } from './Features/Home'
import { Login } from './Features/Login'
import { Calendar } from './Features/Calendar'
import { CreateEvent } from './Features/CreateEvent'


function App() {
  return (
    <div className="App">
      <h1>Welcome!</h1>
      <nav>
    <div className = 'navbarcontainer'>
        <ul className = 'navbar' style={{ listStyleType: "none" }} >
          <li style={{marginRight: '10px'}} ><Link to="/">Home</Link></li>
          <li style={{marginRight: '10px' }} ><Link to="/Login">Login</Link></li>
          <li style={{marginRight: '10px' }} ><Link to="/mycalendar">My Calendar</Link></li>
          <li style={{marginRight: '10px' }} ><Link to="/createevent">Create Event</Link></li>
      </ul>
      </div>
    </nav>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/mycalendar' element={<Calendar />} />
      <Route path='/createevent' element={<CreateEvent />} />
    </Routes>
  </div>
  );
}

export default App;
