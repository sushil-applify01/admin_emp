import { config } from "./Config";
import axios from "axios";

export const userService = {
  admin,
  user,
  notification,
  categories,
  appversion,
  adminachievement,
  Reportedcontent,
  Reportedbugs,
  logIn,
  addadmin,
  forgotPassword,
  dashboard,
  setpassword,
  adduser,
  adminDelete,
  addnotification,
  addcategory,
  addappversion,
  addadminachievement,
  blockadmin,
  userDelete,
  blockuser
};

function admin() {
  let url = `${config.apiUrl}/admin/list-admins`;
  // let url = `${config.apiUrl}/admin/list-admins?limit=${current}&skip=${pageSize}`
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(url, config1);
}

function user() {
  let url = `${config.apiUrl}/user/getall`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(url, config1);
}

function notification() {
  let url = `${config.apiUrl}/notification/list`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(url, config1);
}

function categories() {
  let url = `${config.apiUrl}/category/list`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(url, config1);
}

function appversion() {
  let url = `${config.apiUrl}/appversion/get-app-detail`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(url, config1);
}

function adminachievement() {
  let url = `${config.apiUrl}/adminachievement/list`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(url, config1);
}

function Reportedcontent() {
  let url = `${config.apiUrl}/reportContent/list`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(url, config1);
}
function Reportedbugs() {
  let url = `${config.apiUrl}/reportBug/list`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(url, config1);
}

function logIn(params) {
  console.log("params", params);
  let url = `${config.apiUrl}/admin/login`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(url, params, config1);
}
function addadmin(params) {
  console.log("params", params);
  let url = `${config.apiUrl}/admin/register`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(url, params, config1);
}
function adduser(params) {
  console.log("params", params);
  let url = `${config.apiUrl}/user/add`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(url, params, config1);
}

function forgotPassword(params) {
  console.log("params", params);
  let url = `${config.apiUrl}/admin/forgot-password`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(url, params, config1);
}
function setpassword(params) {
  console.log("params", params);
  let url = `${config.apiUrl}/admin/setpassword`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(url, params, config1);
}
function dashboard() {
  let url = `${config.apiUrl}/dashboard/user-status`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(url, config1);
}
function adminDelete(id) {
  let url = `${config.apiUrl}/admin/delete/${id}`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.delete(url, config1);
}
function userDelete(id) {
  let url = `${config.apiUrl}/user/delete/${id}`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.delete(url, config1);
}

function addnotification(formData) {
  console.log("params", formData);
  let url = `${config.apiUrl}/notification/register`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(url, formData, config1);
}

function addcategory(params) {
  console.log("params", params);
  let url = `${config.apiUrl}/category/register`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(url, params, config1);
}

function addappversion(params) {
  console.log("params", params);
  let url = `${config.apiUrl}/appversion/add-app-detail`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(url, params, config1);
}

function addadminachievement(params) {
  console.log("params", params);
  let url = `${config.apiUrl}/adminachievement/register`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(url, params, config1);
}

function blockadmin(params) {
  console.log("params", params);
  let url = `${config.apiUrl}/admin/block`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.put(url, params, config1);
}

function blockuser(params) {
  console.log("params", params);
  let url = `${config.apiUrl}/user/block`;
  let config1 = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.put(url, params, config1);
}
