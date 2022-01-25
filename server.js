const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// config
require("dotenv").config();
const port = process.env.port || 5000;

const app = express();

// Bodyparser middleware
app.use(express.json());

// Connect to mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));

// Serve static assets it in production
if (process.env.NODE_ENV == "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server connected on port ${port}`));
