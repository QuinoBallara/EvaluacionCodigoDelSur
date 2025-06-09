const express = require('express');
const { addFavoriteMovie, getFavoriteMovies } = require('../controllers/users');
const { body, param } = require('express-validator');
const validateRequest = require('../middlewares/validation');

const router = express.Router();

router.post('/addFavorite', [
    body('movieId').isInt().withMessage('Movie ID must be an integer'),
], validateRequest, addFavoriteMovie);

router.get('/:userId/favorites', [
    param('userId').isUUID().withMessage('User ID must be a valid UUID')
], validateRequest, getFavoriteMovies);

module.exports = router;