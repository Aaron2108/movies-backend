const { getAll, create, getOne, remove, update, setMoviesGenre, setMoviesActor, setMoviesDirector } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/:id/genres')
    .post(setMoviesGenre);

movieRouter.route('/:id/actors')
    .post(setMoviesActor)

    movieRouter.route('/:id/directors')
    .post(setMoviesDirector)


module.exports = movieRouter;