const nodemailer = require('nodemailer');
require("dotenv").config();
const constants= require("./config/constants")
 
const emailsender= async (email,link)=>{
let mailTransporter = nodemailer.createTransport({
     service: constants.EMAIL.LOCAL.MAIL_SERVICE,
	auth: {
		user: constants.EMAIL.LOCAL.SMTP_CREDENTIALS.email,
		pass: constants.EMAIL.LOCAL.SMTP_CREDENTIALS.password
	}
});
 
let mailDetails = {
    from: constants.EMAIL.LOCAL.FROM_EMAIL, 
    to: email,
    subject: 'Passwork Reset Link',
    html:` <p> ${link} This email is valid for 15 minutes   </p>`
};
 
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs',err);
    } else {
        console.log('Email sent successfully');
    }
});
}


module.exports =emailsender;