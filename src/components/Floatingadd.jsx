import React from 'react'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


export default function floatingadd() {
  return (
    <div>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Fab color="primary" aria-label="add">
  <AddIcon />
</Fab>
</Box>
    </div>
  )
}
