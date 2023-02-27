import React, { useContext } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { GoogleAuthProvider, signInWithPopup , getAuth} from 'firebase/auth'
import { AuthContext } from '../context/AuthProvider'
import { useNavigate, Navigate } from 'react-router-dom'
import { graphqlRequest } from '../utils/request'

const Login = () => {
  const auth = getAuth();
  // const navigate = useNavigate()
  // const { user } = useContext(AuthContext)

  const handleLoginWithGG = async () => {
    const provider = new GoogleAuthProvider();

    const {
      user: { uid, displayName }
    } = await signInWithPopup(auth, provider);
    const data = await graphqlRequest({
      query: `mutation register($uid: String!, $name: String!) {
        register(uid: $uid, name: $name){
          uid
          name
        }
      }`, variables: {
        uid,
        name: displayName
      }
    })
  }
  if (localStorage.getItem('accessToken')) {
    return <Navigate to={'/'} />
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