require("dotenv").config();

const connectDB = require("./db/connect");
const Anime = require("./models/anime");
const jsonAnimes = require("./animes.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Anime.deleteMany();
    await Anime.create(jsonAnimes);
    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
