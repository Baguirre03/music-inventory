const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ArtistSchema = new Schema({
    artist: { type: String, required: true },
    title: { type: String },
})

ArtistSchema.virtual('url').get(function () {
    return `/catalog/artist/${this._id}`
})

module.exports = mongoose.model('Artist', ArtistSchema)