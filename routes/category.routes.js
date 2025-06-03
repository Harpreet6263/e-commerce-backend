const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const Authorization = require("../middlewares/auth");
const { createCategory, listCategory, listActiveCategory, updateCategory, updateCategoryStatus, createSubCategory, listSubCategorybyCategoryId, updateSubCategory, updateSubCategoryStatus, listActiveCategorywithSubcategory } = require("../controller.js/category");

router.post(
    "/create",
    Authorization,
    [
        check("name", "Name is required").not().isEmpty(),
    ],
    createCategory
);

router.get(
    "/list",
    Authorization,
    listCategory
);

router.get(
    "/list-active",
    Authorization,
    listActiveCategory
);

router.put(
    "/update/:category_id",
    Authorization,
    [
        check("name", "Name is required").not().isEmpty(),
    ],
    updateCategory
);

router.put(
    "/update-status/:category_id",
    Authorization,
    [
        check("status", "Status is required").not().isEmpty().isIn(["1", "2", "3"]),
    ],
    updateCategoryStatus
);

router.post(
    "/sub-category/create",
    Authorization,
    [
        check("name", "Name is required").not().isEmpty(),
        check("category", "Category is required").not().isEmpty(),
    ],
    createSubCategory
);

router.get(
    "/sub-category/list/:category_id",
    Authorization,
    listSubCategorybyCategoryId
);

router.get(
    "/sub-category/list-active/:category_id",
    Authorization,
    listActiveCategory
);

router.put(
    "/sub-category/update/:category_id",
    Authorization,
    [
        check("name", "Name is required").not().isEmpty(),
        check("category", "Category is required").not().isEmpty(),
    ],
    updateSubCategory
);

router.put(
    "/sub-category/update-status/:category_id",
    Authorization,
    [
        check("status", "Status is required").not().isEmpty().isIn(["1", "2", "3"]),
    ],
    updateSubCategoryStatus
);

router.get(
    "/listwithsubcategory",
    listActiveCategorywithSubcategory
);


module.exports = router;
