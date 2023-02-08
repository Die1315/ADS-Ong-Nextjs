const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const Ong = require("../models/ong.model");
const sendMail = require("../config/email.config");
const cookie = require("cookie");
const dev = process.env.NODE_ENV !== "production";
const hostname =  process.env.HOST || 'localhost:';
const port = process.env.PORT || '3000';
const next = require("next");
const app = next({ dev });

module.exports.create = async (req, res, next) => {
  // console.log(req.body);
  await Ong.create({
    ...req.body,
    active: false,
  })
    .then((ong) => {
      url_activate = `${hostname}${port}/api/ongs/${ong._id}/activate`;
      email_receiver = ong.email;
      console.log(ong.email);
      const mail = {
        from: '"Helpgo 👻" <info@helpgo.com>', // sender address
        to: email_receiver, // list of receivers
        subject: "Link para activar su cienta ✔", // Subject line
        text: "helpgo te da la bienvenida.", // plain text body
        html: `<b>Por favor active su cuenta </b>
        <a>${url_activate}<a/>`, // html body
      };
      sendMail.sendMail(mail).catch(console.error);
      res.status(201).json(ong);
    })
    .catch(next);
   
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body.credentials;

  Ong.findOne({ email, active: true }).then((ong) => {
    if (ong) {
      // expire in 2 days
      ong.checkPassword(password).then((match) => {

        if (match){
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2,
            email,
            username: "fazt",
          },
          "secret"
        );

        const serialized = cookie.serialize("myTokenName", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 24 * 2,
          path: "/",
        });

        res.setHeader("Set-Cookie", serialized);
        return res.status(200).json({
          message: "Login successful",
        });
      } else {
        next(createError(401, "unauthorized"));
      }
      })
      .catch((err) =>{
        next(createError(400, "Password Required"));
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  })
  .catch((err) => {
    console.log(err);
      next();
  });

};

module.exports.prueba = (req, res, next) => {
  return res.status(200).json({ message: "ok" });
};

module.exports.activate = (req, res, next) => {
  const { id } = req.params;
  Ong.findByIdAndUpdate(
    id,
    { active: true },
    { new: true, runValidators: true }
  )
    .then((ong) => {
      if (ong) {
        res.status(200).json(ong);
      } else {
        next();
      }
    })

    .catch(next);
};

module.exports.profile = (req, res, next) =>{
  const { id } = req.params;
  Ong.findById(id)
    .then( ong=> { 
      if(ong) {
        res.status(200).json(ong)
    } else {
      next()
    }}) 
    .catch(next)
}
