import React,{useState} from "react";
import { useNavigate,useParams} from "react-router";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {userService} from '../UserServices'
import projectlogo from "./images/projectlogo.png";

function Resetform() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    
    let id = useParams();

    async function onChange (){
        // if (!email) {
        //     toast.error("Please enter email")
        // }
       if (!password) {
            toast.error("Please enter password")
        }
        else if (!confirmPassword) {
            toast.error("Please enter confirm password")
        }
        else if (password !== confirmPassword) {
            toast.error("New password and confirm password must be same")
        }
        else {
            var params = {
                id:id.id,
                password:password,
                confirmPassword:confirmPassword
            }
             await userService.setpassword(params).then(response => {
                    console.log("response.user", response)
                    toast.success("Password change successfully")
                    navigate('/')
                })
                .catch(error => {
                    toast.error("error")
                });
        }
    }

    
    function onEmailChanged(event) {
        setEmail(event.target.value.replace(/ /g, ""))
    }
    function onnewPasswordChanged(event) {
        setpassword(event.target.value.replace(/ /g, ""))
    }
    function onconfirmPasswordChanged(event) {
        setconfirmPassword(event.target.value.replace(/ /g, ""))
    }
    
    return (


    <div className="containe" style={{backgroundColor:'white'}}>

      <div className="reset">
        <img src={projectlogo} alt="logo1" className="logo" style={{height:'90px', width:'190px', marginLeft:'250px'}}/>

        <h2 className="title" style={{marginLeft:'220px'}}>We love creative Business Ideas</h2>
      
      <div className="form-container">
        <form>
          <div>
            <div className="form-element">
              {/* <div>
                <label className="content">Email</label>
              </div>
              <p
                placeholder="Enter email"
                className="form-input"
                value={email}
                type="email"
                maxLength={40} 
                onChange={onEmailChanged}
              ></p> */}
            
            </div>

            <div className="form-element">
              <label className="content">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input"
                value={password}
                maxLength={30}
                onChange={onnewPasswordChanged}
              />
            </div>

            <div className="form-element">
              <label className="content">Confirm Password</label>
              <input
                type="password"
                placeholder="Enter confirm password"
                className="form-input"
                value={confirmPassword}
                maxLength={30}
                onChange={onconfirmPasswordChanged}
              />
            </div>
            <br/>
            <div className="form-element form-button">
              <button className="button1 "
                onClick={() => onChange()}

                type="button" style={{width:'190px', height:'40px',margin:'auto' ,backgroundColor:'navy',color:'white'}}>Change Password</button>
            </div>
          
          </div>
        </form>
      </div>
    </div>
    </div>
    )
}
export default Resetform