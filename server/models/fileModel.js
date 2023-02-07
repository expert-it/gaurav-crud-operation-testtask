const mongoose = require('mongoose');

const Schema = mongoose.Schema


const fileSchema = Schema({
    file: { type: String, default: '' },
    path : {type: String, default: ''},
    isEdited : { type :Boolean , default : false }
}, { timestamps: true })

module.exports = mongoose.model('files', fileSchema)