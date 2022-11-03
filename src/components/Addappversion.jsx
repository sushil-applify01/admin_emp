import React,{useState} from 'react'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { userService } from '../UserServices'
import {toast} from 'react-toastify'

export default function Addappversion() {
    const namechangehandler=(e) => setName(e.target.value)
    const versionchangehandler=(e) => setVersion(e.target.value)
    // const minimumversionchangehandler=(e) => setMinimumversion(e.target.value)
    const appnamechangehandler=(e) => setAppname(e.target.value)
    const [name,setName] = useState("")
    const [version,setVersion] = useState("")
    // const [minimumversion,setMinimumversion] = useState("")
    const [appname,setAppname] = useState("")
    const submitStep = () => {
      let params = {
        appname:appname,
        platform:name,
        version:version,
      };

      userService.addappversion(params).then((response) => {
        console.log(response,'res')      
        toast.success("Successfully App Version Added ");
            window.location.href = '/route/systemconfig/app-version';
      }).catch((error) => {
        console.log(error)
        toast.error("Invalid Details")
      });
    }
  return (
    <div>
        <div><div className="adminedit" style={{height:'450px', width:'850px'}}>
    <h5 style={{borderBottom:'groove'}}>Add App Version</h5>
        <form>
            <div className="image">
            <label classname="form-label" for="customFile">App Name</label>
            <Select
          id="demo-simple-select"
          value={appname}
          label="none"
          onChange={appnamechangehandler}
          style={{width:'780px'}}
        >
          <MenuItem value={'Facebook'}>Facebook</MenuItem>
          <MenuItem value={'Gmail'}>Gmail</MenuItem>
          <MenuItem value={'Apple'}>Apple</MenuItem>
          <MenuItem value={'Microsoft'}>Microsoft</MenuItem>
          <MenuItem value={'Others'}>Others</MenuItem>
        </Select>
            <label classname="form-label" for="customFile">Name</label>
            <Select
          id="demo-simple-select"
          value={name}
          label="none"
          onChange={namechangehandler}
          style={{width:'780px'}}
        >
          <MenuItem value={'IOS'}>IOS</MenuItem>
          <MenuItem value={'ANDROID'}>ANDROID</MenuItem>
          <MenuItem value={'WEB'}>WEB</MenuItem>
        </Select>
        <label classname="form-label" for="customFile">Version</label>
    <input type="text" value={version} onChange={versionchangehandler} className="form-control" id="customFile" placeholder='Enter Version' />
            </div>
  {/* <div className="form-grou">
    <label for="exampleInputEmail1">Minimum Version</label>
    <input type="text" value={minimumversion} onChange={minimumversionchangehandler} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Minimum Version'/>
  </div> */}
  <button type="submit" onClick={() => submitStep()} className="btn btn-primary">Save</button>
</form>
    </div>
    </div>
    </div>
  )
}