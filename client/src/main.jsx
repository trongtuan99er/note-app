import React from 'react'
import ReactDOM from 'react-dom/client'
import  { RouterProvider } from 'react-router-dom'
import router from './router'
import './index.css'
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Container from '@mui/material/Container'
import './firebase/config'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Container maxWidth="lg" sx={{textAlign: "center", marginBottom: '50px'}}>
    <RouterProvider router={router} />
  </Container>
)
