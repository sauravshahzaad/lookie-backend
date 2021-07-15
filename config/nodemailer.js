// const nodemailer = require('nodemailer');
import nodemailer from "nodemailer"
// const emailcred = require('../cred/emailcred');
import emailcred from "../cred/emailcred.js"

export default function (toEmail, subject, msg) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: emailcred.email,
            pass: emailcred.password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: '"ProjectZeros"',
        to: toEmail,
        subject: subject, // Subject line
        text: 'Hello', // plain text body
        html: msg // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
}