const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/login-aut");

const mesageSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Email: {
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
  Message: {
    type: String,
    required: true,
  },
});
const collectin3 = mongoose.model("messages", mesageSchema);
module.exports = collectin3;
