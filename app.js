require("dotenv").config();

const express = require("express");

const app = express();
const animesRouter = require("./routes/anime");
const notFound = require("./middleware/not-found");
const connectDB = require("./db/connect");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Hello World",
  });
});

app.use("/api/v1/animes", animesRouter);
app.use(notFound);
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
