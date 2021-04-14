var mongoose = require('mongoose')

const AdvancementSchema  = new mongoose.Schema({
    type:String,
    value: Number,
    maxvalue: Number,
    chunks: [{type: mongoose.Schema.Types.ObjectId, ref: 'chunk'}]
})

const Advancement = mongoose.model('advancement', AdvancementSchema)

module.exports = Advancement;
