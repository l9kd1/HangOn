var mongoose = require('mongoose')

const CourseSchema  = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    course: String,
    advancements: [{type: mongoose.Schema.Types.ObjectId, ref: 'advancement'}]
})

const Course = mongoose.model('course', CourseSchema)

module.exports = Course;
