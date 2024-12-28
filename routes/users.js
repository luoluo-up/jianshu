const router = require("koa-router")();
router.prefix("/users");
const {
  login,
  reg,
  verify,
  updatePwd,
  updatePersonal,
} = require("../controller/users");
//用户登录
router.post("/login", login);
//用户注册
router.post("/reg", reg);
//验证用户登录
router.post("/verify", verify);
//修改用户密码
router.post("/update/pwd", updatePwd);
//修改用户信息
router.post("/update/personal", updatePersonal);
module.exports = router;
