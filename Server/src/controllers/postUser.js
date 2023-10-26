const { User } = require("../DB_connection.js");

const postUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, "Creando usuario");
    if (!email || !password) return res.status(400).send("Faltan Datos");

    const [user, created] = await User.findOrCreate({
      where: {
        email,
        password,
      },
    });

    if (created) {
      res.status(201).json(user);
    } else {
      res.status(409).json({ message: "El usuario ya existe" });
    }
  } catch (error) {
    console.error("Error en el controlador postUser:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = postUser;
