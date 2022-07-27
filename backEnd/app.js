require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/user");
const medicationRouter = require("./routes/medication");


const dbURI = `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}@cluster0.rur5l.mongodb.net/${process.env.MONGO_ATLAS_DB}?retryWrites=true&w=majority`;


mongoose
  .connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((result) => console.log("DB connected successfully!"))
  .catch((err) => console.log("Database connection error..."));

app.use(express.json());
app.use(cors());

app.use("/api/medications", medicationRouter);
app.use("/api/users", userRouter);
// error handling

app.use((err, req, res, next) => {
  if (err && err.message) {
    res.send(err.message);
  } else {
    res.send("Internal Server Error");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT} ...`);
});
