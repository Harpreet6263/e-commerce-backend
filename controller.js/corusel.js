const { validationResult } = require("express-validator");
const { VALIDATION_ERROR_RESPONSE, BAD_REQUEST, BAD_REQUEST_RESPONSE, SUCCESS_RESPONSE, SERVER_ERROR, ACTIVE_STATUS, SUCCESS_RESPONSE_FOR_LIST } = require("../constants/helper");
const Corusel = require("../models/Corusel");
const { generatePagination } = require("../helpers/pagination");
const { default: mongoose } = require("mongoose");

const AddCorusel = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return VALIDATION_ERROR_RESPONSE(res, "VALIDATION_ERROR", errors.array());
        }
        const { name, imageUrl, periority } = req.body;
        let existingCorusel = await Corusel.findOne({ name });
        if (existingCorusel) {
            return BAD_REQUEST(res, "Corusel already exists");
        }
        existingCorusel = new Corusel({
            name: name,
            image: imageUrl,
            periority: periority,
            status: ACTIVE_STATUS,
        });

        await existingCorusel.save();
        return SUCCESS_RESPONSE(res, "Corusel created successfully", existingCorusel);
    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }
}

const listCorusel = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skipIndex = (page - 1) * limit;
        const search = req.query.search;
        const query = {};
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        var corusel = await Corusel.find(query)
            .sort({ created_at: -1 })
            .skip(skipIndex)
            .limit(limit);
        const totalCount = await Corusel.countDocuments(query);
        var totalPages = totalCount != 0 ? Math.ceil(totalCount / limit) : 0;
        showPagination = generatePagination(page, totalPages);

        return SUCCESS_RESPONSE_FOR_LIST(res, corusel, totalCount, showPagination);
    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }

}

const listCoruselById = async (req, res) => {
    try {
        const id = req.params.corusel_id;
        const query = {};

        var corusel = await Corusel.findById(id);
        if (!corusel) {
            return BAD_REQUEST(res, "Corusel not found");
        }

        return SUCCESS_RESPONSE_FOR_LIST(res, corusel);
    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }

}

const listActiveCorusel = async (req, res) => {
    try {
        const query = {};
        query.status = ACTIVE_STATUS;

        var corusel = await Corusel.find(query)
            .sort({ periority: -1 });


        return SUCCESS_RESPONSE(res,'Corusel list fetched successfully', corusel);
    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }
}

const updateCorusel = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return VALIDATION_ERROR_RESPONSE(res, "VALIDATION_ERROR", errors.array());
        }

        const corusel_id = req.params.corusel_id;
        const { name, image, periority } = req.body;
        console.log("corusel_id", corusel_id);
        
        const objectId = new mongoose.Types.ObjectId(corusel_id);
        
        let corusel = await Corusel.findOne({
            name,
            _id: { $ne: objectId },
        });
        if (corusel) {
            return BAD_REQUEST(res, "Corusel already exists");
        }
        let updatedCorusel = await Corusel.findByIdAndUpdate(
            corusel_id,
            {
                name,
                image,
                periority,
            },
            { new: true }
        );

        return SUCCESS_RESPONSE(res, "Corusel updated successfully", updatedCorusel);

    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }

}

const updateCoruselStatus = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return VALIDATION_ERROR_RESPONSE(res, "VALIDATION_ERROR", errors.array());
        }

        const corusel_id = req.params.corusel_id;
        const { status } = req.body;
        let updated = {
            status: status,
        };
        let updatedCorusel = await Corusel.findByIdAndUpdate(
            corusel_id,
            updated,
            { new: true }
        );

        return SUCCESS_RESPONSE(res, "Corusel status updated successfully", updatedCorusel);

    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }

}

module.exports = {
    AddCorusel,
    listCorusel,
    listCoruselById,
    listActiveCorusel,
    updateCorusel,
    updateCoruselStatus
}