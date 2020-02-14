import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'tachyons';

ReactDOM.render(<App />, document.getElementById('root'));

// cron code
const cron = require("node-cron");
const nodeMailer = require("nodemailer");

let testAccount = nodemailer.createTestAccount();


let transporter = nodeMailer.createTransport({
    host: 'gmail',
    auth: {
    user: 'blogpost.mig688.jl59683@gmail.com',
    pass: 'm@ster21'
    }
});
   
cron.schedule("0 17 * * *", function () {
    if(hasUpdated){
        hasUpdated = false;
        for(i = 0; i < users.length; i++){
            if(users[i].subscribed){
                const mailOptions = {
                    from: 'blogpost.mig688.jl59683@gmail.com', // sender address
                    to: users[i].email,// list of receivers
                    subject: 'Daily Blogpost Update', // Subject line
                    text: '',// plain text body
                    html: ''// html body
                };
    
                transporter.sendMail(mailOptions, function (error, info) {
                    console.log(info.messageId);
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }
    }
}, null, true, 'America/Chicago');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
