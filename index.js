const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const multer = require("multer");
require('dotenv').config();
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json())

const palabraPath = require("./routes/Palabras")
const login = require("./routes/auth");

app.use("/", palabraPath)
app.use("/", login)


app.listen(process.env.PORT || 3000, () => {
  console.log("server on");
})

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));
