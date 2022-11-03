import React, { useState } from 'react'
import { userService } from '../UserServices'
import {toast} from 'react-toastify'

export default function Adduser() {
  const [firstname,setFirstname] = useState("")
  const [lastname,setLastname] = useState("")
  const [email,setEmail] = useState("")
  const [countrycode,setCountrycode] = useState("")
  const [phonenumber,setPhonenumber] = useState("")
  // const [adminaccess,setAdminaccess] = useState([])
  console.log(firstname,lastname,email)
  const firstnamechangehandler=(e) => setFirstname(e.target.value)
  const lastnamechangehandler=(e) => setLastname(e.target.value)
  const emailchangehandler=(e) => setEmail(e.target.value)
  const countrycodechangehandler=(e) => setCountrycode(e.target.value)
  const phonenumberchangehandler=(e) => setPhonenumber(e.target.value)

  const submitStep = () => {
      let params = {
        firstName:firstname,
        lastName:lastname,
        email:email,
        countryCode:countrycode,
        phoneNumber: phonenumber
      };

      userService.adduser(params).then((response) => {
        var data = response.data.data.accessToken
        localStorage.setItem("accessToken", data)
        toast.success("Successfully User Added ");
            window.location.href = '/route/users';
      }).catch((error) => {
        toast.error("Invalid Details")
      });
    }
  return (
    <div><div className="adminedit" style={{height:'600px', width:'850px'}}>
    <h5 style={{borderBottom:'groove'}}>Add User</h5>
<form>
<div className="form-group">
<label for="exampleInputEmail1">First Name</label>
<input type="text" className="form-control" onChange={firstnamechangehandler} value={firstname} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Full Name"/>
</div>
<div className="form-group">
<label for="exampleInputPassword1">Last Name</label>
<input type="text" className="form-control" onChange={lastnamechangehandler} value={lastname} id="exampleInputPassword1" placeholder="Enter Your Last Name"/>
</div>
<div className="form-group">
<label for="exampleInputPassword1">Email</label>
<input type="email" className="form-control" onChange={emailchangehandler} value={email} id="exampleInputPassword1" placeholder="Enter Your Email"/>
</div>
<div className="form-group">
<label for="exampleInputPassword1">Coutntry Code</label>
<input type="text" className="form-control" onChange={countrycodechangehandler} value={countrycode} id="exampleInputPassword1" placeholder="Enter Your Email"/>
</div>
<div className="form-group">
<label for="exampleInputPassword1">Phone Number</label>
<input type="text" className="form-control" onChange={phonenumberchangehandler} value={phonenumber} id="exampleInputPassword1" placeholder="Enter Your Email"/>
</div>
<button type="submit" onClick={() => submitStep()} className="btn btn-primary">Save</button>
</form>
</div></div>
  )
}
