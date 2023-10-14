import React from "react";
import "./styles.css";
import { Row, Col, Layout, Divider } from "antd";
import { AiOutlineHeart } from "react-icons/ai";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <>
      <Footer className="footer">
        <Row gutter={[32, 22]}>
          <Col xs={24} xl={24}>
            <span className="description-footer">
              © 2023 Quimera - Todos os direitos reservado | Desenvolvido com
              <AiOutlineHeart className="icon-footer" />
              por{" "}
              <a href="https://fernandabonfim.tech/">FB - Software Developer</a>
            </span>
          </Col>
        </Row>
      </Footer>
    </>
  );
};
export default FooterComponent;
