import React, { createContext, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material';

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [user, setUser] = React.useState({})
  const [isLoading, setIsLoading] = React.useState(true)
  const auth = getAuth()
  const navigate = useNavigate()
  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((user) => {
      console.log("user", {user});
      if (user?.uid){
        setUser(user);
        if(user.accessToken !== localStorage.getItem('accessToken')){
          localStorage.setItem('accessToken', user.accessToken);
        }
        localStorage.setItem("accessToken", user.accessToken);
        setIsLoading(false)
        return;
      }
      setIsLoading(false)
      setUser({});
      localStorage.clear();
      navigate('/login');
    })
  
    return () => {
      unsubcribed();
    }
  }, [auth])
  
  return (
    <AuthContext.Provider value={{user, setUser}}>
      {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider