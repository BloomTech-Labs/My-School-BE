# API Documentation

![Maintainability](https://api.codeclimate.com/v1/badges/b1dbebbcb22c94494974/maintainability)
![Test Coverage](https://api.codeclimate.com/v1/badges/b1dbebbcb22c94494974/test_coverage)


#### Backend delpoyed at [Heroku](https://my-school-v1.herokuapp.com/) <br>

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **npm run test** to start server using testing environment

### Framework : Express

-    Allows for rapid implementation
-    Excellent documentation and other sources available
-    Stable, has been around for a while

## Endpoints


#### Monitoring

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/`                     | All            | Returns a message indicating server is up    |

#### Activities Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/activities/`          | All            | Returns all activities in the database.      |
| GET    | `/activities/:id`       | All            | Returns the specified activity.              |
| POST   | `/activities/`          | All            | Adds a new activity.                         |
| POST   | `/activities/attachimg` | All            | Adds a new activity with photo.              |
| PUT    | `/activities/:id`       | All            | Edits an existing activity.                  |
| PUT    | `/activities/:id/addimg`| All            | Adds a photo to an existing activity.        |
| DELETE | `/activities/:id`       | All            | Deletes the specified activity.              |


#### Subjects Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/subjects/`            | All            | Returns all subjects in the database.        |
| GET    | `/subjects/:id`         | All            | Returns the specified subject.               |
| POST   | `/subjects/`            | All            | Add a new subject.                           |
| PUT    | `/subjects/:id`         | All            | Edit an existing subject.                    |
| DELETE | `/subjects/:id`         | All            | Delete a subject.                            |

#### Families Routes

| Method | Endpoint                | Access Control | Description                                  |
| ------ | ----------------------- | -------------- | -------------------------------------------- |
| GET    | `/families/`            | All            | Returns all families in the database.        |
| GET    | `/families/:id`         | All            | Returns the specified family.                |
| POST   | `/families/`            | All            | Add a new family.                            |
| PUT    | `/families/:id`         | All            | Edit an existing family.                     |
| DELETE | `/families/:id`         | All            | Delete a family.                             |

#### Users Routes

| Method | Endpoint                | Access Control | Description                                    |
| ------ | ----------------------- | -------------- | ---------------------------------------------- |
| GET    | `/users/`               | All            | Returns all users in the database              |
| GET    | `/users/:id`            | All            | Returns the specified user.                    |
| GET    | `/users/:id/subjects`   | All            | Returns all subjects for the specified user.   |
| GET    | `/users/:id/activities` | All            | Returns the activities for the specified user. |
| POST   | `/users/`               | All            | Add a new user.                                |
| PUT    | `/users/:id`            | All            | Edit an existing user.                         |
| PUT    | `/users/:id/profilepic` | All            | Edit an existing user/adding a profile picture |
| DELETE | `/users/:id`            | All            | Delete a user.                                 |

#### Authentication Routes

| Method | Endpoint           | Access Control | Description                                         |
| ------ | ------------------ | -------------- | --------------------------------------------------- |
| POST   | `/registration/`   | All            | Add a new user. Returns the user object and a JWT   |
| POST   | `/login`           | All            | Returns the user object and a JWT                   |

# Data Model

![DataModel](https://i.imgur.com/0pD2oZF.png)

Visual data model available [here](https://app.dbdesigner.net/designer/schema/328542)

#### USERS

---

```
{
  id: INTEGER
  name: STRING
  username: STRING
  password: STRING
  email: STRING
  profile_picture: STRING
  family_id: INTEGER foreign key in FAMILIES table
  user_type_id: INTEGER foreign key in USER_TYPES table
}
```

#### FAMILIES

---

```
{
  id: INTEGER
  name: STRING
}
```

#### USER TYPES

---

```
{
  id: INTEGER
  name: STRING
}
```

#### SUBJECTS

---

```
{
  id: INTEGER
  name: STRING
}
```

#### ACTIVITY TYPES

---

```
{
  id: INTEGER
  name: STRING
}
```


#### ACTIVITIES

---

```
{
  id: INTEGER
  name: STRING
  description: STRING
  photo: STRING
  created_at: TIMESTAMP
  duration: DECIMAL
  completion_date: TIMESTAMP
  student_id: INTEGER foreign key in USERS table
  subject_id: INTEGER foreign key in SUBJECTS table
  activity_type_id: INTEGER foreign key in ACTIVITY_TYPES table
}
```

## Actions

`getAllSubjects()` -> Returns all subjects

`getSubjectById(id)` -> Returns a single subject by ID

`addSubject(subject)` -> Returns the created subject

`editSubject(id, changes)` -> Update an subject by ID

`deleteSubject(id)` -> Delete an subject by ID
<br>
<br>
<br>
`getAllFamilies()` -> Returns all families

`getFamilyById(id)` -> Returns a single family by ID

`addFamily(family)` -> Returns the created family

`editFamily(id, changes)` -> Update a family by ID

`deleteFamily(id)` -> Delete an family by ID
<br>
<br>
<br>
`getAllUsers()` -> Returns all users

`getUserById(id)` -> Returns a single user by ID

`addUser(user)` -> Returns the created user

`editUser(id, changes)` -> Update a user by ID

`deleteUser(id)` -> Delete an user by ID

`getAllSubjectsForUser(id)` -> Returns all activities matching the subject ID

`getAllActivitiesForUser(id)` -> Returns all activities matching the student ID
<br>
<br>
<br>
`getAllActivities()` -> Returns all activities

`getActivityById(id)` -> Returns a single activity by ID

`addActivity(activity)` -> Returns the created activity

`editActivity(id, changes)` -> Update a activity by ID

`deleteActivity(id)` -> Delete an activity by ID

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

    *  PORT - set to any valid local port number for running server locally
    *  DB_ENV - set to "development" until ready for "production"
    *  JWT_SECRET - you can generate this by using a python shell and running import random''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#\$%^&amp;*(-*=+)') for i in range(50)])
    *  CLOUDINARY_NAME - this is your Cloudinary username
    *  CLOUDINARY_API_KEY - this is generated in your Cloudinary account
    *  CLOUDINARY_API_SECRET - this is generated in your Cloudinary account
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/My-School-FE/blob/master/README.md) for details on the fronend of our project.
