let { add, findById, findByAuthor } = require("../controller/comment");
const router = require("koa-router")();
router.prefix("/comment");
//添加评论
router.post("/add", add);
//根据文章id获取评论
router.get("/web/find", findById);
//根据文章作者获取评论
router.get("/admin/find", findByAuthor);
module.exports = router;
