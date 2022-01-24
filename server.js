const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

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

// Serve static assets it in production
if (process.env.NODE_ENV == "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server connected on port ${port}`));
