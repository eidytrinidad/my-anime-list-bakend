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
    // return next(createdCustomError());
  }
};
const getAnimeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const anime = await Anime.findOne({ _id: id });
    if (!anime) {
      return next(
        createdCustomError(`No existe un anime con ese Id:${id}`, 404)
      );
    }
    return res.status(200).json({ anime });
  } catch (error) {
    return next(createdCustomError());
  }
};

module.exports = { getAllAnimes, getAnimeById };
