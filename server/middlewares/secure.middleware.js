const createError = require("http-errors");
const jwt = require("jsonwebtoken");
//const User = require("../models/user.model");
const Ong = require("../models/ong.model");

module.exports.auth = (req, res, next) => {
  const token = req.cookies.myTokenName;

  if (!token) {
    return next(createError(401, "Unauthorized: Missing cookie"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    Ong.findOne({ _id: decoded.id, active: true })
      .then((user) => {
        if (user) {
          req.ong = user;
          next();
        } else {
          next(createError(401, "unauthorized: invalid user"));
        }
      })
      .catch(next);
  } catch (err) {
    next(createError(401, "Unautorized: invalid token "));
  }
};
