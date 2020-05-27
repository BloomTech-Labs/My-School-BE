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

server.use(expressFileUpload({
  useTempFiles: true
}));
server.use(cors());
server.use(helmet());
server.use(express.json());
server.use('/api/activities', activitylogRouter);
server.use('/api/families', familiesRouter);
server.use('/api/subjects', subjectsRouter);
server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter)

module.exports = server;

