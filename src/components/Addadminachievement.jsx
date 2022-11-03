import React,{useState} from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { userService } from '../UserServices'
import {toast} from 'react-toastify'

export default function Addadminachievement() {
    const namechangehandler=(e) => setName(e.target.value)
    const typechangehandler=(e) => setType(e.target.value)
    const [name,setName] = useState("")
    const [Type,setType] = useState("")
    const submitStep = () => {
      let params = {
        name:name,
        Type:Type,
      };

      userService.addadminachievement(params).then((response) => {
        console.log(response,'res')      
        toast.success("Successfully Admin Achievement Added ");
            window.location.href = '/route/systemconfig/admin-achivement';
      }).catch((error) => {
        console.log(error)
        toast.error("Invalid Details")
      });
    }
  return (
    <div>
        <div><div className="adminedit" style={{height:'400px', width:'850px'}}>
    <h5 style={{borderBottom:'groove'}}>Add Admin Achievement</h5>
        <form>
            <div className="image">
            <label classname="form-label" for="customFile">Name</label>
            <input type="text" value={name} onChange={namechangehandler} className="form-control" id="customFile" placeholder='Enter Name..' />
            <label classname="form-label" for="customFile">Type</label>
            <Select
          id="demo-simple-select"
          value={Type}
          label="none"
          onChange={typechangehandler}
          style={{width:'780px'}}
        >
          <MenuItem value={'Parallel'}>Parallel</MenuItem>
          <MenuItem value={'Saquential'}>Saquential</MenuItem>
        </Select>
        </div>
        <br></br>
  <button type="submit" onClick={()=>{submitStep()}} className="btn btn-primary">Save</button>
</form>
    </div>
    </div>
    </div>
  )
}