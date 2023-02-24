import React, {useState} from 'react'
import { Grid, List, Card, CardContent, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Link, Outlet, useParams } from 'react-router-dom'

const NoteList = () => {
  const noteList = {notes: [{id: '1', content: "notesadas"},{id: '2', content: "notesadas"}]}
  const { noteId } = useParams()
  const [activeNoteId, setActiveNoteId] = useState(noteId)
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
            <Box>
              <Typography variant="h6" color="initial" sx={{fontWeight: 'bold', color: 'white', mb: '4px'}}>
                DS Ghi Chú
              </Typography>
            </Box>
          }
        >
        {
          noteList.notes.map(({id, content})=> {
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
                    dangerouslySetInnerHTML={{__html: `${content.substring(0,30) || 'Empty'}`}}
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