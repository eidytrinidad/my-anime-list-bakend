const { Router } = require("express");
const auth = require("../middleware/authentication");
const {
  getAllAnimes,
  getAnimeById,
  createAnime,
  updateAnime,
  deleteAnime,
} = require("../controllers/anime");

const router = Router();
router.get("/", getAllAnimes);
router.route("/:id").get(getAnimeById);
router.route("/:id").patch(auth, updateAnime).delete(auth, deleteAnime);
router.post("/", createAnime);

module.exports = router;
