const { validationResult } = require("express-validator");
const { VALIDATION_ERROR_RESPONSE, BAD_REQUEST, BAD_REQUEST_RESPONSE, SUCCESS_RESPONSE, SERVER_ERROR, ACTIVE_STATUS } = require("../constants/helper");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const Roles = require("../models/Roles");

const exchangeToken = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return VALIDATION_ERROR_RESPONSE(res, "VALIDATION_ERROR", errors.array());
        }
        const { authtoken } = req.body;

        const decoded = jwt.decode(authtoken);
        const { email, name, picture } = decoded;
        if (!email) {
            return BAD_REQUEST(res, "Invalid token");
        }
        let user = await Users.findOne({ email });

        if (!user) {
            const role = await Roles.findOne({ hierarchy_position: "u" });
            if (!role) {
                return BAD_REQUEST(res, "Role not found");
            }

            await Users.create({
                email: email,
                name: name,
                profile_image: picture,
                role: role._id,
                status: ACTIVE_STATUS,
            });

        }
        user = await Users.findOne({ email });
        if (!user) {
            return BAD_REQUEST(res, "Error occurred while creating user");
        }

        if (user.status !== ACTIVE_STATUS) {
            return BAD_REQUEST(res, "Account is deactivated. Please contact support.");
        }

        const payload = {
            user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            profile_image: user.profile_image
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "8h",
        });


        return SUCCESS_RESPONSE(res, "Login successfull", {token,user});
    } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
    }

}

const userProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return VALIDATION_ERROR_RESPONSE(res, "VALIDATION_ERROR", errors.array());
    }
    const { id } = req.user;
    const user = await Users.findById(id);
    if (!user) {
        return BAD_REQUEST(res, "Something went wrong. Try to login again");
    }
    return SUCCESS_RESPONSE(res, "User fetched successfully", user);

}

module.exports = {
    exchangeToken,
    userProfile
};