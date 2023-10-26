const { User } = require("../DB_connection");

const login = async (req, res) => {
  try {
    const { email, password } = req.query;
    console.log(email, password);
    if (!email || !password) return res.status(400).send("Faltan datos");

    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });

    if (!user) return res.status(404).send("Usuario no encontrado");

    // Aquí se compara la contraseña en texto claro
    if (user.password === password) {
      return res.status(200).json({ access: true });
    } else {
      return res.status(403).send("Contraseña incorrecta");
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = login;
