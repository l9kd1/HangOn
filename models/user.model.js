var mongoose = require('mongoose');

// Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
})

// User schema
const User = mongoose.model('user', UserSchema);

// Exports
module.exports = User;
