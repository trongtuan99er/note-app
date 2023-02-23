import React, { createContext, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
export const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [user, setUser] = React.useState({})
  const auth = getAuth()
  const navigate = useNavigate()
  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((user) => {
      console.log("user", {user});
      if (user?.uid){
        setUser(user);
        localStorage.setItem("accessToken", user.accessToken);
        return;
      }
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
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider