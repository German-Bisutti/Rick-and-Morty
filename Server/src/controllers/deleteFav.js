const { Favorite } = require("../DB_connection");

const deleteFav = async (req, res) => {
  try {
    const { id } = req.params; // Debes tomar el id de los parámetros
    console.log(id);
    await Favorite.destroy({
      where: { id }, // Debes buscar por el campo 'id' en el objeto de búsqueda
    });

    const allFavorites = await Favorite.findAll();
    return res.status(200).json(allFavorites);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = deleteFav;
