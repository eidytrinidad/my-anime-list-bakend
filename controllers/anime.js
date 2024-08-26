const { NotFoundError } = require("../errors");
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
const getAnimeById = async (req, res) => {
  const { id } = req.params;
  const anime = await Anime.findOne({ _id: id });

  if (!anime) {
    throw new NotFoundError(`No anime with the id ${id} was found`);
  }
  return res.status(200).json({ anime });
};

module.exports = { getAllAnimes, getAnimeById };
