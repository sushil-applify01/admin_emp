import "./App.css";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Admin from "./components/Admin";
import Report from "./Pages/Report";
import SystemConfiguration from "./Pages/SystemConfiguration";
import Notification from "./components/Notification";
import Sidebar from "./components/Sidebar";
import UserManagement from "./components/UserManaement";
import EditAdmin from "./components/EditAdmin";
import Addadmin from "./components/Addadmin";
import Categories from "./components/Categories";
import Appversion from "./components/Appversion";
import Achievement from "./components/Achivement";
import Reportedcontent from "./components/Reportedcontent";
import Reportedbugs from "./components/Reportedbugs";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";
import Resetform from "./components/Resetform";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Adduser from "./components/Adduser";
import Myprofile from "./components/Myprofile";
import Addnotification from "./components/Addnotification";
import Addcategory from "./components/Addcategory";
import Addappversion from "./components/Addappversion";
import Addadminachievement from "./components/Addadminachievement";
import Calendar from "./components/Calendar";
import Chat from "./components/Chat/Chat/Chat";
const access_token = localStorage.getItem('accessToken');

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
      {/* {access_token && ( */}
        <Routes>
          <Route path="/route" element={<Sidebar />}>
            <Route path="myprofile" element={<Myprofile />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin" element={<Admin />} />
            <Route path="admin/edit" element={<EditAdmin />} />
            <Route path="admin/add" element={<Addadmin />} />
            <Route path="notification" element={<Notification />} />
            <Route path="notification/add" element={<Addnotification />} />
            <Route path="report" element={<Report />} />
            <Route path="sysconfig" element={<SystemConfiguration />} />
            <Route path="systemconfig/categories" element={<Categories />} />
            <Route path="systemconfig/categories/add" element={<Addcategory />}/>
            <Route path="systemconfig/app-version" element={<Appversion />} />
            <Route path="systemconfig/app-version/add" element={<Addappversion />} />
            <Route path="systemconfig/admin-achivement" element={<Achievement />}/>
            <Route path="systemconfig/admin-achivement/add" element={<Addadminachievement />} />
            <Route path="systemconfig/calender-events" element={<Calendar />} />
            <Route path="systemconfig/chats" element={<Chat />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="user/adduser" element={<Adduser />} />
            <Route path="report/reported-content" element={<Reportedcontent />}/>
            <Route path="report/reported-bugs" element={<Reportedbugs />} />
          </Route>
        </Routes>
         {/* commnet )} */}
        {/* {!access_token&&( */}
          <Routes>
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          <Route  path="/" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/reset/:token/:id" element={<Resetform />} />
          </Routes>
          {/* )} */}
      </Router>
    </>
  );
}

export default App;
