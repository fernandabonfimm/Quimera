import React from "react";
import { Row, Col, Card } from "antd";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { GrPieChart } from "react-icons/gr";
import ChartImg from "../../../../../charts.png";

const Announcement = () => {
  const navigate = useNavigate();
  return (
    <Row>
      <Col xs={24} xl={24}>
        <Card className="announcement">
          <Row gutter={[32, 22]}>
            <Col xs={20} xl={18}>
              <span className="descr-announcement">
                Após finalizar o seu novo experimento na aba de "Novo experimento",
                preencha o forumlário com os dados corretamente, e
              </span>
              <h3 className="title-announcement">
                Não esqueça de conferir a Dashboard!
              </h3>
              <span className="descr-announcement">
                Está plataforma foi criada com o intuito de facilitar e melhorar o desempenho dos estudantes e professores das áreas de biólogia, primordialmente animal.
              </span>
              <button
                className="gotodash"
                onClick={() => navigate("/dashboard")}
              >
                <GrPieChart style={{ marginRight: 10 }} />
                Verificar a Dashboard
              </button>
            </Col>
            <Col xs={20} xl={6}>
              <img
                src={ChartImg}
                className="charts-img"
                name="chartsimg"
                onClick={() => navigate("/dashboard")}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
export default Announcement;
