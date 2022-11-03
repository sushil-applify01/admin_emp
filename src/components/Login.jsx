import React ,{useState} from "react";
import logoimg from "./images/projectlogo.png";
import Select from "react-select";
import {useNavigate} from "react-router-dom";
import '../loginstyle.css'
import { userService } from '../UserServices'
import {toast} from 'react-toastify'


const options = [
  { value: "light", label: "Light", color: "#FFFFFF" },
  { value: "dark", label: "Dark", color: "#222B45" },
  { value: "cosmic", label: "Cosmic", color: "#323259" },
  { value: "corporate", label: "Corporate", color: "#FFFFFF" },
];


function Login() {
  const navigate = useNavigate();
  const forgotpassword = () => {
    navigate("/forgetpassword");
  };
  const [email, setEmail] = useState("");
  const [bgColour, setBgColour] = useState("rgb(0 0 0)", "#FFFFFF");
  const [emailError, setemailError] = useState("");
  const [selectedOption, setSelectedOption] = useState();
  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState("");
  
  // var mystyle={dark:{color:'white',backgroundColor:'#222B45'},
  // light:{color:'black',backgroundColor:'white'},cosmic:{color:'white',backgroundColor:'#323259'}}


  const setSelected = (e) => {
    setSelectedOption(e.color);
  };

  const validateStep = () => {
    var emailRegex = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (email.length === 0 && password.length === 0) {
      setpasswordError("You can't leave this blank");
      setemailError("You can't leave this blank");
    } else if (!emailRegex.test(email)) {
      console.log("right email");
      setemailError("*Please enter valid email address");
    } else if (password.length === 0) {
      setpasswordError("*Please enter password");
    }
    else {
      let params = {
        email: email,
        password: password,
      };
      userService.logIn(params).then((response) => {

        var data = response.data.data.accessToken
        localStorage.setItem("accessToken", data)
        localStorage.setItem('firstName', response.data.data.adminDetails.firstName);
        localStorage.setItem('lastName', response.data.data.adminDetails.lastName)
        toast.success("Successfully Signed-In");
            window.location.href = '/route/dashboard';
          
      }).catch((error) => {
        toast.error("Invalid Login Credentials")
      });
    }
  };
  const emailonchangehandler=(e) => setEmail(e.target.value)
  const passonchangehandler=(e) => setPassword(e.target.value)

  return (
        <div className="logincontainer App" style={{backgroundColor:`${selectedOption}`}}>
      <div className="logologin">
        <img src={logoimg} alt="logojimage" className="logologin"/>
        <h2 className="title" >We love creative Business Ideas</h2>
      </div>
      <div className="form">
        <form>
          <div>
            <div className="form-element">
              <div>
                <label className="content">Email</label>
              </div>
              <input
                placeholder="Enter email"
                className="form-input"
                value={email}
                onChange={emailonchangehandler}
              />
              {emailError.length > 0 && (
                <span style={{ color: "red" }}>{emailError}</span>
              )}
            </div>
            <div className="form-element">
              <label className="content">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input"
                value={password}
                onChange={passonchangehandler}
              />
              {passwordError.length > 0 && (
                <span style={{ color: "red" }}>{passwordError}</span>
              )}
            </div>
            <div className="form-element form-password-reset">
              {/* <label className="checkbox-content">
                <input type="checkbox" className="checkbox"></input>
                <i className="loginlink">Remember me</i>
              </label> */}
              <button onClick={forgotpassword} className="loginlink">
                Forgot password?
              </button>
            </div>
            <div className="form-element form-button" >
              <button
                className="button"
                style={{ background: `${bgColour}`, color: "#FFFFFF" }}
                onClick={() => validateStep()}
                onMouseOver={() => setBgColour("#FFFFFF")}
                onMouseOut={() => setBgColour("#000000")}
                type="button"
              >
                Login
              </button>
            </div>
            <div className="form-element">
            <style>{"body {background-color:" + selectedOption + ";"}</style>
              <label className="content">
                Select Theme
                <Select
                  value={setSelectedOption}
                  onChange={setSelected}
                  options={options}
            />
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
