import React from "react";
import FooterComponent from "../Footer";
import { Layout, Row, Col, Breadcrumb, Card } from "antd";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const { Content } = Layout;

const Base = ({ children, goTo, Icon, goToName, titlepage, nameofuser }) => {
  const navigate = useNavigate();
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Content className="content-pages">
          <Card className="page-card-title">
            <Row>
              <Col xs={24} xl={24}>
                <Breadcrumb>
                  <Breadcrumb.Item onClick={() => navigate(goTo)}>
                    {Icon}
                    <span>{goToName}</span>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col xs={24} xl={24}>
                <h3 className="titlepage">
                  Bem vindo/a {titlepage} {nameofuser}
                </h3>
              </Col>
            </Row>
          </Card>
          {children}
        </Content>
        <FooterComponent />
      </Layout>
    </>
  );
};
export default Base;
