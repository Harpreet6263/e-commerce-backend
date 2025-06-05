const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const {AdminAuthorization} = require("../middlewares/auth");
const { createCategory, listCategory, listActiveCategory, updateCategory, updateCategoryStatus, createSubCategory, listSubCategorybyCategoryId, updateSubCategory, updateSubCategoryStatus, listActiveCategorywithSubcategory } = require("../controller.js/category");

router.post(
    "/create",
    AdminAuthorization,
    [
        check("name", "Name is required").not().isEmpty(),
    ],
    createCategory
);

router.get(
    "/list",
    AdminAuthorization,
    listCategory
);

router.get(
    "/list-active",
    AdminAuthorization,
    listActiveCategory
);

router.put(
    "/update/:category_id",
    AdminAuthorization,
    [
        check("name", "Name is required").not().isEmpty(),
    ],
    updateCategory
);

router.put(
    "/update-status/:category_id",
    AdminAuthorization,
    [
        check("status", "Status is required").not().isEmpty().isIn(["1", "2", "3"]),
    ],
    updateCategoryStatus
);

router.post(
    "/sub-category/create",
    AdminAuthorization,
    [
        check("name", "Name is required").not().isEmpty(),
        check("category", "Category is required").not().isEmpty(),
    ],
    createSubCategory
);

router.get(
    "/sub-category/list/:category_id",
    AdminAuthorization,
    listSubCategorybyCategoryId
);

router.get(
    "/sub-category/list-active/:category_id",
    AdminAuthorization,
    listActiveCategory
);

router.put(
    "/sub-category/update/:category_id",
    AdminAuthorization,
    [
        check("name", "Name is required").not().isEmpty(),
        check("category", "Category is required").not().isEmpty(),
    ],
    updateSubCategory
);

router.put(
    "/sub-category/update-status/:category_id",
    AdminAuthorization,
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
