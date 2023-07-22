import { api } from "../../api";

function postExperiment(_idTeacher, title, description) {
  const body = { title, description };
  return api.post(`experiments/${_idTeacher}`, body);
}

async function findExperimentById(idTeacher, id) {
  return await api.get(`experiments/${idTeacher}/${id}`);
}

async function findExperiments(_idTeacher) {
  return await api.get(`experiments/${_idTeacher}`);
}

async function deleteExperiment(id) {
  return await api.delete(`experiments/${id}`);
}

async function getOptions() {
  return await api.get(`/experiments/getOptions`);
}

async function getPhaseOne() {
  return await api.get(`/experiments/getPhaseOne`);
}

async function getGraphic(id) {
  return await api.get(`/experiments/graphic/${id}`);
}

async function getDataByPin(pin) {
  return await api.get(`/experiments/pin/${pin}`);
}

async function getCorrectGraphic(id) {
  return await api.get(`/experiments/correctGraphic/${id}`);
}

export {
  getDataByPin,
  getCorrectGraphic,
  postExperiment,
  findExperimentById,
  findExperiments,
  deleteExperiment,
  getOptions,
  getPhaseOne,
  getGraphic,
};
