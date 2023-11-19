const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models')

let id;
test('get /movies trae todo los movies de la base de datos', async () => {
    const res =await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /movies crea un nuevo movie',async () => {
    const movie = {
        name: 'Viajando al futuro',
        image: 'http://viajandoalfuturo.jpg',
        synopsis: 'Viajando al futuro con tu vieja',
        releaseYear: 2014
    }
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(movie.name);
})

test('put /movies/:id actualiza un movie de la base de datos',async () => {
    const movie = {
        image: 'http://tuvieja.png'
    }
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.image).toBe(movie.image)
})

test('POST /movies/:id/actors agrega al movie un actor',async () => {
    const actor = await Actor.create({
        firstName: "John",
        lastName: "Jonhson",
        nationality: "Peruano",
        image: "http://image.jpg",
        birthday: "21 de agosto"
    })
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test('POST /movies/:id/director agrega al movie un director', async () => {
    const director = await Director.create({
        firstName: "Director",
        lastName: "Prueba",
        nationality: "Peruano",
        image: "http://image.jpg",
        birthday: "21 de agosto"
    })
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id])

    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);

})

test('POST /movies/:id/genres',async () => {
    const genre = await Genre.create({
        name: "Fantacia"
    })
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})


test('delete /movies/:id elimina un movie',async () => {
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204)
})

