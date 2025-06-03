const { validationResult } = require("express-validator");
const { VALIDATION_ERROR_RESPONSE, BAD_REQUEST, BAD_REQUEST_RESPONSE, SUCCESS_RESPONSE, SERVER_ERROR } = require("../constants/helper");
const ImageKit = require("imagekit");

const getImageAuth = async (req,res) => {
    try {
        const imagekit = new ImageKit({
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
            privateKey: process.env.IMAGEKIT_SECRET_KEY, // secret
            urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/",
          });
          const authParams = imagekit.getAuthenticationParameters();

        res.json(SUCCESS_RESPONSE(res,"", authParams));
      } catch (err) {
        console.error(err.message);
        return SERVER_ERROR(res, "Server Error");
      }
    
}

module.exports = {
    getImageAuth,
};