const express = require('express');
const router = express.Router();
const secure = require("../middlewares/secure.middleware")
const ongs = require("../controllers/ongs.controller")
const users = require("../controllers/users.controllers")
const auth = require('../middlewares/auth.middleware');

//DAshboard and posts
//router.get("/dashboard" )

//Ongs

router.post("/auth/login", ongs.login)
router.get("/login/info", secure.auth, ongs.prueba )


// User
router.post('/users', users.create);
router.post('/login', users.login);
router.get('/profile', auth, users.profile);
router.get('/users/:id/validate', users.validate);

module.exports = router;