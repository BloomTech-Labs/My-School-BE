const request = require('supertest');
const db = require('../data/dbconfig.js');
const server = require('../api/server.js');
const knex = require('../data/dbconfig.js');
const UsersDB = require('./users-model.js')

describe('users endpoints', ()=> {
    beforeAll(() => {
        return knex.seed.run()
    })
    describe('GET /', () => {
        it("should return a 200 status", () => {
            return request(server).get('/api/users')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it("should return a list of users", () => {
            return request(server).get('/api/users')
            .then(res => {
                expect(res.body).toBeTruthy()
            })
        })
    })
    describe('GET /:id', () => {
        it("should return a 200 status", () => {
            return request(server).get('/api/users/1')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it("should return a single users based on user id passed in parameter", () => {
            return request(server).get('/api/users/1')
            .then(res => {
                expect(res.body).toBeTruthy()
            })
        })
    })
    describe('GET /:id/activities', () => {
        it("should return a 200 status", () => {
            return request(server).get('/api/users/3/activities')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it("should return a list of users", () => {
            return request(server).get('/api/users/3/activities')
            .then(res => {
                expect(res.body).toBeTruthy()
            })
        })
    })
    describe('PUT /:id', () => {
        it("should return a 200 status", () => {
            return request(server).put('/api/users/1')
            .send( { 
                name: 'dylan'
            })
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it("should return the user with updated changes", () => {
            return request(server).get('/api/users/1')
            .then(res => {
                expect(res.body).toBeTruthy()
            })
        })
    })
    // describe('PUT /:id/profilepic', () => {
    //     it("should return a 200 status", () => {
    //         return request(server).put('/api/users/1/profilepic')
    //         .send({file: '../wherevertheimageis.jpeg'})
    //         .then(res => {
    //             expect(res.status).toBe(200)
    //         })
    //     })
    //     it("should the user info back with the image URL", () => {
    //         return request(server).put('/api/users/1/profilepic')
    //         .send({file: '../wherevertheimageis.jpeg'})
    //         .then(res => {
    //             expect(res.body).toBeTruthy()
    //         })
    //     })
    // })
    describe('DELETE /:id', () => {
        it("should return a 200 status", () => {
            return request(server).delete('/api/users/2')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it("should return a truthy message saying user was deleted", () => {
            return request(server).delete('/api/users/2')
            .then(res => {
                expect(res.body).toBeTruthy()
            })
        })
    })
})

describe('users model', () => {
    beforeAll(() => {
        return knex.seed.run()
    })
    describe('getAllUsers()', () => {
        it('should return all users in the database', () => {
            return UsersDB.getAllUsers()
            .then(res => {
                expect(res).toHaveLength(3)
            })
        })
    })
    describe('getUserById()', () => {
        it('should return a user with a matching ID', () => {
            return UsersDB.getUserById(1)
            .then(res => {
                expect(res).toEqual(
                    expect.objectContaining({
                        id: 1
                    })
                )
            })
        })
    })
    describe('getAllActivitesForUser()', () => {
        it('should return all activites for a user with the ID passed into the params', () => {
            return UsersDB.getAllActivitesForUser(3)
            .then(res => {
                expect(res).toHaveLength(6)
                res.map(activity => expect(activity.student_id).toEqual(3))
            })
        })
    })
    describe('editUser()', () => {
        it('should change the selected user', async () => {
            await UsersDB.editUser(1, {name: 'AnEditedSubject'})
            const user = await UsersDB.getUserById(1)
            expect(user).toEqual(
                expect.objectContaining({
                    id: 1,
                    name: 'AnEditedSubject'
                })
            )
        })
    })
    describe('deleteUser()', () => {
        it('should remove the selected user', async () => {
            await UsersDB.deleteUser(1)
            const user = await UsersDB.getUserById(1)
            expect(user).toBeFalsy()
        })
    })
})
