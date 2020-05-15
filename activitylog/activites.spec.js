require('dotenv').config()
const request = require('supertest');
const db = require('../data/dbconfig.js');
const server = require('../api/server.js');
const knex = require('../data/dbconfig.js');
const ActDB = require('./activities-model.js')
const testImage = `${__dirname}/../utils/test-helpers/testPost.png`

describe('activites endpoints', ()=> {
    beforeAll(() => {
        return knex.seed.run()
    })
    describe('GET /', () => {
        it("should return a 200 status", () => {
            return request(server).get('/api/activites')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it("should return a list of activites", () => {
            return request(server).get('/api/activites')
            .then(res => {
                expect(res.body).toBeTruthy()
            })
        })
    })
    describe('GET /:id', () => {
        it("should return a 200 status", () => {
            return request(server).get('/api/activites/1')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it("should return a single activity based on the id passed in parameter", () => {
            return request(server).get('/api/activites/1')
            .then(res => {
                expect(res.body).toBeTruthy()
            })
        })
    })
    describe('POST /', () => {
        it('should return a status of 201 if the name is created', () => {
            return request(server).post('/api/activites').send({name: 'Smith'})
            .then(res => {
                expect(res.status).toBe(201)
            })
        })
        it('should return the newly created name for the activity', () => {
            return request(server).post('/api/activites').send({name: 'Smith'})
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        name: "Smith"
                    })
                )
            })
        })
    })
    describe('POST /attachimg', () => {
        it('should return a status of 201 if the name is created', () => {
            return request(server).post('/api/activites').send({name: 'Smith'})
            .then(res => {
                expect(res.status).toBe(201)
            })
        })
        it('should return the newly created name for the activity', () => {
            return request(server).post('/api/activites').send({name: 'Smith'})
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        name: "Smith"
                    })
                )
            })
        })
    })
        describe('PUT /:id/addimg', () => {
        it("should return a 200 status", () => {
            return request(server).put('/api/users/1/profilepic')
            .attach('photo', testImage)
            .then(res => {
                expect(res.status).toBe(201)
            })
        })
        it("should the user info back with the image URL", () => {
            return request(server).put('/api/users/1/profilepic')
            .attach('photo', testImage)
            .then(res => {
                expect(res.body).toBeTruthy()
            })
        })
    })
    describe('PUT /:id', () => {
        it("should return a 200 status", () => {
            return request(server).put('/api/activites/1')
            .send( { 
                name: 'dylan'
            })
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it("should return the activity with updated changes", () => {
            return request(server).get('/api/activites/1')
            .then(res => {
                expect(res.body).toBeTruthy()
            })
        })
    })
    describe('DELETE /:id', () => {
        it("should return a 200 status", () => {
            return request(server).delete('/api/activites/1')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it("should return a truthy message saying activity was deleted", () => {
            return request(server).delete('/api/activites/1')
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
    describe('getAllActivities()', () => {
        it('should return all activities in the database', () => {
            return ActDB.getAllActivities()
            .then(res => {
                expect(res).toHaveLength(6)
            })
        })
    })
    describe('getActivityById()', () => {
        it('should return an activity with a matching ID', () => {
            return ActDB.getActivityById(1)
            .then(res => {
                expect(res).toEqual(
                    expect.objectContaining({
                        id: 1
                    })
                )
            })
        })
    })
    describe('addActivity()', () => {
        it('should add the activity to the database', async () => {
            await ActDB.addActivity({name: 'New Activity'})
            const activities = await db('activities')
            expect(activities).toHaveLength(7)
        })
    })
    describe('editActivity()', () => {
        it('should change the selected Activity', async () => {
            await ActDB.editActivity(1, {name: 'AnEditedActivity'})
            const Activity = await ActDB.getActivityById(1)
            expect(Activity).toEqual(
                expect.objectContaining({
                    id: 1,
                    name: 'AnEditedActivity'
                })
            )
        })
    })
    describe('deleteActivity()', () => {
        it('should remove the selected activity', async () => {
            await ActDB.deleteActivity(1)
            const activity = await ActDB.getActivityById(1)
            expect(activity).toBeFalsy()
        })
    })
})