const request = require('supertest')
const server = require('./api/server')
describe('loading express', () => {
    it('responds to /', () => {
        request(server)
        .get('/').expect(200)
    })
})