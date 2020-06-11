const request = require('supertest')
const server = require('./api/server')
describe('loading express', () => {
    it('responds to /', () => {
        return request(server)
        .get('/').expect({"api": "api server is up and running"})
    })
})