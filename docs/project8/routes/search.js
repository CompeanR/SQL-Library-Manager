const express = require('express');
const router = express.Router();
const book = require("../models").Book;

router.post('/search', function(req, res, next) {

    (async () => {
        const books = await book.findAll();
        const returnedBooks = [];
        const searchValue = req.body.searchValue.toUpperCase();
        for (let i=0; i<books.length; i++){
            if (
                books[i].title.toUpperCase().includes(searchValue) ||
                books[i].author.toUpperCase().includes(searchValue) ||
                books[i].genre.toUpperCase().includes(searchValue) ||
                books[i].year.toString().includes(searchValue)
            ){
                returnedBooks.push(books[i]);
            }
        }

        res.render("index", {title: "Search Results", books: returnedBooks});

    })();

});

module.exports = router;