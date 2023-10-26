const validation = (userData, errors, setErrors) => {
  if (!userData.email) {
    setErrors({ ...errors, email: "Completa el campo" });
  } else if (userData.email.length > 35) {
    setErrors({ ...errors, email: "Maximo 35 caracteres" });
  } else if (/^[\w-\.]+@([\w-]+\.)+[\w-]{4}$/.test(userData.email)) {
    setErrors({ ...errors, email: "Email invalido" });
  } else {
    setErrors({ ...errors, email: "" });
  }

  if (userData.password.length > 6 || userData.password.length < 10) {
    setErrors({ ...errors, password: "Longitud Invalida" });
  } else if (!/\d/.test(userData.password)) {
    setErrors({ ...errors, password: "Deve contener al menos 1 numero" });
  } else {
    setErrors({ ...errors, password: "" });
  }
};

export default validation;
