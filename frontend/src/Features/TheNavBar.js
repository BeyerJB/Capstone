// import {useState, useContext} from 'react'
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import { useCookies } from 'react-cookie'
// import logo from '../timeweave-transparent.png'
// import { AuthContext } from '../Features/AuthContext';

// function TheNavBar() {
//   const { logout } = useContext(AuthContext)
//   const [cookies] = useCookies(['userID', 'firstName', 'lastName', 'rank', 'isManager']);
//   const [noticePaneOpened, setNoticePaneOpened] = useState(false);
//   const [eventPaneOpened, setEventPaneOpened] = useState(false);


//   const handleOpenNotices = () => {
//     setNoticePaneOpened(!noticePaneOpened);
//   }

//   const handleOpenEvents = () => {
//     setEventPaneOpened(!eventPaneOpened);
//   }


// return (
//     <>
//       <Navbar className="NavBar">
//         <Container>
//           <Navbar.Brand href="#home">
//             <img
//               alt="TIMEWEAVE"
//               src = {logo}
//               width='100vw'
//               height='25vw'
//               className="d-inline-block align-top"
//             /></Navbar.Brand>
//               <Nav.Link to="#">Home</Nav.Link>
//               {!cookies.userID ? (
//               <Nav.Link to="/Login">Login</Nav.Link>
//               ) : (
//                 <>
//                   <Nav.Link to="/mycalendar">My Calendar</Nav.Link>
//                   <Nav.Link to="/TeamView">Team View</Nav.Link>
//                   <a onClick={handleOpenNotices}>Notices</a>
//                   <a onClick={handleOpenEvents}>Create Event</a>
//                   <a onClick={() => logout()}>Log out</a>
//                 </>
//               )}
//         </Container>
//       </Navbar>
//     </>
//   );
// }

// export default TheNavBar;


