require("dotenv").config();
const request = require("supertest");
const db = require("../data/dbconfig.js");
const server = require("../api/server.js");
const knex = require("../data/dbconfig.js");
const ActDB = require("./activities-model.js");
const testImage = `${__dirname}/../utils/test-helpers/testPost.png`;

describe("activities endpoints", () => {
  beforeAll(() => {
    return knex.seed.run();
  });
  describe("GET /", () => {
    it("should return a 200 status", () => {
      return request(server)
        .get("/api/activities")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should return a list of activities", () => {
      return request(server)
        .get("/api/activities")
        .then((res) => {
          expect(res.body).toBeTruthy();
        });
    });
  });
  describe("GET /:id", () => {
    it("should return a 200 status", () => {
      return request(server)
        .get("/api/activities/1")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should return a single activity based on the id passed in parameter", () => {
      return request(server)
        .get("/api/activities/1")
        .then((res) => {
          expect(res.body).toBeTruthy();
        });
    });
  });
  describe("POST /", () => {
    it("should return a status of 201 if the name is created", () => {
      return request(server)
        .post("/api/activities")
        .send({ name: "Smith", student_id: 3 })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
    it("should return the newly created name for the activity", () => {
      return request(server)
        .post("/api/activities")
        .send({
          activity_type_id: 1,
          description:
            "Here's a bit of a description about this exciting and educational activity.",
          name: "AnEditedActivity",
          student_id: 3,
          subject_id: 1,
        })
        .then((res) => {
          expect(res.body[0]).toEqual(
            expect.objectContaining({
              activityType: "Independent Study",
              activity_type_id: 1,
              completion_date: expect.any(String),
              created_at: expect.any(String),
              description:
                "Here's a bit of a description about this exciting and educational activity.",
              duration: null,
              id: expect.any(Number),
              name: "AnEditedActivity",
              photo: null,
              student_id: 3,
              studentsName: "Jim",
              subject: "English",
              subject_id: 1,
            })
          );
        });
    });
  });
  describe("POST /attachimg", () => {
    it("should return a status of 201 if the name is created", () => {
      return request(server)
        .post("/api/activities")
        .send({ name: "Smith", student_id: 3 })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
    it("should return the newly created name for the activity", () => {
      return request(server)
        .post("/api/activities")
        .send({
          activity_type_id: 1,
          description:
            "Here's a bit of a description about this exciting and educational activity.",
          name: "AnEditedActivity",
          student_id: 3,
          subject_id: 1,
        })
        .then((res) => {
          expect(res.body[0]).toEqual(
            expect.objectContaining({
              activityType: "Independent Study",
              activity_type_id: 1,
              completion_date: expect.any(String),
              created_at: expect.any(String),
              description:
                "Here's a bit of a description about this exciting and educational activity.",
              duration: null,
              id: expect.any(Number),
              name: "AnEditedActivity",
              photo: null,
              student_id: 3,
              studentsName: "Jim",
              subject: "English",
              subject_id: 1,
            })
          );
        });
    });
  });
  describe("PUT /:id/addimg", () => {
    it("should return a 200 status", () => {
      return request(server)
        .put("/api/activities/1/addimg")
        .attach("photo", testImage)
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
    it("should the user info back with the image URL", () => {
      return request(server)
        .put("/api/activities/1/addimg")
        .send({ file: testImage })
        .then((res) => {
          expect(res.body).toBeTruthy();
        });
    });
  });
  describe("PUT /:id", () => {
    it("should return a 200 status", () => {
      return request(server)
        .put("/api/activities/1")
        .send({
          name: "dylan",
        })
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should return the activity with updated changes", () => {
      return request(server)
        .get("/api/activities/1")
        .then((res) => {
          expect(res.body).toBeTruthy();
        });
    });
  });
  describe("DELETE /:id", () => {
    it("should return a 200 status", () => {
      return request(server)
        .delete("/api/activities/1")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("should return a truthy message saying activity was deleted", () => {
      return request(server)
        .delete("/api/activities/1")
        .then((res) => {
          expect(res.body).toBeTruthy();
        });
    });
  });
});

describe("activities model", () => {
  beforeAll(() => {
    return knex.seed.run();
  });
  describe("getAllActivities()", () => {
    it("should return all activities in the database", () => {
      return ActDB.getAllActivities().then((res) => {
        expect(res).toHaveLength(6);
      });
    });
  });
  describe("getActivityById()", () => {
    it("should return an activity with a matching ID", () => {
      return ActDB.getActivityById(1).then((res) => {
        expect(res[0]).toEqual(
          expect.objectContaining({
            id: 1,
          })
        );
      });
    });
  });
  describe("addActivity()", () => {
    it("should add the activity to the database", async () => {
      await ActDB.addActivity({ name: "New Activity" });
      const activities = await db("activities");
      expect(activities).toHaveLength(7);
    });
  });
  describe("editActivity()", () => {
    it("should change the selected Activity", async () => {
      await ActDB.editActivity(1, { name: "AnEditedActivity" });
      const Activity = await ActDB.getActivityById(1);
      expect(Activity[0]).toEqual(
        expect.objectContaining({
          activityType: "Independent Study",
          activity_type_id: 1,
          completion_date: expect.any(String),
          created_at: expect.any(String),
          description:
            "Here's a bit of a description about this exciting and educational activity.",
          duration: 1.1,
          id: 1,
          name: "AnEditedActivity",
          photo: null,
          student_id: 3,
          studentsName: "Jim",
          subject: "English",
          subject_id: 1,
        })
      );
    });
  });
  describe("deleteActivity()", () => {
    it("should remove the selected activity", async () => {
      await ActDB.deleteActivity(1);
      const activity = await ActDB.getActivityById(1);
      expect(activity).toHaveLength(0);
    });
  });
});
