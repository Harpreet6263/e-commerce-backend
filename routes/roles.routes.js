const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { createRole } = require("../controller.js/roles");
const {AdminAuthorization} = require("../middlewares/auth");

router.post(
  "/create",
  AdminAuthorization,
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
