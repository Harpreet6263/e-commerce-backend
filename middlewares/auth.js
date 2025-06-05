const jwt = require("jsonwebtoken");
const { BAD_REQUEST } = require("../constants/helper");

const AdminAuthorization = async (req, res,next) => {

  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: "Token is not valid" });
      } else {
        if (decoded.user.role == process.env.SELLER_ROLE_ID) {
          req.user = decoded.user;
          next();
        } else {
          return BAD_REQUEST(res, "You are not authorized to access this resource");
        }
      }
    });
  } catch (err) {
    console.error("Something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
const Auth = async (req, res,next) => {

  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    await jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: "Token is not valid" });
      } 
      req.user = decoded.user;
      next();
    });
  } catch (err) {
    console.error("Something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
module.exports = {AdminAuthorization, Auth};
