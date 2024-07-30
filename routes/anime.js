const { Router } = require("express");
const { getAllAnimes } = require("../controllers/anime");

const router = Router();
router.route("/").get(getAllAnimes);

module.exports = router;
