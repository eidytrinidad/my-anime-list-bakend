const { createdCustomError } = require("../errors/custom-error");
const Anime = require("../models/anime");

const getAllAnimes = async (req, res, next) => {
  try {
    let total = await Anime.countDocuments();
    const queryObj = {};
    let result = Anime.find(queryObj);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 1;
    const skip = (page - 1) * limit;
    result = result;
    const animes = await result.skip(skip).limit(limit);

    const totalPaginas = total < limit ? 1 : Math.ceil(total / limit);

    return res.status(200).json({
      data: animes,
      paginacion: {
        total,
        numeroPagina: page,
        limite: limit,
        totalPaginas,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const getAnimeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const anime = await Anime.findOne({ _id: id });
    if (!anime) {
      console.log(error);
      res.json({ msg: "Error" });
    }
    return res.status(200).json({ anime });
  } catch (error) {
    throw new BadRequestError("Please provide email and password");
  }
};

module.exports = { getAllAnimes, getAnimeById };
