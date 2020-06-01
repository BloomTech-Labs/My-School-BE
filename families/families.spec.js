const request = require('supertest');
const db = require('../data/dbconfig.js');
const server = require('../api/server.js');
const knex = require('../data/dbconfig.js');
const familiesDB = require('./families-model.js')

describe('families endpoint', () => {
    beforeAll(() => {
        return knex.seed.run()
    })
    describe('GET /', () => {
        it("should return 200 as a status", () => {
            return request(server).get('/api/families')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it("should return a list of families", () => {
            return request(server).get('/api/families')
            .then(res => {
                expect(res.body).toBeTruthy()
            })
        })
    })
    describe('GET /:id', () => {
        it("should return 200 as a status code if the family exists", () => {
            return request(server).get('/api/families/1')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it("should return a family object if the family exists", () => {
            return request(server).get('/api/families/1')
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        family: expect.any(Object),
                        people: expect.any(Array)
                    })
                )
            })
        })
        it("should return 404 if the family does not exist", () => {
            return request(server).get('/api/families/a')
            .then(res => {
                expect(res.status).toBe(404)
            })
        })
        it("should return an error message if the family does not exist", () => {
            return request(server).get('/api/families/a')
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        errorMessage: expect.any(String)
                    })
                )
            })
        })
    })
    describe('POST /', () => {
        it('should return a status of 400 if there is no name in the body', () => {
            return request(server).post("/api/families").send({notAName: 'MyLastName'})
            .then(res => {
                expect(res.status).toBe(400)
            })
        })
        it('should return an error message if there is no name in the body', () => {
            return request(server).post('/api/families').send({notAName: 'MyLastName'})
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        errorMessage: expect.any(String)
                    })
                )
            })
        })
        it('should return a status of 201 if the name is created', () => {
            return request(server).post('/api/families').send({name: 'Smith'})
            .then(res => {
                expect(res.status).toBe(201)
            })
        })
        it('should return the newly created name and its respective ID', () => {
            return request(server).post('/api/families').send({name: 'Smith'})
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: "Smith"
                    })
                )
            })
        })
    })
    describe("PUT /:id", () => {
        it('should return a status of 400 if there are no included changes', () => {
            return request(server).put('/api/families/1').send({})
            .then(res => {
                expect(res.status).toBe(400)
            })
        })
        it('should return an error message if there are no included changes', () => {
            return request(server).put('/api/families/1').send({})
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        errorMessage: expect.any(String)
                    })
                )
            })
        })
        it('should return a status of 404 if there is no family with that ID', () => {
            return request(server).put('/api/families/a').send({name: "My new name"})
            .then(res => {
                expect(res.status).toBe(404)
            })
        })
        it('should return an error message if there is no family with that ID', () => {
            return request(server).put('/api/families/a').send({name: "My new name"})
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        errorMessage: expect.any(String)
                    })
                )
            })
        })
        it('should return a status of 200 if the changes are successful', () => {
            return request(server).put('/api/families/1').send({name: 'MyNewName'})
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it('should return an object containing the changes if successful', () => {
            return request(server).put('/api/families/1').send({name: 'MyNewerName'})
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: "MyNewerName"
                    })
                )
            })
        })
    })
    describe("DELETE /:id", () => {
        it('should return a status of 404 if no family exists with that ID', () => {
            return request(server).delete('/api/families/10')
            .then(res => {
                expect(res.status).toBe(404)
            })
        })
        it('should return an error message if no family exists with that ID', () => {
            return request(server).delete('/api/families/10')
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        errorMessage: expect.any(String)
                    })
                )
            })
        })
        it('should return a status of 200 if the family was deleted successfully', () => {
            return request(server).delete('/api/families/1')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it('should return a success message if the deletion was succesful', () => {
            return request(server).delete('/api/families/2')
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        message: expect.any(String)
                    })
                )
            })
        })
    })
})

describe('families model', () => {
    beforeAll(() => {
        return knex.seed.run()
    })
    describe('getAllFamilies()', () => {
        it('should return all families in the database', () => {
            return familiesDB.getAllFamilies()
            .then(res => {
                expect(res).toHaveLength(3)
            })
        })
    })
    describe('getFamilyById()', () => {
        it('should return a family with a matching ID', () => {
            return familiesDB.getFamilyById(1)
            .then(res => {
                expect(res).toEqual(
                    expect.objectContaining({
                        id: 1
                    })
                )
            })
        })
    })
    describe('addFamily()', () => {
        it('should add the family to the database', async () => {
            await familiesDB.addFamily({name: 'ANewFamily'})
            const families = await db('families')
            expect(families).toHaveLength(4)
        })
    })
    describe('editFamily()', () => {
        it('should change the selected family', async () => {
            await familiesDB.editFamily(4, {name: 'AnEditedFamily'})
            const family = await familiesDB.getFamilyById(4)
            expect(family).toEqual(
                expect.objectContaining({
                    id: 4,
                    name: 'AnEditedFamily'
                })
            )
        })
    })
    describe('deleteFamily()', () => {
        it('should remove the selected family', async () => {
            await familiesDB.deleteFamily(4)
            const family = await familiesDB.getFamilyById(4)
            expect(family).toBeFalsy()
        })
    })
})
