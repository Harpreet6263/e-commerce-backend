const { validationResult } = require("express-validator");
const { VALIDATION_ERROR_RESPONSE, BAD_REQUEST, BAD_REQUEST_RESPONSE, SUCCESS_RESPONSE, SERVER_ERROR, ACTIVE_STATUS, SUCCESS_RESPONSE_FOR_LIST } = require("../constants/helper");
const Category = require("../models/Category");
const { generatePagination } = require("../helpers/pagination");
const SubCategory = require("../models/SubCategory");

const createCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return VALIDATION_ERROR_RESPONSE(res, "VALIDATION_ERROR", errors.array());
        }
        const { name, image, description } = req.body;
        let productCategory = await Category.findOne({ name });
        if (productCategory) {
            return BAD_REQUEST(res, "Category already exists");
        }
        productCategory = new Category({
            name: name,
            image: image,
            description: description,
            status: ACTIVE_STATUS,
        });

        await productCategory.save();
        return SUCCESS_RESPONSE(res, "Category created successfully", productCategory);
    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }

}

const listCategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skipIndex = (page - 1) * limit;
        const search = req.query.search;
        const query = {};
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        var productCategory = await Category.find(query)
            .sort({ created_at: -1 })
            .skip(skipIndex)
            .limit(limit);
        const totalCount = await Category.countDocuments(query);
        var totalPages = totalCount != 0 ? Math.ceil(totalCount / limit) : 0;
        showPagination = generatePagination(page, totalPages);

        return SUCCESS_RESPONSE_FOR_LIST(res, productCategory, totalCount, showPagination);
    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }

}

const listActiveCategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skipIndex = (page - 1) * limit;
        const search = req.query.search;
        const query = {};
        query.status = ACTIVE_STATUS;
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        var productCategory = await Category.find(query)
            .sort({ created_at: -1 })
            .skip(skipIndex)
            .limit(limit);
        const totalCount = await Category.countDocuments(query);
        var totalPages = totalCount != 0 ? Math.ceil(totalCount / limit) : 0;
        showPagination = generatePagination(page, totalPages);

        return SUCCESS_RESPONSE_FOR_LIST(res, productCategory, totalCount, showPagination);
    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }
}

const updateCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return VALIDATION_ERROR_RESPONSE(res, "VALIDATION_ERROR", errors.array());
        }

        const category_id = req.params.category_id;
        const { name, image, description } = req.body;
        let category = await Category.findOne({
            name,
            _id: { $ne: category_id },
        });
        if (category) {
            return BAD_REQUEST(res, "Category already exists");
        }
        let productCategory = await Category.findByIdAndUpdate(
            category_id,
            {
                name,
                image,
                description,
            },
            { new: true }
        );

        return SUCCESS_RESPONSE(res, "Category updated successfully", productCategory);

    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }

}

const updateCategoryStatus = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return VALIDATION_ERROR_RESPONSE(res, "VALIDATION_ERROR", errors.array());
        }

        const category_id = req.params.category_id;
        const { status } = req.body;
        let updatedCategory = {
            status: status,
        };
        let productCategory = await Category.findByIdAndUpdate(
            category_id,
            updatedCategory,
            { new: true }
        );

        return SUCCESS_RESPONSE(res, "Category status updated successfully", productCategory);

    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }

}

//// sub category
const createSubCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return VALIDATION_ERROR_RESPONSE(res, "VALIDATION_ERROR", errors.array());
        }
        const { name, image, description, category } = req.body;
        let productCategory = await SubCategory.findOne({ name, category });
        if (productCategory) {
            return BAD_REQUEST(res, "Sub-category already exists");
        }
        productCategory = new SubCategory({
            name: name,
            image: image,
            description: description,
            category: category,
            status: ACTIVE_STATUS,
        });

        await productCategory.save();
        return SUCCESS_RESPONSE(res, "Sub-category created successfully", productCategory);
    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }

}

