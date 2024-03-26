const mongoose = require('mongoose');
const { Schema } = mongoose;

const instagramPostSchema = new Schema({
  keyword: String,
  description: String,
  likes: {
    type: Number,
    default: 0
  },
  comments_count: {
    type: Number,
    default: 0
  },
  image_url: String,
  user_id: String,
  post_url: String,
  userLikes: [String]
}, { timestamps: true });


module.exports = mongoose.model('instagram_data', instagramPostSchema, 'instagram_data');
