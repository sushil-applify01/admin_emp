import React,{useState} from 'react'
import { userService } from '../UserServices'
import {toast} from 'react-toastify'



export default function Addnotification() {
  //const [image,setImage] = useState("")
  const [title,setTitle] = useState("")
  //const [platform,setPlatform] = useState("")
  const [message,setMessage] = useState("")
 
    const titlechangehandler=(e) => setTitle(e.target.value)
    const messagechangehandler=(e) => setMessage(e.target.value)
    //const pltChangehandler=(e) => setPlatform(e.target.value)

    const [image, setImage] = useState("");
    const [showImage, setshowImage] = useState("")

    function onPrfileimageUpload(event) {
      event.preventDefault();
      console.log(event.target.files[0])
      var file = event.target.files[0];
      setImage(file);
      setshowImage(URL.createObjectURL(event.target.files[0]));
  }
    
    const submitStep = () => {
        // let params = {
        //   // path:image,
        //   title:title,
        //   message:message,
        // };
        const formData = new FormData();
        formData.append('title', title)
        formData.append('message', message);
        formData.append('image', image);
  
        userService.addnotification(formData).then((response) => {
          console.log(response,'res')      
          toast.success("Successfully Notification Added ");
              window.location.href = '/route/notification';
        }).catch((error) => {
          console.log(error)
          toast.error("Invalid Details")
        });
      }
  return (
    <div>
        <div className="adminedit" style={{height:'600px', width:'850px'}}>
    <h5 style={{borderBottom:'groove'}}>Add Notification</h5>
<form>
<div className="form-group">
<label for="exampleInputEmail1">Upload Image</label>
{/* <input type="file" encType="multipart/form-data" className="form-control" onChange={imagechangehandler} value={image} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Upload Image"/> */}
<div className="upload_image">
                        <img src={showImage ? showImage : image} alt="" className="img-circle profile_image" />
                        <input type="file" onChange={onPrfileimageUpload} />
                    </div>
                    <p className="upload_text">Upload Image</p>
</div>
<div className="form-group">
<label for="exampleInputPassword1">Title</label>
<input type="text" className="form-control" onChange={titlechangehandler} value={title} id="exampleInputPassword1" placeholder="Enter Title"/>
</div>
{/* <div className="form-group">
<label for="exampleInputPassword1">Platform Type</label><br/>
<Select
          id="demo-simple-select"
          value={platform}
          label="none"
          onChange={pltChangehandler}
          style={{width:'780px'}}
        >
          <MenuItem value={10}>IOS</MenuItem>
          <MenuItem value={20}>ANDROID</MenuItem>
          <MenuItem value={30}>WEB</MenuItem>
        </Select>
</div> */}
<div className="form-group">
<label for="exampleInputPassword1">Message</label>
<input type="text" style={{height:'140px'}} className="form-control" onChange={messagechangehandler} value={message} id="exampleInputPassword1" placeholder="Enter Message"/>
</div>
<button type="submit" onClick={() => submitStep()} className="btn btn-primary">Save</button>
</form>
</div>
</div>
  )
}
