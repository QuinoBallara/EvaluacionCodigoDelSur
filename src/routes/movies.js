const express = require('express');
const { getMovies, getMoviesByKeyword, favoriteMovie, getFavoriteMovies } = require('../controllers/movies');
const { body, param } = require('express-validator');

const router = express.Router();

router.get('/', getMovies);

router.get('/:keyword', [
    param('keyword').escape()
], getMoviesByKeyword);

router.post('/addFavorite', [
    body('movieId').isInt().withMessage('Movie ID must be an integer'),
    body('userId').isInt().withMessage('User ID must be an integer')
], favoriteMovie);

router.get('/favorites', getFavoriteMovies);

module.exports = router;