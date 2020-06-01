require("dotenv").config();
const request = require('supertest');
const db = require('../data/dbconfig.js');
const server = require('../api/server.js')
const authenticator = require('./authenticator.js');

describe('authentication endpoints', () => {
    beforeAll(() => {
        return db.seed.run();
    });
    describe("POST /registration", () => {
        it('should return a 201 status upon successful registration', () => {
            return request(server)
            .post('/api/auth/registration')
            .send({username: 'testingFan1', password: '123456', family_id: 1})
            .then(res => {
                expect(res.status).toBe(201)
            })
        })
        it('should return a JWT', () => {
            return request(server)
            .post('/api/auth/registration')
            .send({username: 'testingFan2', password: '123456', family_id: 1})
            .then(res => {
                expect(res.body.token).toBeTruthy();
            })
        })
        it('should return the user object', () => {
            return request(server)
            .post('/api/auth/registration')
            .send({username: 'testingFan3', password: '123456', family_id: 1})
            .then(res => {
                expect(res.body.user).toBeTruthy();
            })
        })
        it('should return a status of 400 if a username and password isn\'t included', () => {
            return request(server)
            .post('/api/auth/registration')
            .send({username: '', password: ''})
            .then(res => {
                expect(res.status).toBe(400)
            })
        })
    })
    describe('POST /login', () => {
        it('should return a status of 202 upon succesful login', () => {
            return request(server)
            .post('/api/auth/login')
            .send({username: 'testingFan3', password: '123456'})
            .then(res => {
                expect(res.status).toBe(202)
            })
        })
        it('should return a JWT', () => {
            return request(server)
            .post('/api/auth/login')
            .send({username: 'testingFan3', password: '123456'})
            .then(res => {
                expect(res.body.token).toBeTruthy()
            })
        })
        it('should return the user object', () => {
            return request(server)
            .post('/api/auth/login')
            .send({username: 'testingFan3', password: '123456'})
            .then(res => {
                expect(res.body.user).toBeTruthy()
            })
        })
        it('should return a status of 401 if the username and password do not match', () => {
            return request(server)
            .post('/api/auth/login')
            .send({username: 'testingHater', password: '123456'})
            .then(res => {
                expect(res.status).toBe(401)
            })
        })
        it('should return an error message if the username and password do not match', () => {
            return request(server)
            .post('/api/auth/login')
            .send({username: 'testingFan3', password: '654321'})
            .then(res => {
                expect(res.body.message).toBe('Authentication Failed')
            })
        })
    })
})
