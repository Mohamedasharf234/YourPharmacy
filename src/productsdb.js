const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/login-aut");

const productSchemna = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  kind: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  descrip: {
    type: String,
    required: true,
  },
  // images: {
  // type: String,
  // required: true,
  // },
});
const collectin2 = mongoose.model("Products", productSchemna);
module.exports = collectin2;
