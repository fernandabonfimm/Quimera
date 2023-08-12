import { createContext } from "react";

const UserTeacher = function () {
  this.name = "";
  this.email = "";
  this.token = "";
  this._id = "";
};

UserTeacher.prototype.setName = function (name) {
  this.name = name;
};

UserTeacher.prototype.setEmail = function (email) {
  this.email = email;
};

UserTeacher.prototype.setToken = function (token) {
  this.token = token;
};

UserTeacher.prototype.set_id = function (_id) {
  this._id = _id;
};

UserTeacher.prototype.getName = function () {
  return this.name;
};

UserTeacher.prototype.getEmail = function () {
  return this.email;
};

UserTeacher.prototype.getToken = function () {
  return this.token;
};

UserTeacher.prototype.get_id = function () {
  return this._id;
};

UserTeacher.prototype.saveSession = function () {
  localStorage.setItem("name", this.name);
  localStorage.setItem("email", this.email);
  localStorage.setItem("token", this.token);
  localStorage.setItem("_idTeacher", this._id);
};

UserTeacher.prototype.logOut = function () {
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  localStorage.removeItem("token");
  localStorage.removeItem("_idTeacher");
};

setTimeout(() => {
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  localStorage.removeItem("token");
  localStorage.removeItem("_idTeacher");
}, 24 * 60 * 60 * 1000);

const userTeacher = new UserTeacher();

userTeacher.setName(localStorage.getItem("name"));
userTeacher.setEmail(localStorage.getItem("email"));
userTeacher.setToken(localStorage.getItem("token"));
userTeacher.set_id(localStorage.getItem("_idTeacher"));

let TeacherContext = createContext(userTeacher);

export default TeacherContext;
