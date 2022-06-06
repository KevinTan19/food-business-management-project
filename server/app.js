if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/index");
const port = process.env.PORT || 4002;
// const errorHandler = require("./middlewares/errorhandler");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/", routes);
// app.use(errorHandler);
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
