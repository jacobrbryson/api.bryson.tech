'use strict';
var validator = require('validator');
var nodemailer = require('nodemailer');
var ContactModel = require('../model/contact.js');

exports.send_email = function(req, res) {
    if(
        !req.body.email || 
        !req.body.name || 
        !req.body.message || 
        !req.body.token
    ){
        res.send("Invalid request data.");
        return;
    }

    if(!validator.isEmail(req.body.email)){
        res.send("Invalid email address.");
        return;
    }

    if(!validator.isUUID(req.body.token)){
        res.send("Invalid token.");
        return;
    }
    
    ContactModel.createEmail(req,function(err, res) {
        if (err)
            res.send(err);
            //res.json(res);

            if(res == 1){//Could return an insert ID or something more meaningful
                var name = req.body.name;
                var email = req.body.email;
                var message = req.body.message;
    
                /*var Contact = {
                    name: name,
                    email: email,
                    message: message
                }*/
    
                const transporter = nodemailer.createTransport({
                    host: global.gConfig.mail_server.host,
                    port: global.gConfig.mail_server.port,
                    secure: global.gConfig.mail_server.secure,
                    auth: {
                        user: global.gConfig.mail_server.auth.user,
                        pass: global.gConfig.mail_server.auth.pass
                    }
                });
    
                var mailOptions = {
                    from: global.gConfig.mail_server.from_email,
                    to: global.gConfig.mail_server.to_email,
                    subject: 'New contact from ' + global.gConfig.app_name,
                    html: '<strong>Name:</strong> ' + name + '<br/><strong>Email:</strong> ' + email + '<br/><strong>Message:</strong><br/>' + message,
                    text: 'Name: ' + name + ' Email: ' + email + ' Message: ' + message
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        return error;
                    } else {
                        return 'Email sent: ' + info.response;
                    }
                });
            }
        }
    );
};

exports.get_token = function(req, resu) {
    //console.log("Getting token");
    ContactModel.genToken(req,function(err, res) {
        if (err)
            resu.send(err);
            resu.json(res);
        }
    );
}