const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { exchangeToken, userProfile } = require("../controller.js/user");
const Authorization = require("../middlewares/auth");

router.post(
    "/exchangeToken",
    [
        check("authtoken", "Token is required").not().isEmpty(),
    ],
    exchangeToken
);

router.get("/getUser",
    Authorization,
    userProfile
);

module.exports = router;
