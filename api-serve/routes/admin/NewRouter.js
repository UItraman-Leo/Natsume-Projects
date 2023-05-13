/**
 * @author: Natsume
 * @annotation: NewRouter
 */
const express = require('express');
const NewController = require("../../controllers/admin/NewController")
const NewRouter = express.Router();
// 图片上传
const multer = require('multer')
const uploads = multer({dest: 'public/newuploads/'})
// 添加
NewRouter.post("/adminapi/new/add", uploads.single('file'), NewController.add)
//获取整个数据库列表
NewRouter.get("/adminapi/new/list", NewController.getList)
// 修改发布状态
NewRouter.put("/adminapi/new/switch", NewController.switch)
//获取id下的数据
NewRouter.get("/adminapi/new/list/:id", NewController.getList)
// 修改单条
NewRouter.post("/adminapi/new/list/",uploads.single('file'), NewController.setList)
// 删除一条
NewRouter.delete("/adminapi/new/setDel/:id", NewController.setDel)
module.exports = NewRouter;
