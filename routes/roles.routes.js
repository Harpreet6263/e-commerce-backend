const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { createRole } = require("../controller.js/roles");
const Authorization = require("../middlewares/auth");

router.post(
  "/create",
  Authorization,
  [
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("hierarchy_position", "Hierarchy position is required")
      .not()
      .isEmpty(),
  ],
  createRole
);

module.exports = router;
