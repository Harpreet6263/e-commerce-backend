const express = require("express");
const router = express.Router();

const Authorization = require("../middlewares/auth");
const { getImageAuth } = require("../controller.js/image");

router.get(
  "/auth",
  Authorization,
  getImageAuth
);

module.exports = router;
