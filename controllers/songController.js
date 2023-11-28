const asyncHandler = require('express-async-handler')
const Song = require('../models/song.js')
const Artist = require('../models/artist.js')
const Genre = require('../models/genre.js')
const { body, validationResult } = require('express-validator')

exports.index = asyncHandler(async (req, res, next) => {
    const [
        numSongs,
        numArtists,
        numGenres
    ] = await Promise.all([
        Song.countDocuments({}).exec(),
        Artist.countDocuments({}).exec(),
        Genre.countDocuments({}).exec(),
    ])

    res.render('index', {
        title: "Music Inventory Home",
        song_count: numSongs,
        artist_count: numArtists,
        genre_count: numGenres,
    })
    return
})

exports.song_list = asyncHandler(async (req, res, next) => {
    const allSongs = await Song.find({})
        .sort({ name: 1 })
        .populate('artist')
        .populate('genre')
        .exec()
    res.render('songs', {
        title: "Song List",
        song_list: allSongs
    })
})

exports.song_detail = asyncHandler(async (req, res, next) => {
    const song = await Song.findById(req.params.id).populate('artist').populate('genre').exec()

    if (song === null) {
        const err = new Error('Song not found')
        err.status = 404
        return next(err)
    }
    res.render('song_detail', {
        title: "Song Detail",
        song: song
    })
})

exports.song_create_get = asyncHandler(async (req, res, next) => {
    res.send('not yet implemented')
})

exports.song_create_post = asyncHandler(async (req, res, next) => {
    res.send('not yet implemented')
})

exports.song_delete_get = asyncHandler(async (req, res, next) => {
    res.send('not yet implemented')
})

exports.song_delete_post = asyncHandler(async (req, res, next) => {
    res.send('not yet implemented')
})

exports.song_update_get = asyncHandler(async (req, res, next) => {
    res.send('not yet implemented')
})

exports.song_update_post = asyncHandler(async (req, res, next) => {
    res.send('not yet implemented')
})
