'user strict';
var sql = require('../../config/db.js');

//Resume object constructor
var Resume = function(Resume){
    this.id                 = Resume.id;
    this.created            = Resume.created;
    this.user_id            = Resume.user_id;    
    this.uuid               = Resume.uuid;
    this.notes              = Resume.notes;
    this.profile_picture    = Resume.profile_picture;
};

Resume.getResumeByUUID = function (UUID, result) {
    sql.query("\
        SELECT \
            r.Created, \
            r.Updated, \
            r.UUID, \
            r.Profile_Picture, \
            u.First_Name, \
            u.Last_Name, \
            u.Email \
        FROM Resumes r \
        JOIN Users u \
        ON r.User_ID = u.ID \
        WHERE r.UUID = ?\
    ", UUID, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                if(res.length == 1){
                    result(null, res[0]);
                }else{
                    result(null,{});
                }
            }
        }
    );   
};

/*Resume.createResume = function (newResume, result) {    
        sql.query("INSERT INTO Resumes set ?", newResume, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};*/
/*Resume.getAllResume = function (result) {
        sql.query("Select * from Resumes", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('Resumes : ', res);  

                 result(null, res);
                }
            });   
};
Resume.updateById = function(id, Resume, result){
  sql.query("UPDATE Resumes SET Resume = ? WHERE id = ?", [Resume.Resume, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Resume.remove = function(id, result){
     sql.query("DELETE FROM Resumes WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};*/

module.exports= Resume;