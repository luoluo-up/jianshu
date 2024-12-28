let mongoose = require("mongoose");

//用户对象
let userSchema = new mongoose.Schema({
  username: String,
  pwd: {
    type: String,
    select: false,
  },
  avatar: {
    type: String,
    default: "",
  },
  sex: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("users", userSchema);
