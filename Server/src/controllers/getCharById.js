const URL = "https://rickandmortyapi.com/api/character/";
const axios = require("axios");

const getCharById = async (req, res) => {
  const { id } = req.params;

  try {
    const apiRequest = await axios(`${URL}/${req.params.id}`);
    const { data } = apiRequest;
    if (data.error) {
      return res.status(404).send(data.error);
    }
    const { status, name, species, origin, image, gender } = data;
    const character = {
      id,
      name,
      status,
      species,
      origin,
      image,
      gender,
    };
    return res.status(200).json(character);
  } catch (error) {
    return res.status(500).send(axiosError.message);
  }
};

module.exports = getCharById;
