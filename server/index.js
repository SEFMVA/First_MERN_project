const express = require("express");
const mongoose = require("mongoose");
// const fileUpload = require("express-fileupload");

const cors = require("cors");
require("dotenv").config();
const app = express();

const authRoutes = require("./routes/auth");
const filesRoutes = require("./routes/files");
const { createDefaultAdmin } = require("./utils/createDefaultAdmin");

console.log(process.env.DATABASE);

const db = mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.error(err));

db.then(() => {
  console.log("DB Connected");
  createDefaultAdmin();
}).catch((err) => console.error(err));

// app.use(
//   fileUpload({
//     createParentPath: true,
//   })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

app.use("/api/auth", authRoutes);
app.use("/api/files", filesRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
