const mongoose = require("mongoose");
const { Schema } = mongoose;
const PASSWORD_PATTERN = /^.{8,}$/;
const bcrypt = require("bcrypt");
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
const urlRegex =
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
const userSchema = new Schema(
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
    description: { type: String, required: true, maxlength: 400 },
    telephone: {
      type: Number,
      unique: true,
      maxlength: 15,
      minlength: 9,
      required: true,
    },
    active: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
    aprovalState: { type: Boolean, default: false },
    webPage: { type: String, unique: true },
    instagram: { type: String, unique: true },
    facebook: { type: String, unique: true },
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

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 10).then((hash) => {
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});
userSchema.path("email").validate(function (email) {
  return emailRegex.test(email);
}, "Please check your email address.");

var validateUrl = function (webPage) {
  return urlRegex.test(webPage);
};
userSchema.path("webPage").validate(validateUrl, "Invalid url.");
userSchema.path("facebook").validate(validateUrl, "Invalid url.");
userSchema.path("instagram").validate(validateUrl, "Invalid url.");
userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

const Ong = mongoose.model("Ong", userSchema);
module.exports = Ong;