const listSubCategorybyCategoryId = async (req, res) => {
    try {
        const category_id = req.params.category_id;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skipIndex = (page - 1) * limit;
        const search = req.query.search;
        const query = {};
        query.category = category_id;
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        var productCategory = await SubCategory.find(query)
            .sort({ created_at: -1 })
            .skip(skipIndex)
            .limit(limit);
        const totalCount = await SubCategory.countDocuments(query);
        var totalPages = totalCount != 0 ? Math.ceil(totalCount / limit) : 0;
        showPagination = generatePagination(page, totalPages);

        return SUCCESS_RESPONSE_FOR_LIST(res, productCategory, totalCount, showPagination);
    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }

}

const listActiveSubCategorybyCategoryId = async (req, res) => {
    try {
        const category_id = req.params.category_id;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skipIndex = (page - 1) * limit;
        const search = req.query.search;
        const query = {};
        query.category = category_id;
        query.status = ACTIVE_STATUS;
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        var productCategory = await SubCategory.find(query)
            .sort({ created_at: -1 })
            .skip(skipIndex)
            .limit(limit);
        const totalCount = await SubCategory.countDocuments(query);
        var totalPages = totalCount != 0 ? Math.ceil(totalCount / limit) : 0;
        showPagination = generatePagination(page, totalPages);

        return SUCCESS_RESPONSE_FOR_LIST(res, productCategory, totalCount, showPagination);
    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }
}

const updateSubCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return VALIDATION_ERROR_RESPONSE(res, "VALIDATION_ERROR", errors.array());
        }

        const category_id = req.params.category_id;
        const { name, image, description } = req.body;

        let findedCategory = await SubCategory.findOne({
            _id: category_id,
        });
        if (!findedCategory) {
            return BAD_REQUEST(res, "Sub-category not found");
        }

        let category = await SubCategory.findOne({
            name,
            category: findedCategory.category,
            _id: { $ne: category_id },
        });
        if (category) {
            return BAD_REQUEST(res, "Sub-category already exists");
        }
        let productCategory = await SubCategory.findByIdAndUpdate(
            category_id,
            {
                name,
                image,
                description,
            },
            { new: true }
        );

        return SUCCESS_RESPONSE(res, "Sub-category updated successfully", productCategory);

    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }

}

const updateSubCategoryStatus = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return VALIDATION_ERROR_RESPONSE(res, "VALIDATION_ERROR", errors.array());
        }

        const category_id = req.params.category_id;
        const { status } = req.body;
        let updatedCategory = {
            status: status,
        };
        let productCategory = await SubCategory.findByIdAndUpdate(
            category_id,
            updatedCategory,
            { new: true }
        );

        return SUCCESS_RESPONSE(res, "Sub-category status updated successfully", productCategory);

    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }

}



const listActiveCategorywithSubcategory = async (req, res) => {
    try {

        const query = {};
        query.status = ACTIVE_STATUS;

        const categoryPipeline = [
            {
                $match: query,
            },
            {
                $lookup: {
                    from: "sub_categories",
                    localField: "_id",
                    foreignField: "category",
                    as: "subcategories",
                },
            },
            {
                $addFields: {
                    subcategories: {
                        $filter: {
                            input: "$subcategories",
                            as: "sub",
                            cond: { $eq: ["$$sub.status", ACTIVE_STATUS] }
                        }
                    }
                }
            },
            {
                $sort: { created_at: -1 },
            },

        ]




        var productCategory = await Category.aggregate(categoryPipeline);
        return SUCCESS_RESPONSE(res, "Category list", productCategory);

    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }
}

module.exports = {
    createCategory,
    listCategory,
    listActiveCategory,
    updateCategory,
    updateCategoryStatus,
    createSubCategory,
    listSubCategorybyCategoryId,
    listActiveSubCategorybyCategoryId,
    updateSubCategory,
    updateSubCategoryStatus,
    listActiveCategorywithSubcategory
};