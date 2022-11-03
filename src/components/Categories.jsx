import React,{useState,useEffect} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FiFilter} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {MdAppBlocking} from 'react-icons/md'
import { userService } from '../UserServices'
import Floatingadd from './Floatingadd'
import {Link } from 'react-router-dom'
import TablePagination from "@mui/material/TablePagination";


export default function Categories() {
  var image_path = "http://localhost:3000/"
  const [category, setCategory] = useState([{}])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const categoryAPI = () => {
    userService.categories()
      .then(response => {
        var data = response.data.data.rows
        console.log("category data",data)
        setCategory(data);
      })
      .catch(error => {
        console.log(error.response)
      });
  }
  useEffect(() => categoryAPI(),[]);
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
            <h5>System Configuration- Categories</h5><br></br><div className="searchfilter" style={{marginLeft:'auto',marginRight:'0'}}><i ><BsSearch size='20px'/></i><i><FiFilter size='20px' style={{marginLeft:'20px'}}/></i></div>
            </div>
            <div className="searchinput" >
            <input type="text" 
             className="form-control"  id='myinput' placeholder="Search User" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
        <table className="table table-striped table-light">
  <thead>
    <tr>
      <th scope="col">Sr No.</th>
      <th scope="col">Name</th>
      <th scope="col">Image</th>
      <th scope="col">Created At</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {category.length && category[0]?
         category.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) =>
    <tr>
      <th>{item.id}</th>
      <td>{item.name}</td>
      <td><img src={image_path+item.image}style={{height:'60px', width:'60px'}} alt=''></img></td>
      <td>{item.createdAt}</td>
      <td><RiDeleteBin6Line size='22px'  marginRight='10px' /><MdAppBlocking size='21px'/></td>
    </tr>
  ):"No Data Found"}
  </tbody>
</table>
<div className="adduser" style={{float:'right', position:'sticky'}}><Link to='/route/systemconfig/categories/add'><Floatingadd /></Link>
</div>
<TablePagination 
        className="tableCell"
        sx={{ display: "flex", justifyContent: "center" }}
        component="div"
        count={category.length}
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
