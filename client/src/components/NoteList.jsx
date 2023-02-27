import React, {useState} from 'react'
import { Grid, List, Card, CardContent, Typography, IconButton, Tooltip,  } from '@mui/material'
import { Box } from '@mui/system'
import { Link, Outlet, useParams, useLoaderData, useSubmit } from 'react-router-dom'
import { NoteAddOutlined } from '@mui/icons-material'
const NoteList = () => {
  const { noteId, folderId } = useParams()
  const { folder } = useLoaderData()
  const submit = useSubmit()
  const [activeNoteId, setActiveNoteId] = useState(noteId)

  const handleAddNewNote = async () => {
    submit({
      content: '',
      folderId: folderId
    }, { 
      method: 'post',
      action: `/folder/${folderId}`
    })
  }
  return (
    <Grid container height="100%">
      <Grid  item xs={4}>
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
          folder.notes.map(({id, content})=> {
            return <Link
              key={id}
              to={`note/${id}`}
              style={{TextDecoder: 'none'}}
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
                </CardContent>
              </Card>
            </Link>
          })
        }
        </List>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default NoteList