import React,{useState,useEffect} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FiFilter} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { userService } from '../UserServices'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import Floatingadd from './Floatingadd'
import {toast} from 'react-toastify'
import TablePagination from "@mui/material/TablePagination";
import {TbLockOpen,TbLock} from 'react-icons/tb'

export default function User() {
  const [searchinput,setSearchinput] =useState(false)
  const [dashboard,setDashboard] = useState([])
  const [user,setUser] = useState([{}])
  const [searchVal,setSearchVal] = useState("")
  const [searchList, setSearchList] = useState()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
 

  var userAPI = () => {
    userService.user()
      .then(response => {
        var data = response.data.data.user_active.rows
        console.log("User data",data)
        setUser(data);
        setSearchList(data)
        console.log("serchlistdata",searchList)
        // setFilter(data)
      })
      .catch(error => {
        setUser([]);
        setSearchList([])
        console.log(error.response)
      });
  }
  useEffect(() => userAPI(), []);

  const BlockUser=(id,blockstate) => {
    var params ={
      id:id,
      isBlocked:blockstate?0:1
    }

    userService.blockuser(params)
     .then(response => {
      userAPI()
      params.isBlocked?toast.success("successfully blocked the user"):toast.success("successfully Unblocked the user")
       useNavigate='/route/users'
     })
     .catch(error => {
       console.log(error.response)
     });
 }


  const dashboardAPI = () => {
    userService.dashboard()
      .then(response => {
        var data = response.data.data
        console.log("dashboard data",data)
        setDashboard(data);
      })
      .catch(error => {
        console.log(error.response)
      });
  }
  useEffect(() => dashboardAPI(), []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    if (searchVal){
       let searchedText = searchVal.toLowerCase();
      const result = user.filter((data) =>      
         data.firstName.toLowerCase().match(searchedText)|| data.lastName.toLowerCase().match(searchedText) || data.email.toLowerCase().match(searchedText));
      setSearchList(result);
    }else{
      setSearchList(user);
    }
  }, [searchVal]); 

  const onDelete = (id, item) => {
    userService.userDelete(id)
    userAPI()
      .then(response => {
        toast.success("successfully delete the user");
        window.location.href ='/route/users'       
      })
      .catch(error => {
        console.log(error.response)
      });
  }
  // useEffect(() => {
  //   const result = countries.filter((country) => {
  //     return country.name.toLowerCase().match(search.toLowerCase())||country.email.toLowerCase().match(search.toLowerCase())||country.title.toLowerCase().match(search.toLowerCase());
  //   });
  //   setFiltercountries(result);
  // }, [search]);
  return (
    <div>
        <div className="table-container" style={{width:'980px',height:'900px'}}>
          <div className="title" style={{display:'flex'}}>
            <h5>Users Management</h5><br></br><div className="searchfilter" style={{marginLeft:'auto',marginRight:'0'}}><i ><BsSearch onClick={()=>{setSearchinput(!searchinput)}} size='20px'/></i><i></i></div>
            </div>
            <div className="searchinput" >
            <input type="text" 
            value={searchVal}
             onChange={(e)=>setSearchVal(e.target.value)} className="form-control"  id='myinput' placeholder="Search User" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="total" style={{display:'flex' }} >
                <p className='tablestats' style={{border:'yellow',padding:'8px 8px 8px 8px',backgroundColor:'navy', color:'white'}}>Total: {dashboard.total}</p>
                <p className='tablestats'style={{border:'black',padding:'8px 8px 8px 8px',backgroundColor:'navy', color:'white', marginLeft:'20px'}}>InActive: 0</p>
                <p className='tablestats'style={{border:'black',padding:'8px 8px 8px 8px',backgroundColor:'navy', color:'white',marginLeft:'20px'}}>Active: {dashboard.active}</p>
            </div>
        <table className="table table-striped table-light" id='mytable'>
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Created At</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {user.length && user[0]?
         user.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((item) => {
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
      <th >{item.id}</th>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.email}</td>
      <td>{item.countryCode}{item.phoneNumber}</td>
      <td>{item.createdAt}</td>
      <td><RiDeleteBin6Line color='#0d6efd' size='22px'  marginRight='10px' onClick={() => {onDelete(searchList.id,searchList)}} />{item.isBlocked?<TbLockOpen  size='20px' onClick={()=>{BlockUser(item.id,item.isBlocked)}}/>:<TbLock color='#0d6efd' size='20px' onClick={()=>{BlockUser(item.id,item.isBlocked)}}/>}</td>
    </tr>
  ):"No Data Found"}
  </tbody>
</table>
<div className="adduser" style={{float:'left', position:'static' }}><Link to='/route/user/adduser'><Floatingadd /></Link>
</div>
<div className="pagination" style={{position:'static'}}>
<TablePagination 
        className="tableCell"
        sx={{ display: "flex", justifyContent: "center" }}
        component="div"
        count={user.length}
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
