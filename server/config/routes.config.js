const express = require('express');
const router = express.Router();
const secure = require("../middlewares/secure.middleware")
const ongs = require("../controllers/ongs.controller")


//DAshboard and posts
//router.get("/dashboard" )


//Login 
router.post("/login", ongs.login)
router.post("/logout", ongs.logout )


//Ongs
router.post('/ongs', ongs.create);
router.get('/ongs/:id/profile', secure.auth, ongs.profile);
router.get('/ongs/:id/activate', ongs.activate);

module.exports = router;