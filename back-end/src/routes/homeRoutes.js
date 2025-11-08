const express = require("express");
const HomeController = require("../controllers/homeController.js");

const homeRouter = express.Router();

homeRouter.get("/all", HomeController.getAllHomeProduct); // dùng đúng biến homeRouter

module.exports = homeRouter;
