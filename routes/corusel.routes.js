const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const {AdminAuthorization} = require("../middlewares/auth");
const { AddCorusel, listCorusel, listActiveCorusel, updateCorusel, updateCoruselStatus, listCoruselById } = require("../controller.js/corusel");

router.post(
    "/create",
    AdminAuthorization,
    [
        check("name", "Name is required").not().isEmpty(),
        check("imageUrl", "Image is required").not().isEmpty(),
    ],
    AddCorusel
);

router.get(
    "/list",
    AdminAuthorization,
    listCorusel
);

router.get(
    "/list/:corusel_id",
    AdminAuthorization,
    listCoruselById
);

router.get(
    "/list-active",
    listActiveCorusel
);

router.put(
    "/update/:corusel_id",
    AdminAuthorization,
    [
        check("name", "Name is required").not().isEmpty(),
        check("image", "Image is required").not().isEmpty(),
    ],
    updateCorusel
);

router.put(
    "/update-status/:corusel_id",
    AdminAuthorization,
    [
        check("status", "Status is required").not().isEmpty().isIn([ 1, 2, 3]),
    ],
    updateCoruselStatus
);

module.exports = router;
