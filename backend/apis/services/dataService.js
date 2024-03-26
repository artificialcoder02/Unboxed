/* This function determines if the data related to the keyword exists in the database and if it's fresh based on your criteria (e.g., created or updated within the last 1 hours). */

const moment = require('moment'); // moment.js for easy date manipulation
const FacebookPost = require('../db/model/FacebookPost');
const InstagramPost = require('../db/model/InstagramPost');

exports.checkDataFreshness = async (keyword) => {
  const freshnessThreshold = moment().subtract(30, 'minutes').toDate();
  const facebookFreshness = await FacebookPost.findOne({
    text: { "$regex": keyword, "$options": 'i' },
    createdAt: { "$gte": freshnessThreshold }
  });

  const instagramFreshness = await InstagramPost.findOne({
    description: { "$regex": keyword, "$options": 'i' },
    createdAt: { "$gte": freshnessThreshold }
  });

  // Data is considered fresh if either platform has fresh data
  return !!(facebookFreshness || instagramFreshness);
};
