const jwt = require('jsonwebtoken');
const createError = require("http-errors");
const User = require("../models/user.model");

const verifyToken = (req, res, next) => {
    const authorization = req.headers.authorization;
  
    if (!authorization) {
      return next(createError(403, "forbidden: user is not admin"));
    }

    const token = authorization.split("Bearer ")[1];

    try {
      const { sub } = jwt.verify(token, '*key secret token*');
      
      User.findById(sub)
      // User.findOne( { _id: sub, active: true } )
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          next(createError(401, "unauthorized: invalid user"));
        }
      })
      .catch(next);

    } catch (err) {
      next(createError(401, "unauthorized: invalid token"));
    }
  };
  
  module.exports = verifyToken;