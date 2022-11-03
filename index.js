// basic setup
const express = require("express");
const cors = require("cors");
const playersRouter = require("./routes/v1/player.route");
const app = express();

// Port Set
const port = process.env.PORT || 7000;

// Middleware cors police
app.use(cors());

app.use(express.json());

// Middleware Function Work

// Setup Router
app.use("/api/v1/player", playersRouter);

// Api Function Work
app.get("/", (req, res) => {
  res.send("Hello, To My Own Pleyer Server!");
});

app.all("*", (req, res) => {
  res.send("there don't have any routers.");
});

app.listen(port, () => {
  console.log(`Pleyer Server is running on port : ${port}`);
});