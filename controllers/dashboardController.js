const _ = require("underscore");
const Joi = require("joi");
const appConstants = require("../config/appConstants");
const Response = require("../config/response");
let commonHelper = require("../Helper/common");
let config = require("../config/env")();
let message = require("../config/messages");
let Services = require("../services");


module.exports = {
	getUserStatus: async() => {
        let criteria1 ={
            isBlocked: 0,
        }
		let active_user = await Services.userService.getAllUsers(criteria1);
		let user_active =active_user.count    
        console.log("active",active_user.count)
        let criteria2 ={
            isBlocked: 1,
        }
        let blocked_user = await Services.userService.getAllUsers(criteria2);
        let user_blocked =blocked_user.count
        console.log("blocked",blocked_user.count)
    
 

          // 1 => EMAIL_OR_PHONE,  2 => FACEBOOK, 3 => GMAIL, 4 => APPLE, 5 => MICROSOFT
        let criteria4 ={
            loginType: 1,
        }
      
        let userSocialEmailorPhone= await Services.SocialAccountServices.getAllSocialDetails(criteria4);
        let criteria5 ={
            loginType: 2,
        }
      
        let userSocialFacebook= await Services.SocialAccountServices.getAllSocialDetails(criteria5);
        let criteria6 ={
            loginType: 3,
        }
      
        let userSocialGMAIL= await Services.SocialAccountServices.getAllSocialDetails(criteria6);
        let criteria7 ={
            loginType: 4,
        }
      
        let userSocialAPPLE= await Services.SocialAccountServices.getAllSocialDetails(criteria7);
        let criteria8 ={
            loginType: 5,
        }
      
        let userSocialMICROSOFT= await Services.SocialAccountServices.getAllSocialDetails(criteria8);

        let criteria9 ={
          platformType: "ANDROID",
      }
      let platformTypeANDROID= await Services.userService.getAllUsers(criteria9);
      let criteria10 ={
        platformType:  "IOS",
    }
      let platformTypeIOS= await Services.userService.getAllUsers(criteria10);

      let criteria11 ={
        platformType: "WEB",
    }
      let platformTypeWEB= await Services.userService.getAllUsers(criteria11);

    let criteria12 ={status:"pending"}
    let reportBugpending= await Services.reportBugService.getAllReportBug(criteria12);

    let criteria13 ={status:"approved"}
    let reportBugapproved= await Services.reportBugService.getAllReportBug(criteria13);

    let criteria14 ={status:"declined"}
    let reportBugdeclined= await Services.reportBugService.getAllReportBug(criteria14);
   
    let criteria15 ={status:"pending"}
    let reportContentpending= await Services.reportContentService.getAllReportedContent(criteria15);

    let criteria16 ={status:"approved"}
    let reportContentapproved= await Services.reportContentService.getAllReportedContent(criteria16);

    let criteria17 ={status:"declined"}
    let reportContentdeclined= await Services.reportContentService.getAllReportedContent(criteria17);
   
    if (reportBugapproved && reportBugpending && reportBugdeclined && reportContentpending  && reportContentdeclined
      && reportContentapproved &&  userSocialEmailorPhone && userSocialFacebook && platformTypeANDROID && platformTypeIOS && platformTypeWEB &&
       userSocialGMAIL && userSocialMICROSOFT && userSocialAPPLE && active_user && active_user.count!==0 ) {
        return { 
        "reportBugpending":reportBugpending.count,
        "reportBugapproved": reportBugapproved.count,
        "reportBugdeclined":reportBugdeclined.count,
        "Total_BUGS":reportBugapproved.count+reportBugdeclined.count+reportBugpending.count,
        "platformTypeANDROID":platformTypeANDROID.count,
        "platformTypeIOS": platformTypeIOS.count,
        "platformTypeWEB":platformTypeWEB.count,
        "TOTAL_USER_IN":platformTypeANDROID.count+platformTypeIOS.count+platformTypeWEB.count,
        "EmailorPhone":userSocialEmailorPhone.count,
        "FACEBOOK": userSocialFacebook.count,
        "GMAIL":userSocialGMAIL.count,
        "APPLE":userSocialAPPLE.count,
        "MICROSOFT":userSocialMICROSOFT.count,
        "TOTAL_USER":userSocialEmailorPhone.count+userSocialFacebook.count +userSocialGMAIL.count+userSocialAPPLE.count+userSocialMICROSOFT.count,
        "active":user_active, 
        "blocked":user_blocked ,
        "total": user_active+user_blocked,
            "reportContentpending": reportContentpending.count,
           "reportContentapproved": reportContentdeclined.count,
           "reportContentdeclined": reportContentapproved.count,
           "BUGS_REPORTED":reportContentapproved.count+reportContentdeclined.count+reportContentpending.count
        }
    } else {
          throw	Response.error_msg.InvalidData;
    }


},

};