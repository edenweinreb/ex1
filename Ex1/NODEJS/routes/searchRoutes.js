const express = require('express');
const router = express.Router();

const { search } = require('../controllers/searchController');

// GET http://foo.com/api/search/:query
router.get('/search/:query', search);

module.exports = router;