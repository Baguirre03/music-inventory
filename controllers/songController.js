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
    const [artists, genres] = await Promise.all([
        Artist.find({}).populate('name').exec(),
        Genre.find({}).populate('name').exec()
    ])
    res.render('song_form', {
        title: "Create Song",
        artists: artists,
        genres: genres
    })
})

exports.song_create_post = [
    body('name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Song name is required'),
    body("artist")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Artist is required'),
    body('genre')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('Genre is required'),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        const song = new Song({
            name: req.body.name,
            artist: req.body.artist,
            genre: req.body.genre
        })

        if (!errors.isEmpty()) {
            const [allArtists, allGenres] = await Promise.all([
                Artist.find().exec(),
                Genre.find().exec(),
            ]);

            res.render('song_form', {
                title: "Create Song",
                artists: allArtists,
                genres: allGenres,
                song: song,
                errors: errors.array(),
            })
        } else {
            const songExists = await Song.findOne({ name: req.body.name }).collation({ locale: "en", strength: 1 }).exec()
            if (songExists) {
                res.redirect(songExists.url)
            } else {
                await song.save()
                res.redirect(song.url)
            }
        }
    })
]

exports.song_delete_get = asyncHandler(async (req, res, next) => {
    const song = await Song.findById(req.params.id).exec()
    if (song === null) {
        res.redirect('/catalog/songs')
    } else {
        res.render('song_delete', {
            title: "Delete Song",
            song: song
        })
    }
})

exports.song_delete_post = asyncHandler(async (req, res, next) => {
    const song = await Song.findById(req.params.id).exec()
    if (!song) {
        res.redirect('/catalog/songs')
    } else {
        console.log(req)
        await Song.findByIdAndDelete(req.body.song_id)
        res.redirect('/catalog/songs')
    }
})

exports.song_update_get = asyncHandler(async (req, res, next) => {
    const [song, allArtists, allGenres] = await Promise.all([
        Song.findById(req.params.id).populate("artist").populate("genre").exec(),
        Artist.find().exec(),
        Genre.find().exec(),
    ]);

    if (!song) {
        const err = new Error("Song not found");
        err.status = 404;
        return next(err);
    }

    // for (const genre of allGenres) {
    //     if (genre._id.toString() === song.genre._id.toString()) {
    //         genre.checked = "true";
    //     }
    // }

    res.render("song_form", {
        title: "Update Book",
        artists: allArtists,
        genres: allGenres,
        song: song,
    })
})

exports.song_update_post = asyncHandler(async (req, res, next) => {
    res.send('not yet implemented')
})
