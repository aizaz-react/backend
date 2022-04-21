const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
// routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initailData");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// enviroment variables
env.config();
//  mongooseconnection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.qixbq.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  });

//  passing middle ware to post the APi
//app.use(bodyParser());
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
//app.use(upload.array());
app.use(express.static("public"));
//  using middleware to EXPORT A FILE
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running  perfect on port ${process.env.PORT}`);
});
