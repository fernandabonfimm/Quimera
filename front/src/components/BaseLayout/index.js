import React, { useContext } from "react";
import HeaderComponent from "../Header";
import FooterComponent from "../Footer";
import { Layout, Row, Col, Breadcrumb, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { RiHomeHeartLine } from "react-icons/ri";
import "./styles.css";
import TeacherContext from "../../context/Users/Teacher";

const { Content } = Layout;

const Base = ({ children, goTo, Icon, goToName, titlepage }) => {
  const navigate = useNavigate();
  const teacherContext = useContext(TeacherContext);
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <HeaderComponent />
        <Content className="content-pages">
          <Card className="page-card-title">
            <Row>
              <Col xs={24} xl={24}>
                <Breadcrumb>
                  <Breadcrumb.Item onClick={() => navigate("/")}>
                    <RiHomeHeartLine />
                  </Breadcrumb.Item>

                  <Breadcrumb.Item onClick={() => navigate(goTo)}>
                    {Icon}
                    <span>{goToName}</span>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col xs={24} xl={24}>
                <h3 className="titlepage">
                  Bem vindo/a {titlepage} {teacherContext.getName()}
                </h3>
              </Col>
            </Row>
          </Card>
          <div className="table-home">
          {children}
          </div>
        </Content>
        <FooterComponent />
      </Layout>
    </>
  );
};
export default Base;
