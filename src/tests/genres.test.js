const request = require('supertest');
const app = require('../app');
let id;
test('get /genres traer todo los generos',async () => {
    const res = await request(app).get('/genres');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('post /genres crear un genero',async () => {
    const genre = {
        name: 'Accion'
    }
    const res = await request(app).post('/genres').send(genre);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(genre.name);
})

test('PUT /genres/:id',async () => {
    const genre = {
        name: 'Ficcion'
    }
    const res = await request(app).put(`/genres/${id}`).send(genre);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(genre.name);
})


test('DELETE /genres/:id',async () => {
    const res = await request(app).delete(`/genres/${id}`)
    expect(res.status).toBe(204);
})