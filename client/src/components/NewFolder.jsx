import React from 'react'
import {IconButton,
        Tooltip, 
        TextField,
        Dialog,
        DialogContent,
        DialogTitle,
        Button,
        DialogActions
} from '@mui/material'
import { CreateNewFolderOutlined } from "@mui/icons-material"
import { useSearchParams, useNavigate } from 'react-router-dom'
import { addNewFolder } from '../utils/folderUtils'

const NewFolder = () => {
  const [ newFolderName, setNewFolderName] = React.useState()
  const [open, setOpen] = React.useState(false)
  const [searchParams, setSearchParams] = useSearchParams() 
  const popupName = searchParams.get('popup')
  const navigate = useNavigate()

  const handleOpenModal = () => {
    // setOpen(true)
    setSearchParams({popup: 'add-new-folder'})
  }
  const handleClose = () => {
    // setOpen(false)
    setNewFolderName('')  
    // back to old url make loader rerun
    navigate(-1)
  }
  const handleNewfolderNameChange = (e) => {
    setNewFolderName(e.target.value)
  }
  const handleAddNewFolder = async () => {
    await addNewFolder({name: newFolderName})
    handleClose()
  }
  React.useEffect(() => {
    if(popupName === 'add-new-folder'){
      setOpen(true)
      return;
    }
    setOpen(false)
  }, [popupName])
  return (
    <div>
      <Tooltip title="Thêm Thư Mục" onClick={handleOpenModal}>
        <IconButton size="small">
          <CreateNewFolderOutlined  sx={{color: 'white'}}/>
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Thêm mới thư mục</DialogTitle>
        <DialogContent>
          <TextField
            id="name"
            label="Tên thư mục"
            autoComplete='off'
            value={newFolderName}
            onChange={handleNewfolderNameChange}
            autoFocus={true}
            fullWidth
            size='small'
            variant='standard'
            sx={{width: '400px'}}
          />
        </DialogContent>
        <DialogActions >
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleAddNewFolder}>Thêm</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NewFolder