const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const Ong = require("../models/ong.model");
const sendMail = require("../config/email.config");
const cookie = require("cookie");
// const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST || "localhost:";
const port = process.env.PORT || "3000";
const domain = process.env.DOMAIN ||  `http://${hostname}${port}`
// const next = require("next");
// const app = next({ dev });

module.exports.create = async (req, res, next) => {
  await Ong.create({
    ...req.body.dataRegister,
    active: false,
  })
    .then((ong) => {
      const token = jwt.sign(
        {
          email: ong.email,
          username: ong.name,
          id: ong.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      url_activate = `${domain}/ong/activate/${token}`;
      email_receiver = ong.email;
      // console.log(ong.email);
      const mail = {
        to: email_receiver, // list of receivers
        from: `"Helpgo 👻" <${process.env.USER_MAIL}>`, // sender address
        subject: "Link para activar su cuenta ✔", // Subject line
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
                  email: ong.email,
                  username: ong.name,
                  id: ong.id,
                },
                process.env.JWT_SECRET,
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
            //console.log(err)
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
  const { token } = req.body;
  //console.log(token, req.body)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    Ong.findOneAndUpdate(
    { _id: decoded.id },
    { active: true },
    { new: true, runValidators: true }
  )
    .then((ong) => {
      if (ong) {
        res.status(200).json(ong);
      } else {
        next(createError(404, "Not Found: invalid token "));
      }
    }).catch(next);
  } catch {
    next(createError(401, "Unautorized: invalid token "));
  }
};
module.exports.requestUpdatePassword = async (req, res, next) => {
   const {email} = req.body
   
  await Ong.findOne({
    email
  })
    .then((ong) => {
      //console.log(ong)
      if(ong){        
      const token = jwt.sign(
        {
          email: ong.email,
          username: ong.name,
          id: ong.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "10m" }
      );
      url_activate = `${domain}/ong/recover/${token}`;
      email_receiver = ong.email;
      // console.log(ong.email);
      const mail = {
        to: email_receiver, // list of receivers
        from: `"Helpgo 👻" <${process.env.USER_MAIL}>`, // sender address
        subject: "Solicitud cambio de contraseña ✔", // Subject line
        text: "helpgo te recuerda que no debescompartir este link.", // plain text body
        html: `<b>Por favor abra el link y digite su nueva contraseña.</b>
        <a>${url_activate}<a/>`, // html body
      };
      sendMail.sendMail(mail).catch((err) => console.error(err));
      res.status(201).json(ong);
    } else {
      next(createError(404, "Not found "))
    }})
    .catch((err) => {
      next(err);
    });
};
module.exports.updatePassword= (req, res, next) => {
  const { token,password } = req.body;
  //console.log(token, password)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    Ong.findOne(
    { _id: decoded.id }
  )
    .then((ong) => {
      if (ong) {
        ong.password = password
        ong.save()
        res.status(200).json(ong);
      } else {
        next();
      }
    }).catch(next);
  } catch {
    next(createError(401, "Unautorized: invalid token "));
  }
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
module.exports.editProfile = ( req, res, next)=>{
  const currentOng = req.ong;
  const data = req.body;
  //console.log(data)
  Ong.findByIdAndUpdate(currentOng.id, data, {new:true})
     .then((ong)=>{
      res.status(200).json(ong)
     }).catch(next)
}

module.exports.follow = async  (req, res, next) => {
  const { id } = req.params;
  const currentOng = req.ong;
  try{
  const ong = await Ong.findById(id);
  if (id === currentOng.id) {
    next(createError(400, "You cannot follow yourself"));
  }
  if (currentOng.following.includes(id)) {
    currentOng.following.pull(id)
    ong.followers.pull(currentOng.id)
    await ong.save();
    await currentOng.save();
    res.status(200).json({ follow: false, message: "unfollow" });
  } else {
    Ong.findById(id).then((ongToFollow) => {
      ongToFollow.followers.push(currentOng);
      ongToFollow.save();
      currentOng.following.push(ongToFollow);
      currentOng.save();
    });
    res.status(200).json({ follow: true, message: "follow" });
  }} catch(err){
    next(err)
    
  }
};


module.exports.Connections =  (req,res,next) => {
const currentOng = req.ong;
const { size,trend } = req.query;
let following = currentOng.following
following.push(currentOng.id)
let sortby = {}
sortby[trend]= -1
Ong.find({ _id : { $nin : following}}).sort(sortby)
.limit(parseInt(size) || null)
.then((ongs)=>{
  res.status(200).json(ongs)
})
}
module.exports.list = (req, res, next) => {
  Ong.find({})
    .then((ongs) => res.json(ongs))
    .catch(next);
};
module.exports.followingOng = async (req, res, next) =>{
  const currentOng = req.ong;
  const {id} =  req.params
  if(id){
    const ong = await Ong.findById(id)
    let following = ong.following
    Ong.find({_id : { $in : following}})
    .then((ongs) => res.json(ongs))
    .catch(next);  
  } else {
    let following = currentOng.following
    //console.log(currentOng.id)
  Ong.find({_id : { $in : following}})
    .then((ongs) => res.json(ongs))
    .catch(next);

  }

}



