const { Schema, model, SchemaTypes } = require('mongoose');

let schema = new Schema({
    _id: Number,
    name: String,
    pin: Number,
    hall: SchemaTypes.ObjectId,
    room: SchemaTypes.ObjectId
})

module.exports = model("Student", schema, "students");