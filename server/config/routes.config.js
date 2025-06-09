const express = require('express');
const router = express.Router();
const secure = require("../middlewares/secure.middleware")
const ongs = require("../controllers/ongs.controller")
const posts = require("../controllers/posts.controller")
const comments = require("../controllers/comments.controller")
const messages = require("../controllers/messages.controller");
const multer = require('multer');
//DAshboard and posts

//Login 
router.post("/login", ongs.login)
router.post("/logout", ongs.logout )


//Ongs
router.post('/ongs', ongs.create);
router.get('/ongs/:id/profile', secure.auth, ongs.profile);
router.get('/ongs/profile', secure.auth, ongs.profile); //owner profile
router.put('/ongs/activate', ongs.activate);
router.put('/ongs/:id/follow', secure.auth, ongs.follow)
router.get('/ongs/newConnections', secure.auth, ongs.Connections)
router.get('/ongs/following', secure.auth, ongs.followingOng)
router.get('/ongs/:id/following', secure.auth, ongs.followingOng)
router.put('/ongs/edit', secure.auth, ongs.editProfile)
router.post('/ongs/recoverRequest', ongs.requestUpdatePassword)
router.put('/ongs/recover',ongs.updatePassword)
router.post('/ongs/upload', multer().single('file'), ongs.uploadImage)
// Post
router.post('/post', secure.auth, posts.create);
router.get('/post/:id', secure.auth, posts.getPost);
router.get('/posts/:id/ong', secure.auth, posts.postByOng);
router.get('/posts/ong', secure.auth, posts.postByOng);
router.get('/posts/Global', secure.auth, posts.postsGlobal);
router.put('/post/:id/edit', secure.auth, posts.postEdit);
router.get('/posts/following', secure.auth, posts.postList);
router.delete('/post/:id', secure.auth, posts.postDelete);
router.put('/post/:id/like', secure.auth, posts.likeToggle);
router.get('/post/:id/comments', secure.auth, posts.getCommentByPost);
router.get('/posts/nearPost', secure.auth, posts.getNearPosts);
// Comment
router.post('/comment/:id/create', secure.auth, comments.createComment);
router.delete('/comment/:id/delete', secure.auth, comments.deleteComment);

// Message
router.post("/addMessage", secure.auth, messages.addMessage);
router.post("/getMessages", secure.auth, messages.getAllMessages);
router.post("/getFollowedUsers", secure.auth, messages.getFollowedUsers);
router.put("/message/read", secure.auth, messages.setAsRead)
router.get("/message/isRead",secure.auth, messages.areThereUnRead)
module.exports = router;