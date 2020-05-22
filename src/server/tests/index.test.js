const request = require('supertest');
const app = require('../index');

// Had to add this require or else I kept getting an error trying to test
require("regenerator-runtime/runtime");

test('Test that the server runs succesfully by capturing startup log', async () => {
    const log = jest.spyOn(global.console, 'log')
    const response = await request('http://localhost:8081').get('/');
       expect(log).toHaveBeenCalledWith('Example app listening on port 8081!');
});
