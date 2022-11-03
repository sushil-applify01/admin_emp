import React,{useState,useEffect} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FiFilter} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {MdAppBlocking} from 'react-icons/md'
import { userService } from '../UserServices'
import Floatingadd from './Floatingadd'
import {Link } from 'react-router-dom'
import TablePagination from "@mui/material/TablePagination";


export default function Appversion() {
  const [version, setVersion] = useState([{}])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const versionAPI = () => {
    userService.appversion()
      .then(response => {
        var data = response.data.data.rows
        console.log("appversion data",data)
        setVersion(data);
      })
      .catch(error => {
        console.log(error.response)
      });
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => versionAPI(),[]);
  return (
    <div>
        <div className="table-container" style={{width:'980px'}}>
          <div className="title" style={{display:'flex'}}>
            <h5>System Configuration- App-versions</h5><br></br><div className="searchfilter" style={{marginLeft:'auto',marginRight:'0'}}><i ><BsSearch size='20px'/></i><i><FiFilter size='20px' style={{marginLeft:'20px'}}/></i></div>
            </div>
            <div className="searchinput" >
            <input type="text" 
             className="form-control"  id='myinput' placeholder="Search User" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
        <table className="table table-striped table-light">
  <thead>
    <tr>
      <th scope="col">Sr No.</th>
      <th scope="col">App Name</th>
      <th scope="col">Platform</th>
      <th scope="col">Minimum Version</th>
      <th scope="col">Version</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {version.length && version[0]?
         version.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) =>
    <tr>
      <th>{item.id}</th>
      <td>{item.appname}</td>
      <td>{item.platform}</td>
      <td>{item.minimumVersion}</td>
      <td>{item.version}</td>
      <td><RiDeleteBin6Line size='22px'  marginRight='10px' /><MdAppBlocking size='21px'/></td>
    </tr>
    ):"No Data Found"}
  </tbody>
</table>
<div className="adduser" style={{float:'right', position:'sticky'}}><Link to='/route/systemconfig/app-version/add'><Floatingadd /></Link>
</div>
<TablePagination 
        className="tableCell"
        sx={{ display: "flex", justifyContent: "center" }}
        component="div"
        count={version.length}
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
