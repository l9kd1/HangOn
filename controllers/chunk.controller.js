var UserService = require('../services/user.service');
var User = require('../models/user.model');
var Chunk = require('../models/chunk.model');
var ChunkService = require('../services/chunk.service');
var Advancement = require('../models/advancement.model');
var crypto = require('crypto');

exports.modifyChunk = async function (req, res, next) {

    try {
        if(!req.cookies.id._id)throw Error("User credentials are wrong.");
        var saved_chunk = await Chunk.findByIdAndUpdate(req.body._id,{validated:req.body.validated});
        var saved_course = await Advancement.findByIdAndUpdate(req.body.adv_id,{$inc : {'value' : (req.body.validated?1:-1)}});
        return res.status(200).json({ status: 200, data: saved_chunk, message: "Succesfully updated." });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};
