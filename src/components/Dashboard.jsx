import React,{useState,useEffect} from 'react'
import Doughnut from './Doughnut';
import {BsThreeDotsVertical} from 'react-icons/bs'
import { userService } from '../UserServices'
import {toast, ToastContainer } from 'react-toastify';
import { requestForToken, onMessageListener } from '../firebase';

export default function Dashboard() {
  const [user,setUser] = useState([{}])
  const [dashboard,setDashboard] = useState([])
  const [notification, setNotification] = useState({title: '', body: ''});
  const notify = () =>  toast.success(<ToastDisplay/>); 
  function ToastDisplay() {
    return (
      <div>
        <p><b>{notification?.title}</b></p>
        <p>{notification?.body}</p>
      </div>
    );
  };

  useEffect(() => {
    if (notification?.title ){
     notify()
    }
  }, [notification])

  requestForToken();

  onMessageListener()
    .then((payload) => {
      setNotification({title: payload?.notification?.title, body: payload?.notification?.body});     
    })
    .catch((err) => console.log('failed: ', err));
  console.log('dashstate',dashboard,dashboard.active)

  const userAPI = () => {
    userService.user()
      .then(response => {
        var data = response.data.data.user_active.rows
        console.log("user data",data)
        setUser(data);
      })
      .catch(error => {
        console.log(error.response)
      });
  }
  useEffect(() => userAPI(), []);

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
  var active_block_label=["active","block"]
  var active_block_series=[dashboard.active,dashboard.blocked]
  var platform_label=['Android','IOS','WEB']
  var platform_series=[dashboard.platformTypeANDROID,dashboard.platformTypeIOS,dashboard.platformTypeWEB]
  var app_label=['EMAIL_OR_PHONES','FACEBOOK','GMAIL','APPLE','MICROSOFT']
  var app_series=[dashboard.EmailorPhone,dashboard.FACEBOOK,dashboard.GMAIL,dashboard.APPLE,dashboard.MICROSOFT]
  var bugreported_label=['Pending','Approved','Declined']
  var bugreported_series=[dashboard.reportBugpending,dashboard.reportBugapproved,dashboard.reportBugdeclined]
  var contentitem_label=['Pending','','Approved','Declined']
  var contentitem_series=[dashboard.reportContentpending,dashboard.reportContentapproved,dashboard.reportContentdeclined]
  return (
    <>
    <ToastContainer />
    <div className='flex-container'>
      {/* active block user pie chart  */}
      {/* <DoughnutChart /> */}
      <div className="card" style={{width: '20rem' }}>
    <div className="card-body">
      <div className="active_blocked_piechart">
        <div className="apexchart" >
        <Doughnut label={active_block_label} series={active_block_series} /></div>
      <p className="stats">Active:{active_block_series[0]} Blocked:{active_block_series[1]}</p>
      {/* <p className="total_user_pt">Total Users:202</p> */}
      </div>
      </div>
  </div>

  {/* platform pie chart  */}
  {/* <DoughnutChart /> */}
  <div className="card" style={{width: '20rem'}}>
    <div className="card-body">
  <div className="platformpiechart" >
  <Doughnut label={platform_label} series={platform_series}/>
      <p className="stats">ANDROID:{platform_series[0]} IOS:{platform_series[1]} WEB:{platform_series[2]}</p>
      {/* <p className="total_user_pt">Total Users:202</p> */}
      </div>
      </div>
      </div>

    {/* app pie chart tile */}
    {/* <DoughnutChart /> */}
    <div className="card" style={{width: '20rem'}}>
    <div className="card-body">
  <div className="app_pie_chart">
  <Doughnut label={app_label} series={app_series}/>
      <p className="stats">EMAIL_OR_PHONES:{app_series[0]} FACEBOOK:{app_series[1]} GMAIL:{app_series[2]} APPLE:{app_series[3]} MICROSOFT:{app_series[4]}</p>
      {/* <p className="total_user_pt">Total Users:202</p> */}
      </div>
      </div>
      </div>
  </div>
  <div className="active_users" >
    <h5 style={{borderBottom:'groove'}}>Active<BsThreeDotsVertical style={{float:'right', display:'flex'}}/></h5>
      <table className="table table-striped table-light">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>
  {user.length && user[0]?
         user.map((item) =>
    <tr>
      <th>{item.id}</th>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.email}</td>
    </tr>
    ):"No Data Found"}
  </tbody>
</table>
      </div>
      <div className="topuser" style={{display: 'flex'}}>
        <div className="top_rated">
        <h5 style={{borderBottom:'groove'}}>Top Rated</h5>
      <table className="table table-striped table-light" style={{height:''}}>
  <thead>
    <tr>
      <th scope="col">Profile</th>
      <th scope="col">First Name</th>
      <th scope="col">Rating</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"></th>
      <td>Sushil</td>
      <td>4</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>lokesh</td>
      <td>5</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>krishn</td>
      <td>7</td>
    </tr>
  </tbody>
</table>
        </div>
        <div className="top_rated">
        <h5 style={{borderBottom:'groove'}}>Top Referrer</h5>
      <table className="table table-striped table-light" style={{height:''}}>
  <thead>
    <tr>
      <th scope="col">Profile</th>
      <th scope="col">First Name</th>
      <th scope="col">Rating</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"></th>
      <td>Sushil</td>
      <td>8</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>pramod</td>
      <td>4</td>
    </tr>
    <tr>
      <th scope="row"></th>
      <td>rajesh</td>
      <td>4.2</td>
    </tr>
  </tbody>
</table>
        </div>
      </div>
      <div className="totalusers">
      <h5 style={{borderBottom:'groove'}}>Total Users (By Platform - iOS, android, web)<BsThreeDotsVertical style={{float:'right', display:'flex'}}/></h5>
      <table className="table table-striped table-light">
  <thead>
    <tr>
      <th scope="col">Profile</th>
      <th scope="col">First Name</th>
      <th scope="col">Rating</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Not available</th>
      <td>Sushil</td>
      <td>6</td>
    </tr>
    <tr>
      <th scope="row">Not available</th>
      <td>subodh</td>
      <td>4</td>
    </tr>
    <tr>
      <th scope="row">Not available</th>
      <td>aviral</td>
      <td>5</td>
    </tr>
  </tbody>
</table>
      </div>
      <div className="pending_approve_chart">
      <div className="card" style={{width: '20rem' }}>
    <div className="card-body">
      <div className="active_blocked_piechart">
        <div className="apexchart">
        <Doughnut label={bugreported_label} series={bugreported_series}/></div>
      <p className="stats">Pending:{bugreported_series[0]} Approved:{bugreported_series[1]} Declined:{bugreported_series[2]}</p>
      {/* <p className="total_user_pt">Total Users:202</p> */}
      </div>
      </div>
  </div>
      {/* <DoughnutChart label={contentitem_label} series={contentitem_series}/> */}
      <div className="card" style={{width: '20rem' }}>
    <div className="card-body">
      <div className="active_blocked_piechart">
        <div className="apexchart">
        <Doughnut label={contentitem_label} series={contentitem_series}/></div>
      <p className="stats"> Pending:{contentitem_series[0]} Approved:{contentitem_series[1]} Declined:{contentitem_series[2]}</p>
      {/* <p className="total_user_pt">Total Users:202</p> */}
      </div>
      </div>
  </div>
      </div>
  </>
  )
}
