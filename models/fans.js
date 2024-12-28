let mongoose = require("mongoose");
//粉丝文档对象
let fansSchema = new mongoose.Schema({
  username: String,
  author: String,
  createTime: String,
});

module.exports = mongoose.model("fans", fansSchema);
