import React, { useContext } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { GoogleAuthProvider, signInWithPopup , getAuth} from 'firebase/auth'
import { AuthContext } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const handleLoginWithGG = async () => {
    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider);
    console.log({res});
  }
  if (user?.uid) {
    navigate('/');
    return; 
  }
  return (
  <>
    <Typography variant="h6" color="inherit" sx={{marginBottom: '15px', marginTop: '15px'}}>
      Hi, Welcome to Note-app
    </Typography>
    <Button variant="outlined" color="primary" onClick={handleLoginWithGG}>
      Login with google
    </Button>
  </>
  )
}

export default Login