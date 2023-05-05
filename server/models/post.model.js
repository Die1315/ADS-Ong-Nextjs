const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: { type: String, required: true, minlength: 5 },
    description: { type: String, required: true },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    lat: {
      type: Number,
      required: true,
      min: [-90, "Latitude value: must be between -90 and 90"],
      max: [90, "Latitude value: must be between -90 and 90"],
    },
    lon: {
      type: Number,
      required: true,
      min: [-180, "Longitude value: must be between -180 and 180"],
      max: [180, "Longitude value: must be between -180 and 180"],
    },
    startdate: { type: Date, required: true },
    enddate: { type: Date },
    resources: { type: String },
    image: { type: String, required: true },
    likes: [{ 
      type: Schema.Types.ObjectId,
      ref: "Ong" 
    }],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Ong",
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }

);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
module.exports = Post;
