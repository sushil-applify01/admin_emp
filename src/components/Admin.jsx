import {BsSearch} from 'react-icons/bs'
import {FiFilter} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {MdModeEditOutline} from 'react-icons/md'
import {TbLockOpen,TbLock} from 'react-icons/tb'
import {Link } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import { userService } from '../UserServices'
import Floatingadd from './Floatingadd'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import TablePagination from "@mui/material/TablePagination";

export default function Admin() {
  const [admin, setAdmin] = useState([{}])
  const [searchVal,setSearchVal] = useState("")
  const [searchList, setSearchList] = useState()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  
  const adminAPI = () => {
    userService.admin()
      .then(response => {
        var data = response.data.data.rows
        console.log("admin data",data)
        setAdmin(data);
        setSearchList(data)
      })
      .catch(error => {
        console.log(error.response)
      });
  }
  useEffect(() => {
    if (searchVal){
       let searchedText = searchVal.toLowerCase();
      const result = admin.filter((data) =>      
        data.firstName.toLowerCase().match(searchedText)|| data.lastName.toLowerCase().match(searchedText) || data.email.toLowerCase().match(searchedText));
      setSearchList(result);
    }else{
      setSearchList(admin);
    }
  }, [searchVal]); 

  useEffect(() => adminAPI(), []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // eslint-disable-next-line
  const onDelete = (id, item) => {
    userService.adminDelete(id)
      .then(response => {
        adminAPI()
        toast.success("successfully deleted the admin");
        useNavigate='/route/admin'      
      })
      .catch(error => {
        console.log(error.response)
      });
  }

  const BlockUser=(id,blockstate) => {
    var params ={
      id:id,
      isBlocked:blockstate?0:1
    }

    userService.blockadmin(params)
     .then(response => {
      adminAPI()
      params.isBlocked?toast.success("successfully blocked the admin"):toast.success("successfully Unblocked the admin")
       useNavigate='/route/admin'
     })
     .catch(error => {
       console.log(error.response)
     });
 }

  return (
    <div>
    <div className="table-container" style={{width:'980px',height:'900px'}}>
      <div className="title" style={{display:'flex'}}>
        <h5 style={{borderBottom:'groove'}}>Admin</h5><br></br><div className="searchfilter" style={{marginLeft:'auto',marginRight:'0',borderBottom:'groove'}}><i ><BsSearch size='20px' /></i><i><FiFilter size='20px' style={{marginLeft:'20px'}}/></i></div>
        </div>
        <div className="searchinput" >
            <input type="text" 
            value={searchVal}
             onChange={(e)=>setSearchVal(e.target.value)} className="form-control"  id='myinput' placeholder="Search User" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
    <table className="table table-striped table-light" style={{tableLayout:'fixed',width:'900px' ,borderTop:'groove'}}>
<thead>
<tr>
  <th scope="col">ID</th>
  <th scope="col">First Name</th>
  <th scope="col">Last Name</th>
  <th scope="col">Email</th>
  <th scope="col">Type</th>
  <th scope="col">Access</th>
  <th scope="col">Actions</th>
</tr>
</thead>
<tbody>
{admin.length && admin[0]?
         admin.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((item) => {
          if (searchVal === "") {
            return item;
          } else if (
            item.firstName
              .toLowerCase()
              .includes(searchVal.toLowerCase()) ||
            item.id.toLowerCase().includes(searchVal.toLowerCase()) ||
            item.email.toLowerCase().includes(searchVal.toLowerCase()) ||
            item.lastName.toLowerCase().includes(searchVal.toLowerCase())
          ) {
            return item;
          }
        }).map((item) =>
 <tr>
  <th>{item.id}</th>
  <td>{item.firstName}</td>
  <td>{item.lastName}</td>
  <td style={{wordWrap:'break-word'}}>{item.email}</td>
  <td>{item.adminType}</td>
  <td style={{wordWrap:'break-word'}}>Dashboard, admin, user, notification</td>
  <td><RiDeleteBin6Line color='#0d6efd' size='20px' onClick={() => {onDelete(item.id,item)}}/><Link to='/route/admin/edit'></Link>{item.isBlocked?<TbLockOpen  size='20px' onClick={()=>{BlockUser(item.id,item.isBlocked)}}/>:<TbLock color='#0d6efd' size='20px' onClick={()=>{BlockUser(item.id,item.isBlocked)}}/>}</td>
</tr> 
):"No Data Found"}
</tbody>
</table>
<div className="adduser" style={{float:'right', position:'static'}}><Link to='/route/admin/add'><Floatingadd /></Link>
</div>
<div className="pagination">
<TablePagination 
        className="tableCell"
        sx={{ display: "flex", justifyContent: "center" }}
        component="div"
        count={admin.length}
        rowsPerPageOptions={[2, 3, 5]}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
{/* <Pagination /> */}
</div>
</div>
</div>
  )
}
