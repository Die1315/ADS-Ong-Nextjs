const createError = require("http-errors");
const jwt = require("jsonwebtoken");
//const User = require("../models/user.model");

module.exports.auth = (req, res, next) => {
    console.log(req.cookies)
    const token = req.cookies.myTokenName;

  if (!token) {
    return next(createError(401, "Unauthorized: Missing cookie"));
  }
 
  try {
    const decoded = jwt.verify(token, "secret"); //secreto de firma
    next()
    //User.findOne({_id: decoded.sub, active :true})
    
  } catch (err) {
    next(createError(401, "Unautorized: invalid token "));
  }
 
};

//  module.exports.isActive = (req, res, next) => {
//     if (req.admin.active){
//         next()
//     } else {
//         next(createError(403, "forbidden: User is not active"))
//    }

// }
