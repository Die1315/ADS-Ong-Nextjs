const express = require('express');
const router = express.Router();
const secure = require("../middlewares/secure.middleware")
const ongs = require("../controllers/ongs.controller")

//DAshboard and posts
//router.get("/dashboard" )

//Ongs

router.post("/auth/login", ongs.login)
router.get("/login/info", secure.auth, ongs.prueba )

module.exports = router;