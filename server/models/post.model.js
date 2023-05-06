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
