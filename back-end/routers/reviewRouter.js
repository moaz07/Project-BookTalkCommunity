const express = require("express");
const Review = require("../entities/Review");

const reviewRouter = express.Router();

//route get all contacts
//==>> http://localhost:8000/Review/getall
reviewRouter.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    console.log(err);
    res.send("you have a problem");
  }
});

//route get all contacts
//==>> http://localhost:8000/Review/getone
reviewRouter.get("/:id", async (req, res) => {
  try {
    const review = await Review.findOne(req.params.id);
    res.status(200).json(review);
  } catch (err) {
    console.log(err);
    res.send("you have a problem");
  }
});

//add Review
//==>> http://localhost:8000/Review/addReview
reviewRouter.post("/", async (req, res) => {
  try {
    console.log(req);
    const addReview = new Review(req.body);
    await addReview.save();
    res.status(200).json({ msg: "Review added successfully" });
  } catch (err) {
    console.log(err);
    res.send("you have a problem");
  }
});

//update Review
//==>> http://localhost:8000/Review/update/:id
reviewRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateReview = await Review.findByIdAndUpdate(id, {
      $set: { ...req.body },
    });
    res.status(200).json({ msg: "Review updated successfully" });
  } catch (err) {
    console.log(err);
    res.send("you have a problem");
  }
});

//delete Review
//==>> http://localhost:8000/Review/delete/:id
reviewRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteReview = await Review.findByIdAndDelete(id);
    res.status(200).json({ msg: "Review deleted successfully" });
  } catch (err) {
    console.log(err);
    res.send("you have a problem");
  }
});

module.exports = reviewRouter;
