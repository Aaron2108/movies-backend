const request = require('supertest');
const app = require('../app');
let id;
test('get /directors trae todos los directores',async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
})

test('post /directors crea un nuevo director',async () => {
    const director = {
        firstName: 'John',
        lastName: 'Mendez',
        nationality:'Peruano',
        image:'http://image.png',
        birthday: '20 de agosto'
    }
    const res = await request(app).post('/directors').send(director)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(director.firstName);
})

test('put /directors/:id debe actualizar un director',async () => {
    const director = {
        birthday: '21 de agosto'
    }
    const res = await request(app).put(`/directors/${id}`).send(director)
    expect(res.status).toBe(200);
    expect(res.body.birthday).toBe(director.birthday)
})

test('DELETE /directors/:id debe eliminar un director', async ()=>{
    const res = await request(app).delete(`/directors/${id}`)
    expect(res.status).toBe(204);
})