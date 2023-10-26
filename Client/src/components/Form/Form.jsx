import React, { useState } from "react";
import style from "./Form.module.css";
import loginImage from "../../img/1-4.jpg";
import validation from "./validation";
export default function Form({ login }) {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleInputChange = (event) => {
    const property = event.target.name; //nombre del input
    const value = event.target.value; //Valor que pone la persona en el input

    setUserData({ ...userData, [property]: value }); // a property que es el lugar donde escribe el meil le doy el valor de lo que escrive
    validation({ ...userData, [property]: value }, errors, setErrors);
    //cuando le pongo los ... agrego el password o el meil depende de lo que agrege el otro lo meto tambien
  };

  const submitHandeler = (event) => {
    event.preventDefault();
    login(userData);
  };
  return (
    <div className={style.container}>
      <img src={loginImage} alt="Login" className={style.img} />

      <form onSubmit={submitHandeler}>
        <label className={style.text}>Email</label>
        <input
          type="text"
          placeholder="email"
          className={style.input}
          name="email"
          value={userData.email}
          onChange={handleInputChange}
        />
        <p>{errors.email}</p>
        <label className={style.text}>Password</label>
        <input
          type="password"
          placeholder="password"
          className={style.input}
          name="password"
          value={userData.password}
          onChange={handleInputChange}
        />
        <p>{errors.password}</p>
        <button className={style.button}>Login</button>
      </form>
      <button className={style.button}>Register</button>
    </div>
  );
}
