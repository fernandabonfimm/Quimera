const express = require("express");
const jwt = require("jsonwebtoken");
const ExperimentController = require("../../controllers/experiment/experiment.controller.js");
const logger = require("@/logger/logger");

const routes = express.Router();

routes.post("/experiments/:teacherId", ExperimentController.create);

routes.delete("/experiments/:id", ExperimentController.delete);

routes.get("/experiments/pin/:pin", ExperimentController.findByPin);

routes.get("/experiments/getAnswer/:idStudent", ExperimentController.getGraphic);
routes.get("/experiments/getInicialAnswer/:idStudent", ExperimentController.getInicialGrahic);

routes.get("/experiments/getOptions", ExperimentController.getOptions);

routes.get("/experiments/getPhaseOne", ExperimentController.getPhaseOne);

routes.get(
  "/experiments/count/:teacherId",
  ExperimentController.getExperimentAndStudentCounts
);

routes.get(
  "/experiments/:teacherId",
  ExperimentController.getExperimentsByTeacherId
);

routes.get(
  "/experiments/:teacherId/:experimentId",
  ExperimentController.getExperimentByTeacherAndExperimentId
);

module.exports = routes;
