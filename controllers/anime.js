const Anime = require("../models/anime");

const getAllAnimes = async (req, res) => {
  try {
    const animes = await Anime.find({});
    return res.status(200).json({
      animes,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Something went wrong",
      error: true,
      statusCode: 500,
    });
  }
};

module.exports = { getAllAnimes };
