const express = require('express');
const FrontDeskProductController = require("../../controllers/web/FrontDeskProductController")
const FrontDeskProductRouter = express.Router();

FrontDeskProductRouter.get("/web/content/list", FrontDeskProductController.getlist);

module.exports = FrontDeskProductRouter