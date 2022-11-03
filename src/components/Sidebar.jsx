import React from 'react';
import {AnimatePresence,motion} from 'framer-motion';
import {FaHome,FaBars,FaLock, FaMoneyBill, FaUser,FaUsers} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { RiAdminLine } from "react-icons/ri";
import { IoMdNotifications } from "react-icons/io";
import { FcDataConfiguration } from "react-icons/fc";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { useState } from "react";
import SidebarMenu from "./SidebarMenu";
import Navbar from "./Navbar"
import { Outlet } from 'react-router-dom'

 const Sidebar=() =>{
  const Route=[
  {
    path: "/route/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/route/users",
    name: "User Management",
    icon: <FaUsers />,
  },
  {
    path: "/route/admin",
    name: "Admin",
    icon: <RiAdminLine />,
  },
  {
    path: "/route/notification",
    name: "Notification",
    icon: <IoMdNotifications />,
  },
  {
    path: "/route/sysconfig",
    name: "System Configuration",
    icon: <FcDataConfiguration />,
    subRoutes: [
      {
        path: "/route/systemconfig/categories",
        name: "Categories ",
        icon: <FaUser />,
      },
      {
        path: "/route/systemconfig/app-version",
        name: "App Version",
        icon: <FaLock />,
      },
      {
        path: "/route/systemconfig/admin-achivement",
        name: "Admin Achivements",
        icon: <FaMoneyBill />,
      },
      {
        path: "/route/systemconfig/calender-events",
        name: "Calender Events",
        icon: <FaMoneyBill />,
      },
      {
        path: "/route/systemconfig/chats",
        name: "Chats",
        icon: <FaMoneyBill />,
      },
      {
        path: "/route/systemconfig/comment",
        name: "Comment",
        icon: <FaMoneyBill />,
      },
    ],
  },
  {
    path: "/route/report",
    name: "Report",
    icon: <HiOutlineDocumentReport />,
    exact: true,
    subRoutes: [
      {
        path: "/route/report/reported-content",
        name: "Reported Content",
        icon: <FaUser />,
      },
      {
        path: "/route/report/reported-bugs",
        name: "Reported Bugs",
        icon: <FaLock />,
      },
    ],
  },
  ]
  const [isOpen,setIsOpen]= useState(false)
  const toggle=()=>{setIsOpen(!isOpen)}
  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <div  className="sidenav">
      <Navbar/>
    <div className="main-container" >
        <motion.div animate={{width:isOpen?'230px':'36px',transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },}} className='sidebar'>
          <div className="bars" onClick={toggle}><FaBars /></div>
          <section className='routes'>
            {Route.map((Route,index)=>{if (Route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={Route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
            }
              return(
              <NavLink activeClassName='active' to={Route.path} key={index} className='link'>
              <div className="icon">{Route.icon}</div>
              <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {Route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
            </NavLink>
            );})}
          </section>
        </motion.div>
        <main>
            {/* {children} */}
            <Outlet />
        </main>
        </div>    
    </div>
  )
}
export default Sidebar;
