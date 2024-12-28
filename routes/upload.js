const router = require("koa-router")();
const fs = require("fs");
const path = require("path");
const multer = require("koa-multer");
router.prefix("/upload");

const storge = multer.diskStorage({
  destination: function (req, file, cb) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dir = `./public/images/${year}/${month}/${day}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storge });

//上传个图片
router.post("/img", upload.single("file"), async (ctx, next) => {
  // 获取文件路径并去掉 "public" 部分
  const filePath = ctx.req.file.path.replace("public", "");

  // 使用 path.posix 来确保路径使用正斜杠
  const url = ctx.origin + path.posix.normalize(filePath).replace(/\\/g, "/");

  ctx.body = {
    code: 200,
    msg: "上传成功",
    data: {
      url,
    },
  };
});

//富文本编辑器上传图片
router.post("/editor/img", upload.single("file"), async (ctx, next) => {
  // 获取文件路径并去掉 "public" 部分
  const filePath = ctx.req.file.path.replace("public", "");

  // 使用 path.posix 来确保路径使用正斜杠
  const url = ctx.origin + path.posix.normalize(filePath).replace(/\\/g, "/");
  ctx.body = {
    errno: 0,
    data: [{ url, alt: "", href: "" }],
  };
});

module.exports = router;
