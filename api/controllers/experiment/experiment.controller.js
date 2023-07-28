const Experiment = require("./../../models/experiment/experiment.model");
const crypto = require("crypto");
const Student = require("@/controllers/auth/studentAuth.controller.js");
const options = require("./options");
const StudentModel = require("../../models/userSchema/student.model.js");

module.exports = {
  async create(req, res) {
    try {
      const randomBytes = crypto.randomBytes(2);
      const randomNum = parseInt(randomBytes.toString("hex"), 16);

      const { title, description } = req.body;

      const teacherId = req.params.teacherId;

      const experiment = await Experiment.create({
        pin: ("0000" + randomNum).slice(-4),
        title,
        description,
        teacher: teacherId,
      });

      return res.status(201).json({ experiment });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error creating experiment" });
    }
  },

  async getExperimentsByTeacherId(req, res) {
    try {
      const teacherId = req.params.teacherId;

      const experiments = await Experiment.find({ teacher: teacherId });

      return res.status(200).json({ experiments });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error fetching experiments" });
    }
  },

  async getExperimentByTeacherAndExperimentId(req, res) {
    try {
      const teacherId = req.params.teacherId;
      const experimentId = req.params.experimentId;

      const experiment = await Experiment.findOne({
        _id: experimentId,
        teacher: teacherId,
      });

      if (!experiment) {
        return res.status(404).json({ error: "Experiment not found" });
      }

      return res.status(200).json({ experiment });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error fetching experiment" });
    }
  },

  async findByPin(req, res) {
    try {
      const { pin } = req.params;

      const experiment = await Experiment.findByPin(pin);

      if (!experiment) {
        return res.status(404).json({ error: "Experiment not found" });
      }

      return res.json({ experiment });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error finding experiment" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      await Experiment.findByIdAndDelete(id);

      return res.status(204).send();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error deleting experiment" });
    }
  },

  async getPhaseOne(req, res) {
    const data = require("./result_tables/0_420");
    res.json({ data });
  },

  async getOptions(req, res) {
    try {
      const options = require("./options");

      const [optionsOne, optionsTwo] = options;

      res.json({ optionsOne, optionsTwo });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Error fetching options" });
    }
  },

  async getGraphic(req, resp) {
    const studentId = req.params.idStudent;

    const student = await Student.findById(studentId);

    if (!student) {
      return resp.status(404).json({ message: "Student not found." });
    }

    const tempo = require("./result_tables/time").default;
    const valor_corrigido = require("./result_tables/correctJsonValue");
    const valor_corrigido_80 = require("./result_tables/80correctJson");
    const valor_corrigido_20 = require("./result_tables/20correctJson");
    const valor_semCorrecao = require("./result_tables/noCorrectJson");

    let answerData;

    if (student.answerOne === "Hipotálamo" && student.answerTwo === "ADH") {
      answerData = valor_corrigido;
    } else if (student.answerOne === "Hipotálamo") {
      answerData = valor_corrigido_80;
    } else if (student.answerTwo === "ADH") {
      answerData = valor_corrigido_20;
    } else {
      answerData = valor_semCorrecao;
    }

    const data = {
      time: tempo,
      studentValue: answerData,
      expectedValue: valor_corrigido,
    };

    return resp.json({ data });
  },

  async getStudentCreatedGraphic(req, res) {
    const studentId = req.params.idStudent;

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    } else if (!student.answerOne || !student.answerTwo) {
      return res.status(404).json({ message: "Student not found answer." });
    }

    studentAnswersOne = student.answerOne;
    studentAnswersTwo = student.answerTwo;

    const tempo = require("./result_tables/time").default;
    const valor_corrigido = require("./result_tables/correctJsonValue");
    const valor_corrigido_80 = require("./result_tables/80correctJson");
    const valor_corrigido_20 = require("./result_tables/20correctJson");
    const valor_semCorrecao = require("./result_tables/noCorrectJson");

    let answerData;

    if (studentAnswersOne === "Hipotálamo" && studentAnswersTwo === "ADH") {
      answerData = valor_corrigido;
    } else if (studentAnswersOne === "Hipotálamo") {
      answerData = valor_corrigido_80;
    } else if (studentAnswersTwo === "ADH") {
      answerData = valor_corrigido_20;
    } else {
      answerData = valor_semCorrecao;
    }

    const data = {
      time: tempo,
      studentValue: answerData,
      expectedValue: valor_corrigido,
    };

    return res.json({ data });
  },

  async getGraphicByStudentId(req, resp) {
    try {
      const studentId = req.params.id;
      const data = await getGraphic(studentId);
      return resp.json({ data });
    } catch (err) {
      console.log(err);
      return resp.status(400).json({ error: "Error fetching data" });
    }
  },

  async getInicialGrahic(req, resp) {
    const tempo = require("./result_tables/time").default;
    const valor_inicial = require("./result_tables/initialJson");

    const data = {
      time: tempo,
      studentValue: valor_inicial,
      expectedValue: valor_inicial,
    };

    return resp.json({ data });
  },

};