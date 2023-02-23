import React, { useContext, useState } from 'react'
import {AuthContext} from '../context/AuthProvider'
import {Typography, Avatar, Menu, MenuItem} from '@mui/material'
import { Box } from '@mui/system'

export default function UserMenu() {
  const { user: { displayName, photoURL, auth} } = useContext(AuthContext)
  const [anchorEl, setAnchoEl] = useState(null)

  const handleLogout = () => {
    auth.signOut()
  }
  const handleClick = (e) => {
    setAnchoEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchoEl(null)
  }
  return (
      <>
      <Box sx={{display: 'flex', justifyContent: "center", alignItems: 'center'}} onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true">
        <Avatar src={photoURL} alt="avatar" sx={{width: 24, height: 24, mr: "8px"}}/>
        <Typography variant="h6" color="initial">{displayName}</Typography>
      </Box>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>
          LogOut
        </MenuItem>
      </Menu>
      </>

  )
}
