let Fans = require("../models/fans");

// 关注作者
const follow = async (ctx, next) => {
  let fans = ctx.request.body;
  console.log("1111111", fans);
  await Fans.create(fans)
    .then((res) => {
      if (res) {
        ctx.body = {
          code: 200,
          message: "关注成功",
        };
      } else {
        ctx.body = {
          code: 500,
          message: "关注失败",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        message: "关注异常",
        err,
      };
    });
};

// 取消关注
const unfollow = async (ctx, next) => {
  let { username, author } = ctx.request.body;
  await Fans.findOneAndDelete({ username, author })
    .then((res) => {
      if (res) {
        ctx.body = {
          code: 200,
          message: "取消关注成功",
        };
      } else {
        ctx.body = {
          code: 300,
          message: "取消关注失败",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        message: "取消关注异常",
        err,
      };
    });
};

//查询粉丝
const findAll = async (ctx, next) => {
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
  let count = await Fans.countDocuments({ author }).exec();
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

  await Fans.find({ author })
    .skip(start)
    .limit(pageSize)
    .exec()
    .then((res) => {
      if (res && res.length > 0) {
        ctx.body = {
          code: 200,
          message: "查询成功",
          data: res,
          page,
          pageSize,
          count,
        };
      } else {
        ctx.body = {
          code: 300,
          message: "查询失败",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        message: "查询异常",
        err,
      };
    });
};

module.exports = {
  follow,
  unfollow,
  findAll,
};
