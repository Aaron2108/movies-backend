const request = require('supertest');
const app = require('../app');

let id;
test('GET /actors traer todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('POST /actors crea un nuevo actor', async () => { 
    const actor = {
        firstName: 'John',
        lastName: 'Mendez',
        nationality: 'UNKNOWN',
        image: 'http:image.jpg',
        birthday: '21 de agosto'
    }
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id
    //* debe traer status 201 y que devuelva el firstName del actor creado, comparando el firstName del actor creado
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(actor.firstName);
})

test('PUT /actors/:id debe actualizar un actor', async () => { 
    const actor = {
        firstName: 'Oliver'
    }
    const res = await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actor.firstName)
})


test('delete /actors/:id debe eliminar un actor', async () => { 
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204);
})