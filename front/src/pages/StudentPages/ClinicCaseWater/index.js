import React from "react";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import Base from "components/BaseLayoutStudent";
import { MdOutlineBiotech } from "react-icons/md";
import { Row, Col, Card, Button } from "antd";
import Gato1 from "../../../gato1.jpg";
import Gato2 from "../../../gato2.jpg";
const ClinicCaseWater = () => {
  const { pin } = useParams();
  const navigate = useNavigate();
  const storedName = localStorage.getItem("name");
  const navigateToExperiment = () => {
    navigate(`/experiment/${pin}`);
  };
  return (
    <Base
      goTo={"/"}
      Icon={<MdOutlineBiotech />}
      goToName={"Caso Clínico"}
      titlepage={`ao caso clínico do experimento: ${pin}, `}
      nameofuser={storedName}
      children={
        <Card className="cardCCWater">
          <Row gutter={[32, 22]}>
            <Col xs={24} xl={12}>
              <h1 className="titlesCCWater">Animal: Quimera I </h1>
              <span className="expCCWater">
                Explicação: Problemas renais são muito comuns em gatos. Nessa
                condição um sintoma muito importante que devemos monitorar será
                a desidratação. Quando da manutenção do animal em clínicas
                veterinárias, para procedimentos diversos, frequentemente
                observamos essa perigosa situação.{" "}
              </span>
              <h2 className="titlesCCWater">Sintomas</h2>
              <span className="expCCWater bold">
                Os principais sintomas da desidratação nesse animal são:
              </span>
              <ul className="itemsCCWater">
                <li>Pele enrugada</li>
                <li>Respiração ofegante</li>
                <li>Aumento da frequência cardíaca</li>
                <li>Olhos fundos</li>
                <li>Dificuldade em urinar</li>
              </ul>
              <h2 className="titlesCCWater">Causas</h2>
              <span className="expCCWater bold">Sendo as principais causas:</span>
              <ul className="itemsCCWater">
                <li>Ingestão insuficiente (por vários motivos)</li>
                <li>Vômitos e/ou Diarreias</li>
                <li>
                  Queimaduras, insolação, e diferentes tipos de patologias
                </li>
              </ul>
            </Col>
            <Col xs={24} xl={12}>
              <div className="imgcatsDiv">
                <img src={Gato1} alt="gato1" className="imgcats" />
                <img src={Gato2} alt="gato2" className="imgcats" />
              </div>
            </Col>
          </Row>
          <div className="divButtonIniciate">
            <h1 className="titleIniciate">Pronto para iniciar o experimento?</h1>
            <span className="descCCWater">
                O limiar da sede desencadeará um rigoroso controle homeostático
                no corpo desse animal.{" "}
              </span>
            <Button className="btnIniciate" type="primary" onClick={navigateToExperiment}>
              Iniciar Experimento
            </Button>
          </div>
        </Card>
      }
    />
  );
};

export default ClinicCaseWater;
