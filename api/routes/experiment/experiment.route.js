const express = require('express');
const jwt = require('jsonwebtoken');
const ExperimentController = require('@/controllers/experiment/experiment.controller');
const logger = require('@/logger/logger');

const routes = express.Router();

routes.post('/experiments/:teacherId', ExperimentController.create);

routes.get('/experiments/:teacherId', ExperimentController.getExperimentsByTeacherId);

routes.get('/experiments/:teacherId/:experimentId', ExperimentController.getExperimentByTeacherAndExperimentId);

routes.delete('/experiments/:id', ExperimentController.delete);

routes.get('/experiments/pin/:pin', ExperimentController.findByPin);

routes.get('/experiments/getAnswer', ExperimentController.getGrahpic);

routes.get('/experiments/getOptions', ExperimentController.getOptions);

routes.get('/experiments/getPhaseOne', ExperimentController.getPhaseOne);

routes.get('/experiments/correctGraphic/:id', ExperimentController.getCorrectGraphic);


module.exports = routes;