let jwt = require("jsonwebtoken");
let Users = require("../models/users");
//用户登录
const login = async (ctx) => {
  let { username, pwd } = ctx.request.body;
  await Users.findOne({ username, pwd })
    .then((res) => {
      if (res) {
        console.log(res);
        let token = jwt.sign(
          { username: res.username, _id: res._id },
          "jianshu-server-jwt",
          {
            expiresIn: 3600 * 24 * 7,
          }
        );
        ctx.body = {
          code: 200,
          msg: "登录成功",
          _id: res._id,
          avatar: res.avatar,

          token,
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "用户名或密码错误",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "登录时出现错误",
        err,
      };
    });
};

//用户注册
const reg = async (ctx) => {
  let { username, pwd } = ctx.request.body;
  let isDouble = false;
  await Users.findOne({ username }).then((res) => {
    if (res) {
      isDouble = true;
    }
  });
  if (isDouble) {
    ctx.body = {
      code: 300,
      msg: "用户名已存在",
    };
    return;
  }
  await Users.create({ username, pwd })
    .then((res) => {
      if (res) {
        ctx.body = {
          code: 200,
          msg: "注册成功",
          res,
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "注册失败",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "注册时出现错误",
        err,
      };
    });
};

//验证用户登录
const verify = async (ctx) => {
  let token = ctx.header.authorization;
  token = token.replace("Bearer ", "");

  try {
    let result = jwt.verify(token, "jianshu-server-jwt");
    await Users.findOne({ _id: result._id })
      .then((res) => {
        if (res) {
          ctx.body = {
            code: 200,
            msg: "用户验证成功",
            res,
          };
        } else {
          ctx.body = {
            code: 500,
            msg: "用户验证失败",
          };
        }
      })
      .catch((err) => {
        ctx.body = {
          code: 500,
          msg: "用户验证失败",
          err,
        };
      });
  } catch (err) {
    ctx.body = {
      code: 500,
      msg: "token验证失败",
      err,
    };
  }
};

//修改用户密码

const updatePwd = async (ctx) => {
  let { username, pwd } = ctx.request.body;
  await Users.updateOne({ username }, { pwd })
    .then((res) => {
      if (res.modifiedCount > 0) {
        ctx.body = {
          code: 200,
          msg: "密码修改成功",
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "密码修改失败",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "密码修改时出现错误",
        err,
      };
    });
};

//修改用户个人资料
const updatePersonal = async (ctx) => {
  let {
    _id,
    avatar = "",
    sex = "",
    desc = "",
    phone = "",
    email = "",
  } = ctx.request.body;
  await Users.updateOne(
    { _id },
    {
      avatar,
      sex,
      desc,
      phone,
      email,
    }
  )
    .then((res) => {
      if (res.modifiedCount > 0) {
        ctx.body = {
          code: 200,
          msg: "修改个人信息成功",
        };
      } else {
        ctx.body = {
          code: 300,
          msg: "修改个人信息失败",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "修改个人信息时出现错误",
        err,
      };
    });
};

module.exports = {
  login,
  reg,
  verify,
  updatePwd,
  updatePersonal,
};
