import React from "react";
import { Layout } from "antd";
import "./styles.css";

const { Content } = Layout;

const BaseAuth = ({ children}) => {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Content className="content-pages-auth">
              {children}
        </Content>
      </Layout>
    </>
  );
};
export default BaseAuth;
