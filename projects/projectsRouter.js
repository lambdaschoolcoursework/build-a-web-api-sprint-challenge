const express = require('express');
const model = require('../data/helpers/projectModel');

const router = express.Router();

// create a project
router.post('/', validateProject, (request, response) => {
    model.insert(request.body)
        .then(res => response.status(200).json(res))
        .catch(err => response.status(500).json({message: 'error creating project'}))
});

// get all projects
router.get('/', (request, response) => {
    model.get()
        .then(res => response.status(200).json(res))
        .catch(err => response.status(500).json({message: 'error fetching projects'}))
});

// get project's actions
router.get('/:id/actions', validateProjectId, (request, response) => {
    model.getProjectActions(request.params.id)
        .then(res => response.status(200).json(res))
        .catch(err => response.status(500).json({message: "error fetching project's actions"}))
});

// edit project
router.put('/:id', validateProjectId, (request, response) => {
    model.update(request.params.id, request.body)
        .then(res => response.status(200).json(res))
        .catch(err => response.status(500).json({message: 'error updating project'}));
});

// delete project
router.delete('/:id', (request, response) => {
    model.remove(request.params.id)
        .then(res => response.status(500).json(res))
        .catch(err => response.status(200).json({message: 'error deleting project'}));
});

// custom middleware
function validateProject(request, response, next) {
    if (!request.body.name || !request.body.description || !request.body.completed) {
        response.status(404).json({message: 'one or more values are missing from body'});
    } else if (typeof request.body.name !== 'string' || typeof request.body.description !== 'string' || typeof request.body.completed !== 'boolean') {
        response.status(500).json({message: 'one or more values are the incorrect data type'});
    } else {
        next();
    };
};

function validateProjectId(request, response, next) {
    model.get(request.params.id)
        .then(res => res === null ? response.status(404).json({message: 'project with specified id not found'}) : next())
        .catch(err => response.status(500).json({message: 'error fetching project'}))
};

module.exports = router;