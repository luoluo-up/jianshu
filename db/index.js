const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/jianshu", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("数据库连接成功");
  } catch (error) {
    console.log("数据库连接出错", error);
  }
};
