require("dotenv").config();

const express = require("express");
const { connect } = require("mongoose");
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Hello World",
  });
});

const port = process.env.PORT || 4500;
const start = async () => {
  try {
    await connect(process.env.uri);
    app.listen(port, console.log(`server running in port:${port}`));
  } catch (error) {}
};

start();
