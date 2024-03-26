//const { retrieveDataForKeyword, checkDataFreshness, fetchDataForKeyword } = require('../services/dataService');
const FacebookPost = require('../db/model/FacebookPost');
const InstagramPost = require('../db/model/InstagramPost');
const { spawn } = require('child_process');
const moment = require('moment'); // moment.js for easy date manipulation


const fetchDataForKeyword = async (keyword) => {
    // Placeholder for your Python script execution
    // Example for Instagram
    const instagramScript = spawn('python', [`instagram_scraper.py`, keyword]);

    instagramScript.stdout.on('data', (data) => console.log(`Instagram Script: ${data}`));
    instagramScript.stderr.on('data', (data) => console.error(`Instagram Error: ${data}`));

    // Wait for the Instagram script to finish
    await new Promise((resolve, reject) => {
        instagramScript.on('close', (code) => {
            if (code === 0) resolve();
            else reject(`Instagram script exited with code ${code}`);
        });
    });

    // Repeat the process for Facebook or other platforms as needed
    const facebookScript = spawn('python', [`facebookscraper.py`, keyword]);

    facebookScript.stdout.on('data', (data) => console.log(`Facebook Script: ${data}`));
    facebookScript.stderr.on('data', (data) => console.error(`Facebook Error: ${data}`));

    // Wait for the Instagram script to finish
    await new Promise((resolve, reject) => {
        facebookScript.on('close', (code) => {
            if (code === 0) resolve();
            else reject(`Facebook script exited with code ${code}`);
        });
    });
};

const retrieveDataForKeyword = async (keyword) => {
    // Retrieve data from both collections
    const facebookDataPromise = FacebookPost.find({ keyword: { "$regex": keyword, "$options": 'i' } });
    const instagramDataPromise = InstagramPost.find({ keyword: { "$regex": keyword, "$options": 'i' } });

    // Wait for both promises to resolve
    const [facebookData, instagramData] = await Promise.all([facebookDataPromise, instagramDataPromise]);

    // Merge the data (if necessary) and sort or process as needed
    const mergedData = [...facebookData, ...instagramData].sort((a, b) => b.createdAt - a.createdAt);

    return mergedData;
};

const checkDataFreshness = async (keyword) => {
    const freshnessThreshold = moment().subtract(30, 'minutes').toDate();
    const facebookFreshness = await FacebookPost.findOne({
      keyword: { "$regex": keyword, "$options": 'i' },
      createdAt: { "$gte": freshnessThreshold }
    });
  
    const instagramFreshness = await InstagramPost.findOne({
      keyword: { "$regex": keyword, "$options": 'i' },
      createdAt: { "$gte": freshnessThreshold }
    });
  
    // Data is considered fresh if either platform has fresh data
    return !!(facebookFreshness || instagramFreshness);
  };


exports.searchPostsByKeyword = async (req, res) => {
    const keyword = req.query.keyword; // Access the keyword sent from the frontend
    console.log(keyword);

    try {
        // Initial check for data freshness or existence in your implementation
        const isDataFresh = await checkDataFreshness(keyword);

        if (!isDataFresh) {
            // Data is not fresh, so fetch new data
            await fetchDataForKeyword(keyword); // Note: This might need to run asynchronously depending on your setup
        }

        // Now, retrieve and return the fresh or existing data
        const data = await retrieveDataForKeyword(keyword);
        res.json(data);
    } catch (error) {
        console.error('Error searching posts:', error);
        res.status(500).json({ message: 'Error searching for posts' });
    }
};




