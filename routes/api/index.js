const express = require("express");

const router = express.Router();

router.use("/news",require("./news"));
router.use("/users",require("./user"));

module.exports= router;
