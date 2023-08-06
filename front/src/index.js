import React from "react";
import "./styles/index.css";
import "antd/dist/antd.min.css";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./routes/Routes";
import ErrorBoundary from "./ErrorBoundary";
import { createRoot } from "react-dom/client";
import { ButtonProvider } from "./context/Autorization/Autorização";

const App = () => {
  return (
    <React.StrictMode>
      <ButtonProvider>
        <BrowserRouter>
          <ConfigProvider>
            <ErrorBoundary>
              <RoutesComponent />
            </ErrorBoundary>
          </ConfigProvider>
        </BrowserRouter>
      </ButtonProvider>
    </React.StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<App />);
