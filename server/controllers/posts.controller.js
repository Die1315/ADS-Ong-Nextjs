const jwt = require("jsonwebtoken");
const Post = require("../models/post.model");

module.exports.create = async (req, res, next) => {
    // console.log(req.body.dataRegister);
    // const token = req.cookies.myTokenName;
    // const decoded = jwt.verify(token, "secret");

    // await Post.create({ ...req.body, owner:decoded.id })
    await Post.create({ ...req.body.dataRegister})
        .then((post) => {
            // console.log(post);
            res.status(201).json(post);
        })
        .catch((error) => console.log(error));
};

module.exports.postByOng = async (req, res, next) => {
    const { id } = req.params;
    let postsByOng = await Post.find({ owner: id }).populate("posts");
    res.status(200).json(postsByOng)
}

module.exports.postsAll = async (req, res, next) => {
    let postsAll = await Post.find();
    res.status(200).json(postsAll)
}

module.exports.postEdit = async (req, res, next) => {
    const data = req.body;

    Object.assign(req.body, data);

    Post.findByIdAndUpdate(req.params.id, req.body)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                next(createError(404, "post not found"));
            }
        })
        .catch(next);
}

module.exports.postDelete = (req, res, next) => {

    Post.findByIdAndDelete(req.params.id)
        .then(post => {
            if (post) {
                res.status(204).json(post);
            } else {
                next(createError(404, "post not found"));
            }
        })
        .catch(next);

}