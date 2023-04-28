import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorPage } from "./scenes";
import { LanguageProvider } from "./globalContext/languageContext.jsx";
import { SocketProvider } from "./globalContext/socketContext.jsx";
import { ChatLogsProvider } from "./globalContext/chatLogsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <LanguageProvider>
        <ChatLogsProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </ChatLogsProvider>
      </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
