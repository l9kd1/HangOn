var UserService = require('../services/user.service');
var User = require('../models/user.model');
var Course = require('../models/course.model');
var Chunk = require('../models/chunk.model');
var CourseService = require('../services/course.service');
var Advancement = require("../models/advancement.model");
var AdvancementService = require('../services/advancement.service');
var crypto = require('crypto');

exports.getUserCourses = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var page = req.params.page ? req.params.page : 1;
    var limit = req.params.limit ? req.params.limit : 10;


    try {
        if(!req.cookies.id._id)throw Error("User credentials are wrong.");
        var courses = await AdvancementService.getUserCourses({user:req.cookies.id._id}, page, limit);
        return res.status(200).json({ status: 200, data: courses, message: "Succesfully Retrieved." });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.addCourse = async function (req,res,next){
    // TODO move logic to service
    try {
        if(!req.cookies.id._id)throw Error("User credentials are wrong.");
        var advancement_ids = [];

        for (const e of req.body.advancements){

          var chunk_ids = [];
          for(var i=0;i<e.maxvalue;i++){
            var chunk = new Chunk({number:i,validated:false});
            var saved_chunk = await chunk.save();
            chunk_ids.push(saved_chunk._id);
          }

          var adv = new Advancement(e);
          adv.chunks = chunk_ids;
          var saved_adv = await adv.save();
          advancement_ids.push(saved_adv._id);
        }

        var c = new Course({course:req.body.name,user:req.cookies.id._id,advancements:advancement_ids});
        var saved_c = await c.save();
        await saved_c.populate({path: 'advancements',populate: { path: 'chunks' }}).execPopulate();

        return res.render('components/management-card',{ c : saved_c});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.deleteCourse = async function (req,res,next){
  try {
      if(!req.cookies.id._id)throw Error("User credentials are wrong.");
      await CourseService.deleteCourse({_id:req.body.id});
      return res.status(200).json({ status: 200, message: "Succesfully Deleted." });
  } catch (e) {
      return res.status(400).json({ status: 400, message: e.message});
  }
}
