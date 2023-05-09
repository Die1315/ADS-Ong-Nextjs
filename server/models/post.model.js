const mongoose = require("mongoose");
const { Schema } = mongoose;
const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});
const postSchema = new Schema(
  {
    title: { type: String, required: true, minlength: 5 },
    description: { type: String, required: true },
    location: pointSchema,
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
postSchema.index({ location: '2dsphere' });
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

module.exports = Post;
