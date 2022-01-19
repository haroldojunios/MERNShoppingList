const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// config
const keys = require("./keys");

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// Connect to mongo
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(() => console.log(err));

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server connected on port ${port}`));
