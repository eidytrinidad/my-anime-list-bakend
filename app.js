require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

//connectDB
const connectDB = require("./db//connect");
//const authenticateUser = require("./middleware/authentication");
//routers
const animesRouter = require("./routes/anime");
// const jobsRoutes = require("./routes/jobs");
// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
//routes
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Welcome to Anime Api, go to ' /api/v1/animes ' to get anime list",
  });
});

app.use("/api/v1/animes", animesRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4500;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server running in port:${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
