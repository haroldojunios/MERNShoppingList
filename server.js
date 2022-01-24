const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// config
const keys = require("./keys");
const port = process.env.port || 5000;

const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

// Connect to mongo
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/items", require("./routes/api/item"));

app.listen(port, () => console.log(`Server connected on port ${port}`));
