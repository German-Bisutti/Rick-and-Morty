import { useParams } from "react-router-dom"
import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./Detail.module.css"


const Detail = () => {

    const {id} = useParams();// Obtener el ID del personaje de los parámetros de la URL
    const [character, setCharacter] = useState({});

    useEffect(() => {
        axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
           if (data.name) {
              setCharacter(data);
           } else {
              window.alert('No hay personajes con ese ID');
           }
        });
        return ;
     }, [id]);

     return (
     <div className={style.container}>
      <h1>{character.name}</h1>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin?.name}</p> {/* Usar ?. para evitar errores si origin no está definido */}
      <img src={character.image} alt={character.name} />
    </div>
  );
}

export default Detail