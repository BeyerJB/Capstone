import { Outlet, Navigate} from 'react-router-dom'
import { useCookies } from 'react-cookie'

export const PrivateRoutes = () => {
  const [cookies] = useCookies(['userID']);

return (
  cookies.userID ? <Outlet/> : <Navigate to='Login'/>
)
}

