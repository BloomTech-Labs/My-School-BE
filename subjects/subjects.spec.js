const request = require('supertest');
const db = require('../data/dbconfig.js');
const server = require('../api/server.js');
const knex = require('../data/dbconfig.js');
const subjectsDB = require('./subjects-model.js')

describe('subjects endpoint', () => {
    beforeAll(() => {
        return knex.seed.run()
    })
    describe('GET /', () => {
        it("should return 200 as a status", () => {
            return request(server).get('/api/subjects')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it("should return a list of subjects", () => {
            return request(server).get('/api/subjects')
            .then(res => {
                expect(res.body).toBeTruthy()
            })
        })
    })
    describe('GET /:id', () => {
        it("should return 200 as a status code if the subject exists", () => {
            return request(server).get('/api/subjects/1')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it("should return a subject object if the subject exists", () => {
            return request(server).get('/api/subjects/1')
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String)
                    })
                )
            })
        })
        it("should return 404 if the subject does not exist", () => {
            return request(server).get('/api/subjects/a')
            .then(res => {
                expect(res.status).toBe(404)
            })
        })
        it("should return an error message if the subject does not exist", () => {
            return request(server).get('/api/subjects/a')
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
            return request(server).post("/api/subjects").send({notAName: 'MyLastName'})
            .then(res => {
                expect(res.status).toBe(400)
            })
        })
        it('should return an error message if there is no name in the body', () => {
            return request(server).post('/api/subjects').send({notAName: 'MyLastName'})
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        errorMessage: expect.any(String)
                    })
                )
            })
        })
        it('should return a status of 201 if the name is created', () => {
            return request(server).post('/api/subjects').send({name: 'Smith'})
            .then(res => {
                expect(res.status).toBe(201)
            })
        })
        it('should return the newly created name and its respective ID', () => {
            return request(server).post('/api/subjects').send({name: 'Smith'})
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
            return request(server).put('/api/subjects/1').send({})
            .then(res => {
                expect(res.status).toBe(400)
            })
        })
        it('should return an error message if there are no included changes', () => {
            return request(server).put('/api/subjects/1').send({})
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        errorMessage: expect.any(String)
                    })
                )
            })
        })
        it('should return a status of 404 if there is no subject with that ID', () => {
            return request(server).put('/api/subjects/a').send({name: "My new name"})
            .then(res => {
                expect(res.status).toBe(404)
            })
        })
        it('should return an error message if there is no subject with that ID', () => {
            return request(server).put('/api/subjects/a').send({name: "My new name"})
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        errorMessage: expect.any(String)
                    })
                )
            })
        })
        it('should return a status of 200 if the changes are successful', () => {
            return request(server).put('/api/subjects/1').send({name: 'MyNewSubject'})
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it('should return an object containing the changes if successful', () => {
            return request(server).put('/api/subjects/1').send({name: 'MyNewerSubject'})
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: "MyNewerSubject"
                    })
                )
            })
        })
    })
    describe("DELETE /:id", () => {
        it('should return a status of 404 if no subject exists with that ID', () => {
            return request(server).delete('/api/subjects/100')
            .then(res => {
                expect(res.status).toBe(404)
            })
        })
        it('should return an error message if no subject exists with that ID', () => {
            return request(server).delete('/api/subjects/100')
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining({
                        errorMessage: expect.any(String)
                    })
                )
            })
        })
        it('should return a status of 200 if the subject was deleted successfully', () => {
            return request(server).delete('/api/subjects/1')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
        it('should return a success message if the deletion was succesful', () => {
            return request(server).delete('/api/subjects/2')
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

describe('subjects model', () => {
    beforeAll(() => {
        return knex.seed.run()
    })
    describe('getAllsubjects()', () => {
        it('should return all subjects in the database', () => {
            return subjectsDB.getAllSubjects()
            .then(res => {
                expect(res).toHaveLength(9)
            })
        })
    })
    describe('getSubjectById()', () => {
        it('should return a subject with a matching ID', () => {
            return subjectsDB.getSubjectById(1)
            .then(res => {
                expect(res).toEqual(
                    expect.objectContaining({
                        id: 1
                    })
                )
            })
        })
    })
    describe('addSubject()', () => {
        it('should add the subject to the database', async () => {
            await subjectsDB.addSubject({name: 'ANewSubject'})
            const subjects = await db('subjects')
            expect(subjects).toHaveLength(10)
        })
    })
    describe('editSubject()', () => {
        it('should change the selected subject', async () => {
            await subjectsDB.editSubject(4, {name: 'AnEditedSubject'})
            const subject = await subjectsDB.getSubjectById(4)
            expect(subject).toEqual(
                expect.objectContaining({
                    id: 4,
                    name: 'AnEditedSubject'
                })
            )
        })
    })
    describe('deleteSubject()', () => {
        it('should remove the selected subject', async () => {
            await subjectsDB.deleteSubject(4)
            const subject = await subjectsDB.getSubjectById(4)
            expect(subject).toBeFalsy()
        })
    })
})
