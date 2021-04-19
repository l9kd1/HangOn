var UserService = require('../services/user.service');
var SessionService = require('../services/session.service');

var User = require('../models/user.model');
var crypto = require('crypto');

class UserController {
    
    /**
     * (GET) Fetches users data based on request
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    static async getFetch(req, res, next) {
        
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
    
    /**
     * (POST) Attempts to login the user
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    static async postLoginUser(req, res, next) {
        
        // TODO need to move logic in service
        if (!req.body.username || !req.body.password) return res.status(400).json({status:400, message:"Veuillez remplir les champs."});
        
        // Hashing password
        const hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
        
        // 
        try {

            var users = await UserService.getUsers({
                "username"      :   req.body.username
            });

        } catch(e) {
            return res.status(400).json({
                status: 400, 
                message:e.message
            });
        }

        // Creating user if user not found
        if (users.length==0) {

            // Preparing model
            const user = new User({
                "username"        : req.body.username,
                "password"        : hashedPassword
            });

            // Saving to DB
            user.save().then((val) => {

                // Creating session
                SessionService.authUserSession(res, {
                    "username"      : req.body.username,
                    "_id"           : val._id
                });

                return res.status(200).json({status: 200});
            });

        // Checking password
        } else {

            var user;

            users.forEach((elem) => {

                if (elem.password == hashedPassword) {
                    user = elem;
                }

            });

            if (user) {

                // Creating session
                SessionService.authUserSession(res, {
                    "username"      : user.username,
                    "_id"           : user._id
                });

                return res.status(200).json({status: 200, message:"damn"});
            }

            return res.status(400).json({status: 400, message:"Ce nom d'utilisateur est déjà pris et le mot de passe est erroné !"});
        }
        
    }
    
}


// Exports
exports.getUsers = UserController.getFetch;
exports.postLoginUser = UserController.postLoginUser;