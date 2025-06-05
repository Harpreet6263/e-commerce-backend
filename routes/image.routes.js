const express = require("express");
const router = express.Router();

const {AdminAuthorization} = require("../middlewares/auth");
const { getImageAuth } = require("../controller.js/image");

router.get(
  "/auth",
  AdminAuthorization,
  getImageAuth
);

module.exports = router;
