import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {FiSearch} from 'react-icons/fi'
import {BsEnvelope} from 'react-icons/bs'
import {IoMdNotificationsOutline} from 'react-icons/io'
import profile from './images/sushil2.jpg'
import Themelist from './Themelist';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Navbar() {
  const [searchinput,setSearchinput] =useState(false)
  const data =  localStorage.getItem('firstName')
  const data1 = localStorage.getItem('lastName')
  function logout() {
    localStorage.clear('');
    window.location.href='/'
    }

 console.log("username value",data)
  const TextVariants = {
    offscreen: {
      opacity: 0
    },
    onscreen: {
      opacity: 1
    },
    exit: {
      opacity: 0
    }
  };
  return (
    <div>
      <motion.div style={{position:'sticky', top:'0px',left:'0px', }}>
      <nav className="navbar  navbar-expand-lg navbar-light">
    <div className="container-fluid">
      <button
        className="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars"></i>
      </button>
  
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <a className="navbar-brand mt-2 mt-lg-0" href="/">
         <motion.h1 className='logo' initial="offscreen"
                  animate="onscreen"
                  exit="exit"
                  variants={TextVariants}
                  transition={{duration: 2,}}>APPLIFY</motion.h1>
        </a>
        <div className="dropdown" style={{marginLeft:'90px'}}>
          {/* <Themelist/> */}
        </div>
        {/* <div class="formoutline" >
  <input type="search" id="form1" class="form-control" style={{width:'210px', margin:'auto'}} placeholder="Type query" aria-label="Search" />
</div> */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="/" style={{borderRight:'groove'}}><FiSearch onClick={()=>{setSearchinput(!searchinput)}} size='20px'/></a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/route/systemconfig/chats" style={{borderRight:'groove'}}><BsEnvelope size='20px'/></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/route/notification" ><IoMdNotificationsOutline size='20px'/></Link>
          </li>
        </ul>
      </div>  
            <div className="d-flex align-items-center" style={{position:'relative', zIndex:'1'}}>
            <a href='/' style={{width:'80px'}}><h6 className='username'>{data} {data1}</h6></a>
            <Dropdown zindex={1}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
      <img
              src={profile}
              className="rounded-circle"
              height="25"
              alt="Black and White Portrait of a Man"
              loading="lazy"
            />
      </Dropdown.Toggle >
      <Dropdown.Menu style={{zIndex:1}}>
        <Dropdown.Item href="/route/">My Profile</Dropdown.Item>
        <Dropdown.Item  onClick={logout}>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      </div>
    </div>
  </nav>
  </motion.div>
  </div>
  )
}

