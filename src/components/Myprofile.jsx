import React from 'react'
import { useState } from 'react'

export default function Myprofile() {
const [tabswitch,setTabswitch] = useState(true)
const [oldpassword,setOldpassword] = useState("")
const [newpassword,setNewpassword] = useState("")
const [confirmpassword,setConfirmpassword] = useState("")

    const oldpasswordchangehandler=(e) => setOldpassword(e.target.value)
    const newpasswordchangehandler=(e) => setNewpassword(e.target.value)
    const confirmpasswordchangehandler=(e) => setConfirmpassword(e.target.value)

  return (
    <div>
        <div className="adminedit" style={{height:'550px',width:'900px'}}>
            <div className="tab" style={{display:'flex',borderBottom:'groove'}}>
            <h5 style={{marginLeft:'10px',paddingRight:'8px',borderRight:'groove', borderBottom:tabswitch?'2px solid blue':'none' }} onClick={()=>{setTabswitch(true)}}>Profile</h5>
            <h5 style={{marginLeft:'10px',borderBottom:!tabswitch?'2px solid blue':'none'}} onClick={()=>{setTabswitch(false)}}>Change Password</h5></div>
           {tabswitch?<div className="profile">
        <form>
            <div className="image">
            <label classname="form-label" for="customFile">Upload Image *</label>
    <input type="file" className="form-control" id="customFile" />
            </div>
            <div className="image">
            <label classname="form-label" for="customFile">Upload Image *</label>
    <input type="file" className="form-control" id="customFile" />
            </div>
  <div className="form-grou">
    <label for="exampleInputEmail1">First Name</label>
    <p type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">SUSHIL</p>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Last Name</label>
    <p type="password" className="form-control" id="exampleInputPassword1">KUMAR</p>
  </div>
  <button type="submit" className="btn btn-primary">Save</button>
</form>
</div>:''}
{!tabswitch?<div className="changepass">
<form>
            <div className="image">
            <label classname="form-label" for="customFile">Old Password</label>
    <input type="password" onChange={oldpasswordchangehandler} className="form-control" id="customFile" placeholder='Enter Old Password' />
            </div>
  <div className="form-grou">
    <label for="exampleInputEmail1">New Password</label>
    <input type="password"onChange={newpasswordchangehandler} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter New Password'/>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Confirm Password</label>
    <input type="password"onChange={confirmpasswordchangehandler} className="form-control" id="exampleInputPassword1" placeholder='Confirm New Password'/>
  </div>
  <button type="submit" className="btn btn-primary">Save</button>
</form>
</div>:''}
    </div>
    </div>
  )
}
