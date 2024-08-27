const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const Anime = require("../models/anime");

const getAllAnimes = async (req, res, next) => {
  let total = await Anime.countDocuments();
  const queryObj = {};
  let result = Anime.find(queryObj);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const animes = await result.skip(skip).limit(limit);

  const totalPaginas = total < limit ? 1 : Math.ceil(total / limit);

  const animeData = animes.map((anime) => ({
    id: anime._id,
    title: anime.title,
    genres: anime.genres,
    state: anime.state,
    imgUrl: anime.imgUrl,
  }));

  return res.status(StatusCodes.OK).json({
    data: animeData,
    paginacion: {
      total,
      numeroPagina: page,
      limite: limit,
      totalPaginas,
    },
  });
};
const getAnimeById = async (req, res) => {
  const { id: animeId } = req.params;
  const anime = await Anime.findOne({ _id: animeId });

  if (!anime) {
    throw new NotFoundError(`No anime with the id ${id} was found`);
  }

  return res.status(StatusCodes.OK).json({ data: anime });
};

const createAnime = async (req, res) => {
  const anime = await Anime.create(req.body);
  return res.status(StatusCodes.OK).json({ anime });
};

const updateAnime = async (req, res) => {
  const { id: animeId } = req.params;

  const anime = await Anime.findOneAndUpdate({ _id: animeId }, req.body, {
    runValidators: true,
    new: true,
  });

  if (!anime) {
    throw new NotFoundError(`No anime with the id ${id} was found`);
  }
  return res.status(StatusCodes.OK).json({ anime });
};

const deleteAnime = async (req, res) => {
  const { id: animeId } = req.params;
  const anime = await Anime.findOneAndDelete({ _id: animeId });

  if (!anime) {
    throw new NotFoundError(`Anime with id:${animeId} was not found`);
  }

  return res.status(StatusCodes.OK).json({
    msg: `Anime '${anime.title}' was deleted`,
  });
};

module.exports = {
  getAllAnimes,
  getAnimeById,
  createAnime,
  updateAnime,
  deleteAnime,
};
