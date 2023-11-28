const Artist = require('../models/artist.js')
const Song = require('../models/song.js')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

exports.artist_list = asyncHandler(async (req, res, next) => {
    const allArtists = await Artist.find().sort({ name: 1 }).exec()
    res.render('artists', {
        title: "Artists List",
        artist_list: allArtists
    })
})

exports.artist_detail = asyncHandler(async (req, res, next) => {
    const [artist, allSongsByArtist] = await Promise.all([
        Artist.findById(req.params.id).exec(),
        Song.find({ artist: req.params.id }).populate('name genre').exec()
    ])
    if (artist === null) {
        const err = new Error('Artist not found')
        err.status = 404
        return next(err)
    }

    res.render('artist_detail', {
        title: "Artist detail",
        artist: artist,
        artist_songs: allSongsByArtist
    })
})

exports.artist_create_get = asyncHandler(async (req, res, next) => {
    res.render('artist_form', {
        title: "Create Artist"
    })
})

exports.artist_create_post = asyncHandler(async (req, res, next) => {
    res.send('not yet implemented')
})

exports.artist_delete_get = asyncHandler(async (req, res, next) => {
    res.send('not yet implemented')
})

exports.artist_delete_post = asyncHandler(async (req, res, next) => {
    res.send('not yet implemented')
})

exports.artist_update_get = asyncHandler(async (req, res, next) => {
    res.send('not yet implemented')
})

exports.artist_update_post = asyncHandler(async (req, res, next) => {
    res.send('not yet implemented')
})

