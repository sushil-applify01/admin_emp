import React, { useState } from 'react'
import "./Join.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

var user
user =  localStorage.getItem('firstName')

const sendUser = () => {
    // user = document.getElementById('joinInput').value;
    // document.getElementById('joinInput').value = "";
    // user = localStorage.getItem.
    const data1 = localStorage.getItem('firstName')
    console.log(data1)
    user =  localStorage.getItem(data1)
}


const Join = () => {
    const [name, setname] = useState("");
    return (
        <div className="JoinPage">
            <div className="JoinContainer">
                <img src={logo} alt="logo" />
                <h1>CHAT</h1>
                <input onChange={(e) => setname(e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput" />
                <Link onClick={(event) => !name ? event.preventDefault() : null} to="/route/systemconfig/chats/msg">  <button onClick={sendUser} className="joinbtn">Login In</button></Link>
            </div>
        </div>
    )
}

export default Join
export { user }
