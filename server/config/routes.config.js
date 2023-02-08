const express = require('express');
const router = express.Router();
const secure = require("../middlewares/secure.middleware")
const ongs = require("../controllers/ongs.controller")
const auth = require('../middlewares/auth.middleware');

//DAshboard and posts
//router.get("/dashboard" )

//Ongs

router.post("/login", ongs.login)
router.get("/login/info", secure.auth, ongs.prueba )


// User
router.post('/ongs', ongs.create);
router.get('/ongs/:id/profile', secure.auth, ongs.profile);
router.get('/ongs/:id/activate', ongs.activate);

module.exports = router;