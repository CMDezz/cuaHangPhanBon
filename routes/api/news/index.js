const express = require("express");
const newsController = require("./controller");
const {authenticate,authorize} = require('./../../../middlewares/auth')
const {validateCreateNews} = require("./../../../middlewares/validate/news")

const router = express.Router();

router.get("/",newsController.getNews);
router.post("/",
    authenticate,
    authorize(["Staff","Admin"]),
    validateCreateNews,
    newsController.createNews
);
router.delete("/:id",
    authenticate,
    authorize(["Admin"]),
    newsController.deleteNewsById)
router.put("/:id",
    authenticate,
    authorize(["Staff","Admin"]),
    newsController.updateNewsById)
module.exports= router;