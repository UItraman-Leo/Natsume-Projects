/**
 * @author: Natsume
 * @annotation: ProductRouter
 */
const express = require('express');
const ProductController = require("../../controllers/admin/ProductController")
const ProductRouter = express.Router();
//获取整个数据库列表
ProductRouter.get("/adminapi/product/getlist", ProductController.getlist)
// 添加数据
ProductRouter.post("/adminapi/product/add", ProductController.add)
// 删除一条
ProductRouter.delete("/adminapi/product/setDel/:id", ProductController.setDel)
// 修改
ProductRouter.put("/adminapi/product/put/", ProductController.put)
module.exports = ProductRouter;
