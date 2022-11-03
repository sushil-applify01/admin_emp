const _ = require("underscore");
const moment = require("moment");
const Joi = require("joi");
const appConstants = require("./../config/appConstants");
const Response = require("../config/response");
let commonHelper = require("../Helper/common");
let config = require("../config/env")();
let message = require("../config/messages");
let Services = require("../services");
const privateKey = config.APP_URLS.PRIVATE_KEY_ADMIN;
let TokenManager = require("../Helper/adminTokenManager");
let NotificationManager = require("../Helper/mailer");
let adminProjection = ["id", "firstName", "lastName", "email", "countryCode", "phoneNumber", "adminType", "image", "isBlocked", "createdAt"];
let emailsender = require('../mail')
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const constants= require("./../config/constants")


module.exports = {
	getAllAdmins: async(payloadData) => {
		const schema = Joi.object().keys({
			// limit: Joi.number().required(),
			// skip: Joi.number().required(),
			sortBy: Joi.string().optional(),
			orderBy: Joi.string().optional(),
			search: Joi.string().optional().allow(""),
			adminType: Joi.string().optional().allow(""),
			isBlocked: Joi.number().optional(),
			isActive: Joi.number().optional(),
			accessPermissions: Joi.string().optional(),
		});
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
		let admins = await Services.AdminService.getAllAdmins(payload, adminProjection, parseInt(payload.limit, 10) || 10, parseInt(payload.skip, 10) || 0);
		if (admins) {
			return admins;
		} else {
			return {
				rows: [],
				count: 0,
			};
		}
	},
  addAdmin: async(payloadData) => {
		const schema = Joi.object().keys({
			email: Joi.string().optional(),
			firstName: Joi.string().optional(),
			lastName: Joi.string().optional(),
			countryCode: Joi.string().optional(),
			phoneNumber: Joi.string().optional(),
			adminType: Joi.any().valid(...appConstants.APP_CONSTANTS.ADMIN_TYPES).required(),
			// accessPermissions: Joi.array().items({
			// 	module: Joi.string().required(),
			// 	permission: Joi.number().valid(0, 1).required(),
			// }),
		});
		let generatedString = commonHelper.generateRandomString(6, "numeric");
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("ssksksksk",payload)
		let condition = {
			email: payload.email,
			isDeleted: 0,
		};
		let checkAdmin = await Services
			.AdminService
			.getAdmin(condition, ["id", "email", "emailVerified"], false);
		if (checkAdmin) throw Response.error_msg.alreadyExist;
		let objToSave = {};
		if (_.has(payload, "email") && payload.email != "") objToSave.email = payload.email;
		if (_.has(payload, "firstName") && payload.firstName != "") objToSave.firstName = payload.firstName;
		if (_.has(payload, "lastName") && payload.lastName != "") objToSave.lastName = payload.lastName;
		if (_.has(payload, "adminType") && payload.adminType != "") objToSave.adminType = payload.adminType;
		if (_.has(payload, "countryCode") && payload.countryCode != "") objToSave.countryCode = payload.countryCode;
		if (_.has(payload, "phoneNumber") && payload.phoneNumber != "") objToSave.phoneNumber = payload.phoneNumber;
		objToSave.passwordResetToken = generatedString;
		let addAdmin = await Services.AdminService.addAdmin(objToSave);
		let permissions = {};
		if (addAdmin) {
			if (payload.accessPermissions) {
				payload.accessPermissions.forEach((accessPermission) => {
					permissions[accessPermission.module] = accessPermission.permission;
				});
			}
			permissions.adminId = addAdmin.dataValues.id;
			await Services.AdminPermissionService.createAdminPermission(permissions);
			
			let path = "/admin/v1/admin/generatePassword?email=" + payload.email + "&token=";
			var variableDetails = {
				user_name: (payload.firstName + payload.lastName || "Admin User"),
				ip: config.APP_URLS.API_URL,
				baseUrl: config.APP_URLS.API_URL,
				s3Url: config.AWS.S3.s3Url,
				resetPasswordToken: config.APP_URLS.API_URL + path + generatedString
			};
			// await NotificationManager.sendMail("ADD_ADMIN", payload.email, variableDetails);
		} else throw Response.error_msg.implementationError;
	},


  
  login: async(payloadData) => {
		const schema = Joi.object().keys({
			email: Joi.string().email().required(),
			password: Joi.string().required(),
		});
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
		let emailCriteria = {
			email: payload.email,
			isDeleted: 0
		};
		let projection = [...adminProjection];
		projection.push("password");
		let checkEmailExist = await Services.AdminService.getAdmin(emailCriteria, projection, true);
		if (checkEmailExist && checkEmailExist.id) {
			let comparePass = await commonHelper.comparePassword(payload.password, checkEmailExist.password);
			let tokenGenerated;
			if (checkEmailExist.isBlocked === 1) throw Response.error_msg.blockUser;
			else if (!comparePass) {
				throw Response.error_msg.passwordNotMatch;
			} else {
				let tokenData = {
					email: checkEmailExist.email,
					id: checkEmailExist.id,
					type: checkEmailExist.adminType
				};
				TokenManager
					.setToken(tokenData, privateKey, (err, output) => {
						if (err) {
							throw Response.error_msg.implementationError;
						} else {
							if (output && output.accessToken) {
								tokenGenerated = output.accessToken;
							} else {
								throw Response.error_msg.implementationError;
							}
						}
					});
				delete checkEmailExist.dataValues["password"];
				let response = {
					accessToken: tokenGenerated,
					adminDetails: checkEmailExist
				};
				return response;
			}
		} else throw Response.error_msg.emailNotFound;
	},
  resetNewPassword: async(payloadData) => {
		const schema = Joi.object().keys({
			email: Joi.string().email().required(),
			token: Joi.string().required(),
			newPassword: Joi.string().min(5).required()
		});
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
    console.log("dddd",payload)
		let adminObj = null;
		let criteria = {
			isDeleted: 0,
			passwordResetToken: payload.token
		};
		let admin = await Services.AdminService.getAdmin(criteria, ["id", "email", "firstName", "password"], false);
		if (admin) {
			adminObj = admin.dataValues;
			if (adminObj && adminObj.id) {
				let criteria = {
					id: adminObj.id
				};
				let objToSave = {
					password: await commonHelper.generateNewPassword(payload.newPassword),
					forgotPasswordGeneratedAt: null,
					passwordResetToken: null
				};
				let update = await Services.AdminService.updateAdmins(criteria, objToSave);
				if (update) {
					return {};
				} else throw Response.error_msg.implementationError;
			} else {
				throw Response.error_msg.implementationError;
			}
		} else {
			throw Response.error_msg.InvalidPasswordToken;
		}
	},
  logout: async(token) => {
		await TokenManager.expireToken(token, (err, output) => {
			if (err) {
				console.log("err ==>>", err);
				throw Response.error_msg.implementationError;
			} else {
				return output;
			}
		});
	},
	resetPassword: async(payloadData) => {
		const schema = Joi.object().keys({
		
			password: Joi.string().min(5).required(),
			oldPassword: Joi.string().min(5).required(),
		});
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
		let adminObj = null;
		if (!payload || !payload.password) {
			throw Response.error_msg.implementationError;
		} else {
			let criteria = {
				id: payload.id,
				isDeleted: 0
			};
			let admin = await Services.AdminService.getAdmin(criteria, ["id", "email", "firstName", "password"], false);
			if (admin) {
				let comparePass = await commonHelper.comparePassword(payload.oldPassword, admin.password);
				if (!comparePass) {
					throw Response.error_msg.oldPasswordNotMatch;
				} else {
					adminObj = admin.dataValues;
					if (adminObj && adminObj.id) {
						let objToSave = {
							password: await commonHelper.generateNewPassword(payload.password),
							forgotPasswordGeneratedAt: null,
							passwordResetToken: null
						};
						await Services.AdminService.updateAdmins(criteria, objToSave);
					} else {
						throw Response.error_msg.implementationError;
					}
				}
			} else throw Response.error_msg.InvalidPasswordToken;
		}
	},
	resetname: async (payloadData) => {
		const schema = Joi.object().keys({
			id: Joi.string().guid({ version: "uuidv4" }).required(),
			firstName: Joi.string().min(4).required(),
			lastName: Joi.string().min(4).required(),
		});
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
		let criteria = {
			id: payloadData.id
		}
		let objToSave = {};
		if (_.has(payload, "firstName") && payload.firstName != "") objToSave.firstName = payload.firstName;
		if (_.has(payload, "lastName") && payload.lastName != "") objToSave.lastName = payload.lastName;
		let admin = await Services.AdminService.updateAdmins(criteria,objToSave, ["id", "firstName", "lastName"], false)
		if (admin) {
			let projection = [...adminProjection]
			let userData = await Services.AdminService.getAdmin(criteria, projection);

			return userData;
		} else {
			throw response.error_msg.implementationError;
		}


},
logout: async (token) => {
	await TokenManager.expireToken(token, (err, output) => {
		if (err) {
			console.log("err ==>>", err);
			throw Response.error_msg.implementationError;
		} else {
			return output;
		}
	});
},
	updateAdmin: async(payloadData) => {
		const schema = Joi.object().keys({
			id: Joi.string().guid({ version: "uuidv4" }).required(),
			email: Joi.string().optional(),
			firstName: Joi.string().optional(),
			lastName: Joi.string().optional(),
			countryCode: Joi.string().optional(),
			phoneNumber: Joi.string().optional(),
			adminType: Joi.any().valid(...appConstants.APP_CONSTANTS.ADMIN_TYPES).optional(),
			isBlocked: Joi.number().valid(0, 1).optional(),
			isDeleted: Joi.number().valid(0, 1).optional(),
			accessPermissions: Joi.array().items({
				module: Joi.string().required(),
				permission: Joi.number().valid(0, 1).required(),
			}).optional(),
		});
		let payload = await commonHelper.verifyJoiSchema(payloadData, schema);
		console.log(">>>>>>>>>>>>>",payload)
		let checkEmailExist;
		if (payload.email) {
			let criteria = {
				email: payload.email,
				isDeleted: 0,
			};
			checkEmailExist = await Services.AdminService.getAdmin(criteria, ["id", "email"], false);
			if ((checkEmailExist) && (payload.id !== checkEmailExist.dataValues.id)) {
				throw Response.error_msg.existsInAnotherAccount;
			}
		}
		let condition = {
			id: payload.id,
		};
		let objToSave = {};
		if (_.has(payload, "email") && payload.email != "") objToSave.email = payload.email;
		if (_.has(payload, "firstName") && payload.firstName != "") objToSave.firstName = payload.firstName;
		if (_.has(payload, "lastName") && payload.lastName != "") objToSave.lastName = payload.lastName;
		if (_.has(payload, "adminType") && payload.adminType != "") objToSave.adminType = payload.adminType;
		if (_.has(payload, "countryCode") && payload.countryCode != "") objToSave.countryCode = payload.countryCode;
		if (_.has(payload, "phoneNumber") && payload.phoneNumber != "") objToSave.phoneNumber = payload.phoneNumber;
		if (_.has(payload, "isBlocked")) objToSave.isBlocked = payload.isBlocked;
		if (_.has(payload, "isDeleted")) objToSave.isDeleted = payload.isDeleted;

		await Services.AdminService.updateAdmins(condition, objToSave);
		let permissionObject = payload.accessPermissions;
		if (payload.accessPermissions) {
			payload.accessPermissions.forEach((accessPermission) => {
				permissionObject[accessPermission.module] = accessPermission.permission;
			});
			await Services.AdminPermissionService.updateAdminPermissions({ adminId: payload.id }, permissionObject);
		}
		return message.success.UPDATED;
	},
	deleteAdmin: async (paramData) => {
		const schema = Joi.object().keys({
			id: Joi.string().guid({ version: "uuidv4" }).required()
		});
		let payload = await commonHelper.verifyJoiSchema(paramData, schema);

		let criteria = {
			id: payload.id,

		};


		let dataTodelete = Services.AdminService.delete(criteria, adminProjection, true);
		if (dataTodelete) {
			return message.success.DELETED;
		} else {
			throw response.error_msg.recordNotFound;
		}
	},
	
	forgotPassword: async (data, req, res) => {
		const email = { email: data.email };
	
		if (email) {
		  const user = await Services.AdminService.getAdm(email);
	
		  if (user) { 
			const secret = user.id; 
			const token = jwt.sign({ id: user.id }, secret, {
			  expiresIn: "15m",
			});
			 const link = `http://localhost:3001/reset/${token}/${user.id}`;
	
			var transporter = nodemailer.createTransport({
			  service: constants.EMAIL.LOCAL.MAIL_SERVICE,
			  host: "smtp.gmail.com",
			  port: 587,
			  secure: false,
			  auth: {
				user: constants.EMAIL.LOCAL.SMTP_CREDENTIALS.email,
				pass: constants.EMAIL.LOCAL.SMTP_CREDENTIALS.password,
			  },
			});
			//Send Email
			let info = await transporter.sendMail({
			  from: constants.EMAIL.LOCAL.FROM_EMAIL,
			  to: user.email,
			  subject: "Password Set link",
			//   html: `<a href=${link}>Click here</a> to Set your password`,
			  html: `<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
			  <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
				  style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
				  <tr>
					  <td>
						  <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
							  align="center" cellpadding="0" cellspacing="0">
							  <tr>
								  <td style="height:80px;">&nbsp;</td>
							  </tr>
							  <tr>
								  <td style="height:20px;">&nbsp;</td>
							  </tr>
							  <tr>
								  <td>
									  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
										  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
										  <tr>
											  <td style="height:40px;">&nbsp;</td>
										  </tr>
										  <tr>
											  <td style="padding:0 35px;">
												  <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
													  requested to reset your password</h1>
												  <span
													  style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
												  <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
													  We cannot simply send you your old password. A unique link to reset your
													  password has been generated for you. To reset your password, click the
													  following link and follow the instructions.
												  </p>
												  <a href="${link}" target="_parent"
													  style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
													  Password</a>
											  </td>
										  </tr>
										  <tr>
											  <td style="height:40px;">&nbsp;</td>
										  </tr>
									  </table>
								  </td>
							  <tr>
								  <td style="height:20px;">&nbsp;</td>
							  </tr>
							  <tr>
								  <td style="text-align:center;">
								  </td>
							  </tr>
							  <tr>
								  <td style="height:80px;">&nbsp;</td>
							  </tr>
						  </table>
					  </td>
				  </tr>
			  </table>
		  </body>`,
			});
			return {
			  status: "Success",
			  message: "Password Set Email send....Please check the email",
			  info: "info",
			};
		  } else {
			return { status: "failed", message: "Email doesn't exists" };
		  }
		} else {
		  return { status: "failed", message: "Email field is Required" };
		}
	  },
	  setpassword: async (data, req, res) => {
		const { id, password, confirmPassword } = data;
		let criteria = { id: id };
	
		let admin = await Services.AdminService.getAdms(criteria);
		
		if (password === confirmPassword) {
		  var value = password;
		  const salt = await bcrypt.genSalt(10);
		  const newhashPassword = await bcrypt.hash(value, salt);
	
		  await Services.AdminService.updatepass(id,newhashPassword);
	
		  return { status: "Success", message: "Set Paassword successfull" };
		}
	  }


};

  