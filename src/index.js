import React from "react";
import ReactDOM from "react-dom"
import App from "./App";
import { AppProvider } from "./context";
// import reportWebVitals from './reportWebVitals';
// import '../src/components/SignIn/SignIn.scss'

ReactDOM.render(
  <AppProvider>
    <App />
    </AppProvider>,
  document.getElementById("root")
);
// reportWebVitals();