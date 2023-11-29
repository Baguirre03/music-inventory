const Genre = require('../models/genre.js')
const Song = require('../models/song.js')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

exports.genre_list = asyncHandler(async (req, res, next) => {
    const allGenres = await Genre.find().sort({ name: 1 }).exec()
    res.render('genres', {
        title: "Genre List",
        genre_list: allGenres
    })
})

exports.genre_detail = asyncHandler(async (req, res, next) => {
    const [genre, allGenreSongs] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Song.find({ genre: req.params.id }).populate('name').exec()
    ])
    if (genre === null) {
        const err = new Error("Genre not found")
        err.status = 404
        return next(err)
    }

    res.render('genre_detail', {
        title: "Genre Detail",
        genre: genre,
        genre_songs: allGenreSongs
    })
})

exports.genre_create_get = asyncHandler(async (req, res, next) => {
    res.render('genre_form', {
        title: 'Create Genre'
    })
})

exports.genre_create_post = [
    body('genre_name')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Genre is required"),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req)
        const genre = new Genre({ name: req.body.genre_name })

        if (!errors.isEmpty()) {
            res.render('genre_form', {
                title: "Create Genre",
                genre: genre,
                errors: errors.array()
            })
        } else {
            const genreExists = await Genre.findOne({ name: req.body.genre_name }).collation({ locale: "en", strength: 2 }).exec();
            if (genreExists) {
                res.redirect(genreExists.url)
            } else {
                await genre.save()
                res.redirect(genre.url)
            }
        }
    })
]

exports.genre_delete_get = asyncHandler(async (req, res, next) => {
    res.send('not yet implemented')
})

exports.genre_delete_post = asyncHandler(async (req, res, next) => {
    res.send('not yet implemented')
})

exports.genre_update_get = asyncHandler(async (req, res, next) => {
    res.send('not yet implemented')
})

exports.genre_update_post = asyncHandler(async (req, res, next) => {
    res.send('not yet implemented')
})
