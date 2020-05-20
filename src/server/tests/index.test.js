const request = require('supertest');
const app = require('../index');

// Had to add this require or else I kept getting an error trying to test
require("regenerator-runtime/runtime");


test('Test that the server runs succesfully', async () => {
    const response = await request('http://localhost:8080').get('/');
    expect(response.statusCode).toBe(200);
});
