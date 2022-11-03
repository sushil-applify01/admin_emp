import React from 'react'

export default function EditAdmin() {
  return (
    <div>
        <div className="adminedit" style={{height:'550px',width:'900px'}}>
            <h5 style={{borderBottom:'groove'}}>Edit Admin</h5>
        <form>
  <div className="form-group">
    <label for="exampleInputEmail1">Full Name</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Full Name"/>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Last Name</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Your Last Name"/>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Email</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Your Email"/>
  </div>
  <div className="form-group">
    <label for="exampleFormControlSelect1">Admin Type</label>
    <select className="form-control" id="exampleFormControlSelect1">
      <option>Super Admin</option>
      <option>Sub Admin</option>
    </select>
  </div>
  <label for="exampleFormControlSelect1">Admin Access</label>
  <div className="form-group form-check" style={{display:'flex'}}>
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label mx-3" for="exampleCheck1">Admin</label>
    <div className="form-group form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label mx-3" for="exampleCheck1">User Management</label>
    </div>
    <div className="form-group form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label mx-3" for="exampleCheck1">Notification</label>
    </div>
    <div className="form-group form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label mx-3" for="exampleCheck1">Report</label>
    </div>
    <div className="form-group form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label mx-3" for="exampleCheck1">System Configuration</label>
  </div>
  </div>
  <button type="submit" className="btn btn-primary">Save</button>
</form>
    </div>
    </div>
  )
}
