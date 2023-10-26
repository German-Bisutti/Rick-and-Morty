import Cards from "../Cards/Cards.jsx";
import React from "react";

const Home = ({ characters, onClose }) => {
  return (
    <div>
      <Cards characters={characters} onClose={onClose} />
    </div>
  );
};

export default Home;
