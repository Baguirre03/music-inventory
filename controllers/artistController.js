const artist = require('../models/artist.js')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

exports.artist_list = asyncHandler()

exports.artist_detail = asyncHandler()

exports.artist_create_get = asyncHandler()

exports.artist_create_post = asyncHandler()

exports.artist_delete_get = asyncHandler()

exports.artist_delete_post = asyncHandler()

exports.artist_update_get = asyncHandler()

exports.artist_update_post = asyncHandler()

