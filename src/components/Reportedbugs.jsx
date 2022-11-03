import React,{useState,useEffect} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FiFilter} from 'react-icons/fi'
import { userService } from '../UserServices'

export default function Reportedbugs() {
  const [reportedbug, setReportedbug] = useState([{}])
  const reportedbugAPI = () => {
    userService.Reportedbugs()
      .then(response => {
        var data = response.data.data.rows
        console.log("reportedBug data",data)
        setReportedbug(data);
      })
      .catch(error => {
        console.log(error.response)
      });
  }
  useEffect(() => reportedbugAPI(),[]);
  return (
    <div>
        <div className="table-container" style={{width:'980px'}}>
          <div className="title" style={{display:'flex'}}>
            <h5>Reported Bugs</h5><br></br><div className="searchfilter" style={{marginLeft:'auto',marginRight:'0'}}><i ><BsSearch size='20px'/></i><i><FiFilter size='20px' style={{marginLeft:'20px'}}/></i></div>
            </div>
            <div className="searchinput" >
            <input type="text" 
             className="form-control"  id='myinput' placeholder="Search User" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>
            <div className="total" style={{display:'flex' }} >
                <p className='tablestats' style={{border:'yellow',padding:'8px 8px 8px 8px',backgroundColor:'navy', color:'white'}}>Total: 205</p>
                <p className='tablestats'style={{border:'black',padding:'8px 8px 8px 8px',backgroundColor:'navy', color:'white', marginLeft:'20px'}}>Approved: 2</p>
                <p className='tablestats'style={{border:'black',padding:'8px 8px 8px 8px',backgroundColor:'navy', color:'white',marginLeft:'20px'}}>Pending: 199</p>
                <p className='tablestats'style={{border:'black',padding:'8px 8px 8px 8px',backgroundColor:'navy', color:'white',marginLeft:'20px'}}>Declined: 199</p>
            </div>
        <table className="table table-striped table-light">
  <thead>
    <tr>
      <th scope="col">Sr. No.</th>
      <th scope="col">Reported By</th>
      <th scope="col">Reported Item</th>
      <th scope="col">Status</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>
  {reportedbug.length && reportedbug[0]?
         reportedbug.map((item) =>
    <tr>
      <th >{item.id}</th>
      <td>{item.ReportedBy}</td>
      <td>{item.ReportedItem}</td>
      <td>{item.Status}</td>
      <td>{item.createdAt}</td>
    </tr>
    ):"No Data Found"}
  </tbody>
</table>
</div>
    </div>
  )
}
