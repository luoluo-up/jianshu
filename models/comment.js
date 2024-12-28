let mongoose = require("mongoose");
//文章评论文档对象
let commentSchema = new mongoose.Schema({
  articleId: String, //文章id
  username: String, //用户姓名
  content: String, //评论内容
  createTime: String, //评论时间
  author: String, //评论作者
  articleTitle: String, //评论文章标题
});

module.exports = mongoose.model("comment", commentSchema);
