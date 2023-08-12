import React from "react";
import { Card } from "antd";
import WaterfallChart from "../WaterfallChart";
import Base from "../../../components/BaseLayoutStudent";
import { MdOutlineBiotech } from "react-icons/md";
import "./styles.css";
import { useParams } from "react-router-dom";
import CardChecked from "../../../components/CardChecked";
import Swal from "sweetalert2";
import {
  getOptions,
  getPhaseOne,
  getGraphic,
  getDataByPin,
  getInicialGraphic,
} from "../../../services/routes/api/Experiment";
import { postAnswer } from "../../../services/routes/api/AuthStudent";

const Experiment = () => {
  const { pin } = useParams();
  const buttonClicked = localStorage.getItem("buttonClicked");
  console.log("tela do usuario botao estado", buttonClicked);
  const idStudent = localStorage.getItem("idStudent");
  const storedName = localStorage.getItem("name");
  const [showB1, setShowB1] = React.useState(false);
  const [showB2, setShowB2] = React.useState(false);
  const [options, setOptions] = React.useState({
    optionsOne: [],
    optionsTwo: [],
  });
  const [phaseOne, setPhaseOne] = React.useState({});
  const [graphic, setGraphic] = React.useState({});
  const [inicialGraphic, setInicialGraphic] = React.useState({});
  const [experimentData, setExperimentData] = React.useState([]);
  console.log("tela do usuario botao estado", buttonClicked);

  React.useEffect(() => {
    console.log(experimentData.title);
  }, [experimentData]);

  React.useEffect(() => {
    getOptions().then((response) => {
      setOptions({
        optionsOne: response.data.optionsOne,
        optionsTwo: response.data.optionsTwo,
      });
    });
    getPhaseOne().then((response) => {
      setPhaseOne(response.data);
    });
    getDataByPin(pin).then((response) => {
      setExperimentData(response.data.experiment);
    });
  }, []);

  const handleSelectOptionB1 = (option) => {
    setSelectedOptionsB1({ [option.value]: true });
  };

  const handleSelectOptionB2 = (option) => {
    setSelectedOptionsB2({ [option.value]: true });
  };

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);
  const [answerOneStorage, setAnswerOneStorage] = React.useState("");
  const [answerTwoStorage, setAnswerTwoStorage] = React.useState("");

  const getDatas = () => {
    getInicialGraphic(idStudent).then((response) => {
      setInicialGraphic(response.data);
    });
    getGraphic(idStudent).then((response) => {
      setGraphic(response.data);
    });
  };
  React.useEffect(() => {
    const interval = setInterval(() => {
      getDatas();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleButtonDisabled = () => {
    const answerOneString = Object.keys(selectedOptionsB1)[0].toString();
    const answerTwoString = Object.keys(selectedOptionsB2)[0].toString();
    const answerOne = options.optionsOne.find(
      (option) => option.value === answerOneString
    );
    const answerTwo = options.optionsTwo.find(
      (option) => option.value === answerTwoString
    );
    const answer = {
      answerOne: answerOne.label,
      answerTwo: answerTwo.label,
    };
    setAnswerOneStorage(answerOne.label);
    setAnswerTwoStorage(answerTwo.label);
    console.log(answer);
    postAnswer(idStudent, answer).then((response) => {
      Swal.fire({
        icon: "success",
        title: "Resposta enviada com sucesso!",
        showConfirmButton: false,
        timer: 1500,
      });
      getDatas();
      setIsButtonDisabled(true);
    });
  };

  const [selectedOptionsB1, setSelectedOptionsB1] = React.useState({});

  const [selectedOptionsB2, setSelectedOptionsB2] = React.useState({});

  React.useEffect(() => {
    if (
      Object.keys(selectedOptionsB1).length > 0 &&
      Object.keys(selectedOptionsB2).length > 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [selectedOptionsB1, selectedOptionsB2]);

  const getSelectedLabelB1 = () => {
    const selectedValue = Object.keys(selectedOptionsB1)[0];
    const selectedOption = options.optionsOne.find(
      (option) => option.value === selectedValue
    );
    return selectedOption ? selectedOption.label : "Nenhuma";
  };

  const getSelectedLabelB2 = () => {
    const selectedValue = Object.keys(selectedOptionsB2)[0];
    const selectedOption = options.optionsTwo.find(
      (option) => option.value === selectedValue
    );
    return selectedOption ? selectedOption.label : "Nenhuma";
  };

  return (
    <Base
      goTo={"/dashboard"}
      Icon={<MdOutlineBiotech />}
      goToName={"Experimento"}
      titlepage={`a sala de experimento: ${pin}`}
      nameofuser={storedName}
      children={
        <div className="divCards">
          <Card className="card-chartsExperiment">
            <h3 className="title-cardExperiment">
              Título: {experimentData.title}
            </h3>
            <span className="description-cardExperiment">
              Descrição: {experimentData.description}
            </span>
            <br />
            <p className="subtitle-cardExperiment">
              Informe a OP1 e OP2 (Opções) para realizar o experimento
            </p>
            <div className="contentChoices-cardExperiment">
              <div className="contentB1-Choices">
                {!showB1 && (
                  <div className="content-ButtonAndLabel">
                    {!buttonClicked && (
                      <button
                        onClick={() => setShowB1(true)}
                        className="button-Experiment"
                      >
                        OP1
                      </button>
                    )}
                    <label>
                      Escolha: <b>{getSelectedLabelB1()}</b>
                    </label>
                  </div>
                )}
                {showB1 && (
                  <>
                    {!buttonClicked && (
                      <button
                        onClick={() => setShowB1(false)}
                        className="button-Experiment"
                      >
                        OP1
                      </button>
                    )}
                    <div className="min-height-answer">
                      {options.optionsOne.map((item, index) => (
                        <div key={index}>
                          <CardChecked
                            handleClick={() => handleSelectOptionB1(item)}
                            isClicked={selectedOptionsB1[item.value]}
                          >
                            {item.label}
                          </CardChecked>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="contentB1-Choices">
                {!showB2 && (
                  <div className="content-ButtonAndLabel">
                    {!buttonClicked && (
                      <button
                        onClick={() => setShowB2(true)}
                        className="button-Experiment"
                      >
                        OP2
                      </button>
                    )}
                    <label>
                      Escolha: <b>{getSelectedLabelB2()}</b>
                    </label>
                  </div>
                )}
                {showB2 && (
                  <>
                    {!buttonClicked && (
                      <button
                        onClick={() => setShowB2(false)}
                        className="button-Experiment"
                      >
                        OP2
                      </button>
                    )}
                    <div className="min-height-answer">
                      {options.optionsTwo.map((item, index) => (
                        <div key={index}>
                          <CardChecked
                            handleClick={() => handleSelectOptionB2(item)}
                            isClicked={selectedOptionsB2[item.value]}
                          >
                            {item.label}
                          </CardChecked>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="contentB1-Choices">
                <button
                  className="btnRealizarExperimento"
                  disabled={isButtonDisabled}
                  onClick={handleButtonDisabled}
                >
                  {buttonClicked ? "Experimento realizado" : "Realizar Experimento"}
                </button>
              </div>
            </div>
          </Card>
          <Card className="card-chartsExperiment">
            {answerOneStorage === "Hipotálamo" && answerTwoStorage === "ADH" ? (
              <div>
                <h3>
                  Você acertou as duas respostas, {answerOneStorage} 80% e{" "}
                  {answerTwoStorage} 20%
                </h3>
              </div>
            ) : answerOneStorage === "Hipotálamo" ? (
              <div>
                <h3>
                  Você acertou a primeira resposta, {answerOneStorage} 80%
                </h3>
              </div>
            ) : answerTwoStorage === "ADH" ? (
              <div>
                <h3>Você acertou a segunda resposta, {answerTwoStorage} 20%</h3>
              </div>
            ) : (
              <div>
                <h3>Você ainda não acertou nenhuma resposta</h3>
              </div>
            )}
            <div className="contentChart-cardExperiment">
              {buttonClicked ? (
                <>
                  {graphic?.data?.expectedValue &&
                  graphic?.data?.studentValue ? (
                    <WaterfallChart
                      experimentData={graphic?.data.expectedValue}
                      studentData={graphic?.data.studentValue}
                    />
                  ) : (
                    <h3>Carregando gráfico...</h3>
                  )}
                </>
              ) : (
                <>
                  {inicialGraphic?.data?.expectedValue &&
                  inicialGraphic?.data?.studentValue ? (
                    <WaterfallChart
                      experimentData={inicialGraphic?.data.expectedValue}
                      studentData={inicialGraphic?.data.studentValue}
                    />
                  ) : (
                    <h3>Carregando o gráfico inicial...</h3>
                  )}
                </>
              )}
            </div>
          </Card>
        </div>
      }
    />
  );
};

export default Experiment;
