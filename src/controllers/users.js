const TMDB_API_KEY = process.env.TMDB_API_KEY;
const axios = require('axios');

const { readJSON, writeJSON } = require('../helpers/fileHandler');
const FAVORITES_FILE = process.env.FAVORITES_FILE || 'data/favorites.txt';
const MOVIES_FILE = process.env.MOVIES_FILE || 'data/movies.txt';
const USERS_FILE = process.env.USERS_FILE || 'data/users.txt';
const uuid = require('uuid');

async function addFavoriteMovie(req, res, next) {
    const { movieId } = req.body;
    const userId = req.userId;
    console.log(req)
    if (!movieId) {
        return res.status(400).json({ error: 'Movie ID is required' });
    }

    const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        {
            headers: {
                'Authorization': `Bearer ${TMDB_API_KEY}`,
                'Content-Type': 'application/json'
            }
        }
    );
    const movieData = response.data;
    if (!movieData || !movieData.id) {
        return res.status(404).json({ error: 'Movie not found' });
    }
    const favorites = readJSON(FAVORITES_FILE);
    if (favorites.some(fav => fav.movieId === movieId && fav.userId === userId)) {
        return res.status(400).json({ error: 'Movie is already in favorites' });
    }
    const new_favorite = {
        id: uuid.v4(),
        movieId: movieData.id,
        userId: userId,
        addedAt: new Date().toISOString(),
    }
    favorites.push(new_favorite);
    writeJSON(FAVORITES_FILE, favorites);

    const movies = readJSON(MOVIES_FILE);
    const movieExists = movies.some(movie => movie.id === movieData.id);
    if (!movieExists) {
        movies.push(movieData);
        writeJSON(MOVIES_FILE, movies);
    }
    res.status(201).json({
        message: 'Movie added to favorites successfully'
    });

}

async function getFavoriteMovies(req, res, next) {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const favorites = readJSON(FAVORITES_FILE);
    const userFavorites = favorites.filter(fav => fav.userId === userId);

    if (userFavorites.length === 0) {
        return res.status(200).json({ message: 'No favorite movies found for this user' });
    }

    const movies = readJSON(MOVIES_FILE);
    const favoriteMovies = userFavorites.map(fav => {
        const movie = movies.find(m => m.id === fav.movieId);
        return movie ? { ...movie, addedAt: fav.addedAt } : null;
    }).filter(movie => movie !== null);

    res.status(200).json(favoriteMovies);
}

module.exports = { addFavoriteMovie, getFavoriteMovies };