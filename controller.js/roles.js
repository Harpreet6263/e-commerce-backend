const { validationResult } = require("express-validator");
const { VALIDATION_ERROR_RESPONSE, BAD_REQUEST, BAD_REQUEST_RESPONSE, SUCCESS_RESPONSE, SERVER_ERROR } = require("../constants/helper");
const Roles = require("../models/Roles");

const createRole = async (req,res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return VALIDATION_ERROR_RESPONSE(res,"VALIDATION_ERROR", errors.array());
      }
      const { name, description, hierarchy_position } = req.body;
      
        let role = await Roles.findOne({ name });
        if (role) {
          return BAD_REQUEST(res, "Role already exists");
        }
        role = new Roles({
          name: name,
          description: description,
          hierarchy_position: hierarchy_position,
        });
  
        await role.save();
        res.json(SUCCESS_RESPONSE(res,"Role created successfully", role));
      } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
      }
    
}

module.exports = {
    createRole,
};