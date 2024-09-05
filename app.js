require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const app = express();

//connectDB
const connectDB = require("./db//connect");
//const authenticateUser = require("./middleware/authentication");

//routers
const animesRouter = require("./routes/anime");
const authRouter = require("./routes/auth");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.use(cors());
app.use(cookieparser());
//routes
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Welcome to Anime Api, go to ' /api/v1/animes ' to get anime list",
  });
});

app.use("/api/v1/animes", animesRouter);
app.use("/api/v1/auth", authRouter);
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
