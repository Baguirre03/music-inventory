const genre = require('../models/genre.js')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')

exports.genre_list = asyncHandler()

exports.genre_detail = asyncHandler()

exports.genre_create_get = asyncHandler()

exports.genre_create_post = asyncHandler()

exports.genre_delete_get = asyncHandler()

exports.genre_delete_post = asyncHandler()

exports.genre_update_get = asyncHandler()

exports.genre_update_post = asyncHandler()
