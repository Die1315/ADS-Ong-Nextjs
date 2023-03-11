const Comment = require("../models/comment.model");
const jwt = require("jsonwebtoken");
module.exports.createComment = (req, res, next) => {
    const data = req.body
    const token = req.cookies.myTokenName;
    const decoded = jwt.verify(token, "secret");
    Comment.create({
      ...data,
    //   user: req.user.id,
      post: req.params.id,
      ong: decoded.id
    })
      .then((comment) => res.status(201).json(comment))
      .catch(next)
  }
  
  module.exports.deleteComment = (req, res, next) => {
    Comment.findByIdAndDelete(req.params.id)
      .then(comment => res.status(204).json(comment))
      .catch(next)
  }