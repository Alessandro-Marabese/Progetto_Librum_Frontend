import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./component/homepage/HomePage";
import LoginPage from "./component/login/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./component/navbar/NavBar";
import Profile from "./component/profile/Profile";
import Search from "./component/search/Search";
import GeneriSearch from "./component/search/GeneriSearch";
import LibroDetails from "./component/libro/LibroDetails";
import AutoreDetails from "./component/autore/AutoreDetails";
import Genere from "./component/genere/Genere";
import MyBooks from "./component/profile/MyBooks";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search?" element={<Search />} />
          <Route path="/generi" element={<GeneriSearch />} />
          <Route path="/libro/:libroId" element={<LibroDetails />} />
          <Route path="/autore/:autoreName" element={<AutoreDetails />} />
          <Route path="/generi/:genereName" element={<Genere />} />
          <Route path="/mybooks" element={<MyBooks />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
