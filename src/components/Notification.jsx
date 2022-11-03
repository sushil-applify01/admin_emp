import React,{useState,useEffect} from 'react'
import {BsSearch} from 'react-icons/bs'
import { userService } from '../UserServices'
import Floatingadd from './Floatingadd'
import {Link } from 'react-router-dom'
import {MdAppBlocking} from 'react-icons/md'
import {RiDeleteBin6Line} from 'react-icons/ri'
import TablePagination from "@mui/material/TablePagination";


var image_path = "http://localhost:3000/";

export default function Notification() {
  const [notification, setNotification] = useState([{}])
  const [searchVal,setSearchVal] = useState("")
  const [searchList, setSearchList] = useState()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const notificationAPI = () => {
    userService.notification()
      .then(response => {
        var data = response.data.data.rows
        console.log("notification data",data)
        setNotification(data);
        setSearchList(data)
      })
      .catch(error => {
        console.log(error.response)
      });
  }
  useEffect(() => notificationAPI(), []);
  useEffect(() => {
    if (searchVal){
       let searchedText = searchVal.toLowerCase();
      const result = notification.filter((data) =>      
        data.title.toLowerCase().match(searchedText) || data.message.toLowerCase().match(searchedText));
      setSearchList(result);
    }else{
      setSearchList(notification);
    }
  }, [searchVal]); 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
        <div className="table-container" style={{width:'980px'}}>
      <div className="title" style={{display:'flex'}}>
        <h5>Notification</h5><br></br><div className="searchfilter" style={{marginLeft:'auto',marginRight:'0'}}><i ><BsSearch/></i></div>
        </div>
        <div className="searchinput" >
            <input type="text" 
            value={searchVal}
             onChange={(e)=>setSearchVal(e.target.value)} className="form-control"  id='myinput' placeholder="Search User" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
    <table class="table table-striped table-light">
<thead>
<tr>
  <th scope="col">ID</th>
  <th scope="col">Title </th>
  <th scope="col">Image</th>
  <th scope="col">Messsage</th>
  <th scope="col">Actions</th>
</tr>
</thead>
<tbody>
{notification.length && notification[0]?
         notification.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).filter((item) => {
          if (searchVal === "") {
            return item;
          } else if (
            item.title
              .toLowerCase()
              .includes(searchVal.toLowerCase()) ||
            item.id.toLowerCase().includes(searchVal.toLowerCase()) ||
            item.message.toLowerCase().includes(searchVal.toLowerCase())
          ) {
            return item;
          }
        }).map((item) =>
<tr>
  <th>{item.id}</th>
  <td>{item.title}</td>
  <td ><img style={{height:'60px', width:'60px'}} src={image_path+item.image} alt=''></img></td>
  <td>{item.message}</td>
  <td><RiDeleteBin6Line/></td>
</tr>
):"No Data Found"}
</tbody>
</table>
<div className="adduser" style={{float:'right', position:'sticky'}}><Link to='/route/notification/add'><Floatingadd /></Link>
</div>
<TablePagination 
        className="tableCell"
        sx={{ display: "flex", justifyContent: "center" }}
        component="div"
        count={notification.length}
        rowsPerPageOptions={[2, 3, 5]}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
</div>
    </div>
  )
}
