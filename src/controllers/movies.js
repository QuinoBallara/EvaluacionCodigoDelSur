const TMDB_API_KEY = process.env.TMDB_API_KEY;
const axios = require('axios');

const { readJSON, writeJSON } = require('../helpers/fileHandler');
const FAVORITES_FILE = process.env.FAVORITES_FILE || 'data/favorites.txt';
const uuid = require('uuid');

async function getMovies(req, res, next) {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/trending/movie/week?language=en-US`,
            {
                headers: {
                    'Authorization': `Bearer ${TMDB_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Add suggestionScore and sort
        const moviesWithScore = response.data.results.map(movie => ({
            ...movie,
            suggestionScore: Math.floor(Math.random() * 100)
        })).sort((a, b) => b.suggestionScore - a.suggestionScore);

        res.status(200).json(moviesWithScore);
    } catch (error) {
        console.error('Error fetching movies:', error);
        next(error);
    }
}

async function getMoviesByKeyword(req, res, next) {
    const keyword = req.params.keyword;
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`,
            {
                headers: {
                    'Authorization': `Bearer ${TMDB_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Add suggestionScore and sort
        const moviesWithScore = response.data.results.map(movie => ({
            ...movie,
            suggestionScore: Math.floor(Math.random() * 100)
        })).sort((a, b) => b.suggestionScore - a.suggestionScore);

        res.status(200).json(moviesWithScore);
    } catch (error) {
        console.error('Error fetching movies by keyword:', error);
        next(error);
    }
}

async function favoriteMovie(req, res, next) {
}

async function getFavoriteMovies(req, res, next) {
}

module.exports = { getMovies, getMoviesByKeyword, favoriteMovie, getFavoriteMovies };