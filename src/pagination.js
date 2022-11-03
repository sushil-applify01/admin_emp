import React, { useState, useEffect } from "react";
import { Modal, Table } from "antd";
import { CloseOutlined, DeleteOutlined,EditOutlined, UserAddOutlined,CheckOutlined } from "@ant-design/icons";
import { userService } from "../../services/userServices";
import {useNavigate}  from 'react-router';
import './Admin.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import querystring from 'querystring'


const Admin = () => {
 
  const navigate = useNavigate();
  const [admin, setAdmin] = useState([{}])
  const [current, setCurrent] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  

  const columns = [
    {
      key: "1",
      title: 'ID',
      dataIndex: 'id',

    },
    {
      key: "2",
      title: 'First Name',
      dataIndex: 'firstName',

    },
    {
      key: "3",
      title: 'Last Name',
      dataIndex: 'lastName',
    },
    {
      key: "4",
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: "5",
      title: 'Type',
      dataIndex: 'adminType'
    },
    {
      key: "6",
      title: "Block",
      render: (record) => onAdminUser(record),
    },
    {
      key: "7",
      title: "Actions",
      render: (record) => {
        return (
          <>
          <div className="icon-css">
            <DeleteOutlined
              onClick={() => {
                onDeleteAdmin(record.id,record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
            <EditOutlined
            onClick={() => editAdmin(record.id, record)}
             style={{ color: "red", marginLeft: 12 }}
            />
           
            </div>
            
          </>
        );
      }
    },
  ];
 



  const editAdmin = (id,record) => {
    delete record['id'];
    navigate('/route/admin/edit/' + id + '?' + querystring.stringify(record));
  }


  const onDeleteAdmin = (id,record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this admin record?",
      okText: "Yes",
      onOk: () =>onDelete(id),
    });
  };


  const onDelete = (id, record) => {
    userService.adminDelete(id)
      .then(response => {
        adminAPI()
        toast.success("successfully delete the admin");
        navigate('/route/admin')        
      })
      .catch(error => {
        console.log(error.response)
      });
  }


  const onAdminUser =(id,isBlocked) => {
    var isBlocked = id.isBlocked
    return (
        <>
            {isBlocked === 1 ?        
                <CheckOutlined onClick={() => onAdminModal(id, 0)} />
                :
                <CloseOutlined onClick={() => onAdminModal(id,1)} />
            }
       </>
     );
  }

  const onAdminModal = (id,value) => {
    
    Modal.confirm({
      title: "Are you sure you want to block this Admin",
      okText: "Yes",
      onOk: () =>suspendUser(id,value)
    });
  };



  const suspendUser=(id,isBlocked) => {
    let result;
    var id = id.id
   if (isBlocked === 1) {
 } else {
 } 
   var params ={
     id:id,
     isBlocked:isBlocked
   }

   userService.blockAdmin(params)
     .then(response => {
      adminAPI()
      //  navigate('/route/admin')
       window.location.href ='/route/admin'        
       toast.success("successfully block the admin");
     })
     .catch(error => {
       console.log(error.response)
     });
 }


  const adminAPI = (pageSize,current) => {
    userService.admin(pageSize,current)
      .then(response => {
        console.log("pagination===>",response.data.data.count)
        var data = response.data.data.rows
        console.log("admin data",data)
        setAdmin(data);
        setTotalCount(response.data.data.count)

      })
      .catch(error => {
        console.log(error.response)
      });
  }
  useEffect(() => adminAPI(pageSize,current), []);

  return (
    <>
      <div className="user-css">
        <h1>Admin</h1>
        <Table
          columns={columns}
          dataSource={admin}
          pagination={{
            pageSize: pageSize,
            total: totalCount,
            current:current,
            onChange: (pageSize,current) => {
              adminAPI(pageSize,current);
            },
          }}
        />
        <a className="btn-dev" href="admin/new"><UserAddOutlined/></a>
      </div>
    </>
  )
};

export default Admin;