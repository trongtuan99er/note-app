import React from 'react'
import {Typography, Grid} from '@mui/material'
import { Box } from '@mui/system'
import UserMenu from '../components/UserMenu'
import FolderList from '../components/FolderList'
import { Outlet, useLoaderData } from 'react-router-dom'

const Home = () => {
  const { folders } = useLoaderData()
  return (
    <>
      <Typography variant="h2" color="initial">Note App</Typography>
      <Box sx={{display: 'flex', justifyContent: 'right', mb: '15px'}}>
        <UserMenu />
      </Box>

      <Grid container sx={{height: '70vh', boxShadow: "0 0 15px 0 rgba(193 193 193 / 60%)"}}>
        <Grid item xs={3} sx={{height: '100%'}}>
          <FolderList folders={folders}/>
        </Grid>
        <Grid item xs={9} sx={{height: '100%'}}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  )
}

export default Home