const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function registerUser(req, res) {

  const { fullName: { firstName, lastName }, email, password } = req.body

  const isUserAlreadyExists = await userModel.findOne({ email })

  if (isUserAlreadyExists) {
    res.status(400).json({
      message: "ewww! user already exists"
    })
  }

  const hashPassword = await bcrypt.hash(password, 10)

  const user = await userModel.create({
    fullName: {
      firstName, lastName
    },
    email,
    password: hashPassword
  })

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

  res.cookie("token", token)

  res.status(201).json({
    message: "user registered successfully yaaaay!",
    user: {
      fullName: user.fullName,
      email: user.email,
      _id: user._id,

    }
  })
}

async function loginUser(req, res) {

  const { email, password } = req.body

  const user = await userModel.findOne({
    email
  })

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password!"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password!"
    })
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,       // localhost
    sameSite: "lax",
  });


  res.status(200).json({
    message: "User logged in successfully yaaay!",
    user: {
      fullName: user.fullName,
      email: user.email,
      _id: user._id
    }
  })

}

async function getProfile(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      user: {
        fullName: user.fullName,
        email: user.email,
        _id: user._id,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

async function logoutUser(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  logoutUser
}
