import React, {useState} from 'react'
import { Grid, List, Card, CardContent, Typography, IconButton, Tooltip,  } from '@mui/material'
import { Box } from '@mui/system'
import { Link, Outlet, useParams, useLoaderData, useSubmit, useNavigate } from 'react-router-dom'
import { NoteAddOutlined } from '@mui/icons-material'
import moment from 'moment'
import DeleteItem from './DeleteItem'

const NoteList = () => {
  const { noteId, folderId } = useParams()
  const { folder } = useLoaderData()
  const submit = useSubmit()
  const [activeNoteId, setActiveNoteId] = useState(noteId)
  const navigate = useNavigate()

  const handleAddNewNote = async () => {
    submit({
      content: '',
      folderId: folderId
    }, { 
      method: 'post',
      action: `/folder/${folderId}`
    })
  }

  React.useEffect(() => {
    if(noteId) {
      setActiveNoteId(noteId)
      return;
    }

    if(folder?.notes?.[0]){
      navigate(`note/${folder.notes[0].id}`)
    }
  }, [noteId, folder.notes])
  
  return (
    <Grid container sx={{height: '100%'}}>
      <Grid  item xs={4} sx={{height: '100%', overflow: 'auto'}}>
        <List
          sx={{
            width: '100%',
            overflowY: 'auto',
            height: '100%',
            bgcolor: '#ccc',
            padding: '10px',
            textAlign: 'left',
            maxWidth: 360
          }}
          subheader={
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Typography variant="h6" color="initial" sx={{fontWeight: 'bold', color: 'black', mb: '4px'}}>
                DS Ghi Chú
              </Typography>
              <Tooltip title="Thêm ghi chú" onClick={handleAddNewNote}>
                <IconButton size="small" >
                  <NoteAddOutlined sx={{color: 'black'}}/>
                </IconButton>
              </Tooltip>
            </Box>
          }
        >
        {
          folder.notes.map(({id, content, updatedAt})=> {
            return (
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}  key={id}>
                <Link
                to={`note/${id}`}
                style={{TextDecoder: 'none', flex: 1}}
                onClick={() => setActiveNoteId(id)}
              >
                <Card sx={{mb: '5px', backgroundColor: id === activeNoteId ?  'rgb(255 211 140)' : null}} >
                  <CardContent sx={{
                    p: '10px',
                    '&:last-child': {pb: '10px'}
                  }}>
                    <div 
                      style={{fontSize: 14, fontWeight: 'bold'}}
                      dangerouslySetInnerHTML={{__html: `${content.substring(0,30) || 'Nội dung trống'}`}}
                    />
                    <Typography variant="caption" color="initial" sx={{fontSize: '10px', pt: '4px'}}>
                      Cập nhập: {moment(updatedAt).format('DD/MM/YYYY, h:mm')}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
              <DeleteItem id={id}/>
              </div>
            )
          })
        }
        </List>
      </Grid>
      <Grid item xs={8} sx={{px: "8px"}}>
        <Typography variant="h6" color="initial" sx={{fontWeight: 'bold', color: 'black', mb: '4px'}}>
          Chi tiết ghi chú
        </Typography>
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default NoteList