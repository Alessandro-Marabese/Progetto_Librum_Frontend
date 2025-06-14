import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./component/homepage/HomePage";
import LoginPage from "./component/login/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./component/navbar/NavBar";
import Profile from "./component/profile/Profile";
import Search from "./component/search/search/Search";
import GeneriSearch from "./component/search/generisearch/GeneriSearch";
import LibroDetails from "./component/libro/LibroDetails";
import AutoreDetails from "./component/autore/AutoreDetails";
import Genere from "./component/genere/Genere";
import MyBooks from "./component/profile/mybooks/MyBooks";
import Friends from "./component/profile/friends/Friends";
import Comments from "./component/profile/comments/Comments";

function AppContent() {
  const location = useLocation();
  const showNavBar = location.pathname !== "/";
  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/search?" element={<Search />} />
        <Route path="/generi" element={<GeneriSearch />} />
        <Route path="/libro/:libroId" element={<LibroDetails />} />
        <Route path="/autore/:autoreName" element={<AutoreDetails />} />
        <Route path="/generi/:genereName" element={<Genere />} />
        <Route path="/mybooks" element={<MyBooks />} />
        <Route path="/comments" element={<Comments />} />
      </Routes>
    </>
  );
}
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
