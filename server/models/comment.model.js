const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 2
  },
  ong: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ong',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

module.exports = Comment;