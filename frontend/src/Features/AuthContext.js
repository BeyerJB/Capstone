import { createContext } from 'react';
import {useCookies} from 'react-cookie'
import {useNavigate} from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['userID', 'firstName', 'lastName', 'rank', 'supervisorID', 'isSupervisor', 'isManager', 'enabled', 'teamID']);
  const navigate = useNavigate()

  const login = (res) => {
    setCookie('userID', res.userID);
    setCookie('firstName', res.firstName);
    setCookie('lastName', res.lastName);
    setCookie('supervisorID', res.supervisorID);
    setCookie('rank', res.rank);
    setCookie('isSupervisor', res.isSupervisor);
    setCookie('isManager', res.isManager);
    setCookie('teamID', res.teamID);
    setCookie('enabled', res.enabled)
  };

  const logout = () => {
    removeCookie('userID', { maxAge: 1 } );
    removeCookie('firstName', { maxAge: 1 });
    removeCookie('lastName', { maxAge: 1 });
    removeCookie('rank', { maxAge: 1 });
    removeCookie('supervisorID', { maxAge: 1 });
    removeCookie('isSupervisor', { maxAge: 1 });
    removeCookie('isManager', { maxAge: 1 });
    removeCookie('teamID', { maxAge: 1 });
    removeCookie('enabled', { maxAge: 1 } )
    navigate('/login')
  };

  const isLoggedIn = !!cookies.userID;

  return (
    <AuthContext.Provider value={{ login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };