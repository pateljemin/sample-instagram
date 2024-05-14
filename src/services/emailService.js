const nodemailer = require('nodemailer');
const { emailVerification } = require('../templates/emailVerification')
const { forgetPassword } = require('../templates/forgetPassword')
require('dotenv').config()

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE_PROVIDER,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_ACCOUNT_PASSWORD
    }
});

// Send email
const sendForgetPasswordEmail = async (emailAddress, link) => {
    // Email content
    let mailOptions = {
        from: process.env.EMAIL_FROM_ADDRESS,   // sender address
        to: emailAddress,    // list of receivers
        subject: '[Sample-Instagram] Reset Your Password',          // Subject line
        text: 'Please follow the below link to change your password!',    // plain text body
        html: forgetPassword(link) // html body
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (e) {
        console.error(`[emailService][sendForgetPasswordEmail] Error while sending email`, e)
    }
}

// Send email
const sendVerificationEmail = async (emailAddress, link) => {
    // Email content
    let mailOptions = {
        from: process.env.EMAIL_FROM_ADDRESS,   // sender address
        to: emailAddress,    // list of receivers
        subject: '[Sample-Instagram] Verify Email',          // Subject line
        text: 'Please follow the below link to verify your email!',    // plain text body
        html: emailVerification(link) // html body
    };

    try {
        // we can send it using different service as well like : SendGrid
        await transporter.sendMail(mailOptions);
    } catch (e) {
        console.error(`[emailService][sendVerificationEmail] Error while sending email`)
    }
}

module.exports = {
    sendForgetPasswordEmail,
    sendVerificationEmail
}
