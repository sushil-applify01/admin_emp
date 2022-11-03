
var express = require("express");
var router = express.Router();
const sendResponse = require("../Helper/sendResponse");
const userController = require("../controllers/userController");
const controllers = require("../controllers");
const authentication = require("../middleware/userAuthentication").verifyToken;


router.post("/add",(req, res) => {
	return sendResponse.executeMethod(userController.registerUser, req.body, req, res);
});

router.put("/reset-password", (req, res) => {
	return sendResponse.executeMethod(userController.resetNewPassword, req.body, req, res);
});

router.post("/login", (req, res) => {
	return sendResponse.executeMethod(userController.login, req.body, req, res);
});

router.put("/logout",authentication,(req, res) => {

	let token = req.credentials;
	return sendResponse.executeMethod(userController.logout, token, req, res);
});


router.get("/", async (req, res) => {
	return sendResponse.executeMethod(controllers.userController.getUserDetail, req.credentials, req, res);
});

router.get("/getall", (req, res) => {
	let payload = req.query;
	  if ((payload.skip) && (payload.limit) && (payload.skip > 0)) {
	  	payload.skip = (payload.skip - 1) * payload.limit;
	  }
	  return sendResponse.executeMethod(controllers.userController.getAllUsers, payload, req, res);
  });

router.put("/profile/change-password", authentication, async (req, res) => {

	let tokenData = req.credentials;
	let payload = req.body;
	payload.id = tokenData.id;
	return sendResponse.executeMethod(userController.resetPassword, payload, req, res);
});

router.put("/update",authentication,async (req, res) => {
	let payload = req.body || {};
	payload.id = req.credentials.id;
	return sendResponse.executeMethod(userController.updateUser, payload, req, res);
});

router.put("/block", authentication, (req, res) => {
	
	return sendResponse.executeMethod(userController.updateUser, req.body, req, res);
});

router.delete("/delete/:id", (req, res) => {
	return sendResponse.executeMethod(userController.deleteUser,req.params,req, res);
  });

module.exports = router;
