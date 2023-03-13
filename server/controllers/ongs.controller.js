const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const Ong = require("../models/ong.model");
const sendMail = require("../config/email.config");
const cookie = require("cookie");
// const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST || "localhost:";
const port = process.env.PORT || "3000";
// const next = require("next");
// const app = next({ dev });

module.exports.create = async (req, res, next) => {
  await Ong.create({
    ...req.body.dataRegister,
    active: false,
  })
    .then((ong) => {
      url_activate = `${hostname}${port}/api/ongs/${ong._id}/activate`;
      email_receiver = ong.email;
      // console.log(ong.email);
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
    .catch((err) => {
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  //console.log(req.body);
  const { email, password } = req.body.credentials;

  Ong.findOne({ email })
    .then((ong) => {
      if (ong) {
        // console.log(ong);
        // expire in 2 days
        if (ong.active === false) {
          next(createError(401, "User is not active"));
        }
        ong
          .checkPassword(password)
          .then((match) => {
            if (match) {
              const token = jwt.sign(
                {
                  //exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2,
                  email: ong.email,
                  username: ong.name,
                  id: ong.id,
                },
                "secret",
                { expiresIn: "24h" }
              );

              const serialized = cookie.serialize("myTokenName", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 2,
                path: "/",
              });
              res.cookie(serialized);
              return res.status(200).json({
                message: "Login successful",
              });
            } else {
              next(createError(401, "Invalid credentials"));
            }
          })
          .catch((err) => {
            next(createError(400, "Password Required"));
          });
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    })
    .catch((err) => {
      //console.log(err);
      next();
    });
};

module.exports.logout = (req, res, next) => {
  res.clearCookie("myTokenName");
  return res.status(200).json({ message: "ok" });
};

module.exports.activate = (req, res, next) => {
  const { id } = req.params;
  Ong.findOneAndUpdate(
    { _id: id },
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

module.exports.profile = (req, res, next) => {
  let { id } = req.params;
  if (id === undefined) {
     id = req.ong.id;
  }

  Ong.findById(id)
    .then((ong) => {
      if (ong) {
        res.status(200).json(ong);
      } else {
        next(createError(404, "Ong not Found"));
      }
    })
    .catch(next);
};

module.exports.follow = (req, res, next) => {
  const { id } = req.params;
  const currentOng = req.ong;

  if (id === currentOng.id) {
    next(createError(400, "You cannot follow yourself"));
  }

  if (
    currentOng.following.filter((following) => following.toString() === id)
      .length > 0
  ) {
    currentOng.following.splice(
      currentOng.following.findIndex((e) => e.id === id),
      1
    );
    currentOng.save();
    Ong.findById(id).then((ongToUnfollow) => {
      ongToUnfollow.followers.splice(
        ongToUnfollow.followers.findIndex((e) => e.id === id),
        1
      );
      ongToUnfollow.save();
    });
    res.status(200).json({ follow: false, message: "unfollow" });
  } else {
    Ong.findById(id).then((ongToFollow) => {
      ongToFollow.followers.push(currentOng);
      ongToFollow.save();
      currentOng.following.push(ongToFollow);
      currentOng.save();
    });
    res.status(200).json({ follow: true, message: "follow" });
  }

module.exports.list = (req, res, next) => {
  Ong.find({})
    // Devuelve HTTP 200 OK con el listado JSON de ongs almacenados en la Base de Datos en memoria
    .then((ongs) => res.json(ongs))
    .catch(next);
};

module.exports.ongWithPost = (req, res, next) => {
  Ong.aggregate([
    { $match: {} },
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "owner",
        as: "post_list",
      },
    },
  ])
    // Devuelve HTTP 200 OK con el listado JSON de ongs almacenados en la Base de Datos en memoria
    .then((ongs) => res.json(ongs))
    .catch(next);
};

};
