let mongoose = require("mongoose");

// 文章文档对象
let articleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  createTime: String,
  content: String,
  stemfrom: String,
  read: {
    type: Number,
    default: 0,
  },
  star: {
    type: Number,
    default: 0,
  },
  comment: {
    type: Number,
    default: 0,
  },
  author: String,
});

module.exports = mongoose.model("Article", articleSchema);
