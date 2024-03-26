const express = require('express');
const router = express.Router();
const searchController = require('../controller/searchController');

// Endpoint for searching posts by keyword using a GET request
router.get('/', searchController.searchPostsByKeyword);

module.exports = router;
