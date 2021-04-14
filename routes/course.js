var express = require('express');
var router = express.Router();
var CourseController = require('../controllers/course.controller')
var ChunkController = require('../controllers/chunk.controller');

/* POST chunk info*/
router.post('/chunk', ChunkController.modifyChunk);

/* POST login infos*/
router.post('/', CourseController.addCourse);

/* DELETE a course*/
router.delete('/', CourseController.deleteCourse);


module.exports = router;
