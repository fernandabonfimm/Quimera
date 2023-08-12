import React from "react";
import "./styles.css";
import BaseAuth from "../../../components/BaseAuth";
import { Card, Button } from "antd";
import { useParams } from "react-router-dom";
import { getStudentByPin } from "../../../services/routes/api/AuthStudent";
import { findExperimentById } from "../../../services/routes/api/Experiment";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ButtonContext } from "context/Autorization/Autorização";
import Swal from "sweetalert2";

export default function ExperimentRoom() {
  const { handleButtonClick } = React.useContext(ButtonContext);
  const buttonClicked = localStorage.getItem("buttonClicked");
  const navigate = useNavigate();
  const { idValue, pinValue } = useParams();
  const [students, setStudents] = React.useState([]);
  const [responseExperiment, setResponseExperiment] = React.useState([]);

  const handleGoBack = () => {
    Swal.fire({
      icon: "warning",
      title: "Tem certeza?",
      text: "Tem certeza que deseja sair da sala?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, sair!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/dashboard");
        localStorage.removeItem("buttonClicked");
      }
    });
  };

  const teacherId = localStorage.getItem("_idTeacher");
  React.useEffect(() => {
    const interval = setInterval(() => {
      getStudentByPin(pinValue)
        .then((response) => {
          setStudents(response.data);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            console.log("Alunos não encontrados para esse pin.");
          }
        });
      findExperimentById(teacherId, idValue).then((response) => {
        setResponseExperiment(response.data.experiment);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "Warning",
      title: "Tem certeza?",
      text: "Tem certeza que deseja liberar o resultado aos alunos?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, liberar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Resultado liberado com sucesso!",
        });
        handleButtonClick();
      }
    });
  };

  return (
    <BaseAuth>
      <div className="colDivContent">
        <div className="btnDivBack">
          <Button onClick={handleGoBack} className="btnGoBack">
            <HiOutlineArrowLeft />
            Voltar
          </Button>
        </div>
        <Card className="card-login">
          <div className="divpinsala">
            <h3 className="pindasala">
              Pin da Sala: <b>{pinValue}</b>
            </h3>
          </div>
          <div className="divpinsala marginBottom">
            <label className="labelexperimento">
              Nome do experimento: <b>{responseExperiment.title}</b>
            </label>
          </div>
          <div className="divpinsala marginTop marginBottom">
            <b className="bAlunos">Alunos:</b>
          </div>
          <div className="divpinsalaCol">
            {students.map((student) => (
              <div key={student.id} className="marginBottomLess">
                <label>{student.name}</label>
              </div>
            ))}
          </div>
          <div className="divpinsala marginBottom">
            <Button
              className="button-login"
              onClick={showSuccessAlert}
              disabled={buttonClicked}
            >
              {buttonClicked ? "Resultado liberado" : "Liberar Resultado"}
            </Button>
          </div>
        </Card>
      </div>
    </BaseAuth>
  );
}
