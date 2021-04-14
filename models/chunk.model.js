var mongoose = require('mongoose')

const ChunkSchema  = new mongoose.Schema({
    number:Number,
    validated:Boolean
})

const Chunk = mongoose.model('chunk', ChunkSchema)

module.exports = Chunk;
