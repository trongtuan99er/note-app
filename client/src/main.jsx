import React from 'react'
import ReactDOM from 'react-dom/client'
import  { RouterProvider } from 'react-router-dom'
import router from './router'
import './index.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Container from '@mui/material/Container'
import './firebase/config'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Container maxWidth="lg" sx={{textAlign: "center", marginBottom: '50px'}}>
    <RouterProvider router={router} />
  </Container>
  </React.StrictMode>,
)
