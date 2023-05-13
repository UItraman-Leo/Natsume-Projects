/**
 * @author: Natsume
 * @annotation: UserRouter
 */
const express = require('express');
const UserController = require("../../controllers/admin/UserController")
const UserRouter = express.Router();
// 图片上传
const multer = require('multer')
const uploads = multer({dest: 'public/uploads/'})
// 登录
UserRouter.post("/adminapi/user/login", UserController.login)
// 注册
UserRouter.post("/adminapi/user/enroll", UserController.enroll)
// 修改信息
UserRouter.post("/adminapi/user/upload", uploads.single('file'), UserController.upload)
// 添加用户
UserRouter.post("/adminapi/user/useradd", uploads.single('file'), UserController.useradd)
// 查询整个列表
UserRouter.get("/adminapi/user/list/", UserController.list)
// 查询单条数据
UserRouter.get("/adminapi/user/list/:id", UserController.list)
// 删除数据
UserRouter.delete("/adminapi/user/list/:id", UserController.delete)
// 更新数据
UserRouter.put("/adminapi/user/put/:id", UserController.put)
module.exports = UserRouter;
