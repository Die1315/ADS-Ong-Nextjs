const mongoose = require("mongoose");
const { Schema } = mongoose;
const PASSWORD_PATTERN = /^.{8,}$/;
const bcrypt = require("bcrypt");
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
const ongSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      unique: true,
      maxlength: 20,
    },
    email: { type: String, required: true, validateEmail: true, unique: true },
    password: {
      type: String,
      required: "A valid password is required",
      match: [PASSWORD_PATTERN, "the password is invalid"],
    },
    CIF: { type: Number, required: true, unique: true, maxlength: 15 },
    description: { type: String, required: true, minlength: 240},
    image: { type: String, required: true },
    coverPicture: { type: String, default: "https://res.cloudinary.com/de9uql5fm/image/upload/v1680642284/cover_dark_jwwhgs.jpg" },
    telephone: {
      type: Number,
      unique: true,
      maxlength: 15,
      minlength: 9,
      required: true,
    },
    category: { type: String, enum: ['Caridad', 'Servicios', 'Participación', 'Empoderamiento'], required: true, default:'Servicios' },
    active: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
    aprovalState: { type: Boolean, default: false },
    webPage: { type: String, unique: true },
    instagram: { type: String, unique: true },
    facebook: { type: String, unique: true },
    posts: [{
      type: Schema.Types.ObjectId,
      ref: "Post"
    }],
    following: [{
      type: Schema.Types.ObjectId,
      ref: 'Ong'
    }],
    followers: [{
      type: Schema.Types.ObjectId,
      ref: 'Ong'
    }],
    messages: [{
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }]
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);

ongSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 10).then((hash) => {
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});
ongSchema.path("email").validate(function (email) {
  return emailRegex.test(email);
}, "Please check your email address.");

var validateUrl = function (webPage) {
  //console.log(webPage)
  if(webPage){
   return urlRegex.test(webPage);
  }else{
   return true
  }
  };
ongSchema.path("webPage").validate(validateUrl, "Invalid url.");
ongSchema.path("facebook").validate(validateUrl, "Invalid url.");
ongSchema.path("instagram").validate(validateUrl, "Invalid url.");
ongSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

const Ong = mongoose.model('Ong', ongSchema)
module.exports = Ong;
