import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { addFavorite, removeFavorite } from "../../../redux/action";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

function Card({
  name,
  species,
  onClose,
  gender,
  status,
  origin,
  image,
  id,
  addFavorite,
  removeFavorite,
  myFavorites,
  isfav,
}) {
  const [isFav, setIsFav] = useState(false);
  const handleFavorite = () => {
    if (isFav) {
      setIsFav(false);
      removeFavorite(id);
    } else {
      setIsFav(true);
      addFavorite({
        name,
        species,
        onClose,
        gender,
        status,
        origin,
        image,
        id,
      });
    }
  };

  useEffect(() => {
    myFavorites.forEach((fav) => {
      if (fav.id === id) {
        setIsFav(true);
      }
    });
  }, [myFavorites, id]);

  return (
    <div className={style.cardContainer}>
      {isFav ? (
        <button onClick={handleFavorite}>❤️</button>
      ) : (
        <button onClick={handleFavorite}>🤍</button>
      )}
      {isfav ? (
        <></>
      ) : (
        <button className={style.closeButton} onClick={() => onClose(id)}>
          X
        </button>
      )}
      <h2 className={style.name}>Name: {name}</h2>
      <h2 className={style.cardInfo}>Specie: {species}</h2>
      <h2 className={style.cardInfo}>Gender: {gender}</h2>
      <h2 className={style.cardInfo}>Status: {status}</h2>
      <h2 className={style.origin}>Origin:{origin}</h2>
      <Link to={`/detail/${id}`}>
        <img className={style.cardImage} src={image} alt={name} />
      </Link>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (character) => {
      dispatch(addFavorite(character));
    },
    removeFavorite: (id) => {
      dispatch(removeFavorite(id));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    myFavorites: state.myFavorites,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
