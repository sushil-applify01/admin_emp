import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Themelist() {
  const [Theme, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 80 ,}}>
      <FormControl fullWidth >
        <InputLabel id="demo-simple-select-label" style={{color:'white'}}>Theme</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Theme}
          label="Theme"
          onChange={handleChange}
          style={{backgroundColor:'rgb(0,7,61)', border:'groove 1px', color:'white'}}
        >
          <MenuItem value={10}>Default</MenuItem>
          <MenuItem value={10}>Light</MenuItem>
          <MenuItem value={20}>Dark</MenuItem>
          <MenuItem value={30}>Cosmic</MenuItem>
          <MenuItem value={30}>Corporate</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
