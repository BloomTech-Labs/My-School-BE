//Package imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//Route and middleware(s) imports
const authenticator = require('../auth/authenticator.js');

const server = express();

server.use(cors())
server.use(helmet())
server.use(express.json());

//Protected routes:


//Login and registration routes


//Sanity Check
server.get('/', (req, res) => {
    res.status(200).json({api: `Running properly`})
})

module.exports = server;

