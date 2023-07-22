import React from "react";
import Base from "../../../../components/BaseLayout";
import { MdOutlineDashboard } from "react-icons/md";
import { Table, Button, Card, Row, Col } from "antd";
import "../styles.css";
import WaterfallChart from "pages/StudentPages/WaterfallChart";
import { useParams } from "react-router-dom";
import { findExperimentById } from "../../../../services/routes/api/Experiment";
import { getStudentByPin } from "../../../../services/routes/api/AuthStudent";

const ExperimentDetailsTeacher = () => {
  const { idValue, pinValue } = useParams();
  const [responseDetails, setResponseDetails] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const teacherId = localStorage.getItem("_idTeacher");

  React.useEffect(() => {
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
      setResponseDetails(response.data.experiment);
    });
  });

  console.log("response details ", responseDetails);

  return (
    <>
      <Base
        goTo={"/dashboard"}
        Icon={<MdOutlineDashboard />}
        goToName={"Dashboard"}
        titlepage={"à Dashboard"}
        nameofuser={"Professor(a)"}
        children={
          <>
            <Row gutter={[32, 22]}>
              <Col xs={12} xl={12}>
                <Card className="page-card-home">
                  <div className="rowDiv">
                    <h3>ID do experimento:</h3>
                    <span>{responseDetails._id}</span>
                  </div>
                  <div className="rowDiv">
                    <h3>Pin da sala do experimento:</h3>
                    <span>{responseDetails.pin}</span>
                  </div>
                  <div className="colDiv">
                    <h3>Titulo do experimento:</h3>
                    <span>{responseDetails.title}</span>
                  </div>
                  <div className="colDiv">
                    <h3>Descrição do experimento:</h3>
                    <span>{responseDetails.description}</span>
                  </div>
                  <div className="colDiv">
                    <h3>Todos os alunos que participaram:</h3>
                    {students.map((student) => (
                      <div key={student.id} className="marginBottomLess">
                        <label>{student.name}</label>
                      </div>
                    ))}
                  </div>
                </Card>
              </Col>
              <Col xs={12} xl={12}>
                <Card className="page-card-home">
                  <Row gutter={[32, 22]}>
                    <Col xs={12} xl={12}>
                      <WaterfallChart />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default ExperimentDetailsTeacher;
