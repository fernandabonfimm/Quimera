import "./style.css";
import React from "react";
import LogoHA from "../../../logoHA.png";
import { Card, Input, Button } from "antd";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { registerStudent } from "../../../../src/services/routes/api/AuthStudent";

export default function LoginPin() {
  const [pin, setPin] = React.useState("");
  const [idStudent, setIdStudent] = React.useState("");
  const [name, setName] = React.useState("");
  const navigate = useNavigate();

  function validatePin(pin, name) {
    const pinRegex = /^\d{4}$/;
    if (!pinRegex.test(pin)) {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "O PIN deve conter exatamente 4 números",
      });
      return false;
    }
    if (name.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "O nome do aluno deve ser preenchido",
      });
      return false;
    }
    return true;
  }
  const idTeacher = localStorage.getItem("_idTeacher");
  function handleLogin() {
    if (validatePin(pin, name)) {
      localStorage.setItem("pin", pin);
      localStorage.setItem("name", name);
      localStorage.setItem("isTeacher", false);
      localStorage.setItem("isStudent", true);
      localStorage.setItem("userType", "student");
      const body = {
        name: name,
        pin: pin,
        teacherId: idTeacher,
      };
      registerStudent(body)
        .then((response) => {
          console.log(
            "Student registered successfully:",
            response.data.student
          );
          setIdStudent(response.data.student._id);
          localStorage.setItem("idStudent", response.data.student._id);
          navigate(`/waitingroom/${pin}`);
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Erro",
            text: err.response.data.message,
          });
        });
    }
  }

  return (
    <div className="container-LoginPin">
      <Card className="card-loginPin">
        <div className="content-loginPin">
          <img src={LogoHA} className="logo-loginpin" />
          <Input
            placeholder="PIN DA SALA"
            className="input-loginPin"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            maxLength={4}
          />
          <Input
            placeholder="NOME DO ALUNO"
            className="input-loginPin"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
          />
          <Button className="button-loginPin" onClick={handleLogin}>
            Entrar na Sala
          </Button>
          <span>
            Você é professor?{" "}
            <a onClick={() => navigate("/loginTeacher")}>Clique Aqui!</a>
          </span>
        </div>
      </Card>
    </div>
  );
}
