var UserService = require('../services/user.service');
var User = require('../models/user.model');
var crypto = require('crypto');

exports.getUsers = async function (req, res, next) {
    // Validate request parameters, queries using express-validator

    var page = req.params.page ? req.params.page : 1;
    var limit = req.params.limit ? req.params.limit : 10;
    try {
        var users = await UserService.getUsers({}, page, limit);
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.loginUser = async function (req, res, next) {

  // TODO need to move logic in service
  if(!req.body.username||!req.body.password)return res.status(400).json({status:400, message:"Veuillez remplir les champs."});

  const pass = crypto.createHash('sha256').update(req.body.password).digest('hex');

  try{
    var users = await UserService.getUsers({"username":req.body.username});
  }catch(e){
    return res.status(400).json({status: 400, message:e.message});
  }
  if(users.length==0){
    const u = new User({username:req.body.username,password:pass});
    u.save().then((val)=>{
      res.cookie("id",{username:req.body.username,password:pass,_id:val._id});
      return res.status(200).json({status: 200});
    });
  }else{
    var u;
    users.forEach((elem)=>{
      if(elem.password==pass){
        u=elem;
      }
    });
    if(u){
      res.cookie("id",{username:u.username,password:u.password,_id:u._id});
      return res.status(200).json({status: 200, message:"damn"});
    }
    return res.status(400).json({status: 400, message:"Ce nom d'utilisateur est déjà pris et le mot de passe est erroné !"});
  }

}
