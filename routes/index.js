const express = require('express');
const router = express.Router();
const Book = require('../models').Book

/* GET home page. */
router.get('/', (req, res) => {
  res.redirect('/books')
})


module.exports = router;
