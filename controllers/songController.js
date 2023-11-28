const Song = require('../models/song.js')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

exports.index = asyncHandler(async (req, res, next) => {
    const [
        numSongs,
        numArtists,
        numGenres
    ] = await Promise.all([
        Song.countDocuments({}).exec(),
        Author.countDocuments({}).exec(),
        Genre.countDocuments({}).exec(),
    ])
})

exports.song_list = asyncHandler()

exports.song_detail = asyncHandler()

exports.song_create_get = asyncHandler()

exports.song_create_post = asyncHandler()

exports.song_delete_get = asyncHandler()

exports.song_delete_post = asyncHandler()

exports.song_update_get = asyncHandler()

exports.song_update_post = asyncHandler()
v