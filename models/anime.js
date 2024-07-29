const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Anime title must be provided"],
  },
  imgUrl: {
    type: String,
    required: [true, "Anime image url is required"],
  },
  genres: String,
  state: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Anime", animeSchema);
