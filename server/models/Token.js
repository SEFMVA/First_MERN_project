const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let tokensSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "files",
  }
);
module.exports = mongoose.model("Token", tokensSchema);
