const { Router } = require("express");
const {
  getAllAnimes,
  getAnimeById,
  createAnime,
  updateAnime,
  deleteAnime,
} = require("../controllers/anime");

const router = Router();
router.get("/", getAllAnimes);
router.route("/:id").get(getAnimeById).patch(updateAnime).delete(deleteAnime);
router.post("/", createAnime);

module.exports = router;
