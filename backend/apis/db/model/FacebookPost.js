const mongoose = require('mongoose');
const { Schema } = mongoose;

const facebookPostSchema = new Schema({
  keyword: String,
  user_id: String,
  user_name: String,
  profile_url: String,
  post_date: String,
  post_url: String,
  post_text: String,
  likes_count: Number,
  shares_count: Number,
  views_count: Number,
  media_urls: [String],
  comments_count: Number,
  userLikes: [String]
}, { timestamps: true });

/* const propTypes = {
  _id: shape({
    $oid: String
  }),
  keyword: String,
  scraped_at: shape({
    $date: String
  }),
  user_id: String,
  user_name: String,
  profile_url: String,
  post_date: String,
  post_url: String,
  post_text: String,
  likes_count: Number,
  shares_count: Number,
  views_count: Number,
  comments_count: Number,
  media_urls: arrayOf(String)
}
 */
module.exports = mongoose.model('facebook_data', facebookPostSchema , 'facebook_data');
