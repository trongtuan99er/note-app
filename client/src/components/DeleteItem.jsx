import React,{ useState } from 'react'
import {IconButton,
        Tooltip, 
        Dialog,
        DialogContent,
        DialogTitle,
        Button,
        DialogActions,
        Typography
} from '@mui/material'
import { DeleteOutlineOutlined } from "@mui/icons-material"
import { useParams, useNavigate } from 'react-router-dom'
import { deleteNote } from '../utils/NoteListUtils'

const DeleteItem = (id) => {
  const [open, setOpen] = useState(false)
  const { folderId } = useParams()
  const navigate = useNavigate()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async () => {
    await deleteNote({id})
    navigate('/')
    handleClose()
  }

  return (
    <div>
      <div>
      <Tooltip title="Xóa" onClick={handleOpen}>
        <IconButton size="small">
          <DeleteOutlineOutlined  sx={{color: 'white'}}/>
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xóa ghi chú</DialogTitle>
        <DialogContent>
          <Typography variant="h6" color="initial">
            Bạn chắc chắn muốn xóa ghi chú ?
          </Typography>
        </DialogContent>
        <DialogActions >
          <Button variant='outlined' color="primary" onClick={handleClose}>Hủy</Button>
          <Button variant='contained' color='warning' onClick={handleDelete}>Xóa</Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
  )
}

export default DeleteItem