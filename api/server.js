const express = require('express');
const cors = require('cors');
const projectsRouter = require('../projects/projectsRouter');

const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/projects', projectsRouter);

server.get('/', (request, response) => {
    response.send({message: 'server is working'})
});

module.exports = server;