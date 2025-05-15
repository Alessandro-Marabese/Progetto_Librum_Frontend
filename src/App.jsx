import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./component/homepage/HomePage";
import LoginPage from "./component/login/LoginPage";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
