const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let fileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "files",
  }
);
module.exports = mongoose.model("File", fileSchema);
