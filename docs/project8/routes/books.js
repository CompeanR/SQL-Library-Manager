const express = require('express');
const router = express.Router();
const Book = require('../models').Book

/* Handler function to wrap each route. */
function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      // Forward error to the global error handler
      next(error);
    }
  };
};

/* GET books listing. */
router.get('/', asyncHandler(async (req, res) => {
  const books = await Book.findAll()
  res.render('index', { books })
}));

/* Create a new book form. */
router.get('/new', (req, res) => {
  res.render("new-book");
});

/* POST create book. */
router.post('/new', asyncHandler(async (req, res) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/books/");
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      res.render("new-book", { book, errors: error.errors })
    } else {
      throw error;
    }  
  }
}));

/* Update book form. */
router.get("/:id", asyncHandler(async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    res.render("update-book", { book, title: book.title });  
  } else {
    const err = new Error();
    err.status = 404;
    next(err)
  }
})); 

/* Update a book. */
router.post('/:id', asyncHandler(async (req, res, next) => {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body);
      res.redirect("/"); 
    } else {
      const err = new Error();
      err.message = 'This book is not available in the library'
      err.status = 404;
      next(err)
    }
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
      book = await Book.build(req.body);
      book.id = req.params.id;
      res.render("update-book", { book, errors: error.errors, title: "Update Book" })
    } else {
      throw error;
    }
  }
}));

/* Delete book form. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
  const book = await Book.findByPk(req.params.id);
  if(book) {
    await book.destroy();
    res.redirect("/");
  } else {
    res.sendStatus(404);
  }
}));


module.exports = router;
