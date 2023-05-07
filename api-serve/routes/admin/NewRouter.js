/**
 * @author: Natsume
 * @annotation: NewRouter
 */
var express = require('express');
const NewController = require("../../controllers/admin/NewController")
var NewRouter = express.Router();
// 图片上传
const multer = require('multer')
const uploads = multer({dest: 'public/newuploads/'})
NewRouter.post("/adminapi/new/add", uploads.single('file'), NewController.add)
NewRouter.get("/adminapi/new/list", NewController.getList)
module.exports = NewRouter;
