import React,{useState} from 'react'
import { userService } from '../UserServices'
import {toast} from 'react-toastify'

export default function Addcategory() {
    const namechangehandler=(e) => setName(e.target.value)
    const imagechangehandler=(e) => setImage(e.target.value)
    const [name,setName] = useState("")
    const [image,setImage] = useState("")

    const submitStep = () => {
      let params = {
        // path:image,
        name:name,
        image:image,
      };

      userService.addcategory(params).then((response) => {
        console.log(response,'res')      
        toast.success("Successfully Category Added ");
            window.location.href = '/route/categories';
      }).catch((error) => {
        console.log(error)
        toast.error("Invalid Details")
      });
    }
  return (
    <div>
        <div><div className="adminedit" style={{height:'400px', width:'850px'}}>
    <h5 style={{borderBottom:'groove'}}>Add Category</h5>
        <form>
            <div className="image">
            <label classname="form-label" for="customFile">Name</label>
    <input type="text" value={name}onChange={namechangehandler} className="form-control" id="customFile" placeholder='Enter Name' />
            </div>
  <div className="form-grou">
    <label for="exampleInputEmail1">Image</label>
    <input encType="multipart/form-data" type="file" value={image} onChange={imagechangehandler} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter New Password'/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={() => submitStep()}>Save</button>
</form>
    </div>
    </div>
    </div>
  )
}
