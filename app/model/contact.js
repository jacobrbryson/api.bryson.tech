'user strict';
var sql = require('../../config/db.js');

//Email object constructor
var Email = function(Email){
    this.id               = Email.id;
    this.created          = Email.created;
    this.email            = Email.email;    
    this.name             = Email.name;
    this.message          = Email.message;
};

Email.createEmail = function (Email, result) {
    sql.query(//May want to make this a global thing one day...
        "SELECT ID FROM Contact_Tokens WHERE UUID = ? ",
        Email.body.token,
        (err, rows) => {
            if(rows[0]){
                sql.query(
                    "INSERT INTO Contacts(Email, Name, Message)VALUES( ? , ? , ? )", 
                    [Email.body.email, Email.body.name, Email.body.message], 
                    (err, rows2) => {
                        if(err) {
                            console.log("error: ", err);
                            result(err, null);
                        }
                        else{
                            sql.query(//May want to make this a global thing one day...
                                "DELETE FROM Contact_Tokens WHERE ID = ? ", rows[0].ID,(err, rows3) => {
                                    if(err) {
                                        console.log("error: ", err);
                                        result(err, null);
                                    }else{
                                        result(null, 1);
                                    }
                                }
                            );
                        }
                    }
                );
            }else{
                result(null, "Invalid UUID");
            }
        }
    );
};

Email.genToken = function (req, result) {//Yes nesting like this sucks
    uuid = "";
    sql.query(//May want to make this a global thing one day...
        "DELETE FROM Contact_Tokens WHERE Created < DATE_SUB(NOW(), INTERVAL 24 HOUR)",
        (err, rows) => {
            if(err){
                console.log("error: ", err);
            }
            sql.query(
                "INSERT INTO Contact_Tokens(IP)VALUES( ? )", 
                [req.headers.host], 
                (err, rows) => {
                    if(err){
                        console.log("error: ", err);
                    }
                    sql.query(
                        "SELECT UUID FROM Contact_Tokens WHERE ID = ? ", 
                        rows.insertId, 
                        function (err, iresult) {
                            if(err) {
                                //console.log("error: ", err);
                                result(err, null);
                                return;
                            }
                            else{
                                uuid = iresult[0].UUID;
                                //console.log(iresult[0].UUID);
                                result(null, iresult[0].UUID);
                            }
                        }
                    );
                }
            );     
        }
    );
};

module.exports= Email;