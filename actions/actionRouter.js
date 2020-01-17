const express = require('express');
const model = require('../data/helpers/actionModel');
const projectModel = require('../data/helpers/projectModel');

const router = express.Router();

// create action
router.post('/', validateAction, validateProjectId, (request, response) => {
    model.insert(request.body)
        .then(res => response.status(200).json(res))
        .catch(err => response.status().json({message: 'error creating action'}))
});

// fetch all actions
router.get('/', (request, response) => {
    model.get()
        .then(res => response.status(200).json(res))
        .catch(err => response.status(500).json({message: 'error fetching actions'}));
});

// update action
router.put('/:id', validateActionId, (request, response) => {
    model.update(request.params.id, request.body)
        .then(res => response.status(200).json(res))
        .catch(err => response.status(500).json({message: 'error updating action'}));
});

// delete action
router.delete('/:id', validateActionId, (request, response) => {
    model.remove(request.params.id)
        .then(res => response.status(200).json(res))
        .catch(err => response.status(500).json({message: 'error deleting action'}));
});

// custom middleware
function validateAction(request, response, next) {
    if (!request.body.project_id || !request.body.description || !request.body.notes || !request.body.completed) {
        response.status(404).json({message: 'one or more values are missing from body'});
    } else if (typeof request.body.project_id !== 'number' || typeof request.body.description !== 'string' || typeof request.body.notes !== 'string' || typeof request.body.completed !== 'boolean') {
        response.status(500).json({message: 'one or more values are the incorrect data type'});
    } else {
        next();
    };
};

function validateProjectId(request, response, next) {
    projectModel.get(request.body.project_id)
        .then(res => res === null ? response.status(404).json({message: 'project with specified id not found'}) : next())
        .catch(err => response.status(500).json({message: 'error fetching project'}))
};

function validateActionId(request, response, next) {
    model.get(request.params.id)
        .then(res => res === null ? response.status(404).json({message: 'project with specified id not found'}) : next())
        .catch(err => response.status(500).json({message: 'error fetching project'}))
};

module.exports = router;