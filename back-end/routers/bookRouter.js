const express = require("express");

const Book = require("../entities/Book");

const bookRouter = express.Router();

// get all books
//==>> base_url/api/v1/books
bookRouter.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    console.log(err);
    res.send("you have a problem");
  }
});

/* // get one book
//==>> base_url/api/v1/books/:id
bookRouter.get("/:id", async (req, res) => {
  try {
    const book = await Book.findOne(req.params.id);
    res.status(200).json(book);
  } catch (err) {
    console.log(err);
    res.send("you have a problem");
  }
}); */

// search books
//==>> base_url/api/v1/books/search
bookRouter.get("/search", async (req, res) => {
  try {
    const { searchTerm } = req.query;
    console.error(searchTerm);
    const search = searchTerm
      ? { $or: [{ title: { $regex: searchTerm, $options: "i" } }] }
      : {};
    const books = await Book.find(search);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// add Book
//==>> base_url/api/v1/books
bookRouter.post("/", async (req, res) => {
  try {
    const addBook = new Book(req.body);
    await addBook.save();
    res.status(200).json({ msg: "Book added successfully", addBook });
  } catch (err) {
    console.log(err);
    res.send("you have a problem");
  }
});

// update Book
//==>> base_url/api/v1/books/:id
bookRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateBook = await Book.findByIdAndUpdate(id, {
      $set: { ...req.body },
    });
    res.status(200).json({ msg: "Book updated successfully" });
  } catch (err) {
    console.log(err);
    res.send("you have a problem");
  }
});

// delete Book
//==>> base_url/api/v1/books/:id
bookRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);
    res.status(200).json({ msg: "Book deleted successfully" });
  } catch (err) {
    console.log(err);
    res.send("you have a problem");
  }
});

module.exports = bookRouter;
