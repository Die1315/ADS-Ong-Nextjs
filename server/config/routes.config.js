const express = require('express');
const router = express.Router();
const secure = require("../middlewares/secure.middleware")
const ongs = require("../controllers/ongs.controller")
const posts = require("../controllers/posts.controller")
const comments = require("../controllers/comments.controller")
const messages = require("../controllers/messages.controller");

//DAshboard and posts
//router.get("/dashboard" )


//Login 
router.post("/login", ongs.login)
router.post("/logout", ongs.logout )


//Ongs
router.post('/ongs', ongs.create);
//router.get('/ongs', secure.auth, ongs.list);
router.get('/ongwithpostlist', secure.auth, ongs.ongWithPost);
router.get('/ongs/:id/profile', secure.auth, ongs.profile);
router.get('/ongs/profile', secure.auth, ongs.profile); //owner profile
router.get('/ongs/:id/activate', ongs.activate);
router.post('/ongs/:id/follow', secure.auth, ongs.follow)
router.get('/ongs/newConnections', secure.auth, ongs.Connections)

// Post
router.post('/posts', secure.auth, posts.create);
router.get('/postsbyong/:id', secure.auth, posts.postByOng);
router.get('/postsbyong', secure.auth, posts.postByOng);
router.get('/postsall', secure.auth, posts.postsAll);
router.post('/postEdit/:id', secure.auth, posts.postEdit);
router.delete('/postDelete/:id', secure.auth, posts.postDelete);
router.get('/posts/followers', secure.auth, posts.postList);
router.put('/posts/:id/like', secure.auth)

// Comment
router.post('/createComment/:id', secure.auth, comments.createComment);
router.delete('/deleteComment/:id', secure.auth, comments.deleteComment);

// Message
router.post("/addMessage", secure.auth, messages.addMessage);
router.post("/getMessages", secure.auth, messages.getAllMessages);

module.exports = router;