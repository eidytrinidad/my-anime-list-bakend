const { Router } = require("express");
const { getAllAnimes, getAnimeById } = require("../controllers/anime");

const router = Router();
router.route("/").get(getAllAnimes);
router.route("/:id").get(getAnimeById);

module.exports = router;
