const Comment = require("../models/comment.model");
const Post = require("../models/post.model");
const createError = require("http-errors");
// const Ong = require("../models/ong.model");

module.exports.create = async (req, res, next) => {
  //console.log(req.body.dataRegister);
  const currentOng = req.ong;

  await Post.create({ ...req.body.dataRegister, owner: currentOng.id })
   .then((post) => {
      currentOng.posts.push(post);
      currentOng.save();
      post.populate("owner", "name image category").execPopulate()
      .then(()=>res.status(201).json(post))      
    })
    .catch((error) => next(error));
};

module.exports.postByOng = async (req, res, next) => {
  let { id } = req.params;
  if (!id) {
    id = req.ong.id;
  }
  let postsByOng = await Post.find({ owner: id }).populate("owner", "name image category");
  res.status(200).json(postsByOng);
};

module.exports.postsGlobal = async (req, res, next) => {
  const currentOng = req.ong;
  //let ongs = currentOng.following.concat(currentOng.id) 
  //console.log(currentOng.id);
  let postsAll = await Post.find({ owner: { $nin : currentOng.id } })
    .populate("owner", "name image category")
    .then((posts) => {
      //console.log(posts);
      res.status(200).json(posts);
    })
    .catch(next);
};


module.exports.postEdit = async (req, res, next) => {
  const data = req.body;
   // console.log(req.params.id, data)
    Post.findByIdAndUpdate(req.params.id, data, {new : true}).populate("owner", "name image category")
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        next(createError(404, "post not found"));
      }
    })
    .catch(next);
};

module.exports.postDelete = async (req, res, next) => {
  const currentOng = req.ong
  const {id} = req.params
  Post.findOneAndDelete({_id: id, owner:currentOng.id})
    .then((post) => {
      if (post) {
        currentOng.posts.pull(post.id)
        currentOng.save()
        res.status(200).json(post);
      } else {
        next(createError(404, "post not found"));
      }
    })
    .catch(next);
};

module.exports.postList = (req, res, next) => {
  const currentOng = req.ong;
  let following = currentOng.following
  
   Post.find({ owner: { $in:following } })
    .populate("owner","name image category")
    .then((posts) => {
      //console.log(posts)
      res.status(200).json(posts);
    })
    .catch(next);
};

module.exports.likeToggle = (req, res, next) => {
  let { id } = req.params;
  const currentOng = req.ong;
  let like = {
    state: false,
    message: "unLike",
  };
  Post.findById(id)
    .then((post) => {
      if (post.likes.includes(currentOng.id)) {
        post.likes.splice(
          post.likes.findIndex((e) => e.id === currentOng.id),
          1
        );
      } else {
        post.likes.push(currentOng.id);
        like.state = true;
        like.message = "like";
      }
      post.save();
      res.status(200).json(like);
    })
    .catch(next);
};

module.exports.getCommentByPost = (req,res,next)=>{
  const postId = req.params.id
  Comment.find({post:postId}).populate("ong", "image")
         .then((comments)=> res.status(200).json(comments))
         .catch(next)

};
module.exports.getPost = (req,res,next)=>{
  const id= req.params.id
  Post.findById(id).then((post)=> res.status(200).json(post))
  .catch(next)
}


