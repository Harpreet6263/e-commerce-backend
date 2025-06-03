const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const Authorization = require("../middlewares/auth");
const { AddCorusel, listCorusel, listActiveCorusel, updateCorusel, updateCoruselStatus, listCoruselById } = require("../controller.js/corusel");

router.post(
    "/create",
    Authorization,
    [
        check("name", "Name is required").not().isEmpty(),
        check("imageUrl", "Image is required").not().isEmpty(),
    ],
    AddCorusel
);

router.get(
    "/list",
    Authorization,
    listCorusel
);

router.get(
    "/list/:corusel_id",
    Authorization,
    listCoruselById
);

router.get(
    "/list-active",
    listActiveCorusel
);

router.put(
    "/update/:corusel_id",
    Authorization,
    [
        check("name", "Name is required").not().isEmpty(),
        check("image", "Image is required").not().isEmpty(),
    ],
    updateCorusel
);

router.put(
    "/update-status/:corusel_id",
    Authorization,
    [
        check("status", "Status is required").not().isEmpty().isIn([ 1, 2, 3]),
    ],
    updateCoruselStatus
);

module.exports = router;
