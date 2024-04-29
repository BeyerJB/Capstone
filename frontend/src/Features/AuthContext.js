import { createContext } from 'react';
import {useCookies} from 'react-cookie'
import {useNavigate} from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['userID', 'firstName', 'lastName', 'rank', 'supervisorID', 'isSupervisor', 'isManager', 'enabled']);
  const navigate = useNavigate()

  const login = (res) => {
    setCookie('userID', res.userID);
    setCookie('firstName', res.firstName);
    setCookie('lastName', res.lastName);
    setCookie('supervisorID', res.supervisorID);
    setCookie('rank', res.rank);
    setCookie('isSupervisor', res.isSupervisor);
    setCookie('isManager', res.isManager);
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
    removeCookie('enabled', { maxAge: 1 } )
    navigate('/')
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };