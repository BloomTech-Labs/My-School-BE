const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();
const activitylogRouter = require('../activitylog/activities-router.js');
const familiesRouter = require('../families/families-router.js');
const subjectsRouter = require('../subjects/subjects-router.js');
const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js')
const expressFileUpload = require('express-fileupload');
const authenticator = require('../auth/authenticator.js')

server.use(expressFileUpload({
  useTempFiles: true
}));


server.use(cors());
server.use(helmet());
server.use(express.json());
server.use('/api/activities', authenticator, activitylogRouter);
server.use('/api/families', authenticator, familiesRouter);
server.use('/api/subjects', subjectsRouter);
server.use('/api/users',  authenticator, usersRouter);
server.use('/api/auth', authRouter)

server.get("/", (req, res) => {
  res.status(200).json({api: "api server is up and running"})
})

module.exports = server;

