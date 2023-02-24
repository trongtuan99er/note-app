import React, {useState} from 'react'
import { List, Typography, Card, CardContent} from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { Box } from '@mui/system'

const FolderList = ({folders}) => {
  const { folderId } = useParams()
  const [activeFolderId, setActiveFolderId] = useState(folderId)
  console.log(typeof(activeFolderId));
  return (
    <List
      sx={{
        width: '100%',
        overflowY: 'auto',
        height: '100%',
        bgcolor: '#7d9d9c',
        padding: '10px',
        textAlign: 'left'
      }}
      subheader={
        <Box>
          <Typography variant="h6" color="initial" sx={{fontWeight: 'bold', color: 'white', mb: '4px'}}>DS thư mục</Typography>
        </Box>
      }
    >
      {
        folders.map(({id, name}) => {
          return (
            <Link key={id} to={`folder/${id}`}
              style={{textDecoration: 'none'}}
              onClick={()=> setActiveFolderId(id)}
            >
              <Card sx={{mb: "6px", backgroundColor: id === activeFolderId ? 'rgb(255 211 140)' : null}}>
                <CardContent sx={{
                  p: '10px',
                  '&:last-child': {pb: '10px'}
                }}>
                  <Typography variant="h6" color="initial">
                    {name}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          )
        })
      }
      </List>
  )
}

export default FolderList