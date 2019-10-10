const { Schema, model } = require('mongoose');

let schema = new Schema({
    name: String,
})

module.exports = model('Hall', schema, "halls");