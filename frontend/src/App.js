import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Main } from "./components/Main/Main";
import { Profile } from "./components/Profile/Profile";
import { EditProfile } from "./components/EditProfile/EditProfile";
import { FriendList } from "./components/FriendList/FriendList";
import { WatchLater } from "./components/WatchLater/WatchLater";
import { ChooseMovie } from "./components/ChooseMovie/ChooseMovie";
import { FilmSearch } from "./components/FilmSearch/FilmSearch";
import { FilmPage } from "./components/FilmPage/FilmPage";
import { Login } from "./components/LoginPage/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Main/>
      <Routes>
      <Route path="/" />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" />
      <Route path="/edit" element={<EditProfile/>} />
      <Route path="/friends" element={<FriendList/>} />
      <Route path="/watchlater" element={<WatchLater/>} />
      <Route path="/choose" element={<ChooseMovie/>} />
      <Route path="/searchfilm" element={<FilmSearch/>} />
      <Route path="/film/:id" element={<FilmPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
