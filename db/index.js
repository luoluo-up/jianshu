const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect("mongodb://8.134.92.247:27017/jianshu", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("数据库连接成功");
  } catch (error) {
    console.log("数据库连接出错", error);
  }
};
