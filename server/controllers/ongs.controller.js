const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const dev = process.env.NODE_ENV !== 'production'
const next = require('next')
const app = next({ dev })


module.exports.login = (req,res,next) =>{
    const { email, password } = req.body.credentials;
  //console.log(email, password, "+++++++++++")
  if (email === "admin@local.local" && password === "admin") {
    // expire in 30 days
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        email,
        username: "fazt",
      },
      "secret"
    );

    const serialized = cookie.serialize("myTokenName", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });  

    res.setHeader("Set-Cookie", serialized);
    return res.status(200).json({
      message: "Login successful",
    });
  }
  return res.status(401).json({ error: "Invalid credentials" });
}

module.exports.prueba = (req,res,next) => {
    return res.status(200).json({"message": "ok"})
}