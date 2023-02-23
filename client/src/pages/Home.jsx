import React from 'react'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import UserMenu from '../components/UserMenu'

const Home = () => {
  return (
    <>
      <Typography variant="h2" color="initial">Note App</Typography>
      <Box sx={{display: 'flex', justifyContent: 'right', mb: '15px'}}>
        <UserMenu />
      </Box>
    </>
  )
}

export default Home