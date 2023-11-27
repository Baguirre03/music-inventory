const express = require('express')
const router = express.Router()

const artist_controller = require('../controllers/artistController')
const genre_controller = require('../controllers/genreController')
const song_controller = require('../controllers/songController')

router.get('/', song_controller.index)


module.exports = router