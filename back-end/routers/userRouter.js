const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../entities/User");
const isAuth = require("../middlewares/authenticate");

//get all users
//==>> http://localhost:8000/api/v1/users
userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.send("you have a problem");
  }
});

/* //get one user
//==>> http://localhost:8000/api/v1/users
userRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.send("you have a problem");
  }
}); */

//fetch user account
//==>> http://localhost:8000/api/v1/users/useraccount
userRouter.get("/useraccount", isAuth, (req, res) => {
  res.send(req.user);
});

//signup: add User
//==>> http://localhost:8000/api/v1/users/signup
userRouter.post("/signup", async (req, res) => {
  try {
    const password = bcrypt.hashSync(req.body.password, 10); //cryptage 10 fois
    const addUser = new User({
      ...req.body,
      password,
      // verificationCode: randomBytes(6).toString("hex"), // 6 bits hexadecimal
    });

    await addUser.save();
    res.status(200).json({ msg: "User added successfully" });
  } catch (err) {
    console.log(err);
    res.send("you have a problem");
  }
});

//login
//==>> http://localhost:8000/api/v1/users/login
userRouter.post("/login", async (req, res) => {
  // const { email, password} = req.body;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const found = await User.findOne({ email });
    if (!found) {
      return res.json({
        msg: "The email you entered isn't connected to an account. Please try again.",
      });
    }
    const isMatch = await bcrypt.compare(password, found.password);
    if (!isMatch) {
      return res.json({
        msg: "Incorrect email or password. Please try again.",
      });
    }
    const token = jwt.sign({ userId: found._id }, "process.env.privateKey");
    res.json({ msg: "Login successful.", found, token });
  } catch (err) {
    console.log(err);
  }
});

//logout
//==>> http://localhost:8000/api/v1/users/logout
userRouter.get("/logout", (req, res) => {
  res.clearCookie("nToken");
  return res.redirect("/login");
});

//update User
//==>> http://localhost:8000/api/v1/users/:id
userRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await User.findByIdAndUpdate(id, {
      $set: { ...req.body },
    });
    res.status(200).json({ msg: "User updated successfully" });
  } catch (err) {
    console.log(err);
    res.send("you have a problem");
  }
});

//delete User
//==>> http://localhost:8000/api/v1/users/:id
userRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.send("you have a problem");
  }
});

//catch any errors that occur within the userRouter
userRouter.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = userRouter;
