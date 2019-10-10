const { Schema, model } = require('mongoose');

let schema = new Schema({
    name: String,
    hall: String, // ID of the hall
    members: [Number] // IDs of the students
})

module.exports = model('Room', schema, "rooms");