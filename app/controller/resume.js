'use strict';
var validator = require('validator');
var ResumeModel = require('../model/resume.js');

exports.read_a_resume = function(req, res) {
    if(validator.isUUID(req.params.UUID)){
        ResumeModel.getResumeByUUID(req.params.UUID, function(err, Resume) {
            if (err)
                res.send(err);
                res.json(Resume);
            }
        );
    }else{
        res.send({});
    }
};

/*
exports.list_all_resumes = function(req, res) {
  Resume.getAllResume(function(err, Resume) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', Resume);
    res.send(Resume);
  });
};

exports.create_a_resume = function(req, res) {
  var new_resume = new Resume(req.body);

  //handles null error 
   if(!new_resume.Resume || !new_resume.status){

            res.status(400).send({ error:true, message: 'Please provide Resume/status' });

        }
else{
  
  Resume.createResume(new_resume, function(err, Resume) {
    
    if (err)
      res.send(err);
    res.json(Resume);
  });
}
};

exports.update_a_resume = function(req, res) {
  Resume.updateById(req.params.ResumeId, new Resume(req.body), function(err, Resume) {
    if (err)
      res.send(err);
    res.json(Resume);
  });
};

exports.delete_a_resume = function(req, res) {


  Resume.remove( req.params.ResumeId, function(err, Resume) {
    if (err)
      res.send(err);
    res.json({ message: 'Resume successfully deleted' });
  });
};*/