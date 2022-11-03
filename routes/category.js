const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const sendResponse = require("../Helper/sendResponse");
const authentication = require("../middleware/adminAuthentication").verifyToken;

const MULTER = require("../Helper/upload");


router.post("/register",MULTER.upload.single("image"),(req, res) => {
    console.log(req.body)
    let payload = req.body;
    console.log(req.file.path)
    var path =req.file.path;
    
  
    console.log("@@@@@@@@@@",path)
return sendResponse.executeMethod(categoryController.register,payload,path,res);}
);


router.get("/notifDetail/:id",  (req, res) => {
	return sendResponse.executeMethod(categoryController.getCategoryById, req.params, req, res);
});





router.delete("/delete/:id",authentication, (req, res) => {
  return sendResponse.executeMethod(categoryController.deleteCategory,req.params,req, res);
});


router.put("/edit",authentication,MULTER.upload.single("image"),(req, res) => {
  let payload = req.body;
  var path =req.file.path;
return sendResponse.executeMethod(categoryController.editCategory,payload,path,res);
  }
);

router.get("/list", (req, res) => {
  let payload = req.query;
  // if (payload.skip && payload.limit && payload.skip > 0) {
  //   payload.skip = (payload.skip - 1) * payload.limit;}
    return sendResponse.executeMethod(categoryController.getFilter,payload,req,res);
});

module.exports = router;