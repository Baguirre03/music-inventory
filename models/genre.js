const mongoose = require('mongoose')

const Schema = mongoose.Schema

const GenreSchema = new Schema({
    title: { type: String, required: true },
    name: { type: String, required: true },
})

GenreSchema.virtual('url').get(function () {
    return `/catalog/genre/${this._id}`
})

module.exports = mongoose.model('Genre', GenreSchema)