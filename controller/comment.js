let Comment = require("../models/comment");
let Article = require("../models/article");

// 添加评论

const add = async (ctx, next) => {
  let comment = ctx.request.body;
  let isComment = false;
  await Comment.create(comment)
    .then((res) => {
      if (res) {
        isComment = true;
        ctx.body = {
          code: 200,
          msg: "评论成功",
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "评论失败",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "评论失败",
        err,
      };
    });
  if (isComment) {
    let articleId = comment.articleId;
    await Article.updateOne({ articleId }, { $inc: { comment: 1 } });
  }
};

// 前台查询评论，通过ID进行查询
const findById = async (ctx, next) => {
  let { id } = ctx.query;
  await Comment.find({ articleId: id })
    .then((res) => {
      if (res && res.length > 0) {
        ctx.body = {
          code: 200,
          msg: "评论查询成功",
          data: res,
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "评论查询失败",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "评论查询异常 ",
        err,
      };
    });
};

// 后台查询评论，通过文章作者进行查询
const findByAuthor = async (ctx, next) => {
  let { page, author } = ctx.query;
  // 判断页码
  if (!page || isNaN(Number(page))) {
    page = 1;
  } else {
    page = Number(page);
  }
  //每页条数
  let pageSize = 10;

  //计算总页数
  //   let total = await Article.countDocuments({ author });
  // 计算总文档数
  let count = await Comment.countDocuments({ author }).exec();
  // 计算总页数
  const totalPage = count > 0 ? Math.ceil(count / pageSize) : 0;

  // 判断当前页码的范围
  if (page > totalPage && totalPage > 0) {
    page = totalPage;
  } else if (page < 1) {
    page = 1;
  }

  // 计算起始位置
  let start = (page - 1) * pageSize;
  await Comment.find({ author })
    .skip(start)
    .limit(pageSize)
    .then((res) => {
      if (res && res.length > 0) {
        ctx.body = {
          code: 200,
          msg: "评论查询成功",
          data: res,
          count,
          page,
          pageSize,
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "评论查询失败",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "评论查询异常 ",
        err,
      };
    });
};
module.exports = {
  add,
  findById,
  findByAuthor,
};
