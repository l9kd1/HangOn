var Course = require('../models/course.model');

exports.getUserCourses = async function (query, page, limit) {

    try {
        var courses = await Course.find(query).populate({path: 'advancements',populate: { path: 'chunks' }});
        return courses;
    } catch (e) {
        throw Error('Erreur')
    }
}

exports.deleteCourse = async function (query) {

    try {
        var courses = await Course.deleteMany(query);
        return courses;
    } catch (e) {
        throw Error('Erreur')
    }
}
