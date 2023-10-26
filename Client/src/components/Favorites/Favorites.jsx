import style from "./Favorites.module.css";
import { connect, useSelector, useDispatch } from "react-redux";
import Card from "../Cards/Singular/Card";
import { filterCards, orderCards } from "../../redux/action";
import { useState } from "react";

const Favorites = () => {
  // WARNING PELIGRO
  // CUIDADO!!!!
  // USE SELECTOR NO SE PERMITE EN EL CHECKPOINT

  const favorites = useSelector((state) => state.myFavorites); // ACLARACION

  const dispatch = useDispatch();

  const handleOrder = (event) => {
    dispatch(orderCards(event.target.value));
  };

  const handleFilter = (event) => {
    dispatch(filterCards(event.target.value));
  };

  return (
    <div>
      <div className={style.container}>
        <select onChange={handleOrder} className={style.option}>
          <option value="A">Asendente</option>
          <option value="D">Decendente</option>
        </select>

        <select onChange={handleFilter} className={style.option}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">unknown</option>
          <option value="allCharacters">All Character</option>
        </select>
      </div>

      <div className={style.container}>
        {favorites?.map((pj) => {
          return (
            <Card
              isfav={true}
              key={pj.id}
              id={pj.id}
              name={pj.name}
              species={pj.species}
              gender={pj.gender}
              status={pj.status}
              image={pj.image}
              origin={pj.origin.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
