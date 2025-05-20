const Comment = require("../models/comment.model");

module.exports.createComment = (req, res, next) => {
    const data = req.body
    const currentOng = req.ong;
    Comment.create({
      ...data.dataComment,
    //   user: req.user.id,
      post: req.params.id,
      ong: currentOng.id
    })
      .then((comment) => res.status(201).json(comment))
      .catch(next)
  }
  
  module.exports.deleteComment = (req, res, next) => {
    const currentOng = req.ong 
    const commentId= req.params.id
    console.log(currentOng.id,commentId)
    Comment.findOneAndDelete({ong:currentOng.id, _id:commentId})
            .then((comment) => {
              if(comment){
                res.status(200).json(comment)
              } else {
                res.status(403).json({message:"This is not your comment"})
              }})
            .catch(next)
    }
   