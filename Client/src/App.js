import React, { useState, useEffect } from "react";
import style from "./App.module.css";
import Nav from "./components/Navbar/Nav";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
//----Views----
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Detail from "./components/Detail/Detail";
import Form from "./components/Form/Form";
import Favorites from "./components/Favorites/Favorites";

function App() {
  const [characters, setCharacters] = useState([]); // [{}]
  const { pathname } = useLocation();
  const [access, setAcess] = useState(false);
  const [errorApi, seterrorApi] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    !access && navigate("/");
  }, [access, navigate]);

  const login = async (userData) => {
    const { email, password } = userData;
    const URL = "http://localhost:3001/rickandmorty/login/";
    try {
      const backendLogin = await axios(
        URL + `?email=${email}&password=${password}`
      );
      const { data } = backendLogin;
      const { access } = data;
      setAcess(access);
      access && navigate("/home");
    } catch (error) {
      alert(error.message);
    }
  };

  async function onSearch(id) {
    try {
      if (id > 500) {
        alert("No hay personaje con un ID tan alto");
        return; // Salir de la función si el ID es demasiado alto
      }
      // Verificar si el personaje ya está en characters
      const characterExists = characters.some(
        (character) => character.id === id
      );

      if (characterExists) {
        // Si el personaje ya existe, muestra un mensaje
        alert("Este personaje ya está disponible");
      } else {
        const backRequest = await axios(
          `http://localhost:3001/rickandmorty/character/${id}`
        );

        if (backRequest.data.name) {
          seterrorApi(false);
          setCharacters((oldChars) => [...oldChars, backRequest.data]);
        } else {
          seterrorApi(true);
        }
      }
    } catch (error) {
      seterrorApi(true);
    }
  }

  function onClose(id) {
    // elimina personajes de characters
    // window.alert("onClose :)")
    setCharacters((characters) => {
      const updatedCharacters = characters.filter((pj) => pj.id !== id);
      console.log("Characters actualizados:", updatedCharacters);
      return updatedCharacters;
    });
  }
  return (
    <div className={style.App}>
      {pathname !== "/" && <Nav onSearch={onSearch} />}

      <Routes>
        <Route path="/" element={<Form login={login} />} />
        <Route
          path="/home"
          element={
            !errorApi ? (
              <Home characters={characters} onClose={onClose} />
            ) : (
              <h1>Componente de Error</h1>
            )
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
