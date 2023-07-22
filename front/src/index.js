import React from "react";
import "./styles/index.css";
import "antd/dist/antd.min.css";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./routes/Routes";
import ErrorBoundary from "./ErrorBoundary";
import { createRoot } from 'react-dom/client';

const App = () => {
  return(
    <React.StrictMode>
      <BrowserRouter>
        <ConfigProvider>
          <ErrorBoundary>
            <RoutesComponent />
          </ErrorBoundary>
        </ConfigProvider>
      </BrowserRouter>
   </React.StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<App />);

reportWebVitals(sendToVercelAnalytics);
