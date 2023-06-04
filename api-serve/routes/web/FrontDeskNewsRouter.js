const express = require('express');
const FrontDeskNewsController = require("../../controllers/web/FrontDeskNewsController")
const FrontDeskNewsRouter = express.Router();

FrontDeskNewsRouter.get("/web/new/list", FrontDeskNewsController.getlist);

module.exports = FrontDeskNewsRouter