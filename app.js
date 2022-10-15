const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const multer = require("multer");
require('dotenv').config();
mongoose.Promise = global.Promise;

//create our app
const app = express();

//middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json())

const palabraPath = require("./routes/Palabras")
const login = require("./routes/auth");
//routes
app.use("/", palabraPath)
app.use("/login", login)

//Settings
app.set("port", process.env.PORT || 4000);

//start server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});

//DB conection

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));
