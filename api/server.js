const express = require('express');
const cors = require('cors');
const projectRouter = require('../projects/projectRouter');
const actionRouter = require('../actions/actionRouter');

const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (request, response) => {
    response.send({message: 'server is working'})
});

module.exports = server;