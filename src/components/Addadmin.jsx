import React, { useState } from 'react'
import { userService } from '../UserServices'
import {toast,ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Addadmin() {
  const [firstname,setFirstname] = useState("")
  const [lastname,setLastname] = useState("")
  const [email,setEmail] = useState("")
  const [admintype,setAdmintype] = useState("")
  const [countrycode,setCountrycode] = useState("")
  const [phonenumber,setPhonenumber] = useState("")
  // const [adminaccess,setAdminaccess] = useState([])
  console.log(firstname,lastname,email,admintype)
  const firstnamechangehandler=(e) => setFirstname(e.target.value)
  const lastnamechangehandler=(e) => setLastname(e.target.value)
  const emailchangehandler=(e) => setEmail(e.target.value)
  const countrycodechangehandler=(e) => setCountrycode(e.target.value)
  const phonenumberchangehandler=(e) => setPhonenumber(e.target.value)
  const admintypechangehandler=(e) => setAdmintype(e.target.value)

  const submitStep = () => {
      let params = {
        firstName:firstname,
        lastName:lastname,
        email:email,
        countryCode:countrycode,
        phoneNumber: phonenumber,
        adminType:admintype
      };

      userService.addadmin(params).then((response) => {
        // var data = response.data.data.accessToken
        // localStorage.setItem("accessToken", data)
        toast.success("Successfully Admin Added ");
        // eslint-disable-next-line
            useNavigate = '/route/admin';
      }).catch((error) => {
        toast.error("Invalid Details")
      });
    }
  return (
    <div><div className="adminedit" style={{height:'800px', width:'850px'}}>
    <h5 style={{borderBottom:'groove'}}>Add Admin</h5>
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
<div className="form-group">
<label for="exampleFormControlSelect1">Admin Type</label>
<select className="form-control" onChange={admintypechangehandler} value={admintype} id="exampleFormControlSelect1">
<option>SUPER_ADMIN</option>
<option>SUB_ADMIN</option>
</select>
</div>
<button type="submit" onClick={() => submitStep()} className="btn btn-primary">Save</button>
</form>
</div></div>
  )
}
