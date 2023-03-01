const Comment = require("../models/comment.model");

module.exports.createComment = (req, res, next) => {
    const data = req.body
  
    Comment.create({
      ...data,
    //   user: req.user.id,
      post: req.params.id
    })
      .then((comment) => res.status(201).json(comment))
      .catch(next)
  }
  
  module.exports.deleteComment = (req, res, next) => {
    Comment.findByIdAndDelete(req.params.id)
      .then(comment => res.status(204).json(comment))
      .catch(next)
  }