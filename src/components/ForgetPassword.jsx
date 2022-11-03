import React,{useState} from "react";
import logoimg from "./images/projectlogo.png";
import { useNavigate } from "react-router-dom";
import '../loginstyle.css'
import { userService } from '../UserServices'
import {toast} from 'react-toastify'

function ForgotPassword() {
  const navigate = useNavigate();
  const backToLogin = () => {
    navigate("/");
  };

  const [bgColour, setBgColour] = useState("#000000");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("")

  // var emailRegrex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+))|("[\w-\s]+")([\w-]+(?:\.[\w-]+)))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  // const validateStep1 = (event) => {
   
  //   if (email.length ===0) {
  //     setemailError("Please enter an email address.")
  //   } else if (!emailRegrex.test(email)) {
  //     Swal.fire({
  //       title: 'Oops...',
  //       text: '"email" must be a valid email',
  //       confirmButtonText: 'Ok'
  //     })
  //   } else {
  //     Swal.fire({
  //       title: 'Oops...',
  //       text: 'Invalid Credential',
  //       confirmButtonText: 'Ok'
  //     })
  //   }
  // }
  const styles = {
    background: `${bgColour}`,
    color: "#FFFFFF",
  };
  
  const validateStep1 = (event) => {
    var emailRegex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (email.length === 0) {
      setEmailError("*Please enter Email");
    } else if (!emailRegex.test(email)) {
      console.log("right email");
      toast.error('Please enter a Valid mail')
    } else
    {
    var params = {
      email:email,
    }
    userService.forgotPassword(params).then(response => {

      if (response.data.data.status === "Success") {
        toast.success("sent email successfully")
      } else  {
        toast.error("Invalid email")
      }
      })
      .catch(error => {
          toast.error("error")
      });
    }
}


  function onEmailChanged(event) {
    setEmailError("")
    setEmail(event.target.value.replace(/ /g, ""))
  }


  return (
    <div className="logincontainer app" style={{backgroundColor:'#222B45'}}>
      <div className="logincontainer">
        <img src={logoimg} alt="logo1" className="logologin" />
        <h2 className="title">We love creative Business Ideas</h2>
      
   <div className="form">
        <form>
          <div>
            <div className="form-element">
              <div className="pass-msg">
                <p className="content">
                  Enter the email associated with your account to reset password
                </p>
              </div>
            </div>
            <div className="form-element">
              <div>
                <label className="content">Email</label>
              </div>
              <br></br>
              <input
                type="email"
                placeholder="Enter email here..."
                className="form-input"
                value={email}
                onChange={onEmailChanged}
              />

              {emailError.length > 0 && (
                <span style={{ color: "red" }}>{emailError}</span>
              )}
            </div>
            
            {/* className="form-element form-button get-pwd" */}
            <div >
              <button
              type="button"
                className="button"
                style={styles}
                onMouseEnter={() => setBgColour("#FFFFFF")}
                onMouseLeave={() => setBgColour("#000000")}
                onClick={() => validateStep1()}
              >
                Continue
              </button>
            </div>
          </div>
          <div className="back-to-login">
            <button onClick={backToLogin} className="link" style={{backgroundColor:'green'}}>
              Back to login
            </button>
          </div>
        </form>
      </div>
      <br></br>
    </div>
    </div>
  );
}

export default ForgotPassword;
